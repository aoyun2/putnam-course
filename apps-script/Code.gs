/**
 * Putnam and Beyond: Classroom bridge.
 *
 * Runs every 5 minutes in the teacher's Google account. It connects Google Classroom to the
 * GitHub repository aoyun2/putnam-course, branch "classroom":
 *
 *   queue.json   (written by Claude)  list of operations to perform in Classroom
 *   status.json  (written here)       result of every operation, ids of created items
 *   submissions/ (written here)       copies of the files the student turns in
 *
 * Operations in queue.json. Every operation has a unique "id"; each one runs once.
 *   {"id", "type": "material",   "key", "title", "description", "topic", "links": [url]}
 *   {"id", "type": "assignment", "key", "title", "description", "topic", "links": [url],
 *          "maxPoints", "due": "2026-11-08T23:59:00-08:00"}
 *   {"id", "type": "patch",      "key", "title"?, "description"?, "maxPoints"?, "due"?}
 *   {"id", "type": "grade",      "key", "grade", "feedback"}   grade, return, email feedback
 *   {"id", "type": "delete",     "key"}
 * Any operation may have "postAt": "<ISO time>"; it is skipped until that time.
 *
 * The script's memory (which operations ran, ids of created items) is kept in Script Properties,
 * so a failed GitHub write never causes an item to be posted twice.
 *
 * Setup: Project Settings > Script Properties > add GITHUB_TOKEN (a fine-grained token with
 * Contents: Read and write on aoyun2/putnam-course only). Then run setup() once.
 */

const COURSE_ID = '890768745520';
const REPO = 'aoyun2/putnam-course';
const BRANCH = 'classroom';
const MAX_ATTEMPTS = 5;

// ---------------------------------------------------------------- entry points

function setup() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('tick').timeBased().everyMinutes(5).create();
  tick();
}

function tick() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) return;
  try {
    const status = loadStatus_();
    const queue = readJson_('queue.json') || [];
    for (const op of queue) runOp_(op, status);   // each result is saved to Script Properties at once

    const writes = {};       // path -> Blob
    const pendingSync = {};  // path -> stamp, saved only after the commit succeeds
    syncSubmissions_(status, writes, pendingSync);

    status.lastRun = new Date().toISOString();
    const mirror = JSON.stringify({ processed: status.processed, items: status.items }, null, 2);
    const props = PropertiesService.getScriptProperties();
    if (props.getProperty('mirror') !== mirror || Object.keys(writes).length) {
      writes['status.json'] = Utilities.newBlob(mirror, 'application/json');
      commit_(writes, 'Classroom bridge update');
      props.setProperty('mirror', mirror);
      for (const path of Object.keys(pendingSync)) props.setProperty('sync:' + path, pendingSync[path]);
    }
  } finally {
    lock.releaseLock();
  }
}

// Script Properties hold the bridge's memory: op:<id>, item:<key>, sync:<path>.
function loadStatus_() {
  const all = PropertiesService.getScriptProperties().getProperties();
  const status = { processed: {}, items: {}, synced: {} };
  for (const k of Object.keys(all)) {
    if (k.indexOf('op:') === 0) status.processed[k.slice(3)] = JSON.parse(all[k]);
    else if (k.indexOf('item:') === 0) status.items[k.slice(5)] = JSON.parse(all[k]);
    else if (k.indexOf('sync:') === 0) status.synced[k.slice(5)] = all[k];
  }
  return status;
}

function saveItem_(status, key, item) {
  status.items[key] = item;
  PropertiesService.getScriptProperties().setProperty('item:' + key, JSON.stringify(item));
}

// ---------------------------------------------------------------- operations

function runOp_(op, status) {
  if (!op || !op.id) return;
  const rec = status.processed[op.id];
  if (rec && (rec.ok || rec.attempts >= MAX_ATTEMPTS)) return;
  if (op.postAt && new Date() < new Date(op.postAt)) return;
  const r = rec || { attempts: 0 };
  try {
    const result = OPS_[op.type](op, status);
    r.ok = true;
    r.result = result || null;
    delete r.error;
  } catch (e) {
    r.ok = false;
    r.error = String(e && e.message || e);
    if (!(e instanceof NotReady)) r.attempts += 1;  // waiting for the student is not a failure
  }
  r.at = new Date().toISOString();
  if (r.error) r.error = r.error.slice(0, 300);
  status.processed[op.id] = r;
  PropertiesService.getScriptProperties().setProperty('op:' + op.id, JSON.stringify(r));
}

function NotReady(message) { this.message = message; }

const OPS_ = {
  material(op, status) {
    const existing = findOwn_('material', op.title);
    if (existing) { saveItem_(status, op.key, { kind: 'material', id: existing }); return existing; }
    const res = Classroom.Courses.CourseWorkMaterials.create({
      title: op.title,
      description: op.description || '',
      materials: links_(op.links),
      topicId: op.topic ? topicId_(op.topic) : undefined,
      state: 'PUBLISHED',
    }, COURSE_ID);
    saveItem_(status, op.key, { kind: 'material', id: res.id });
    return res.id;
  },

  assignment(op, status) {
    const existing = findOwn_('assignment', op.title);
    if (existing) { saveItem_(status, op.key, { kind: 'assignment', id: existing }); return existing; }
    const body = {
      title: op.title,
      description: op.description || '',
      materials: links_(op.links),
      workType: 'ASSIGNMENT',
      state: 'PUBLISHED',
      maxPoints: op.maxPoints,
      topicId: op.topic ? topicId_(op.topic) : undefined,
    };
    if (op.due) Object.assign(body, due_(op.due));
    const res = Classroom.Courses.CourseWork.create(body, COURSE_ID);
    saveItem_(status, op.key, { kind: 'assignment', id: res.id });
    return res.id;
  },

  patch(op, status) {
    const item = item_(status, op.key, 'assignment');
    const body = {};
    const mask = [];
    if (op.title !== undefined) { body.title = op.title; mask.push('title'); }
    if (op.description !== undefined) { body.description = op.description; mask.push('description'); }
    if (op.maxPoints !== undefined) { body.maxPoints = op.maxPoints; mask.push('maxPoints'); }
    if (op.due !== undefined) { Object.assign(body, due_(op.due)); mask.push('dueDate', 'dueTime'); }
    Classroom.Courses.CourseWork.patch(body, COURSE_ID, item.id, { updateMask: mask.join(',') });
    return item.id;
  },

  grade(op, status) {
    const item = item_(status, op.key, 'assignment');
    const subs = listSubmissions_(item.id).filter(s => s.state === 'TURNED_IN' || s.state === 'RETURNED');
    if (!subs.length) throw new NotReady('not turned in yet');
    for (const s of subs) {
      Classroom.Courses.CourseWork.StudentSubmissions.patch(
        { assignedGrade: op.grade, draftGrade: op.grade },
        COURSE_ID, item.id, s.id, { updateMask: 'assignedGrade,draftGrade' });
      if (s.state === 'TURNED_IN') returnSubmission_(item.id, s.id);
    }
    if (op.feedback) {
      MailApp.sendEmail({
        to: op.email || Session.getEffectiveUser().getEmail(),
        subject: 'Putnam and Beyond: feedback on ' + op.key,
        body: op.feedback,
      });
    }
    return subs.map(s => s.id);
  },

  delete(op, status) {
    const item = status.items[op.key];
    if (!item) throw new Error('unknown key ' + op.key);
    if (item.kind === 'assignment') Classroom.Courses.CourseWork.remove(COURSE_ID, item.id);
    else Classroom.Courses.CourseWorkMaterials.remove(COURSE_ID, item.id);
    item.deleted = true;
    saveItem_(status, op.key, item);
    return item.id;
  },
};

// ---------------------------------------------------------------- submissions

function syncSubmissions_(status, writes, pendingSync) {
  for (const key of Object.keys(status.items)) {
    const item = status.items[key];
    if (item.kind !== 'assignment' || item.deleted) continue;
    for (const s of listSubmissions_(item.id)) {
      const turnedIn = (s.submissionHistory || [])
        .map(h => h.stateHistory)
        .filter(h => h && h.state === 'TURNED_IN')
        .map(h => h.stateTimestamp)
        .sort()
        .pop() || null;
      const info = { state: s.state, late: !!s.late, turnedIn: turnedIn, updateTime: s.updateTime,
                     assignedGrade: s.assignedGrade === undefined ? null : s.assignedGrade, files: [] };
      const atts = (s.assignmentSubmission && s.assignmentSubmission.attachments) || [];
      atts.forEach((a, i) => {
        if (!a.driveFile) return;
        const f = DriveApp.getFileById(a.driveFile.id);
        const isGoogle = f.getMimeType().indexOf('application/vnd.google-apps') === 0;
        const name = safeName_((i + 1) + '-' + f.getName()) + (isGoogle ? '.pdf' : '');
        const path = 'submissions/' + key + '/' + name;
        info.files.push(path);
        const stamp = f.getLastUpdated().toISOString();
        if (status.synced[path] === stamp) return;
        writes[path] = isGoogle ? f.getAs('application/pdf') : f.getBlob();
        pendingSync[path] = stamp;
      });
      const infoPath = 'submissions/' + key + '/info.json';
      const infoText = JSON.stringify(info, null, 2);
      const hash = Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, infoText));
      if (status.synced[infoPath] !== hash) {
        writes[infoPath] = Utilities.newBlob(infoText, 'application/json');
        pendingSync[infoPath] = hash;
      }
    }
  }
}

function listSubmissions_(courseWorkId) {
  const out = [];
  let pageToken;
  do {
    const res = Classroom.Courses.CourseWork.StudentSubmissions.list(COURSE_ID, courseWorkId, { pageToken: pageToken });
    (res.studentSubmissions || []).forEach(s => out.push(s));
    pageToken = res.nextPageToken;
  } while (pageToken);
  return out;
}

function returnSubmission_(courseWorkId, submissionId) {
  const url = 'https://classroom.googleapis.com/v1/courses/' + COURSE_ID + '/courseWork/' + courseWorkId +
              '/studentSubmissions/' + submissionId + ':return';
  const res = UrlFetchApp.fetch(url, {
    method: 'post', contentType: 'application/json', payload: '{}', muteHttpExceptions: true,
    headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() },
  });
  if (res.getResponseCode() >= 300) throw new Error('return failed: ' + res.getContentText());
}

// ---------------------------------------------------------------- Classroom helpers

function links_(urls) {
  return (urls || []).map(u => ({ link: { url: u } }));
}

function due_(iso) {
  const d = new Date(iso);
  return {
    dueDate: { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() },
    dueTime: { hours: d.getUTCHours(), minutes: d.getUTCMinutes() },
  };
}

function topicId_(name) {
  let pageToken;
  do {
    const res = Classroom.Courses.Topics.list(COURSE_ID, { pageToken: pageToken });
    const t = (res.topic || []).find(x => x.name === name);
    if (t) return t.topicId;
    pageToken = res.nextPageToken;
  } while (pageToken);
  return Classroom.Courses.Topics.create({ name: name }, COURSE_ID).topicId;
}

// Returns the id of a published item with this title that this script created, or null.
function findOwn_(kind, title) {
  let pageToken;
  do {
    const res = kind === 'assignment'
      ? Classroom.Courses.CourseWork.list(COURSE_ID, { pageToken: pageToken })
      : Classroom.Courses.CourseWorkMaterials.list(COURSE_ID, { pageToken: pageToken });
    const list = (kind === 'assignment' ? res.courseWork : res.courseWorkMaterial) || [];
    const hit = list.find(x => x.title === title && x.associatedWithDeveloper);
    if (hit) return hit.id;
    pageToken = res.nextPageToken;
  } while (pageToken);
  return null;
}

function item_(status, key, kind) {
  const item = status.items[key];
  if (!item || item.deleted || item.kind !== kind) throw new Error('unknown ' + kind + ' ' + key);
  return item;
}

function safeName_(s) {
  return s.replace(/[^A-Za-z0-9._-]+/g, '_').slice(0, 120);
}

// ---------------------------------------------------------------- GitHub helpers

function gh_(method, path, body) {
  const token = PropertiesService.getScriptProperties().getProperty('GITHUB_TOKEN');
  if (!token) throw new Error('GITHUB_TOKEN script property is not set');
  const res = UrlFetchApp.fetch('https://api.github.com/repos/' + REPO + path, {
    method: method,
    contentType: 'application/json',
    payload: body ? JSON.stringify(body) : undefined,
    muteHttpExceptions: true,
    headers: { Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json',
               'X-GitHub-Api-Version': '2022-11-28' },
  });
  const code = res.getResponseCode();
  if (code === 404 && method === 'get') return null;
  if (code >= 300) throw new Error('GitHub ' + method + ' ' + path + ' -> ' + code + ': ' + res.getContentText().slice(0, 300));
  return JSON.parse(res.getContentText() || 'null');
}

function readJson_(file) {
  const res = gh_('get', '/contents/' + file + '?ref=' + BRANCH);
  if (!res) return null;
  const text = Utilities.newBlob(Utilities.base64Decode(res.content.replace(/\n/g, ''))).getDataAsString();
  return JSON.parse(text);
}

// Writes all files in one commit on BRANCH. If the branch moved meanwhile, the next run retries.
function commit_(writes, message) {
  const ref = gh_('get', '/git/ref/heads/' + BRANCH);
  const parentSha = ref.object.sha;
  const parent = gh_('get', '/git/commits/' + parentSha);
  const tree = Object.keys(writes).map(path => {
    const blob = gh_('post', '/git/blobs', { content: Utilities.base64Encode(writes[path].getBytes()), encoding: 'base64' });
    return { path: path, mode: '100644', type: 'blob', sha: blob.sha };
  });
  const newTree = gh_('post', '/git/trees', { base_tree: parent.tree.sha, tree: tree });
  const c = gh_('post', '/git/commits', { message: message, tree: newTree.sha, parents: [parentSha] });
  gh_('patch', '/git/refs/heads/' + BRANCH, { sha: c.sha, force: false });
}

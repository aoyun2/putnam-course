# Course standard

This document defines requirements for the Olympiad and Putnam Problem Solving course. It is adapted from the course standard of Aaron's Berkeley handouts repository (`aoyun2/berkeley`); carry later changes there over here unless they concern only a Berkeley course. Use `handout-standard.md` for written instruction and figures. Record conflicts and resolve them using Aaron's instructions and the syllabus.

## Course and packet scope

Maintain a course profile with the dates, source books (and where the private copies are), syllabus version, topic sequence, prerequisites, assessment formats, and publication restrictions. Distinguish verified source requirements from author choices.

Store this profile at `course-profile.md` in the repository root. It records `publish_solutions` with its scope and the reason. Automation must check the profile before adding solution content. Everything on `main` is published by GitHub Pages; validate what is actually committed, not only what is linked.

For each packet, record in `audit.md`:

- The week or review interval and the source sections actually examined (book, section and problem numbers).
- Observable learning objectives: what the student should explain, derive, implement, debug, or interpret independently.
- A mapping from each required objective to instruction, a worked example where needed, and an independent practice opportunity. Identify omissions explicitly.
- Prerequisites and new terminology. Restate only the earlier facts needed for the task.
- Provenance (book number and original competition) and status of every problem: graded, extra practice, or used as a worked example; and whether its solution may be published yet.
- Validation evidence and unresolved findings, with severity and concrete acceptance criteria.

Do not silently substitute generic material for the week's scope. Check every quoted problem statement against the rendered book page or official contest text, and mark anything that could not be checked.

## Instruction and practice

Teach a difficult idea with a concrete example and an explanation of the relevant choices. Follow supported practice with at least one task that requires choosing the method independently. Use a timed mixed set when preparing for an assessment, with a stated time estimate and coverage rationale.

Preserve detail that supports understanding. Remove repeated narration rather than hypotheses or reasoning. Explain a concept fully at its first useful occurrence and refer precisely to it later. A code guide, Idea box, shortcut, or warning is optional when it would merely repeat nearby material. Do not fill a template for its own sake.

Separate exercise prompts from permitted hints and solutions. A task intended to assess method selection must not disclose that method in its title or in an adjacent guide. Guided tasks may provide it, but must be identified as guided.

## Review and release

Review correctness, coverage, instructional sequence, independent practice, and usability separately. State which conclusions are supported by execution or source comparison and which are editorial judgments. Do not describe an untested runtime as verified or repeated agent approval as evidence of student learning.

Record commands, results, visual checks, and limitations. For a missing tool or source, record the blocked check and the exact remaining action. Critical correctness defects prevent a packet from being marked verified.

Inspect the files actually made public (`main`: HTML, PDFs, sources). Follow handout-standard section 5b for graded work. Removing a link does not remove a file from publication. Never commit a book, a scan, or an unposted quiz or test to `main`. Do not silently remove existing public content during an audit; report it and handle remediation within Aaron's scope.

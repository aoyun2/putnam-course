# Repository instructions

This repository is the public website and the sources of the Olympiad and Putnam Problem Solving course. The course conventions follow Aaron's Berkeley handouts repository (`aoyun2/berkeley`): its standards, templates and ink figures were copied here and adapted.

Read [the course profile](course-profile.md) and [the course standard](standards/course-standard.md) before creating or revising course material. For handouts, problem sets, quizzes, tests, solutions and figures, also follow [the handout standard](standards/handout-standard.md) and [the LaTeX skill](.claude/skills/course-latex/SKILL.md). These documents are the authoritative requirements. When the corresponding files in `aoyun2/berkeley` have changed, carry the changes over before building, unless they concern only a Berkeley course.

## Layout

- `src/weekNN/notes.tex` (the week's handout), `solutions.tex`, `pset.tex` (the graded set posted on Classroom), `audit.md`.
- `weekNN/notes.pdf`, `solutions.pdf`, `pset.pdf`, and `quiz.pdf` once the quiz has been given: the built PDFs that the website links to.
- `templates/`: `evan.sty`, `handout.sty` (link macros point at this site), `figure-ink.sty`, and the handout and solutions templates.
- `samples/ink-figures/` and `standards/reference/`: reference figures and packet from the Berkeley repository.
- `src/syllabus.tex`, `index.html`, `README.md`: the syllabus, the schedule page and the repository description.
- `tex/`: the older style files, kept so the syllabus, quiz and submission template still build.
- `pdfjs/`: the PDF viewer the website opens PDFs in (links: `pdfjs/web/viewer.html?file=../../weekNN/notes.pdf`, new tab).

## Required workflow

1. Establish the week, its sources (book sections and problem numbers), learning objectives, prerequisites from earlier weeks, and the graded set. Record missing evidence rather than inventing coverage.
2. Preserve required mathematical detail. When revising, never delete existing content (problems, examples, sections); add alongside it unless Aaron asks for a removal.
3. Use the ink figures in `templates/figure-ink.sty` as the LaTeX skill describes. Verify every figure's geometry or data by computation, and inspect every changed figure at 240 DPI.
4. Verify every computation and every quoted problem statement. Record commands, results and unchecked items in `src/weekNN/audit.md`.
5. Check for answer leakage on graded work (handout standard 5b) in everything committed to `main`.
6. Build LaTeX twice from the week folder with the current directory first: `TEXINPUTS=.:../../templates//: pdflatex -interaction=nonstopmode -halt-on-error notes.tex`. Inspect every page and remove compilation scratch files.
7. Review the diff and commit only task files. Commits: author `Aoyun <70720711+aoyun2@users.noreply.github.com>`.

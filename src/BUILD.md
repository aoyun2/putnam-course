# Building the handouts

Week material (from 24 November 2026) uses the templates in `templates/`, copied from `aoyun2/berkeley` and adapted; see `standards/handout-standard.md` and `.claude/skills/course-latex/SKILL.md`. Build twice from the week folder:

```
cd src/weekNN
TEXINPUTS=.:../../templates//: pdflatex -interaction=nonstopmode -halt-on-error notes.tex
```

Do the same for `pset.tex` and `solutions.tex`, copy the PDFs to `weekNN/`, and delete the `.aux`, `.log` and `.out` files.

The syllabus, quizzes and the submission template still use the older style files:

Compile with `TEXINPUTS=.:./tex//: latexmk -pdf <file>.tex` from this folder.

- `tex/evan.sty` is Evan Chen's style file (Boost license), unchanged.
- `tex/keytheorems.sty` is keytheorems v0.3.2, needed only on TeX Live 2023; newer TeX Live has a newer copy built in, so delete this file there.
- Options used: `[boxthm,noasy]` for quizzes, plus
  `\renewcommand{\S}{\ensuremath{\mathsection}}` and `\renewcommand{\labelitemi}{\ensuremath{\bullet}}` so no cm-super fonts are needed.

Quiz sources are kept private until each quiz is given.

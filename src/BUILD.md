# Building the handouts

Compile with `TEXINPUTS=.:./tex//: latexmk -pdf <file>.tex` from this folder (week files: run from `src/` with `TEXINPUTS=.:../tex//:` inside the week folder).

- `tex/evan.sty` is Evan Chen's style file (Boost license), unchanged.
- `tex/keytheorems.sty` is keytheorems v0.3.2, needed only on TeX Live 2023; newer TeX Live has a newer copy built in, so delete this file there.
- Options used: `[boxthm,secthm,noasy]` for notes, `[boxthm,noasy]` for problem sets and quizzes, plus
  `\renewcommand{\S}{\ensuremath{\mathsection}}` and `\renewcommand{\labelitemi}{\ensuremath{\bullet}}` so no cm-super fonts are needed.

Quiz sources are kept private until each quiz is given.

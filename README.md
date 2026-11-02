# Putnam and Beyond

A year-long, self-directed problem-solving course built on *Putnam and Beyond* by Răzvan Gelca and Titu Andreescu (Springer, 2007), run from November 2026.

**Course website:** https://aoyun2.github.io/putnam-course/

## What the course is

The course works through *Putnam and Beyond* chapter by chapter, at the level of the William Lowell Putnam Mathematical Competition. Every week has:

- **Lecture notes.** Each worked example is split into an *Investigation*, which shows how the idea is found, and a *Proof*, which is the write-up that would be handed in. The investigation sections use the problem-solving strategies from Paul Zeitz, *The Art and Craft of Problem Solving* (orientation, penultimate step, wishful thinking, make it easier, get your hands dirty).
- **A problem set.** 8 required problems and 2 challenge problems, mostly from the book.
- **A timed quiz.** 3 problems in 60 minutes, closed book.

Each unit ends with a 3-hour, 6-problem test in the format of one session of the Putnam. The course ends with a full mock Putnam (two 3-hour sessions, 12 problems).

Work is submitted and graded on Google Classroom. Quizzes and tests are graded on the Putnam scale (10, 9, 8, 2, 1, 0 per problem), so an incomplete solution earns almost nothing. Problem sets are graded on the full 0–10 scale, and an unsolved problem can earn up to 3 points for a documented investigation. Course grade: problem sets 35%, quizzes 20%, unit tests 30%, final exam 15%.

The course materials, the schedule, and the grading are produced by Claude (Anthropic), acting as the instructor. All submitted solutions are my own.

## Units

| Unit | Topic | P&B sections |
|---|---|---|
| 1 | Methods of proof: contradiction, induction, pigeonhole, extremal elements, invariants | Ch. 1 |
| 2 | Algebra I: identities, inequalities, polynomials | 2.1–2.2 |
| 3 | Number theory | Ch. 5 |
| 4 | Combinatorics and probability | Ch. 6 |
| 5 | Sequences and series | 3.1 |
| 6 | Linear and abstract algebra | 2.3–2.4 |
| 7 | Single-variable calculus | 3.2 |
| 8 | Multivariable calculus, functional equations, differential equations | 3.3–3.4 |
| 9 | Geometry and trigonometry | Ch. 4 |
| — | Final exam: mock Putnam | all |

The full week-by-week schedule is in the [syllabus](syllabus.pdf).

## Progress

| Week | Topic | Problem set | Quiz |
|---|---|---|---|
| 1 | Contradiction; induction | in progress | — |

## Repository layout

```
index.html                    course website (served by GitHub Pages)
syllabus.pdf                  syllabus: rules, grading, schedule
weekNN/notes.pdf              lecture notes for week NN
weekNN/pset.pdf               problem set for week NN
weekNN/quiz.pdf               quiz for week NN (added after the quiz is given)
tex/submission-template.tex   LaTeX template for typed solutions
tex/evan.sty                  Evan Chen's LaTeX style file
```

## Credits

- R. Gelca and T. Andreescu, *Putnam and Beyond*, Springer, 2007. Problems marked "P&B" are quoted from this book for study purposes; the book's copyright belongs to its publisher.
- P. Zeitz, *The Art and Craft of Problem Solving*, 3rd ed., Wiley, 2017.
- [`evan.sty`](https://github.com/vEnhance/dotfiles/blob/main/texmf/tex/latex/evan/evan.sty) by Evan Chen, used under the Boost Software License 1.0.

The MIT license in this repository covers the original course materials. It does not cover the quoted textbook problems or `evan.sty`.

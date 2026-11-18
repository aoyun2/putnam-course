# Olympiad and Putnam Problem Solving

A self-directed problem-solving course covering olympiad mathematics in all four areas (algebra, combinatorics, geometry, number theory) with the emphasis of the William Lowell Putnam Mathematical Competition, run from 23 November 2026 to 21 August 2027. After that, weekly sets of past Putnam and olympiad problems continue until the Putnam in December 2027.

**Course website:** https://aoyun2.github.io/putnam-course/

## What the course is

The main text is *Putnam and Beyond* by Răzvan Gelca and Titu Andreescu. Each area also uses the standard olympiad books for it: Engel's *Problem-Solving Strategies*; *104 Number Theory Problems*, Andreescu and Andrica's *Number Theory*, and Hardy and Wright for number theory; *A Path to Combinatorics for Undergraduates*, *102 Combinatorial Problems* and Diestel's *Graph Theory* for combinatorics; Evan Chen's *Euclidean Geometry in Mathematical Olympiads*, Coxeter and Greitzer's *Geometry Revisited* and Prasolov for geometry; *Problems from the Book* for advanced topics; and past Putnam, USAMO, IMO and IMO Shortlist papers. Every week has:

- **Lecture notes.** Each worked example is split into an *Investigation*, which shows how the idea is found, and a *Proof*, which is the write-up that would be handed in. The investigation sections use the problem-solving strategies from Paul Zeitz, *The Art and Craft of Problem Solving* (orientation, penultimate step, wishful thinking, make it easier, get your hands dirty).
- **A problem set.** 8 required problems and 2 challenge problems from these books and from past competitions.
- **A timed quiz.** 3 problems in 60 minutes, closed book.

Each unit ends with a 3-hour, 6-problem test in the format of one session of the Putnam, and there is a monthly mock contest of past competition problems. The course ends with a full mock Putnam (two 3-hour sessions, 12 problems).

Work is submitted and graded on Google Classroom. Quizzes, tests and mock contests are graded on the Putnam scale (10, 9, 8, 2, 1, 0 per problem), so an incomplete solution earns almost nothing. Problem sets are graded on the full 0–10 scale, and an unsolved problem can earn up to 3 points for a documented investigation. Course grade: problem sets 35%, quizzes 20%, unit tests and mock contests 30%, final exam 15%.

The course materials, the schedule, and the grading are produced by Claude (Anthropic), acting as the instructor. All submitted solutions are my own.

## Units

| Unit | Topic |
|---|---|
| 1 | Methods of proof and strategies: contradiction, induction, pigeonhole, extremal principle, invariants |
| 2 | Number theory I: divisibility, modular arithmetic, Fermat/Euler/Wilson, Chinese remainder theorem, Diophantine factoring, lifting the exponent |
| 3 | Combinatorics I: bijections, double counting, inclusion–exclusion, probability, recurrences, generating functions |
| 4 | Algebra I: identities, inequalities, polynomials |
| 5 | Analysis I: sequences and series |
| 6 | Geometry I: angle chasing, power of a point, Ceva and Menelaus, triangle centers, spiral similarity |
| 7 | Number theory II: valuations, orders and primitive roots, quadratic reciprocity, Pell equations, Vieta jumping, multiplicative functions |
| 8 | Combinatorics II: graph theory, games and processes, extremal combinatorics, the probabilistic and linear algebra methods |
| 9 | Linear and abstract algebra; functional equations |
| 10 | Analysis II: calculus |
| 11 | Geometry II: inversion, complex numbers, barycentric coordinates, projective geometry |
| — | Final exam: mock Putnam |

The full week-by-week schedule is in the [syllabus](syllabus.pdf).

## Progress

| Week | Topic | Problem set | Quiz |
|---|---|---|---|
| 1 | Contradiction; ordinary induction | due Sun 29 Nov | Mon 30 Nov |

## Repository layout

```
index.html                    course website (served by GitHub Pages)
syllabus.pdf                  syllabus: rules, grading, schedule
weekNN/notes.pdf              lecture notes for week NN
weekNN/pset.pdf               problem set for week NN
weekNN/quiz.pdf               quiz for week NN (added after the quiz is given)
tex/submission-template.tex   LaTeX template for typed solutions
tex/evan.sty                  Evan Chen's LaTeX style file
pdfjs/                        PDF.js viewer that the site opens the PDFs in
```

## Credits

- R. Gelca and T. Andreescu, *Putnam and Beyond*, Springer, 2007. Problems marked "P&B" are quoted from this book for study purposes; the book's copyright belongs to its publisher.
- P. Zeitz, *The Art and Craft of Problem Solving*, 3rd ed., Wiley, 2017.
- A. Engel, *Problem-Solving Strategies*, Springer, 1998. Problems marked "Engel" are quoted from this book for study purposes; the book's copyright belongs to its publisher. The same applies to problems quoted from the other books listed in the syllabus.
- [`evan.sty`](https://github.com/vEnhance/dotfiles/blob/main/texmf/tex/latex/evan/evan.sty) by Evan Chen, used under the Boost Software License 1.0.
- [PDF.js](https://mozilla.github.io/pdf.js/) 4.10.38 by Mozilla, used under the Apache License 2.0 (`pdfjs/LICENSE`).

The MIT license in this repository covers the original course materials. It does not cover the quoted textbook problems, `evan.sty` or PDF.js.

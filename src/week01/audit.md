# Week 1 audit: Contradiction and Induction

Rebuilt on 24 November 2026 in the Berkeley handout format (templates/handout.tex, evan `[mdthm,colorsec,noasy]`, `figure-ink.sty`).

## Week, sources, objectives

- Dates: Monday 23 November to Sunday 29 November 2026 (syllabus week 1, Unit 1: strategy).
- Sources: P&B §1.1 (argument by contradiction), §1.2 up to strong induction; ACPS §1.2, §2.1–2.3; Engel Ch. 8, problems 1, 2, 5, 8 in the text, 12, 13, 25 in the sets.
- Objectives: orient on a problem (hypothesis, conclusion, four starting strategies); negate statements correctly; prove by contradiction, including the "infinitely many" pattern and parity arguments; write induction proofs; find the inductive step in five ways (find P(k) in P(k+1), choose the variable, remove a piece, strengthen, generalize); recognize the standard induction errors.
- Prerequisites: none from earlier weeks. Background facts T1–T5 (division with remainder, well-ordering, binomial theorem, prime factor exists, difference of powers) come from earlier courses and are stated with one-line reasons.
- Graded set: 12 required + 3 challenge, unchanged from the posted pset (Classroom assignment 898009711742, due 29 Nov 23:59).

## Content kept from the previous version

Every result, example, trap and figure of the 23 November handout is kept: squeeze fact and Hungary 1926; negation table and its traps; Euclid; the 30031 trap; mod 4 definition and closure fact; primes ≡ 3 mod 4 (923 = 13·71) and the 21 = 3·7 trap; difference divisibility; finite roots; Euler's polynomial problem; x⁵+x+1 parity example and the "parity is not always enough" trap; Tomescu; contradiction vs contrapositive; induction principle with proof; how to write an induction proof; Euclid's lemma; binomial lemma; Fermat; two-coloring the regions of lines; Engel 8.8 remark; Mantel (Engel 8.1) with its traps; the Q_n strengthening; Engel 8.5 nested radical; horses; base case n² + n; step range; P(k+1) circularity; two variables; tools list.

Added: "Facts used from earlier courses" (T1–T5), "The question" boxes, idea boxes, numbered proof steps, a shortcuts box for each induction part, the nested-radical plot, the extra practice X1–X6 with keyed hints, and the solutions file.

## Statement checks

Compared against the PDFs (P&B: PDF page = book page + 14; Engel by chapter offset).

| Item | Source | Result |
|---|---|---|
| Problems 1–12, Challenges 13–15 | P&B 1, 14, 2, 3, 6, 7, 10, 16, 18, 17, 9, 19; Engel 8.25, 8.2, 8.12 | Same text as the posted pset (checked 18 Nov). The P&B text layer shows "f(x) = f(y)" in Problem 6 because the ≠ glyph is lost in extraction; the printed page has ≠. |
| X1 | P&B 4 | Matches. |
| X2 | P&B 8 | Matches. |
| X3 | Engel 8.13 | Matches except the range: the book prints "n > 0", which leaves a₁ undefined; the handout uses n ≥ 0. Engel's solution computes from a₀, so n ≥ 0 is the intended range. |
| X4 | P&B 12 | Matches. |
| X5 | P&B 15 | Matches. |
| X6 | P&B 20 | Matches. |

## Computations

Commands run in the scratchpad (`checks/x.py`, sympy 1.x, Python 3):

- 30031 = 59 · 509; 923 = 13 · 71; 21 = 3 · 7.
- x² + x + 41 at x = 40: 41²; at x = 41: 41 · 43; prime for x = 0..39.
- Four consecutive products 24, 120, 360, 840 = 5² − 1, 11² − 1, 19² − 1, 29² − 1.
- Pascal rows 2–7: interior entries divisible by n exactly in rows 2, 3, 5, 7; non-divisible entries 6 (row 4), 15, 20, 15 (row 6). The figure colors are computed in TikZ from the same rule.
- Mantel: largest triangle-free graphs on 4 and 6 vertices have 4 and 9 edges (exhaustive search, 18 Nov).
- Q_n step condition: (2n+1)²(3n+3+c) ≤ (2n+2)²(3n+c) ⇔ 0 ≤ (4c−3)n + 3(c−1) (sympy expansion); c = 1 gives (2k+1)²(3k+4) = 12k³+28k²+19k+4 and (2k+2)²(3k+1) = 12k³+28k²+20k+4.
- Nested radical R₂ for N = 2..15: 1.4142, 1.8612, 2.2134, 2.4476, 2.5885, 2.6685, 2.7122, 2.7355, 2.7479, 2.7543, 2.7577, 2.7594, 2.7603, 2.7607; R₂(200) ≈ 2.761207. The plot uses these values.
- Line-coloring figure: lines y = x/2 + 1/2, y = −3x/2 + 9/2, ℓ: y = x/10 + 4/5. In the box [0,4]×[0,3], ℓ meets the first line at x = 3/4 and the second at x = 37/16, so it crosses three regions (caption). Shaded cells are explicit half-plane intersections (odd count of chosen sides).
- X1 figure: a = 1.6, b = 1.4 = 7a/8, θ = 51.89°, circle height 0.9875, radius 1.2589 ≈ 0.79a, chord 1.4; identity a sin θ = b√(1 − b²/4a²) checked symbolically.
- X3: 3a⁴ + 4a³ + 1 = (a+1)²(3a² − 2a + 1) (sympy); a₁..a₅ end in exactly 2, 4, 8, 16, 32 nines.
- X5: (n/3)ⁿ < n! for n = 1..11; n! < (n/2)ⁿ fails for n = 1..5 and holds for n = 6..11; 6! = 720 < 729; 2 ≤ (1 + 1/n)ⁿ < 3 for n = 1..199.
- X4: inequality checked at 8700 random (n, x) pairs.
- X6: all 339 824 instances with 2 ≤ n, m ≤ 4 and sum < mn have a balancing choice; (3,3) vs (2,2,2) with sum mn = 6 has none.

## Figures (inspected at 240 DPI, 24 Nov)

Handout: pairing and number line; Euler plot; Tomescu table; induction chain; Pascal triangle; line coloring (3 panels); Mantel (2 panels); Q_n step-condition plot; nested radical plot; horses. Solutions: X1 sphere. Problem set: L-tromino.

Fixes made during inspection: the pairing label moved off the blue arc; line-coloring cells rebuilt as half-plane intersections (the even-odd fill shaded the top region in panel (a)); `rounded corners` removed from ink rectangles (the ink decoration fails on them); plot lines and plot marks split into separate `\addplot` commands (the ink decoration fails on marks); X1 labels O and b moved off strokes. The thin horizontal edges of the Mantel graph look broken at 240 DPI; at 600 DPI they are solid, so this is resampling only.

## Answer leakage (handout standard 5b)

- No graded problem appears as an example, and no graded problem has a printed hint or solution.
- Methods that graded problems use are taught, as intended: the strengthening of Way 4 (useful for Problem 10) and the two-coloring of line regions (a step toward Challenge 15). The two-coloring example was in the handout before the set was posted.
- Quiz 1 (Monday 30 November) was compared with every handout example and none of its problems appears; the quiz stays on the private artifact until it is given.
- Solutions on `main`: extra practice X1–X6 only.

## Unchecked

- The ACPS section numbers (§1.2, §2.1–2.3, 1.2.1, 2.3.7) are from the 3rd edition table of contents as cited in the earlier handout; the ACPS PDF was not reopened for this rebuild.
- Rendering on mobile PDF viewers.

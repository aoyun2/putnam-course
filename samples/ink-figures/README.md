# Reproducible ink figures

This directory contains the initial review samples. The course handouts now use this package for reproducible figures.
Load `figure-ink` from `templates/figure-ink.sty`. No image generator, API,
Python package, or external raster texture is needed to compile them.

## Scheduled Claude workflow

1. Specify the mathematical objects numerically before drawing. Compute vector
   sums, dot products, ranks, or intersections as appropriate. Do not infer
   geometry from an illustration.
2. Copy the relevant example from `samples.tex`. Use `\InkRegion[color]{closed
   TikZ path}` for grain (use neutral `inkslate` whenever blue or multi-color
   curves cross a shaded window) and `\InkStroke[options]{TikZ path}` for solid
   outlines. Use `ink arrow` for solid vectors, `ink plot` for solid plotted curves,
   `inkdot`/`inkring` for circular plot markers, and true circular dots for all
   dotted strokes (`ink guide` / `ink guide arrow` for subtle guides/envelopes, or
   `ink dotted` for bold dotted comparison curves drawn on top of solid curves—never
   use dashes). Keep `ylabel` horizontal (`ylabel style={rotate=-90}`, or
   `at={(axis description cs:0,1.03)}, anchor=south west}` for multi-word labels).
   `\InkStroke` automatically routes arrow/axis paths (`->`, `<-`, `arrow`,
   `Stealth`, `figvec`, `figaxis`, `dagarr`, `shorten`) to single-pass `ink line`
   while decorating non-arrow paths with `ink v3`.
3. Draw all regions first, then strokes, then labels. Place native `\InkLabel{$...$}`
   directly beside curves or arrowheads rather than using leader/pointer lines; its
   0.65pt white glyph outline keeps overlaps clean. For colored entries use
   `\InkLabel[inkblue]{$...$}` individually; do not put nested `\textcolor` inside the
   halo. Keep `\figcap` to 1--2 direct sentences stating what the figure shows, without
   mannered `"X, not Y"` disclaimers.
4. For the sample, run `build.ps1` in this directory. For a course packet,
   compile twice from that packet directory using the commands below.
   Inspect the compiled figure at 240 DPI.
   Fix collisions and overfull boxes before accepting a figure.
5. Preserve the shared texture and stroke settings. Change coordinates to
   express the mathematics; do not add arbitrary organic silhouettes.

## Building a course packet

Run from the directory containing its `handout.tex`:

```powershell
$figureTemplates = Join-Path (git rev-parse --show-toplevel) 'templates'
$env:TEXINPUTS = ".;$figureTemplates;"
pdflatex -interaction=nonstopmode -halt-on-error handout.tex
pdflatex -interaction=nonstopmode -halt-on-error handout.tex
Select-String -Path handout.log -Pattern '^!|Overfull|Output written'
```

A successful build does not verify the geometry. Inspect every changed figure
at 240 DPI after checking the equations and data. Clean the packet's `.aux`,
`.log`, `.out`, and `.toc` files after checks; retain `.tex` and `.pdf`.

## Fixed rendering parameters

The grain is a 12pt vector tile with 196 stratified, jittered dots, radii
0.137–0.208pt (approx. 12.5% dot coverage) over a 5% translucent spot-color
preaction wash. Coordinates are stored directly in `templates/figure-ink.sty`.
Builds never regenerate it.

Each non-arrow `\InkStroke` uses the 100%-opaque `ink v3` rag-paper ink decoration
(`width=0.90pt`) scaled proportionally to the active `\pgflinewidth`: slight
sine/cosine + random width modulation (`~1.03x`), connected rag-paper edge tooth
marks, and white rim bites (zero alpha blur halos, zero detached specks), with the
random seed reset to `1965` per stroke. Arrow and axis paths stay crisp single-pass
`ink line` strokes with solid Stealth arrowheads (`4.6pt` long, `2.0pt` wide). Dot
styles come in two weights: `ink guide` (`0.70pt` round dots spaced `2.7pt`) and
`ink dotted` (`1.35pt` bold round dots spaced `2.8pt`). Keep the same TeX/PGF
versions for identical rendering; PDF metadata may vary between builds.

## Mathematical checks for these samples

- In the ordered basis B=(v1,v2), M(T)=[[3,2],[0,2]]. With v1=(1,0)
  and v2=(1,1), Tv1=(3,0) and Tv2=(4,2). The ochre displacement is (2,0).
- For U=span((1,0)), v=(3,2) decomposes as p=(3,0) plus (0,2).
  Their dot product is zero.
- Jordan block sizes (3,2,2,1) give dim(null(N^k))=(0,4,7,8) for k=0,1,2,3.
  There are three blocks of size at least two and two of size exactly two.

## Reference packets

All figure geometry is native TikZ, tikz-cd, or PGFPlots. These three initial
packets provide worked examples. The glyph halos preserve the current text
color by default. Each packet loads the package explicitly.

- Math 54: `2026-08-24-linear-systems-row-reduction` (3 figures).
- Math 110: `2026-10-19-generalized-eigenvectors-jordan` (5 figures).
- Math 110: `2026-11-09-adjoints-spectral-theorem` (4 figures).

In each packet directory, use the same two-pass build with the repository
`templates` directory on TEXINPUTS. These changes do not create or change
Claude's schedule; the shared source and instructions are available to its
existing scheduled workflow.

## Full packet catalog

All 88 figures in the 31 illustrated packets use the shared reproducible style.
The zero-figure CS 61A lambda packet is included for completeness.

| Course | Packet | Figures |
| --- | --- | ---: |
| cs61a | [2026-08-24-functions](../../semesters/2026-fall/cs61a/handouts/2026-08-24-functions/handout.pdf) | 2 |
| cs61a | [2026-08-31-control-higher-order](../../semesters/2026-fall/cs61a/handouts/2026-08-31-control-higher-order/handout.pdf) | 1 |
| cs61a | [2026-09-07-lambda-midterm1-review](../../semesters/2026-fall/cs61a/handouts/2026-09-07-lambda-midterm1-review/handout.pdf) | 0 |
| cs61a | [2026-09-14-recursion](../../semesters/2026-fall/cs61a/handouts/2026-09-14-recursion/handout.pdf) | 2 |
| cs61a | [2026-11-16-tables-sql-aggregation](../../semesters/2026-fall/cs61a/handouts/2026-11-16-tables-sql-aggregation/handout.pdf) | 3 |
| math110 | [2026-08-31-sets-fields-subspaces](../../semesters/2026-fall/math110/handouts/2026-08-31-sets-fields-subspaces/handout.pdf) | 3 |
| math110 | [2026-09-07-bases-dimension](../../semesters/2026-fall/math110/handouts/2026-09-07-bases-dimension/handout.pdf) | 1 |
| math110 | [2026-09-14-linear-maps-matrices](../../semesters/2026-fall/math110/handouts/2026-09-14-linear-maps-matrices/handout.pdf) | 2 |
| math110 | [2026-09-21-isomorphisms-products-quotients](../../semesters/2026-fall/math110/handouts/2026-09-21-isomorphisms-products-quotients/handout.pdf) | 2 |
| math110 | [2026-09-28-quotients-duality](../../semesters/2026-fall/math110/handouts/2026-09-28-quotients-duality/handout.pdf) | 2 |
| math110 | [2026-10-05-eigenvalues-pagerank](../../semesters/2026-fall/math110/handouts/2026-10-05-eigenvalues-pagerank/handout.pdf) | 2 |
| math110 | [2026-10-12-diagonalization-minimal-polynomial](../../semesters/2026-fall/math110/handouts/2026-10-12-diagonalization-minimal-polynomial/handout.pdf) | 3 |
| math110 | [2026-10-19-generalized-eigenvectors-jordan](../../semesters/2026-fall/math110/handouts/2026-10-19-generalized-eigenvectors-jordan/handout.pdf) | 5 |
| math110 | [2026-10-26-trace-inner-products](../../semesters/2026-fall/math110/handouts/2026-10-26-trace-inner-products/handout.pdf) | 2 |
| math110 | [2026-11-02-orthogonality-projections](../../semesters/2026-fall/math110/handouts/2026-11-02-orthogonality-projections/handout.pdf) | 3 |
| math110 | [2026-11-09-adjoints-spectral-theorem](../../semesters/2026-fall/math110/handouts/2026-11-09-adjoints-spectral-theorem/handout.pdf) | 4 |
| math110 | [2026-11-16-positive-isometries-svd](../../semesters/2026-fall/math110/handouts/2026-11-16-positive-isometries-svd/handout.pdf) | 4 |
| math54 | [2026-08-24-linear-systems-row-reduction](../../semesters/2026-fall/math54/handouts/2026-08-24-linear-systems-row-reduction/handout.pdf) | 3 |
| math54 | [2026-08-31-vectors-ax-b-solution-sets](../../semesters/2026-fall/math54/handouts/2026-08-31-vectors-ax-b-solution-sets/handout.pdf) | 3 |
| math54 | [2026-09-07-independence-linear-transformations](../../semesters/2026-fall/math54/handouts/2026-09-07-independence-linear-transformations/handout.pdf) | 2 |
| math54 | [2026-09-14-matrix-algebra-inverses](../../semesters/2026-fall/math54/handouts/2026-09-14-matrix-algebra-inverses/handout.pdf) | 2 |
| math54 | [2026-09-21-determinants-vector-spaces](../../semesters/2026-fall/math54/handouts/2026-09-21-determinants-vector-spaces/handout.pdf) | 2 |
| math54 | [2026-09-28-bases-dimension-rank](../../semesters/2026-fall/math54/handouts/2026-09-28-bases-dimension-rank/handout.pdf) | 2 |
| math54 | [2026-10-05-coordinates-eigenvalues](../../semesters/2026-fall/math54/handouts/2026-10-05-coordinates-eigenvalues/handout.pdf) | 3 |
| math54 | [2026-10-12-diagonalization-complex-eigenvalues](../../semesters/2026-fall/math54/handouts/2026-10-12-diagonalization-complex-eigenvalues/handout.pdf) | 4 |
| math54 | [2026-10-19-orthogonality-projections](../../semesters/2026-fall/math54/handouts/2026-10-19-orthogonality-projections/handout.pdf) | 4 |
| math54 | [2026-10-26-gram-schmidt-least-squares](../../semesters/2026-fall/math54/handouts/2026-10-26-gram-schmidt-least-squares/handout.pdf) | 3 |
| math54 | [2026-11-02-symmetric-svd-second-order](../../semesters/2026-fall/math54/handouts/2026-11-02-symmetric-svd-second-order/handout.pdf) | 6 |
| math54 | [2026-11-09-undetermined-coefficients-superposition](../../semesters/2026-fall/math54/handouts/2026-11-09-undetermined-coefficients-superposition/handout.pdf) | 3 |
| math54 | [2026-11-16-linear-systems-eigenvalue-method](../../semesters/2026-fall/math54/handouts/2026-11-16-linear-systems-eigenvalue-method/handout.pdf) | 2 |
| stat20 | [2026-11-16-causation-experiments](../../semesters/2026-fall/stat20/handouts/2026-11-16-causation-experiments/handout.pdf) | 2 |
| stat20 | [review-weeks-9-12](../../semesters/2026-fall/stat20/handouts/review-weeks-9-12/handout.pdf) | 6 |

---
name: course-latex
description: Author and visually audit the Olympiad and Putnam course's LaTeX handouts, problem sets, quizzes, solutions and their TikZ, tikz-cd and pgfplots figures, matching templates/handout.sty and templates/figure-ink.sty (adapted from the berkeley-latex skill in aoyun2/berkeley).
---

# Course LaTeX & Ink Figure Standard (adapted from aoyun2/berkeley)

Follow this guide whenever authoring or fixing `.tex` handouts, problem sets, quizzes, solutions, diagrams or plots in `src/`.

## 1. Reproducible spot-color ink figures

Use the approved deterministic style for all course handout figures. Load
`figure-ink` and follow [the reusable examples and build instructions](../../../samples/ink-figures/README.md).
The three initial pilot packets are worked references, not a scope restriction.

- Construct and verify mathematical relationships before styling: intersections,
  projections, vector endpoints, eigenvectors, probabilities, or combinatorial counts.
  Do not use image generation for mathematical geometry.
- Use native TikZ, tikz-cd, PGFPlots, and LaTeX tables/matrices. Apply fixed vector
  grain to meaningful filled regions and `\InkStroke` to suitable solid paths. Curves
  must follow their equations; grain must not imply a nonexistent region or subspace.
- Use `inkblue`, `inkred`, `inkgreen`, `inkamber`, and `inkslate` (the matching
  `fig*` colors are also available). Assign colors by mathematical role.
- **V3 letterpress rag-paper ink (`templates/figure-ink.sty`)**: 100% opaque ink
  (zero alpha blur halos, zero detached specks). `\InkStroke` applies the `ink v3`
  decoration scaled proportionally to `\pgflinewidth` on non-arrow paths while
  keeping arrows and axes (`->`, `<-`, `arrow`, `Stealth`, `figvec`, `figaxis`,
  `dagarr`, `shorten`) crisp single-pass `ink line` strokes; use `ink plot` for
  solid plotted curves and `inkdot` / `inkring` for true round plot markers.
- **Circular dots only — never dashes**: never use `dashed`, `densely dashed`, or
  `densely dotted` strokes, and never wrap `ink guide` inside `\InkStroke` or
  `\PacketInkPath`. Choose between two circular-dot weights by role:
  - `ink guide` (`0.70pt` round dots spaced `2.7pt`) / `ink guide arrow`: subtle
    reference lines, envelopes, asymptotes, projection/residual guides, and hidden
    back edges.
  - `ink dotted` (`1.35pt` round dots spaced `2.8pt`): bold dotted data curves
    drawn directly on top of `0.85pt` solid curves so comparison curves stay
    unmistakable over stipple or coincident segments without using dashes.
- **Stipple contrast & axis hygiene**: never place blue curves or blue dots over
  blue `inkgrain` stipple — switch shaded background windows to neutral `inkslate`
  whenever blue or multi-color curves cross them. Keep shaded rectangles flush with
  `ymin`/`ymax`. When a decaying curve settles toward zero, draw the $y=0$ axis as
  a faint solid hairline (`black!22, line width=0.35pt`) rather than dots.
- **Explicit origins, arrow clearance & 1-to-1 counts**: explicitly label origins
  (`0` or `\vv 0`); place right-angle squares away from incoming arrows and add
  `shorten >=3pt` on curved arrivals. Place curve/vector labels directly near
  their target with `\InkLabel{$...$}` (0.65pt white glyph halo) instead of leader
  ticks. In combinatorial/block figures, keep colored cell counts in exact 1-to-1
  correspondence with their displayed formula counts and omit nested dotted boxes
  or inline braces that crowd stacks.
- Keep labels separate from `\InkStroke` paths; `\InkLabel` preserves its outer
  text color by default and takes an optional color argument `\InkLabel[inkblue]{$...$}`
  for individually colored entries (nested `\textcolor` inside `\InkLabel` defeats
  the white outline). Keep `\InkRegion` opaque-backed (white preaction) for
  foreground shapes, or use transparent `ink grain=<color>` when overlapping
  translucent planes. Keep text and matrices in native Computer Modern.
- **Crisp, direct `\figcap` prose**: write 1--2 clear sentences stating directly
  what the figure shows (plus color/dot key where needed). Do not restate theorem
  proofs or use mannered `"X, not Y"`, `"rather than"`, or `"Schematic: ..."` phrasing. Use only the labels needed to identify objects inside a diagram.

## 2. Semantic Geometry & Line Textures
- **Consistent solid lines for symmetric peers**: never assign different dash/dot patterns to symmetric peer curves, planes, or unit balls. Reserve `ink guide` (delicate dots) strictly for reference lines ($y=0$, sum $=1$), envelopes, orthogonal complements, drop/projection guides, residuals, or hidden back edges, and reserve `ink dotted` (bold circular dots) for distinct comparison curves overlaid on solid curves.
- **Nested Euler diagrams for subset inclusion**: draw concentric nested rounded containers (with concrete examples in each region) when illustrating set or class containment; do not use disconnected arrow-box stacks for subset inclusion.
- **Ban circle/oval set-blob diagrams**: reserve circles/ellipses strictly for true geometric conic sections (unit circles, SVD/symmetric image ellipses, level sets, Gershgorin disks).

## 3. Commutative Diagrams (`tikz-cd`) & Matrices
- Use `\begin{tikzcd}...\end{tikzcd}` with plain math nodes, thin arrows, generous `column sep`, and `"{...}"` around any arrow label with a comma `,`.
- Put genuine `\begin{pmatrix}...\end{pmatrix}` / `\begin{bmatrix}...\end{bmatrix}` inside display math (`\begin{minipage}{Xcm}\[...\]\end{minipage}` inside a TikZ `\node`).

## 4. `pgfplots` & `tabularx` Conventions
- Always include `bar shift=0pt` on multi-series `ybar` plots.
- **Never rotate y-axis labels (`ylabel`)**: always keep `ylabel` horizontal with `ylabel style={rotate=-90}` for short math symbols (`$y$`, `$s_j$`, `$R^2$`), and `ylabel style={rotate=-90, at={(axis description cs:0,1.03)}, anchor=south west}` flush above the y-axis for multi-word or equation labels (`Probability`, `Density`, `Stack count`, `Residual ...`).
- Keep interior annotations clear of inward axis tick marks, use `axis lines*=left` with a subtle hairline or dotted $y=0$ line when curves cross zero, and use borderless legends (`draw=none,fill=none`).
- For `tabularx` code breakdown tables, use `>{\raggedright\arraybackslash}X` on the explanation column, flush `\cmidrule{1-3}` dividers, and execution order.

## 5. Build, Verification & Anti-Cutoff Audit
1. **TEXINPUTS**: Always compile with `.` first:
   - Linux: `TEXINPUTS=.:<repo>/templates//: pdflatex -interaction=nonstopmode -halt-on-error notes.tex` (twice)
2. **Anti-cutoff layout guards**: `templates/handout.sty` sets `beginpenalty=10000` on nested `[itemize,2]` / `[enumerate,2]` lists; never wrap a single lead-in item in an outer `itemize` (use `\Needspace{8\baselineskip}\noindent\textbf{...}` + flat `itemize`), always place `\Needspace{...}` *before* any colon-ended lead-in (never between a colon and code/figure), use `\\*` inside 2-line `align*` displays, and add `\Needspace{8\baselineskip}` before short `proof` blocks that can split after Step 1. Run a PyMuPDF check for zero trailing-colon or orphan-heading page breaks before committing.
3. Inspect EVERY new or modified figure at high DPI (`>= 170–240 DPI`) before committing.
4. Delete `.aux`, `.log`, `.out`, and `.toc`, and keep temporary PNGs out of the repository before committing.

## 6. Teaching structure & completeness

An Idea box should explain why the proof chooses a particular object or argument;
it should not reproduce the proof. Keep substantial computations and difficult
constructions. When several proofs are required, identify a principal proof, give
a worked application, and collect the remaining proofs as alternatives. Preserve
course coverage and references, and **never summarize an optional topic with a
rushed bullet block — either teach it completely with worked examples or omit it**. Put permitted exercise hints in a separate keyed section after the problems so the initial attempt does not reveal the method.

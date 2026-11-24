# Handout standard

Every handout, review packet, problem set, quiz, test and solutions file of this course follows this document and [the course standard](course-standard.md).

**Purpose.** Aaron uses a handout to understand the ideas well enough to rebuild every result from memory, and to solve competition problems (Putnam first, then olympiads) quickly and completely. A rule below exists only to serve that. A longer handout is not a better one.

**Origin.** This standard is adapted from the handout standard of Aaron's Berkeley handouts repository (`aoyun2/berkeley`, `standards/handout-standard.md`). When that standard changes, carry the change over here unless it concerns only a Berkeley course.

**Reference.** `standards/reference/math110-quiz-minpoly-geneig.pdf` is the model for page layout, figures, worked computations, Shortcuts and Traps. Do **not** copy its Want / Know / Key step labels; explain ideas as described under "Explaining where an idea comes from".

## 1. Scope
- **One handout per week**: only that week's topics in the syllabus schedule (`src/syllabus.tex`) and that week's problem set. Cumulative material only in unit-test and mock-contest reviews.
- **Complete coverage.** Every definition, result and worked example in the week's reading (the listed sections of P&B, ACPS, Engel and the area book, by number), standard counterexamples, and every standard technique for the week's tactic, with the tricks that speed up competition solutions. Keep the coverage checklist in `audit.md` next to the handout source, not in the handout.
- **Real problems first.** Worked examples and extra practice come from real competitions (Putnam, USAMO, IMO, IMO Shortlist, national olympiads, Tournament of Towns) and from the course books' problems, each with its source; invent problems only to fill a gap.

## 2. Organization
- Each section opens with **"The question."**: a concrete task with a small example. Good: "Is $n(n+1)(n+2)(n+3)$ ever a perfect square? Try $n = 1, 2, 3$." Bad: "How does one show that a number is not a square?"
- **Group results by the argument that proves them.** Explain and prove each central argument once. Results that follow from it come right after, each with a short explicit derivation and no repeated motivation.
- **State useful criteria explicitly**, even when they are hidden inside a theorem. Example: for subspaces U, W of V, any two of dim U + dim W = dim V, U ∩ W = {0}, U + W = V imply the third.
- **No forward references.** Never use a term, notation or result before the handout defines or proves it. A fact that needs later material goes in the later section. A cut-down handout must not point to a section that was cut. Earlier weeks may be used: name the fact and the week, and restate the part that is needed.
- Every claim is derivable from first principles: anything used is proved in the handout or listed (with its reason) from an earlier week. Deep results with outside machinery (e.g. the fundamental theorem of algebra) are marked as cited.

## 3. Explaining where an idea comes from
Write this as ordinary sentences, in whatever form makes the **choice** of argument understandable. There is no template to fill in. Use the problem-solving vocabulary of Zeitz, *The Art and Craft of Problem Solving* (orientation, get your hands dirty, penultimate step, wishful thinking, make it easier, crux move) where it names what the solver actually does. Common forms:
- **A small worked case** that shows the pattern, then one sentence saying how the general proof does the same thing.
- **The obvious first attempt**, exactly why it fails, and what change fixes it.
- **A picture** of the structure (a configuration, a table of small cases, a number line, a plot of the condition a step needs).

Rules:
- Say concretely why this subspace, polynomial, basis or index is chosen. Define the notation and display the key equation.
- Do not restate the goal, and do not paraphrase the proof that follows. When an Idea box duplicates the calculation or proof, replace it with the reason for the choice of argument or integrate it into the proof.
- If several proofs must be covered, choose a principal proof and follow it with a worked application. Collect alternative proofs afterward with their distinct purpose stated, preserving required coverage.
- Length matches difficulty. A routine check ("unwind the definition of subspace") needs one sentence or nothing; a real idea gets a paragraph or a worked example. If the idea is obvious, leave the box out.

- **Guide the discovery; leave no gap for the reader to fill.** For each step that is not a routine check, say what question the step answers, what could go wrong, and why it does not. If a reader would have to stop and ask "why is that true?" or "what is this saying?", the answer belongs in the text at that point. Order the explanation the way someone would find the proof: the question first, then the attempt, then the obstacle, then the fix.

Example of the required level of detail (independence in the Jordan chain construction). Not acceptable: "Extend the bottoms to a basis of null N; the new list is independent." Required: "The bottoms of the chains already lie in null N, and they span L = null N ∩ range N. We add vectors w_1, …, w_p so that bottoms plus the w's are a basis of null N. Why can a w_i not be a combination of chain vectors? Suppose a combination of the w's equals a combination of chain vectors. Apply N: the w's go to 0, so the chain part goes to 0, which forces it to be a combination of bottoms only (shown in step 3). Then the w's and the bottoms would be dependent, contradicting that together they are a basis of null N."

Bad (rejected): "*Want.* Decide whether the available eigenspaces provide a full basis. *Know.* Eigenvectors with distinct eigenvalues are independent. *Key step.* Group a relation by eigenvalue." This fills in labels and explains nothing.

Good: "One vector is easy: v, Tv, …, Tⁿv are n + 1 vectors in an n-dimensional space, so q(T)v = 0 for some q of degree ≤ n. The problem is that q(T) may not be 0 on other vectors. So collect every vector q(T) sends to 0 into U = null q(T). A polynomial p that is 0 for the quotient T/U sends every vector into U, and a polynomial r that is 0 on U then sends it to 0. So r(T)p(T) = 0, and its degree is at most dim U + dim V/U = n."

### Proof steps are full sentences
Every proof step states what is being assumed, what is being shown, and the reason, in complete sentences. No noun-phrase shorthand that the reader has to decode ("Existence is spanning", "Same argument", "the other inclusion is clear", "swap the roles"). When a proof has two directions, each direction opens with its assumption in bold ("Assume the list is a basis.") and labels each sub-goal ("The list spans V."). When a step uses an earlier argument, name the exact result and state how its assumptions apply here. Repeat the computation only when the new case changes it or the repetition serves an explicit practice objective.

## 4. Writing
- Write natural, direct explanatory sentences with ordinary words and literal statements. Prioritize **intuition and motivation** directly: explain why an object is defined this way or how someone would discover the proof, without filler.
- **No mannered, clipped, or aphoristic slogans**: never write telegraphic semicolon fragments or textbook aphorisms (e.g., `"One pipeline per interval; each function adds one step."`, `"Listing them is hopeless; counting them is a short function."`).
- **No exclamation marks (`!`), no contractions, no chatty banter, and no rhetorical `Why?` / `How?` filler prompts** inside prose (state the reason or mechanism directly).
- **No inline wall-of-text lists**: never pack `(i) ... (ii) ...` or `(1) ... (2) ...` with multi-sentence clauses into one paragraph. Put two or more structured points in a proper `\begin{itemize}` or `\begin{enumerate}` block.
- No metaphors ("kills", "dies", "survives", "machinery", "bridge", "shadow"). A shorthand is allowed only if defined once in plain words (e.g. "q kills T means q(T) = 0").
- Never hide an argument behind a name: not "by invariance", "by degree", "by an adapted basis", "repeat the argument". Say which subspace, degree or basis, and show the step.
- Show intermediate computations: the matrix, the multiplication, the equations solved.
- Say what an equation does **not** prove when that is a common mistake, with a counterexample.
- No irrelevant provenance ("whose analytic input was the extreme-value theorem"). Cite only what a step uses.
- Edge cases (V = {0}, empty lists) at most one line, and only if an exam could ask.
- Examples use small, clean numbers.
- **Scope discipline**: never insert rushed bullet summaries of optional topics—either teach an optional application thoroughly with motivation, derivation, and worked examples, or omit it completely.
- No intro or overview paragraph, no "how to use this handout", no meta sections.

### Clarity without loss of detail

- Preserve hypotheses, definitions, nonroutine reasoning, intermediate computations, examples, exceptions, and required source coverage. Do not shorten to meet a word-count target.
- Give each paragraph one purpose. Put a reason beside the equation or code step it explains; split paragraphs that mix a claim, proof, interpretation, and several caveats.
- Remove repeated conclusions and procedural narration. Motivation must explain a choice, not summarize the proof a second time.
- Keep a main reading sequence and label alternative proofs or extensions by their purpose. Required material remains visible and available.
- During editing, compare a before/after coverage list. Record any removed substantive content and its justification in the audit; a shorter page is not itself evidence of improvement.

## 5. Page elements (all in `templates/handout.sty`)
- **Statement** in a theorem box, labelled with its source and number ("P&B Example 1.2.3", "Engel 8.1", "USAMO 2003/1") and a descriptive name.
- **The idea** (`ideabox`, free text) before the proof, when the proof has a real idea (Section 3).
- **Proof** as numbered steps (`steps`), each stating its claim and reason. Use the space a nonroutine derivation needs; do not compress it to a fixed line count. A proof with parts: give each part a name that says what it proves and one line saying how the parts connect; never bare "Lemma"/"Theorem" in running text.
- **Examples** in example boxes, with the computation shown.
- **Figures** (`fig`, TikZ/pgfplots): compact, placed next to the mathematics they illustrate, drawing a concrete, numerically verified example with a short caption saying what to see. Follow `standards/reference/math110-quiz-minpoly-geneig.pdf` (the interpolation plot and nilpotent chain diagram):
  - **Reproducible V3 spot-color ink style:** Use `templates/figure-ink.sty` for fixed vector grain, 100%-opaque `ink v3` rag-paper ink strokes (with single-pass vector arrows/axes), `ink plot` curves, true round `inkdot`/`inkring` markers, and tight white glyph halos. Native TikZ/PGFPlots geometry must satisfy the stated equations; do not use generated raster drawings for mathematical figures. Use the shared blue/red/green/amber/slate palette to distinguish mathematical roles, not for decoration. See `samples/ink-figures/README.md` and the repository LaTeX skill for exact commands.
  - **Labels, origins & geometry:** Keep labels and matrices in native Computer Modern. Label origins explicitly (`0` / `\vv 0`), place right-angle squares clear of incoming arrows (`shorten >=3pt` on curved arrivals), use `\InkLabel{$...$}` directly beside features instead of pointer ticks (`\InkLabel[color]{$...$}` per colored entry), explain whether shading denotes a region, a grouping, or a finite patch of an unbounded space, and keep shaded `inkgrain` windows neutral (`inkslate`) whenever blue or multicolor curves pass across them. Keep colored cell counts in combinatorial diagrams 1-to-1 with their formulas without cluttering nested boxes. Do not distort geometry to imitate handwriting.
  - **Circular dots only & zero collisions**: never use `dashed`, `densely dashed`, or `densely dotted` strokes. Symmetric peer curves/planes/balls use uniform **solid** lines; reserve `ink guide` (delicate circular dots) strictly for reference lines, envelopes, asymptotes, projection/drop guides, residuals, or hidden back edges, and use `ink dotted` (`1.35pt` bold circular dots) drawn on top of solid curves when a dotted comparison curve overlaps a solid curve or shaded region (and a faint solid hairline `black!22` for $y=0$ when decaying curves settle toward zero). Place labels in open whitespace away from inward axis ticks.
  - Follow [`.claude/skills/course-latex/SKILL.md`](../.claude/skills/course-latex/SKILL.md) for all TikZ, `tikz-cd`, and `pgfplots` figures.
  - **No side bullet-list walls**: never pack walls of bullet text inside TikZ figures (put explanations in `\figcap` or crisp 1–2 line legends), and avoid confusing shorthand such as bare `\bigcup`.
  - **Use `\begin{tikzcd}` for commutative diagrams** (`templates/handout.sty` loads `tikz-cd`): use plain math nodes, thin arrows, generous `column sep`, and `"{...}"` inner braces around any arrow label containing a comma.
  - **Strict 4-layer order for overlapping disks/regions**: draw ALL faint fills first (`fill opacity=0.06`–`0.08`), then axes/origin, then outlines & dotted radii/vectors, then ALL labels last (with `\InkLabel` where needed). Choose concrete numerical values so distinct points, centers, disks, and eigenvalues are clearly visually separated.
  - **Multi-series `ybar` plots (`bar shift=0pt`)**: in `pgfplots`, whenever a `ybar` axis has more than one `\addplot` series (e.g., non-tail bars vs.\ highlighted tail bars), always include `bar shift=0pt` in the `axis` options so `pgfplots` does not shift series 1 left and series 2 right off their true coordinates. For function and ODE plots, use bottom/left axes (`axis lines*=left` with horizontal `ylabel`, plus a dotted `ink guide` or faint solid $y=0$ reference line when curves cross zero) and borderless transparent legends (`draw=none,fill=none`).
  - **Genuine LaTeX matrices in figures**: never hand-draw TikZ bracket lines around manually positioned entries, and never draw background TikZ rectangles behind matrix entries using guessed coordinates. Put genuine `\begin{pmatrix}...\end{pmatrix}` / `\begin{bmatrix}...\end{bmatrix}` inside display math (`\begin{minipage}{Xcm}\[...\]\end{minipage}` inside a TikZ `\node`) and highlight pivot columns or rows directly with `\textcolor{figblue}{\mathbf{...}}`.
  - **Piece-by-piece `tabularx` code breakdown tables**: always declare the description column as `>{\raggedright\arraybackslash}X` (never bare full-justified `X`, which stretches inter-word gaps around inline `\cd{...}` code), separate multi-line rows with `\cmidrule(lr){1-3}`, and order rows in execution order.
  - Visually inspect every new or modified figure in rendered high-res (`240 dpi`) tight-crop PNG zoom sheets before committing.
  - When running `pdflatex` inside a week folder, always put `.` first in `TEXINPUTS` (`TEXINPUTS=.:<repo>/templates//:` on Linux) so a template never shadows the week's own file. Delete `.aux`, `.log`, `.out`, and `.toc` before committing.
- **Shortcuts** box where useful: include a time-saving method with its reason, conditions and a worked instance; omit an empty or repetitive box.
- **Traps** box where useful: a relevant common wrong claim with a counterexample; do not invent one merely to fill a section.
- **Problem set** at the end: the week's graded set (the same problems, in the same order, as `weekNN/pset.pdf` on Classroom), then extra practice from real competitions. Graded problems get no printed hints, because a hint on a graded problem is given only on request and costs points (syllabus, Rules). Put hints for the extra practice in a separate keyed section after all questions, preserving problem labels and references. Include unaided practice that requires selecting a method; do not give the method away beside every prompt.
- **Solutions** in a separate PDF (`weekNN/solutions.pdf`): explain the choice of argument when it needs explanation, then give the reasoning in numbered steps. Do not add a repetitive Idea line. It contains the extra practice when the week is released; solutions to the graded set are added only after that set has been graded (section 5b).
- **Layout and anti-cutoff guards.** Nothing split across pages (`templates/handout.sty` applies `\Needspace{14\baselineskip}` on theorem/prop/lemma/corollary environments and `beginpenalty=10000` on nested `[itemize,2]`/`[enumerate,2]` lists; keep boxes `nobreak`, headings with what follows, problems and solutions in `prob`). Never wrap a single heading item inside an outer `itemize`; place `\Needspace{...}` *before* any colon-ended lead-in paragraph (never between the colon and its code listing/figure); use `\\*` inside 2-line `align*` displays; guard short `proof` starts with `\Needspace{8\baselineskip}`; and run a PDF page-break check for zero trailing-colon or orphan-heading splits. Avoid big blank gaps and never shrink type to fit.

## 5b. Graded work and the course rules
The handouts exist so Aaron can do the graded work himself. The course rules are in the syllabus (`src/syllabus.tex`, Rules):
- Aaron does not read a published solution of an assigned problem until his work on it has been graded. So a solution, partial solution or problem-specific hint for a graded problem (problem set, quiz, unit test, mock contest) is never published, printed in a handout, or sent before that work has been graded.
- Quizzes, unit tests and mock contests stay private (on the course's private artifact) until they are given; their PDFs go on the site afterwards.
- Worked examples in the notes never use a problem from the current graded set, quiz or test.
- Extra practice is not graded, so its hints and solutions are published with the handout.

## 6. Checks before sending
1. Verify every number and answer by computation (sympy, or a short script for small cases and counterexamples).
2. Render every page and look at it: intact boxes, readable labels, no overfull lines, no large gaps.
3. One fresh review pass against the sources and this standard: (a) correctness and coverage, (b) teaching quality: quote each passage where a reader would have to fill a gap, and fix it.
4. Record the revision and validation evidence in the packet audit (`src/weekNN/audit.md`). Commit within the requested scope; pushing or publishing follows Aaron's authorization and the course schedule, not an automatic requirement of this standard.


### Page-by-page visual review (required before sending)
A low-resolution montage only catches gross layout problems. Before sending, render every page of the handout and the solutions at 80 dpi or more (two pages side by side is fine) and look at each page for:
- elements touching or overlapping: matrix brackets in table rows, figure labels on lines or on each other, arrows through text;
- matrices larger than a single column vector, or any $3\times3$ or larger matrix, set inline in a sentence: put them in a display;
- a run-in heading (bold "Example." / "Consequences." / "Three warnings.") or a section title left alone at the bottom of a page: add `\Needspace`;
- a step list or box split so that its first line is alone on one page;
- text running into the margin, or a line stretched with large gaps;
- wording that breaks the writing rules (metaphors such as "kills", "socks and shoes").
Fix everything found, rebuild, and look at the changed pages again.

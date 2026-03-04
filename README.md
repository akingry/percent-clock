# Percent Clock Math (Discrete Reciprocal -> Singularity)

This project is built around a simple discrete reciprocal function:

- **Discrete points:** \((p, I)\)
- **Rule:**

\[
I = \frac{1}{n - p}
\]

For the clock idea, we use **\(n = 24\)** (24 intervals) and step **\(p\)** through:

\[
p \in \{0, 1, 2, \dots, 23\}
\]

As \(p\) increases toward \(n\), the denominator \((n - p)\) shrinks toward zero, and \(I\) spikes upward. This is the hallmark of a **rectangular hyperbola** approaching a **vertical asymptote**.

## Continuous form (the curve being sampled)
The discrete sequence is a sampled slice of the continuous curve:

\[
y = \frac{1}{24 - x}
\]

- Vertical asymptote at \(x = 24\)
- Hyperbolic blow‑up as \(x \to 24^-\)

## Hyperbolic identity form
The same relationship can be written as:

\[
I\,(24 - p) = 1
\]

This makes the “singularity” explicit: the product must remain 1, so as \((24 - p)\) becomes small, \(I\) must become large.

## Exponential approximation (useful but not exact)
A true exponential does **not** equal a hyperbola, but you can match the endpoints (\(p=0\) and \(p=23\)) to get a rough exponential-shaped approximation:

\[
I \approx \frac{1}{24}\,24^{\,p/23}
\]

Equivalently:

\[
I \approx \frac{1}{24}\,e^{\,(\ln 24/23)\,p}
\]

This approximation **underestimates** the true values in the middle/end because a hyperbola accelerates into a vertical asymptote in a way a single exponential cannot.

## “Consuming a resource” -> singularity
This function is a toy model of what happens when a **finite resource** is consumed:

- Think of \((n - p)\) as “resource remaining”.
- Each step reduces what’s left.
- The *cost/pressure/urgency* modeled by \(I\) rises as remaining resource shrinks.

The key insight is endgame dominance:

- Early steps feel mild because \((n-p)\) is large.
- Late steps dominate because \((n-p)\) becomes small.
- The approach to the boundary \(p \to n\) creates a **hyperbolic blow‑up**, i.e. a **singularity-like spike**.

In plain terms: **the closer you get to exhausting the remaining degrees of freedom, the faster the “intensity” rises.**

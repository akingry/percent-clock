# Percent Clock Math (Discrete Reciprocal -> Singularity)

This project is built around a simple discrete reciprocal sequence.

## Discrete rule
We plot discrete points (p, I) where:

- I = 1 / (n - p)
- n = 24
- p in {0, 1, 2, ..., 23}

As p increases toward n, the denominator (n - p) shrinks toward zero, so I shoots upward. That “spike” is the discrete version of a vertical asymptote.

## Continuous curve being sampled
The discrete sequence is a sampled slice of the continuous curve:

- y = 1 / (24 - x)

This is a rectangular hyperbola with:

- vertical asymptote at x = 24
- hyperbolic blow-up as x -> 24 from the left

## Hyperbolic identity form
The same relationship can be written as:

- I * (24 - p) = 1

This makes the “singularity” explicit: the product must stay 1, so as (24 - p) becomes small, I must become large.

## Exponential approximation (useful but not exact)
A true exponential does not equal a hyperbola, but you can fit an exponential-shaped approximation by matching endpoints at p = 0 and p = 23:

- I ≈ (1/24) * 24^(p/23)

Equivalently:

- I ≈ (1/24) * e^((ln 24 / 23) * p)

This approximation underestimates the true values in the middle/end because 1/(n - p) accelerates into a vertical asymptote in a way a single exponential cannot.

## “Consuming a resource” -> singularity
Think of (n - p) as “resource remaining”. Each step consumes one unit. If I represents cost/pressure/urgency, then:

- early steps feel mild because (n - p) is large
- late steps dominate because (n - p) becomes small
- as remaining resource approaches zero, the intensity rises hyperbolically

Plain-language takeaway:

A finite resource being consumed can produce a singularity-like endgame where the last few steps contain most of the drama.

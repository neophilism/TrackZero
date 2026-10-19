# TZ-14 reward price and preview slice

The bounded default ladder computes the integer ceiling of `base × (1 + gentle_growth × tier) × exp(acceleration × tier²)` with rational lower and upper bounds. It uses BigInt to avoid floating-point overflow and refuses an inconclusive interval. Artist-specific offer snapshots display exact cost, balance, availability and version without claiming that a preview reserves stock or performs redemption. Local Node 24 tests cover base/linear ceilings, exponential growth, invalid configurations, large integers, cross-artist denial and escaped text.

The DRE-17 issuer, creator configuration authority, actual wallet and inventory providers, long-tail economic simulations and atomic redemption remain unintegrated. This UI cannot assert real availability or points; product tests are not in repository CI.

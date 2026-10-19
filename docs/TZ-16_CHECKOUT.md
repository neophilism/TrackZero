# TZ-16 complete-album checkout boundary

This scoped HTTP boundary authenticates listener identity, checks a versioned complete-album offer, requires an idempotency key and forwards a minimal request to an injected commerce provider. It never accepts client price, card data or payout instructions. Receipt lookup is bound to the authenticated user; no local entitlement is granted. Three local Node 24 tests cover valid pending checkout, offer/origin/role/body denials and receipt mismatch.

DRE-24 commerce/settlement, trusted identity and offers, provider-side idempotency/transaction handling, tax/currency/refunds, payout account approval, browser checkout and end-to-end tests are not integrated. No charge, purchase right or artist payout is claimed.

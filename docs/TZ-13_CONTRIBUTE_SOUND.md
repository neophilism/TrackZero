# TZ-13 Contribute Sound consent and evidence UI

This opt-in control asks for microphone access only after an explicit action, stops capture on disable, interruption or an unsupported route, and presents conservative route status from a trusted provider. The UI states that headphones, inactive/unsupported routes and consent alone earn no speaker points. It does not calculate acoustic energy, issue points or upload raw microphone data. Local Node 24 tests cover consent, denial, inactive/headphone/self-declared routes, late permission resolution and disclosure.

Actual DRE-13 evidence policy, calibrated native output observations, local acoustic processing, complete-broadcast vesting, browser/device permission behavior and field safety thresholds are not integrated or verified. Product tests are not in repository CI.

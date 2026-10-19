# TZ-15 live points display slice

The current model consumes trusted issuer events, keeps artist-specific provisional and spendable balances separate, requires the issuer to report a completed outro before displaying vesting, and rejects replayed or impossible transitions. Interrupted occurrences forfeit provisional display. It does not measure output, calculate points, vest, debit or grant rewards locally. Four Node 24 tests cover outro, interruption/replay, cross-artist isolation and conservative rendering.

The DRE-18 authenticated event stream, actual headphone/speaker qualification, outro marker, atomic redemption, wallet reconciliation, interruption/device tests and production CI remain unintegrated. No live points or rewards have been verified.

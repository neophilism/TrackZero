# TZ-10 guest web player and album pages

The current implementation renders public station and complete-album metadata and provides an explicit-play live-session controller. It deliberately has no song picker, skip, on-demand playback, media URL, playback token or private manifest in server-rendered HTML. The playback adapter must be supplied by an authenticated Distributed Radio Engine endpoint that preserves endpoint-encrypted media.

Local Node 24 tests cover HTML escaping and restrictive CSP, hostile artwork, missing metadata, provider outage, explicit playback, stop during delayed join, and adapter failure. These tests have not yet run in repository CI. No real DRE-11 stream, purchase, native browser/media experiment or field continuity has been verified. TZ-09 and DRE-11 remain integration dependencies.

# TZ-10 guest web player and album pages

The current implementation renders public station and complete-album metadata and provides an explicit-play live-session controller plus accessible control binding. It deliberately has no song picker, skip, on-demand playback, media URL, playback token or private manifest in server-rendered HTML. The host application must supply an authenticated Distributed Radio Engine adapter, bind the controls, and preserve endpoint-encrypted media.

Local Node 24 tests cover HTML escaping and restrictive CSP, hostile artwork, missing metadata, provider outage, explicit playback, stop during delayed join, adapter failure and accessible control binding. These tests have not yet run in repository CI. No real DRE-11 stream, purchase, native browser/media experiment or field continuity has been verified. TZ-09 and DRE-11 remain integration dependencies.

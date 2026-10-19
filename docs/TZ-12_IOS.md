# TZ-12 iOS listening slice

The SwiftUI view and model provide explicit live play/stop, an accessible state label, station-ID validation and cancellation of stale joins. The engine/session protocols require an injected DAE-10 endpoint-encrypted playback adapter; no raw media URL, song picker or seek API is present. XCTest source covers start/stop, malformed station IDs and interrupted joins.

The isolated runtime has no Swift compiler or iOS SDK, so the tests and native build could not run here. The real DAE-10 native SDK, DRE stream/catalog, background audio and media controls, route changes, device and battery validation remain unintegrated. This source is not evidence of working iOS playback.

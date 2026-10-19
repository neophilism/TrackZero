# TZ-11 Android listening slice

This native Activity and controller expose explicit play/stop, accessibility status, fail-closed adapter absence, and late-join cancellation. The controller accepts only a live station ID and an injected DAE/DRE endpoint-encrypted session adapter; it has no raw URL, track selection, seek, contribution or reward interface. Java unit tests cover start/stop, interruption and delayed join.

The isolated runtime has no JDK, Gradle or Android SDK, so these Java tests and Android compilation could not be executed here. The real DAE-09 native SDK, DRE live station catalog, Android media foreground service, route changes, background playback, permissions, device and battery tests remain unintegrated. Do not treat this shell as a working listener or field evidence.

import XCTest
@testable import TrackZero

private final class FakeSession: LiveRadioSession {
    var starts = 0
    var closes = 0
    func start() async throws { starts += 1 }
    func close() async { closes += 1 }
}
private struct FakeEngine: LiveRadioEngine {
    let join: (String) async throws -> any LiveRadioSession
    func joinLive(stationId: String) async throws -> any LiveRadioSession {
        try await join(stationId)
    }
}

@MainActor final class LiveRadioModelTests: XCTestCase {
    func testExplicitStartAndStop() async {
        let session = FakeSession()
        let model = LiveRadioModel(engine: FakeEngine(join: { _ in session }))
        XCTAssertEqual(model.state, .stopped)
        model.play(stationId: "s1")
        await Task.yield()
        await Task.yield()
        XCTAssertEqual(model.state, .playing)
        model.stop()
        await Task.yield()
        XCTAssertEqual(model.state, .stopped)
        XCTAssertEqual(session.starts, 1)
        XCTAssertEqual(session.closes, 1)
    }
    func testInvalidStationDoesNotJoin() async {
        var joins = 0
        let model = LiveRadioModel(engine: FakeEngine(join: { _ in
            joins += 1; return FakeSession()
        }))
        model.play(stationId: "../other")
        XCTAssertEqual(model.state, .interrupted)
        XCTAssertEqual(joins, 0)
    }
    func testInterruptedJoinDoesNotClaimPlayback() async {
        enum Offline: Error { case unavailable }
        let model = LiveRadioModel(engine: FakeEngine(join: { _ in throw Offline.unavailable }))
        model.play(stationId: "s1")
        await Task.yield()
        XCTAssertNotEqual(model.state, .playing)
    }
}

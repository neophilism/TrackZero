package org.trackzero.listener;

import org.junit.Test;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.atomic.AtomicInteger;
import static org.junit.Assert.*;

public final class RadioControllerTest {
    private static final class FakeSession implements RadioController.Session {
        int starts, closes;
        public void start() { starts++; }
        public void close() { closes++; }
    }
    @Test public void explicitPlayAndStop() {
        FakeSession session = new FakeSession();
        List<RadioController.State> events = new ArrayList<>();
        RadioController controller = new RadioController(id -> CompletableFuture.completedFuture(session), events::add);
        assertEquals(RadioController.State.STOPPED, controller.state());
        controller.play("station-1");
        assertEquals(RadioController.State.PLAYING, controller.state());
        assertEquals(1, session.starts);
        controller.stop();
        assertEquals(1, session.closes);
        assertEquals(RadioController.State.STOPPED, controller.state());
    }
    @Test public void stopBeforeJoinPreventsLatePlayback() {
        CompletableFuture<RadioController.Session> future = new CompletableFuture<>();
        RadioController controller = new RadioController(id -> future, state -> {});
        controller.play("station-1");controller.stop();
        FakeSession late = new FakeSession();future.complete(late);
        assertEquals(0, late.starts);assertEquals(1, late.closes);
    }
    @Test public void rejectedStationAndFailedJoin() {
        AtomicInteger joins = new AtomicInteger();
        RadioController controller = new RadioController(id -> {joins.incrementAndGet();
            CompletableFuture<RadioController.Session> failed = new CompletableFuture<>();
            failed.completeExceptionally(new IllegalStateException("network"));return failed;
        }, state -> {});
        try { controller.play("../other"); fail("invalid ID accepted"); }
        catch (IllegalArgumentException expected) { assertEquals(0, joins.get()); }
        controller.play("s1");
        assertEquals(RadioController.State.INTERRUPTED, controller.state());
    }
}

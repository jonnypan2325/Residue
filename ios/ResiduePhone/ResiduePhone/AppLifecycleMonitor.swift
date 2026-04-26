//
//  AppLifecycleMonitor.swift
//  ResiduePhone
//
//  Watches `UIApplication`'s active/inactive transitions and emits
//  `(opened, closed)` pairs that the `SessionStore` translates into
//  the user-visible "Phone unlocks" / "Time on phone" metrics during
//  a desktop study session.
//
//  Why active/inactive (and not the protected-data notifications the
//  earlier draft used)?
//
//    `UIApplication.willResignActiveNotification`
//        → fires the moment the user *stops* engaging with Residue:
//          locking the device, swiping to home, opening another app,
//          pulling down Notification Center, taking a phone call, etc.
//          For our purposes, every one of those is "user is no longer
//          studying — they're on the phone." That's the start of a
//          distraction segment.
//
//    `UIApplication.didBecomeActiveNotification`
//        → fires when the user comes back to Residue. That's the end
//          of the distraction segment; the difference between the two
//          timestamps is the duration we add to `totalDistractionMs`.
//
//  Compared to `protectedDataDidBecomeAvailableNotification` /
//  `protectedDataWillBecomeUnavailableNotification` (which only fire
//  on actual device lock/unlock, and only when a passcode is set),
//  active/inactive fires reliably across:
//    - app-switcher returns
//    - background → foreground transitions for any reason
//    - lock screen lock and unlock
//  …which is exactly the set of "user picked up phone" events we want
//  to count.
//

import Foundation
import UIKit

final class AppLifecycleMonitor {
    enum Event {
        /// User just left Residue (app went inactive). This marks the
        /// *start* of a phone-distraction segment — the SessionStore
        /// increments `openCount` and stamps `lastOpenedAt`.
        case opened(Date)
        /// User just returned to Residue. `durationMs` is how long
        /// they were away (i.e. on the phone but not on Residue).
        case closed(durationMs: Double, at: Date)
    }

    private let handler: (Event) -> Void
    private var lastResignAt: Date?
    private var observers: [NSObjectProtocol] = []

    init(handler: @escaping (Event) -> Void) {
        self.handler = handler
    }

    func start() {
        let nc = NotificationCenter.default

        // willResignActive → user is leaving Residue right now. Treat
        // this as the start of a distraction segment.
        observers.append(
            nc.addObserver(
                forName: UIApplication.willResignActiveNotification,
                object: nil,
                queue: .main
            ) { [weak self] _ in
                let now = Date()
                self?.lastResignAt = now
                self?.handler(.opened(now))
            }
        )

        // didBecomeActive → user is back on Residue. Close out the
        // segment that was started by willResignActive. The very
        // first didBecomeActive after launch has no matching resign
        // (the app just came up); skip it so we don't book-keep a
        // bogus zero-length distraction.
        observers.append(
            nc.addObserver(
                forName: UIApplication.didBecomeActiveNotification,
                object: nil,
                queue: .main
            ) { [weak self] _ in
                guard let self else { return }
                guard let resignAt = self.lastResignAt else { return }
                let now = Date()
                let duration = now.timeIntervalSince(resignAt) * 1000
                self.lastResignAt = nil
                self.handler(.closed(durationMs: duration, at: now))
            }
        )
    }

    func stop() {
        observers.forEach { NotificationCenter.default.removeObserver($0) }
        observers.removeAll()
        lastResignAt = nil
    }
}

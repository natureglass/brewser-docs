# Open Questions & Decisions

This file collects two things surfaced during Phase 0 investigation:

- **DECISION NEEDED** — judgment calls that are the maintainer's to make (policy, trust
  wording, how to reconcile conflicts). New pages draft these with a visible
  `> DECISION NEEDED:` blockquote; nothing is presented as settled fact until you confirm.
- **TODO(verify)** — facts that could not be confirmed in source and are marked inline in
  pages as `<!-- TODO(verify): ... -->`.

Everything here is grounded in a read of `brewser-runtime`, `nxjs-extended`, the `brewser`
WordPress plugin + staging scanner, and the real app bundles. Citations live in the Phase 0
notes; the most load-bearing ones are repeated below.

---

## A. Conflicts between the **live published docs** and the **runtime source**

These are the highest-priority items. Several existing pages state things the runtime source
contradicts. I did **not** edit those existing pages (out of scope for this task), but new
pages must not repeat unverified claims — so I need your call on how to reconcile.

### A1. Hardware APIs — RESOLVED (option c)
> **RESOLVED (2026-08-13).** The maintainer confirmed **WebSerial, Web MIDI, WebHID and Web NFC are
> all now implemented**, alongside WebUSB and Web Bluetooth. The runtime snapshot the Phase 0
> investigation read was **stale**, so the existing `hardware-apis.mdx` / `index.mdx` /
> `web-platform.mdx` are **correct** and need no correction. The new pages deliberately did not
> claim any hardware API was absent, so they're already consistent. No action required.

### A2. Hardware permission picker — RESOLVED
> **RESOLVED (2026-08-13).** The maintainer confirmed the **hardware permission picker is active and
> working**. The stale-snapshot finding ("no device-picker UI") was wrong. The existing
> `hardware-apis.mdx` description of a system picker is correct; no new page needs changing.

### A3. `accounts.mdx` privacy claim — RESOLVED (corrected)
> **RESOLVED (2026-08-13).** Per the maintainer, `accounts.mdx` was **corrected**: it no longer
> claims "only a salted hash … not your email address in plain form." It now states that Brewser
> stores your Google account identifier (and, for publishers, your email + display name) and links
> to **Privacy & Your Data**, which matches the plugin schema. The Privacy page's reconciliation
> note was removed accordingly.

### A4. "Video codec support is limited" understates reality
`limitations.mdx` has `{/* TODO: document exact codec/decoder status */}`. Verified: the codec
**coverage is broad** (H.264, H.265, VP8, VP9, AV1, MPEG-1/2/4, VC-1, Theora, VVC on the video
side; MP3/AAC/Vorbis/Opus/FLAC/PCM + more on audio; HLS works). The real constraint is
**performance** — decoding is entirely in software (hardware NVTEGRA paths are compiled but not
engaged), so 1080p / VP9 / AV1 are perf-limited. The new **Audio & Media** page documents this
accurately; no decision needed, but it changes the framing from "limited" to "broad but
software-decoded." Flagging so you're aware the new page will read differently from the current
limitations bullet.

---

## B. Policy & trust decisions (the task explicitly reserves these for you)

### B1. Ban-risk wording (FAQ)
> **DECISION NEEDED.** The FAQ must address "can I get banned running this online on CFW?" I will
> draft the community-standard answer: **online connectivity on custom firmware carries a real,
> non-zero ban risk to your Nintendo account / console; the safest posture is emuMMC and/or
> blocking Nintendo's servers (e.g. 90DNS), and you accept that risk yourself.** Brewser needs a
> network connection for the catalogue and for accounts/saves/leaderboards, so this trade-off is
> unavoidable for online features. **Confirm the exact risk posture you want stated**, and whether
> Brewser should recommend a specific mitigation (90DNS / emuNAND) or stay neutral and link the NH
> Switch Guide. Draft will be conservative (warn clearly, recommend emuMMC, don't promise safety).

### B2. Offline-only positioning
> **DECISION NEEDED.** Given B1, do you want to document an **offline mode** stance — i.e. "most
> apps are fully self-contained and run with networking off; the catalogue/accounts need network,
> but you can browse/download over Wi-Fi then play offline"? The app matrix supports this (most
> apps make zero network calls). Confirm if you want this framed as the recommended safe path.

### B3. Content & Submission Policy specifics
> **DECISION NEEDED.** I'll draft the rejected-content list from `submission_info.md` + the
> scanner rules (ROMs, keys, copyrighted/Nintendo assets, NSFW, obfuscated code, undisclosed
> telemetry, impersonation). Confirm any additions/removals, and whether NSFW is a hard reject or
> an Experimental-channel-with-warnings case.

### B4. Privacy retention & deletion commitments (GDPR)
> **DECISION NEEDED.** I can document *what is stored* and *what deletion mechanisms exist today*
> (per-resource DELETE endpoints: `/save` DELETE, `/leaderboard` DELETE own row, idea delete,
> submission delete; uninstall drops saves/leaderboards/favorites/ratings/ideas). What I **cannot**
> verify is: a formal **retention period**, a **"delete my whole account"** path, and a
> **data-subject contact** for GDPR requests. These are commitments only you can make. Please
> provide (or approve drafting as "contact <email> to request deletion; we honor requests within
> 30 days" — placeholder pending your confirmation).

### B5. Emulator stance (nice-to-have page #17)
> **DECISION NEEDED.** Should the docs include a **"Developing on an Emulator"** page? Ground
> truth: Brewser runs on Citron/Ryujinx-class emulators for UI/dev, **but networking (TCP
> sockets/internet) does not work under the emulator used here (Citron)** and GL rendering diverges
> from real hardware. So an emulator is useful for layout/logic iteration but cannot test
> networking, accounts/saves, or trust graphics/perf. **Approve or decline this page, and confirm
> the stance** (I recommend: "Chrome is your primary loop; an emulator is a secondary check for
> Switch-specific UI/input; real hardware is the only source of truth for networking, graphics,
> and performance").

### B6. Security disclosure contact (nice-to-have page #18)
> **DECISION NEEDED.** A responsible-disclosure page needs a **contact** (email / form) and a
> policy (scope, safe-harbor, response time). No such contact exists in the repos. Provide one, or
> I'll draft with a `<!-- TODO(verify) -->` placeholder contact.

### B7. Legal & Attributions — license-text reproduction
> **DECISION NEEDED (scope).** The runtime statically links many native libraries (V8, Skia,
> Mesa, FFmpeg, FreeType, HarfBuzz, Mbed TLS, dav1d, etc.) whose **full license texts are not
> present in the repos** (they come from devkitPro portlibs). MIT/BSD/etc. require reproducing the
> copyright + permission notice. I can (a) publish an accurate **component + license table** now
> and mark full-text reproduction as a tracked TODO, or (b) hold the page until the upstream texts
> are gathered. **Recommendation: (a)** — an honest table with links beats nothing, and the page
> says outright that full texts are being compiled.

---

## C. TODO(verify) — facts not confirmed in source (will be marked inline in pages)

1. **FFmpeg license (LGPL-2.1+ vs GPL-2.0+).** Depends on whether switch-ffmpeg was built with
   `--enable-gpl`; the build config is external to the repos. Affects the Attributions page.
2. **Exact upstream versions** of the statically-linked native libraries (portlib build configs
   external). Attributions page will list components without pinned versions.
3. **Live `brewser_permission` taxonomy term list.** Permissions are operator-curated WP taxonomy
   slugs; on-disk apps use `storage`, `device_info`, `network`, `usb`. The full current vocabulary
   is a live DB value, not in code. Manifest Reference will document the *mechanism* + observed
   slugs, not a frozen list.
4. **USB keyboard into web forms.** Native USB/HID keyboard support exists in the nx.js fork but is
   not wired by `brewser-runtime`; whether a plugged-in keyboard types into app forms is unverified.
   Controls page will say the on-screen keyboard is the supported path.
5. **Maximum app bundle size.** Bundles over ~40 MB switch to a `repository_dispatch` large-intake
   path (GitHub blob-API limit), but the exact hard user-facing cap isn't a single constant.
   Quickstart/Submission will describe "keep it lean; very large bundles take a slower intake path."
6. **nxlink / on-device console.** No nxlink socket redirect was found; unverified whether any
   exists. Debugging page will state the log file (`sdmc:/switch/nxjs-debug.log`) is the mechanism.
7. **Built-in FPS/debug overlay.** None found in source; unverified that any exists. Debugging page
   will say there is no built-in overlay (build your own with `requestAnimationFrame` timing).
8. **On-device authenticated cloud sync.** The `savedemo` SDK copy reads the token via
   `window.__brewserAuthToken()` (a web-navigator function) / `postMessage`, but on Switch the
   session lives at `localStorage['brewser_auth'].token`; a runtime-side `brewser.login()` bridge is
   designed but not yet implemented. So whether an app's cloud sync authenticates *on the console*
   depends on the SDK variant it bundles. SDK page will document the token-resolution order and flag
   this seam.
9. **`exitGame` ↔ button-router `exit` binding.** The submission generator hardcodes
   `exitGame:"PLUS"`; the runtime's `exit` action is "unbound by default" but published apps carry
   the field. The user-facing behavior ("**+** exits the app") is documented; the precise field→
   binding wiring lives in the shell `browser-shell.ts` (out of scope) and is described at
   user-level only.
10. **Changelog / current runtime version string.** No single user-facing runtime version constant
    was located to seed the Changelog. Will seed from the shell/NRO version if you can point me at
    it, else mark the first entry's version `<!-- TODO(verify) -->`.

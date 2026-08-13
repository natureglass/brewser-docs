# Brewser Docs Expansion — Report

Summary of the documentation expansion: what was created, what was verified (with source
citations), what remains unverified, which apps are referenced, and the decisions awaiting the
maintainer. Companion files: `PLAN.md` (the approved plan) and `OPEN_QUESTIONS.md` (decisions +
TODOs).

The full static site **builds cleanly** (`pnpm build` → 134 static pages, no MDX errors). Every new
page is automatically included in the auto-generated `llms.txt`, `llms-full.txt`, per-page
`content.md`, and OG images (deliverable #19 was already implemented in the framework — verified,
no new work required).

---

## 1. Pages created / expanded (22)

All registered in the relevant `meta.json`. `+` new, `~` expanded, `±` minor edit to an existing page.

**Getting Started (new section)**
- `+ getting-started/installing.mdx` — Installing & Updating Brewser
- `+ getting-started/glossary.mdx` — Glossary

**Runtime**
- `+ runtime/controls.mdx` — Controls Reference
- `+ runtime/networking.mdx` — Networking in Apps
- `+ runtime/audio-and-media.mdx` — Audio & Media
- `+ runtime/storage.mdx` — Storage & Offline

**Publishing**
- `+ publishing/quickstart.mdx` — Quickstart: Your First App
- `~ publishing/manifest.mdx` — Manifest Reference (expanded from the stub)
- `+ publishing/policy.mdx` — Content & Submission Policy

**Features**
- `+ features/brewser-sdk.mdx` — brewser.js SDK Reference

**Tips**
- `+ tips/debugging.mdx` — Debugging & Testing
- `+ tips/emulator.mdx` — Developing on an Emulator (approved)
- `± tips/unity.mdx` — linked "track announcements" → Changelog/Roadmap (the one edit the task specced)

**Support**
- `+ support/faq.mdx` — FAQ
- `+ support/privacy.mdx` — Privacy & Your Data
- `+ support/legal.mdx` — Legal & Attributions
- `+ support/roadmap.mdx` — Roadmap
- `+ support/changelog.mdx` — Changelog
- `+ support/security-disclosure.mdx` — Security Disclosure

**Deliverable #19** — `llms.txt` already implemented (`app/llms.txt/route.ts`,
`app/llms-full.txt/route.ts`, `app/llms.mdx/docs/[[...slug]]/route.ts`); confirmed it indexes new
pages automatically. No page written.

Nav updated: root `meta.json` (+ getting-started), plus `getting-started/`, `runtime/`,
`publishing/`, `features/`, `tips/`, `support/` `meta.json`.

---

## 2. Facts verified, with sources

Investigated read-only across three trees. Representative citations (fuller detail in the working
Phase-0 notes):

### Runtime (`D:\Workspace\brewser-runtime`, `D:\Workspace\nxjs-extended`)
- **`brewser` is app-bundled, not runtime-injected** — self-installs in
  `brewser-apps/apps/com.natureglass.savedemo/brewser.js:541-542`; no `window.brewser =` in
  `brewser-runtime/src`. Runtime supplies the auth bridge (`src/auth/brewser-auth-bridge.ts`) and
  file-backed localStorage. → SDK page, index framing.
- **Full SDK surface** — `savedemo/brewser.js` (save/load/info/pull/sync/clearLocal/canSync;
  records put/get/update/remove/list; leaderboards config/order/submit/list/aroundMe/me/remove;
  configure). → SDK page.
- **Storage per-profile, not per-app** — `src/storage/local-storage.ts:21-25`,
  `src/storage/indexed-db.ts:18-22`; paths `sdmc:/switch/brewser/shell/{localStorage,indexedDB}/`;
  no sessionStorage / Cache API; no quota (`polyfills/navigator-storage.ts`). → Storage page.
- **Networking**: any http/https host + LAN reachable, DNS works, **HTTPS-to-raw-IP fails**
  (`src/network/network-probe.ts:24-33`); **CORS bypassed** (`nxjs-extended/.../fetch/request.ts:66-68,103-107`);
  WebSocket ungated. → Networking page.
- **Codecs** (FFmpeg symbols; software decode; `source/video-decoder.cc:455-457` HW off): H.264/265,
  VP8/9, AV1, MPEG/VC-1/Theora; MP3/AAC/Vorbis/Opus/FLAC/PCM; HLS via `media-decoder.cc:623-664`.
  → Audio & Media page.
- **Gamepad mapping + Nintendo swap** — `src/shims/gamepad-shim.ts:15-36`
  (`STANDARD_TO_NX_BUTTON = [1,0,3,2,4,…]`), native order `source/gamepad.cc:22-29`. **Exit**:
  L = back (`input/button-router.ts:124`), + = app exit, HOME = quit, L+R = leave fullscreen
  (`input/controller-shortcuts.ts`). → Controls page.
- **Debugging** — `console.log/info/warn` no-op in release, only `console.error` →
  `sdmc:/switch/nxjs-debug.log` (`src/polyfills/safe-console.ts:29-56`, `nxjs-extended/source/main.cc:1572-1576`);
  no FPS/overlay; **`local-apps/` unimplemented**, real sideload `apps/<id>/`
  (`src/platform/installed-apps.ts:27-36`). → Debugging page.
- **Self-update** — ECDSA P-256, 4 MiB chunk hashes, forward-only, two-stage chainload, no
  `-previous.nro` rollback (`brewser/src/update/{verify,decide,apply,paths}.ts`). → Installing page.
- **License inventory** — `nxjs-extended/Makefile:97,102-122` (V8, Skia, Mesa, FFmpeg, dav1d, Mbed
  TLS, FreeType, HarfBuzz, …); Geist Mono OFL (`packages/runtime/node_modules/geist/LICENSE.txt`);
  QuickJS/wasm3 removed (`source/types.h:8`). → Legal page.

### Platform (`D:\Workspace\Brewser-WordPress\...\brewser-plugin`, `brewser-apps-staging`)
- **Manifest is generated server-side** — `class-brewser-sub-manifest.php:68-155`; authoritative
  validator `brewser-apps-staging/manifest.schema.json` (`additionalProperties:false`);
  field validation `class-brewser-sub-validate.php`. **No VID/PID/BLE-UUID manifest filters** —
  `scanner/lib/manifest.mjs:1-7`. → Manifest page.
- **Scanner rule catalogue** — `brewser-apps-staging/scanner/lib/rules.mjs`, `js-analyze.mjs`,
  `signatures.mjs`, `severity.mjs`. → Policy page's "avoid false flags".
- **Pipeline + developer-visible states** — `class-brewser-sub-rest.php:353-403`
  (approved/rejected/unpublished/staging/pending). → Quickstart, Submission.
- **SDK endpoints + limits** — save 256 KB & 60/min (`class-brewser-auth-save.php`), leaderboard
  best-kept/cap 100/30-min (`class-brewser-auth-leaderboard.php`), auth
  (`class-brewser-auth.php`). → SDK page.
- **Privacy schema** — raw `sub` in developers/saves/leaderboards, `SHA-256(sub)` in
  ideas/favorites/ratings; email on developer profile; no payment data
  (`class-brewser-sub-schema.php`, `class-brewser-auth-*.php`). → Privacy page.

### Apps (`D:\Workspace\brewser-apps`, 27 apps)
- Real per-app manifest structure and the capability matrix drove every "see it in action"
  reference. Only `savedemo` uses the SDK; all networking is `fetch`; WebGL 2 dominates.

---

## 3. Apps referenced as worked examples (real ids, all at play.brewser.tech)

`com.natureglass.savedemo` (SDK/saves/leaderboards), `…sensorsplayground` (sensors, debug-HUD
pattern), `…spectraplay` (Web Audio + `<audio>`), `…streamcast` (`<video>`/HLS + external net),
`…speedtest` (external fetch), `…speedwatch` (map APIs; noted as mobile/web, not Switch),
`…nxjswebgl1test` / `…nxjswebgl2test` / `…fractalzoom` / `…aether` (WebGL), `…2dplatformermicrogame`
(Unity/WASM/IndexedDB), `…gravityballs` / `…compass` (DeviceOrientation).

---

## 4. Facts left as TODO(verify)

Marked inline as `{/* TODO(verify): … */}` and collected in `OPEN_QUESTIONS.md §C`:

- FFmpeg license (LGPL vs GPL) and exact upstream native-lib versions — Legal page.
- Live `brewser_permission` taxonomy term list — Manifest page.
- USB keyboard into web forms — Controls page.
- Exact max bundle size — Quickstart/Submission.
- nxlink / built-in FPS overlay existence — Debugging page.
- On-device authenticated cloud sync seam (`brewser.login()` not yet wired) — SDK page.
- `.nro` download URL — Installing page.
- Current runtime version string to seed the Changelog — Changelog page.
- Switch 2 support — FAQ page.

---

## 5. Decisions awaiting the maintainer

Full text in `OPEN_QUESTIONS.md`; drafted in-page with visible `> DECISION NEEDED:` blockquotes per
your instruction to "draft, don't decide."

- **§A — RESOLVED.** The maintainer confirmed **all hardware Web APIs (WebSerial, Web MIDI, WebHID,
  Web NFC, plus USB/Bluetooth) are implemented and the permission picker is active** — the Phase 0
  runtime snapshot was stale — so the existing hardware pages are correct and were rightly left
  untouched. `accounts.mdx` was **corrected** to state the real data model (Google account
  identifier stored; email + display name for publishers) and link to the Privacy page; the Privacy
  page's reconciliation note was removed. Audio/Media was reworded per the maintainer: everything
  tested plays; only very high-bandwidth video suffers.
- **§B1 ban-risk wording** (FAQ) — drafted conservatively (real non-zero risk, prefer emuMMC,
  offline apps sidestep it).
- **§B3 NSFW policy** (Policy) — drafted as not-accepted; confirm hard-reject vs Experimental+gate.
- **§B4 privacy retention / deletion / DSAR contact** (Privacy) — drafted with a placeholder
  contact and 30-day commitment; confirm.
- **§B6 security-disclosure contact** (Security Disclosure) — placeholder; confirm.
- **§B7 license-text reproduction** (Legal) — accurate component/license table now; full upstream
  texts flagged as in-progress.

---

## 6. Hygiene

- Runtime / app / platform repos treated as **read-only**; only `brewser-docs` was modified.
- One page-expansion touched an existing file (`manifest.mdx`, an intended target) and one
  one-line cross-link was added to `tips/unity.mdx` (specced by the task). No other existing pages
  were changed.
- Committed in logical chunks on a `docs-expansion` branch; **not pushed**.

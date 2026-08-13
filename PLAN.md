# Brewser Docs — Expansion Plan

**Status: awaiting approval. No documentation pages will be written until you approve this plan.**

This plan maps every proposed page to its nav position, a one-paragraph content spec, the
Phase 0 sources that ground it, and the real apps it references. It reflects a full read of the
existing docs plus source-grounded investigation of `brewser-runtime`, `nxjs-extended`, the
`brewser` WordPress plugin + staging security scanner, and all 27 real app bundles.

Companion files: **`OPEN_QUESTIONS.md`** (decisions reserved for you + unverifiable facts).
Phase-0 evidence notes are retained in the working scratchpad and will be distilled into the
final **`REPORT.md`** with `path:line` citations.

---

## 0. What Phase 0 established (so the plan is grounded, not guessed)

- **Framework:** Fumadocs on Next.js 16, static export to GitHub Pages. A page = one `.mdx`
  file with `title` + `description` frontmatter, listed in its folder's `meta.json` `pages`
  array. `MarkdownCopyButton`, `llms.txt`, `llms-full.txt`, per-page `content.md`, and OG images
  are all auto-generated from `source.getPages()`.
- **Deliverable #19 (`llms.txt`) already exists** (`app/llms.txt/route.ts`,
  `app/llms-full.txt/route.ts`, `app/llms.mdx/docs/[[...slug]]/route.ts`). New pages are indexed
  automatically. **No new work needed** beyond confirming it in `REPORT.md`.
- **Voice:** second-person, terse, honest about gaps, Chrome-parity anchor
  ("*if Chrome does it, Brewser should too*"), status tables with ✅, inline `{/* TODO */}`.
- **The `brewser` SDK is app-bundled, not a runtime API** — this reconciles the SDK with the
  "no proprietary `brewser.*`" promise, and is a theme the SDK page will make explicit.
- **Verified corrections** now drive several pages (hardware APIs = USB+BLE only; no device
  picker; codecs broad-but-software; storage per-profile; CORS bypassed; forward-only signed
  self-update; `local-apps/` sideload is unimplemented). See `OPEN_QUESTIONS.md §A`.

**Canonical apps** (real IDs, all catalogue-linkable at `https://play.brewser.tech`), chosen as
"see it in action" references and preferring Switch-compatible titles:

| Capability | App id | Notes |
|---|---|---|
| `brewser.js` SDK (the only SDK user) | `com.natureglass.savedemo` | saves, records, leaderboards |
| Sensors (orientation/motion/battery/vibrate) | `com.natureglass.sensorsplayground` | |
| Web Audio + `<audio>` | `com.natureglass.spectraplay` | AudioContext analyser + WebGL2 |
| `<video>` / HLS + external network | `com.natureglass.streamcast` | Twitch, switch-compat |
| External `fetch` | `com.natureglass.speedtest` | Cloudflare speed test |
| Geolocation + map API (mobile/web) | `com.natureglass.speedwatch` | *not* switch-compat — note as such |
| WebGL 1 | `com.natureglass.nxjswebgl1test` | |
| WebGL 2 | `com.natureglass.nxjswebgl2test`, `com.natureglass.fractalzoom`, `com.natureglass.aether` | |
| WASM (full engine) | `com.natureglass.2dplatformermicrogame` (Unity), `com.natureglass.threejsrapier3dphysics` (RAPIER) | |
| Three.js WebGL2 pipeline | `com.natureglass.threejsgpgpuwater` + 9 siblings | |
| DeviceOrientation control | `com.natureglass.gravityballs`, `com.natureglass.compass` | |
| WebMIDI (⚠ see OQ §A1) | `com.natureglass.midisurface` | calls `requestMIDIAccess` |

---

## 1. Navigation plan

New top-level section **Getting Started** is added (the homepage already promises "Install
Brewser on your Switch and open your first app in minutes"). Everything else slots into existing
sections. `+` = new page, `~` = expand existing stub.

**Root `content/docs/meta.json`**
`["index", "goal", "getting-started", "runtime", "publishing", "features", "tips", "support"]`
(inserts `getting-started` after `goal`).

| Section | `meta.json` `pages` after this pass (new/expanded marked) |
|---|---|
| **getting-started** (new) | `+installing`, `+glossary` |
| **runtime** | `index`, `architecture`, `web-platform`, `graphics`, `input-and-sensors`, `+controls`, `hardware-apis`, `+networking`, `+audio-and-media`, `+storage` |
| **publishing** | `index`, `+quickstart`, `submission`, `~manifest`, `+policy`, `security-review`, `updates` |
| **features** | `index`, `catalogue`, `accounts`, `+brewser-sdk`, `achievements`, `saves-and-leaderboards`, `ideas-board` |
| **tips** | `index`, `+debugging`, `performance`, `unity`, `+emulator`* |
| **support** | `index`, `+faq`, `limitations`, `troubleshooting`, `+roadmap`, `+changelog`, `+privacy`, `+legal`, `+security-disclosure` |

\* `emulator` only if approved (OQ §B5).

---

## 2. Page specifications

### Tier 1 — critical

**1. `getting-started/installing.mdx` — Installing & Updating Brewser** *(new)*
Where to get the `.nro`, the SD-card path (`sdmc:/switch/brewser/`), launching from hbmenu,
first-run (network for catalogue, optional Google sign-in), and a short trust note that updates
are **cryptographically signed (ECDSA P-256), verified in 4 MiB chunks before install, forward-
only (no silent downgrade), and applied via a two-stage swap that never touches your data or the
running build until the new one is verified** — with PC-free recovery if power is lost mid-update.
Requires CFW (Atmosphère); links NH Switch Guide.
*Sources:* self-update §8, storage paths §3, runtime launch flow (`runtime/index.mdx`).
*Corrects the brief's "-previous.nro rollback" → forward-only + recovery alias (OQ §C / §8).*
*Apps:* — (platform page). *Cross-links:* runtime/index, accounts, support/faq.

**2. `publishing/quickstart.mdx` — Quickstart: Your First App** *(new)*
Written for the "skill floor just below developer." One hello-world `index.html` (a runnable,
Chrome-testable snippet) → test in Chrome → (optionally) sideload to
`sdmc:/switch/brewser/apps/<id>/` for a real-device check → submit via the dashboard on
brewser.tech (Google sign-in) → watch pipeline status (the real developer-visible states:
`pending → approved`, or `rejected`/`staging`) → live at play.brewser.tech. Honest about the
zip-bundle format and "keep it lean."
*Sources:* pipeline stages + visible states (platform §3), sideload reality (runtime §7),
manifest generation (platform §1). *Apps:* references `savedemo` and `nxjswebgl1test` as
minimal real examples. *Cross-links:* manifest, submission, debugging, sdk.

**3. `publishing/manifest.mdx` — Manifest & Permissions → full reference** *(expand the existing stub)*
Fill the `{/* TODO: canonical schema + example */}` with a **real annotated manifest** (from an
actual on-disk `apps/<id>/manifest.json`) and a **field-by-field table** derived from the
authoritative validator (`manifest.schema.json`) and the server-side generator
(`Brewser_Sub_Manifest::build()`). Must state plainly: **the manifest is generated from your
submission form, not hand-authored**; `id` regex, semver, `entry`, `categories`, `compatibility`,
`allowed_origins`, `license`, `exitGame`, `fullscreen`, `buttonMapping`, etc. Permissions section
corrected: **not hardware-only** — they are operator-curated taxonomy slugs; the runtime enforces
`network`/`storage`/`device_info`/`account`/`external_links`/filesystem, while `usb` is
report-only and hardware APIs (WebUSB/BLE) are ungated. **Device VID/PID and BLE-UUID manifest
filters do not exist** — documented as an honest absence (peripheral intent is a permission
string; standard-web `requestDevice` filters live in app JS). Replaces the current hardware-only
framing.
*Sources:* platform §1 (schema/generator/validator), runtime §2 (enforcement), apps §1 (real
on-disk manifest). *Apps:* `savedemo` (real manifest), `midisurface`/`streamcast` (permissions in
the wild). *Cross-links:* quickstart, sdk, security-review, controls (buttonMapping).

**4. `features/brewser-sdk.mdx` — `brewser.js` SDK Reference** *(new; consolidating index)*
The canonical SDK entry point. Explains the philosophy (**drop-in file you bundle; degrades
gracefully signed-out; identical in Chrome — no lock-in**), the install snippet, and a complete
**method index table** (`save/load/info/pull/sync/clearLocal/canSync`, records
`put/get/update/remove/list`, `leaderboards.*`, `configure`) with signatures, sync-vs-Promise,
and signed-out behavior — linking to **Saves & Leaderboards** for the deep dive rather than
duplicating it. Adds the **server-side limits** verified from the plugin (save ≤256 KB, 60/min;
leaderboard best-kept, cap 100, |score|≤1e12, 30/min; API base `…/wp-json/brewser/v1`) and the
**token-resolution order** with the on-device auth seam flagged (OQ §C8).
*Sources:* runtime §1 (SDK surface from `savedemo/brewser.js`), platform §4 (endpoints/limits),
existing `saves-and-leaderboards.mdx`. *Apps:* `savedemo` (worked example, the only SDK user).
*Cross-links:* saves-and-leaderboards, accounts, manifest.

**5. `tips/debugging.mdx` — Debugging & Testing** *(new)*
The Chrome-first loop (fastest iteration), then the honest on-device story: **`console.log`/
`info`/`warn` are no-ops in the production build; only `console.error` survives, written to
`sdmc:/switch/nxjs-debug.log`** (no on-screen console, **no FPS/debug overlay**). Uncaught errors
freeze the last frame and write to the log; press **+** to exit. Pre-publish on-device testing:
**sideload by dropping your app into `sdmc:/switch/brewser/apps/<id>/` with a `manifest.json`
(folder == id)** — and the honest caveat that the widely-referenced `local-apps/` folder is
**not implemented**. Tips: build your own on-screen debug HUD; measure FPS with `rAF` timing.
*Sources:* runtime §7 (debugging), §3 (paths), §6 (exit). *Apps:* `sensorsplayground` (an app
that surfaces state on-screen as a debugging pattern). *Cross-links:* quickstart, performance,
support/troubleshooting.

### Tier 2 — trust & policy

**6. `support/faq.mdx` — FAQ** *(new)*
Q&A: **ban risk online on CFW** (drafted conservatively per OQ §B1 — real non-zero risk, prefer
emuMMC, you accept the risk; offline apps sidestep it per OQ §B2); **supported consoles**
(Erista/Mariko/Lite/OLED — all Switch models that run Atmosphère; Switch 2 UNVERIFIED); **does it
work without CFW?** (no); **cost** (free); **is this piracy?** (no — Brewser ships no Nintendo
code/keys/ROMs; it runs your own web apps). Every judgment call carries a `> DECISION NEEDED`.
*Sources:* `support/index.mdx`, `README`/`submission_info.md` disclaimers, app matrix (offline
capability). *Apps:* — . *Cross-links:* installing, privacy, legal, limitations.

**7. `publishing/policy.mdx` — Content & Submission Policy** *(new)*
What gets rejected (ROMs, keys, Nintendo/copyrighted assets, NSFW*, impersonation/trademark,
undisclosed telemetry, obfuscated code) — from `submission_info.md` + the maintainer-discretion
model. Then a concrete **"how not to trip the security scanner"** section built from the real rule
catalogue: ship un-minified/un-obfuscated code, declare every external origin in
`allowed_origins`, use literal (not assembled/computed) URLs and API names, avoid
`eval`/`Function`/`setTimeout(string)`, keep to your own `localStorage` keys, don't read
`brewser_auth`, declare peripheral permissions you use, don't vendor `node_modules`. Explains
GOOD/SUSPICIOUS/DANGEROUS and that DANGEROUS blocks publication (admin override exists but is
exceptional). \*NSFW handling per OQ §B3.
*Sources:* platform §2 (scanner rules), §3 (pipeline), `security-review.mdx`, `submission_info.md`.
*Apps:* — . *Cross-links:* security-review, submission, manifest.

**8. `runtime/networking.mdx` — Networking in Apps** *(new)*
The verified answer: `fetch` and `XMLHttpRequest` reach **any http/https host — external internet
and LAN alike** (DNS works). **No CORS enforcement and no mixed-content blocking** (great for
talking to devices/APIs that lack CORS headers). Key gotchas: **HTTPS to a raw IP fails cert
validation → use `http://<lan-ip>` for LAN dashboards** (the Home-Assistant-style use case works
this way), HTTPS-to-hostname is fine; production apps need the `network` permission +
`allowed_origins`; **WebSocket works but is ungated**. Real streaming (HLS) works.
*Sources:* runtime §4 (networking), §5 (HLS), platform §1 (allowed_origins). *Apps:* `speedtest`
(external HTTPS), `streamcast` (HLS/external), `speedwatch` (map APIs; note mobile/web compat).
*Cross-links:* manifest, audio-and-media, security-review.

**9. `support/privacy.mdx` — Privacy & Your Data** *(new)*
GDPR-aware (EU-operated). What's stored for accounts/saves/leaderboards/achievements/favorites/
donations, and the honest identity detail: **some tables store the raw Google `sub` and your
email** (developers/saves/leaderboards), others store `SHA-256(sub)`. Google auth via OIDC (no
passwords stored); no third-party network beyond Google OAuth/JWKS. **No payment data** (donations
are just links). Deletion mechanisms that exist today + retention/`uninstall` behavior. Retention
period / account-erasure / DSAR contact drafted per OQ §B4.
*Sources:* platform §6 (schema/columns/retention), §4 (auth). *Apps:* — . *Cross-links:* accounts,
legal, faq. *(Note: contradicts `accounts.mdx` — see OQ §A3.)*

**10. `support/legal.mdx` — Legal & Attributions** *(new)*
The "not affiliated with Nintendo" trademark disclaimer (from the existing repo disclaimers) +
an accurate **open-source attributions table** enumerated from the actual runtime dependencies:
nx.js (MIT), V8 (BSD-3), Skia (BSD-3), Mesa/Nouveau (MIT), FFmpeg (LGPL/GPL — see OQ §C1),
FreeType, HarfBuzz, Mbed TLS (Apache-2.0), dav1d (BSD-2), libpng/libjpeg-turbo/libwebp/zlib/zstd,
Geist Mono (OFL-1.1), cacert.bin (MPL-2.0), Twemoji (CC-BY 4.0), plus the bundled npm libs. Notes
that full license-text reproduction is being compiled (OQ §B7) and that **QuickJS/wasm3 were
removed in favor of V8** (so they're intentionally absent).
*Sources:* runtime §9 (license enumeration). *Apps:* — . *Cross-links:* architecture, privacy.

### Tier 3 — rounding out the runtime docs

**11. `runtime/audio-and-media.mdx` — Audio & Media** *(new)*
Web Audio support (real nodes: Gain/StereoPanner/Oscillator/AudioBufferSource/**AnalyserNode**/
etc.; filters/convolver/panner degrade to passthrough; some nodes are no-ops; `connect()` is
lenient). `HTMLAudioElement` and `<video>`/`<audio>` are real. A **concrete codec table**
replacing "video codec support is limited": broad coverage (H.264/H.265/VP8/VP9/AV1/MPEG/VC-1/
Theora on video; MP3/AAC/Vorbis/Opus/FLAC/PCM + more on audio; HLS) — **software-decoded, so HD /
VP9 / AV1 are performance-limited**, which is the real constraint.
*Sources:* runtime §5. *Apps:* `spectraplay` (Web Audio + `<audio>`), `streamcast` (`<video>`/HLS).
*Cross-links:* networking, performance, limitations.

**12. `runtime/storage.mdx` — Storage & Offline** *(new)*
Verified storage APIs: **localStorage and IndexedDB are real and persist across launches and
self-updates**; **sessionStorage and the Cache API do not exist**. Data lives in SD JSON files
under `sdmc:/switch/brewser/shell/{localStorage,indexedDB}/`. **No per-app isolation — storage is
per-profile, so prefix your keys** (the `brewser.js` SDK does this for you). No quota beyond
physical SD space (no `QuotaExceededError`). Offline behavior: most apps are fully self-contained;
the SDK's local-first model means saving works offline and syncs later.
*Sources:* runtime §3, §1 (SDK namespacing). *Apps:* `spectraplay` (localStorage),
`2dplatformermicrogame` (IndexedDB via Unity), `savedemo` (SDK saves). *Cross-links:* sdk,
saves-and-leaderboards, networking.

**13. `runtime/controls.mdx` — Controls Reference** *(new; extends Input & Sensors)*
The full **Standard Gamepad mapping table with exact indices** and the **Nintendo A/B swap**
(index 0 = physical **A**/primary, 1 = **B**/cancel, … 8 = −, 9 = +, 12–15 d-pad), 4 axes with
inverted Y. Touch (handheld-only, hardware reason). The on-screen keyboard (A activate / B cancel
/ **+** submit); USB keyboard unverified. **Exiting an app:** **L** returns to the catalogue, **+**
exits the app (published apps are configured `exitGame:"PLUS"`), **HOME** quits to hbmenu, and
**L+R** leaves ad-hoc fullscreen. Docked vs handheld (720p handheld / scaled docked; touch
handheld-only). `buttonMapping` in the manifest maps keyboard keys to Switch controls.
*Sources:* runtime §6 (mapping/exit/keyboard), apps §1 (`exitGame`), platform §1 (`buttonMapping`).
*Apps:* `gravityballs`/`compass` (orientation), `aether` (gamepad + keyboard). *Cross-links:*
input-and-sensors, manifest, debugging.

**14. `support/changelog.mdx` — Changelog** *(new)*
Seed with the current runtime version and an entry format (date, version, Added/Changed/Fixed) for
future entries. Version seeding per OQ §C10. Linked from `tips/unity.mdx`'s "track announcements"
sentence (a one-line edit — see §3 opt-in touch-ups).
*Sources:* — (format page). *Cross-links:* roadmap, unity.

**15. `support/roadmap.mdx` — Roadmap** *(new)*
Convert `limitations.mdx`'s roadmap-flavored items into a short forward-looking page (WebGL 2
conformance, Unity WebGL 2, hardware video decode, on-device auth bridge / `brewser.login()`),
framed as intentions not promises, and link the **Ideas Board** for community requests.
*Sources:* `limitations.mdx`, runtime §5/§1 (hw decode, auth bridge — both flagged as
future/unverified). *Cross-links:* limitations, ideas-board, changelog.

### Nice-to-have (only after Tiers 1–3, and where approved)

**16. `getting-started/glossary.mdx` — Glossary** *(new)* — CFW, Atmosphère, NRO, hbmenu,
homebrew, sysNAND/emuNAND/emuMMC, Tegra X1, nx.js. Short definitions, cross-linked.
*Sources:* general homebrew knowledge + `architecture.mdx`. *Cross-links:* installing, faq.

**17. `tips/emulator.mdx` — Developing on an Emulator** *(new, ONLY if approved — OQ §B5)* —
honest stance: fine for UI/logic iteration, but **no networking under the emulator used here and
GL/perf diverge from hardware**; Chrome is primary, real hardware is the source of truth for
net/graphics/perf. *Sources:* runtime §4 (Citron no-net), memory of GL divergence.

**18. `support/security-disclosure.mdx` — Security disclosure** *(new)* — responsible-disclosure
scope + contact (contact TBD, OQ §B6). *Sources:* platform §2 (scanner context).

**19. `llms.txt` — already implemented.** Verified auto-generated and inclusive of new pages.
No page to write; documented in `REPORT.md`.

---

## 3. Proposed opt-in touch-ups to existing pages (approval requested)

These are tiny, verified edits that resolve existing inline `{/* TODO */}`s my research now
answers. They edit existing pages, so I list them for explicit opt-in rather than doing them
silently:

- `publishing/submission.mdx` — fill the "accepted formats" TODO (zip bundle, `entry` default
  `index.html`, keep-it-lean/large-intake note) and the pipeline-status TODO (real visible states).
- `publishing/updates.mdx` — fill versioning TODO (semver, same app id, staging→production).
- `runtime/input-and-sensors.mdx` — fill the software-keyboard TODO (on-screen overlay + submit
  key) and add a link to the new Controls Reference.
- `tips/unity.mdx` — link "track announcements" to the new Changelog.
- Per OQ §A1/§A2/§A3 — optionally reconcile `hardware-apis.mdx`, `index.mdx`, `web-platform.mdx`,
  and the `accounts.mdx` privacy sentence with verified facts. **These are larger and I will not
  touch them without your explicit yes.**

---

## 4. Sequencing & commits

Pages written in tier order (Tier 1 → 2 → 3 → nice-to-have). One commit per page (or per small
group), clear messages, **no push**. `meta.json` nav updates committed alongside the pages they
register. After Tier 3, I'll build (`pnpm build`) to confirm the static export still compiles, then
write **`REPORT.md`** (pages created, facts verified with `path:line`, facts left as TODO, apps
referenced, decisions awaiting you). Runtime/app/platform repos stay read-only.

---

## 5. Decisions blocking or shaping the work

Please review **`OPEN_QUESTIONS.md`**. The ones that most change output:

- **§A1 hardware APIs** (Serial/MIDI/NFC not implemented) — how to reconcile with live pages.
- **§B1 ban-risk wording** for the FAQ.
- **§B4 privacy retention/deletion commitments.**
- **§B5 emulator page** yes/no.
- **§A3 / §3** whether I may also correct existing pages, or only add new ones.

**I will not write any documentation pages until you approve this plan.** Tell me to proceed
(optionally with answers to the decisions above, or "draft the decisions with markers and I'll
review inline"), and I'll start with Tier 1.

# Brewser Docs

Documentation site for [Brewser](https://brewser.io), built with
[Fumadocs](https://fumadocs.dev) on Next.js — statically exported for
GitHub Pages at **docs.brewser.io**.

## Development

```sh
pnpm install
pnpm dev        # http://localhost:3000
```

## Content

All pages are MDX under `content/docs/`. Sidebar structure and ordering is
controlled by the `meta.json` file in each folder. Add a page = add an
`.mdx` file (with `title` frontmatter) and list it in the folder's
`meta.json`.

Search (⌘K), table of contents, dark mode, `llms.txt` and per-page OG images
are all generated automatically.

## Build & deploy

```sh
pnpm build      # static export to ./out
```

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
deploys `out/` to GitHub Pages. One-time setup in the repo settings:

1. Settings → Pages → Source: **GitHub Actions**
2. Settings → Pages → Custom domain: **docs.brewser.io**
3. DNS: add a `CNAME` record for `docs` → `natureglass.github.io`

## TODO markers

Content stubs contain `{/* TODO: ... */}` comments where details should be
verified or filled in before launch.

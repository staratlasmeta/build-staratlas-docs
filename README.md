# Star Atlas Build Docs

A GitHub Pages-ready VitePress rebuild of the public [build.staratlas.com](https://build.staratlas.com) docs.

## What this repo includes

- VitePress site scaffold with a dark, Star Atlas-inspired theme
- Imported markdown docs from the public GitBook sitemap
- Generated sidebar and top navigation based on the live site structure
- GitHub Pages deployment workflow
- `CNAME` support for `build.staratlas.com`
- A re-sync script for pulling the latest public docs from GitBook
- A lightweight redirect strategy for common legacy URL variants like `.md`

## Quick start

```bash
npm install
npm run sync
npm run dev
```

## Scripts

- `npm run dev` - start the local VitePress dev server
- `npm run build` - build the static site
- `npm run preview` - preview the production build locally
- `npm run sync` - re-import public docs from the GitBook sitemap and regenerate navigation

## Publishing on GitHub Pages

1. Push this repo to GitHub.
2. In GitHub, open **Settings → Pages**.
3. Set **Build and deployment** to **GitHub Actions**.
4. The included workflow will build and deploy the VitePress output.
5. Once Pages is live, point the custom domain at GitHub Pages and keep the `CNAME` file in place.

## Custom domain notes

This repo already ships `docs/public/CNAME` with:

```txt
build.staratlas.com
```

Typical DNS setup:

- `CNAME` record for `build` pointing to your GitHub Pages host, or
- the equivalent records recommended by GitHub for your org/user setup

After DNS is updated, re-save the custom domain in the GitHub Pages settings if GitHub asks for confirmation.

## Re-syncing from the live GitBook site

Run:

```bash
npm run sync
```

That script will:

- pull the latest page list from `https://build.staratlas.com/sitemap-pages.xml`
- fetch each public markdown page
- rewrite internal links for the VitePress site
- regenerate the VitePress nav and sidebar data

## Preview and path assumptions

The config is tuned for the final custom domain at the site root. If you want to preview the built site under a temporary GitHub Pages subpath before DNS cutover, adjust the VitePress `base` setting first.

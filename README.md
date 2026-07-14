# symfynity.com

The SymFynity marketing site. Astro, static output, deployed to GitHub Pages.

## Develop

Node 22.16.0 is pinned in `.tool-versions` (asdf). Astro 7 requires Node >= 22.12,
so the repo-local pin matters — a global Node 20 will fail at install.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview  # serve dist/ as it will actually deploy
```

## Structure

```
src/
  layouts/Base.astro        page shell, meta, skip link
  components/
    Masthead.astro          wordmark + nav
    Hero.astro              headline, CTAs; owns WeirDiagram
    WeirDiagram.astro       the canvas. self-contained, no page knowledge
    Section.astro           label + heading wrapper (as="h1" for non-home pages)
    Contact.astro           CTA. isolated on purpose — see below
    Footer.astro
  pages/
    index.astro             one-pager
    about.astro
    pricing.astro
  styles/tokens.css         every colour and type decision lives here
public/
  CNAME                     symfynity.com
  favicon.svg
```

`tokens.css` is the single source of colour. No component defines a raw hex — if
you find yourself typing one, add a token instead.

## The contact form

`Contact.astro` currently renders a "coming soon" placeholder. It is isolated so
that wiring a real form touches **one file**:

```astro
<form action="https://usebasin.com/f/<id>" method="POST"> … </form>
```

Until then the primary CTA is "Start with Weir", which points at a real public repo
and works today.

## Themes

Light and dark are both designed, driven entirely by the reader's
`prefers-color-scheme`. There is no in-page toggle by choice: it would mean shipping
JS to `/about` and `/pricing`, which currently ship none.

The canvas can't inherit CSS, so `WeirDiagram` reads the tokens via
`getComputedStyle` and re-reads them if the OS theme changes while the page is open.

## Deploying

Push to `main` → `.github/workflows/deploy.yml` builds and publishes to Pages.

For the custom domain, `public/CNAME` is already in place. The DNS records at the
registrar are a manual step:

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `symfynity.github.io` |

Then Settings → Pages → Custom domain → `symfynity.com`, and tick **Enforce HTTPS**
once the certificate is issued.

> The domain currently serves a GoDaddy Website Builder site. Pointing these records
> at GitHub replaces it. Confirm you're happy to lose the GoDaddy page first — it
> holds a contact form that this site does not yet replace.

## Design

See [`2026-07-14-symfynity-landing-site-design.md`](../docs/superpowers/specs/2026-07-14-symfynity-landing-site-design.md)
for the positioning, message architecture, and visual rationale.

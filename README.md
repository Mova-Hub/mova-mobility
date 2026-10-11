<div align="center">

  <img src="public/assets/images/logo/logo.png" alt="Mova" width="130" />

  <h1>Mova Mobility &middot; Website</h1>

  <p><strong>mova-mobility.com</strong><br/>
  The public face of Mova: the app, the Mova Pass, careers and contact.</p>

  <p>
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
    <img src="https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Bootstrap-5-7952B3?style=flat-square&logo=bootstrap&logoColor=white" alt="Bootstrap 5" />
    <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind 4" />
    <img src="https://img.shields.io/badge/part_of-Mova_ecosystem-005921?style=flat-square" alt="Part of the Mova ecosystem" />
  </p>

  <p>
    <a href="#what-is-on-it">Pages</a> &middot;
    <a href="#how-it-talks-to-the-backend">API</a> &middot;
    <a href="#app-screenshots">Screens</a> &middot;
    <a href="#running-it">Run</a> &middot;
    <a href="#deploying">Deploy</a> &middot;
    <a href="#gotchas">Gotchas</a>
  </p>

</div>

---

The marketing and recruitment site, built with React and Vite. It is public and
mostly static, but its forms are real: they call the public endpoints of the
Laravel API in [`Mova-Hub/mova-api`](https://github.com/Mova-Hub/mova-api).

## What is on it

- **Home** — the whole app walked through on an iPhone frame, then the download
  links.
- **/movapass** — an Apple-style product page for the Mova Pass.
- **Careers** — open jobs from the API, each with its own shareable page and an
  application form (with `JobPosting` structured data for search engines).
- **Contact** — opens a support ticket in the back office.
- **Newsletter** — double opt-in sign-up (confirmation and unsubscribe pages).
- **Legal** — privacy policy and terms.

## How it talks to the backend

`src/api/apiService.js` wraps `fetch` against `https://api.mova-mobility.com/api`.
The site only ever calls **anonymous** endpoints:

| Action | Endpoint |
|---|---|
| Contact form | `POST /public/contact` |
| Newsletter | `POST /public/newsletter` (+ `confirm`, `unsubscribe`) |
| Jobs list | `GET /jobs/public` |
| One job | `GET /public/jobs/{id}` |

The API's CORS allows `mova-mobility.com` and `www.mova-mobility.com` (plus
`localhost:5173` / `5174` for local work), so the forms fail on preview URLs by
design.

## App screenshots

The phones on the site read their screens from one manifest,
`src/data/appScreens.js`. To add or replace a screen, drop a portrait capture
into `public/assets/images/app/` under the listed name; nothing else changes.
Until a file exists, an older capture, a drawn HTML mock, or a titled placeholder
stands in, so a page never shows a broken image.

## Running it

```bash
npm install
npm run dev
```

Before pushing: `npm run lint` and `npm run build`.

## Deploying

A static site, served by **Cloudflare** (the build is configured in the Cloudflare
dashboard; the `vercel.json` is left over from the earlier Vercel setup).

> Cloudflare rejects any single asset larger than **25 MiB**, and the build copies
> `public/` as is. Keep large media out of `public/`: the only video on the site
> is served from Cloudinary.

## Gotchas

- **`overflow-x: clip`, never `hidden`, on the page wrapper.** `hidden` turns the
  wrapper into a scroll container and silently disables every `position: sticky`
  on the site.
- **Deep links** (such as `/carrieres/<id>`) need the host to fall back to
  `index.html`, as any SPA does.
- Brand green is `#005921`, exposed as the `--bs-primary` CSS variable.

> Plain commit messages, no emoji. Never commit `.env`.

---

<div align="center"><sub>Mova Mobility &middot; Brazzaville, Congo</sub></div>

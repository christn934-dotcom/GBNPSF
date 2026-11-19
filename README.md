# Grace Bilingual Nursery and Primary School, Foumban

Website for **G.B.N.P.S.F** — Grace Bilingual Nursery and Primary School, Foumban
(West Region, Cameroon) — with reserved, styled pages for the future School
Management System.

Plain HTML, CSS and JavaScript. No build step, no framework, no dependencies.
Open a file and it works; upload the folder and it is live.

---

## 1. What is in the box

```
.
├── index.html              Home — hero, about, stats, why us, programmes,
│                           news, testimonials, gallery, contact
├── about.html              History, mission, vision, values, head teacher,
│                           facilities
├── academics.html          Curriculum, departments, subjects, calendar,
│                           examinations, downloads
├── admissions.html         Requirements, process, fees, FAQs, application form
├── student-life.html       Clubs, sport, arts, leadership, service
├── gallery.html            Photo filters + search, video slots, lightbox
├── news.html               Articles, event listings, calendar, notice board
├── staff.html              Leadership, teaching and administration staff
├── contact.html            Form, details, map slot, who to ask
├── privacy.html            Privacy notice
├── accessibility.html      Accessibility statement
├── 404.html                Not found
├── portal-roadmap.html     Management-system integration plan
│
├── student-portal.html     ┐
├── parent-portal.html      │
├── teacher-portal.html     │ reserved portal shells, one shared layout,
├── results.html            │ wired to the navigation and footer
├── fees.html               │
├── e-learning.html         │
├── library.html            ┘
│
├── css/styles.css          Design system, components, responsive rules
├── js/config.js            School details, social links, form + API endpoints
├── js/data.js              Events, gallery and video content
├── js/components.js        Header, footer, portal shell renderers
├── js/site.js              Navigation, reveals, counters, gallery, calendar, forms
├── assets/favicon.svg      Crest favicon
├── assets/images/          Photographs (see assets/images/README.md)
├── assets/documents/       PDFs linked from the Academics page
├── sitemap.xml
└── robots.txt
```

### Where to change what

| I want to change… | Edit |
| --- | --- |
| School name, address, phone, email | `js/config.js` |
| Social media links | `js/config.js` → `social` |
| Navigation labels or order | `js/components.js` → `NAV` |
| Portal list | `js/components.js` → `PORTALS` and `PORTAL_COPY` |
| Events and calendar | `js/data.js` → `events` |
| Gallery and video items | `js/data.js` → `photos`, `videos` |
| Colours, spacing, type | `css/styles.css` → `:root` tokens |
| Page copy | the page's `.html` file |
| Where forms send | `js/config.js` → `forms.endpoint` |

---

## 2. Run it locally

Any static server works. With Python:

```bash
python3 -m http.server 3000
```

Then open <http://localhost:3000>. Opening `index.html` directly by double-click
also works, but a server gives you the correct paths for the PDF links.

---

## 3. Adding your own photographs

Every image is a labelled placeholder such as:

```html
<div class="ph" data-label="Upload School Image Here" data-hint="1600 × 2000 px"></div>
```

Replace the element with a real image:

```html
<img src="assets/images/courtyard.jpg" alt="Pupils crossing the courtyard before assembly"
     width="1600" height="2000" loading="lazy">
```

Gallery tiles and video slots are generated from `js/data.js`.
Full guidance, including recommended sizes and consent rules, is in
[`assets/images/README.md`](assets/images/README.md).

---

## 4. Connecting forms

Forms validate in the browser and post JSON to `GB_CONFIG.forms.endpoint`.

1. Create an endpoint that accepts `POST` JSON — a Formspree form, a Netlify
   form function, a Cloudflare Worker, or your own API.
2. Put the URL in `js/config.js`:

```js
forms: {
  endpoint: "https://example.com/api/contact",
  method: "POST",
  demoMessage: "…"
}
```

Until an endpoint is set, every form validates and then says plainly that
nothing was sent. That is intentional: no silent failures, no fake success.
Newsletter signups use `newsletter.endpoint` the same way.

---

## 5. Connecting the School Management System

The seven portal pages are real pages with a sign-in shell, a feature list and
a link back to the site. They currently run in preview mode with no backend.
`portal-roadmap.html` sets out what each module will hold.

To connect a backend:

1. Set the base URL and paths in `js/config.js`:

```js
api: {
  baseUrl: "https://api.gbnpsf.cm",
  endpoints: {
    session: "/auth/session",
    studentResults: "/students/:id/results",
    feeStatement: "/students/:id/fees",
    librarySearch: "/library/search",
    courses: "/elearning/courses"
  }
}
```

2. Replace the `portal` handler in `js/site.js` with a real sign-in request,
   then render the data each endpoint returns into `.portal-shell__main`.
3. Enforce access on the server. A guardian must see only their own children;
   a pupil must not reach another pupil's marks. Never rely on the browser.

The header dropdown, footer links and page routes stay exactly as they are, so
the public website does not change when the system goes live.

---

## 6. Deploying

The site is static, so it can go anywhere that serves files over HTTPS.

### Netlify / Vercel (drag and drop)

1. Create a new project and choose "deploy manually" or "other".
2. Drag the project folder in, or connect the Git repository.
3. No build command, no output directory — publish the repository root.
4. Add the custom domain `gbnpsf.cm` and enable HTTPS.

### GitHub Pages

1. Push the repository to GitHub.
2. Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/`.
3. Add a `CNAME` file containing `www.gbnpsf.cm` if you use a custom domain.

### cPanel / shared hosting (common in Cameroon)

1. Zip the project folder.
2. In cPanel → File Manager, upload and extract into `public_html`.
3. Ensure `index.html` sits directly in `public_html`.

### Cloudflare Pages

1. Connect the repository.
2. Framework preset: *None*. Build command: empty. Output directory: `/`.

### After going live

- Point `www.gbnpsf.cm` at the host and force HTTPS.
- Update every `https://www.gbnpsf.cm/...` URL if the domain differs —
  in the page `<head>`s (canonical, Open Graph), `sitemap.xml` and `robots.txt`.
- Submit `sitemap.xml` in Google Search Console.
- Add `assets/images/og-image.jpg` (1200 × 630 px) and uncomment the
  `og:image` tags.
- Configure the 404 page in the host's settings to serve `404.html`.
- Replace the `#` social links in `js/config.js` with real profiles.
- Test the forms on the live domain, then remove the demo message.

---

## 7. SEO that is already in place

- Unique `<title>` and meta description per page.
- Canonical URL per page.
- Open Graph and Twitter card tags (add the image, see above).
- `School` structured data on the home and contact pages, including address,
  telephone, opening hours and founding date.
- `BreadcrumbList` structured data on section pages.
- `FAQPage` structured data for the admissions FAQs.
- `sitemap.xml`, `robots.txt`, and a single `<h1>` per page.
- Portal pages are `noindex` — they are reserved areas, not public content.

---

## 8. Browser support and performance

- Modern evergreen browsers (Chrome, Edge, Firefox, Safari) and mobile equivalents.
- No JavaScript framework, no external CSS library, no icon font — icons are inline SVG.
- Two Google Fonts families, both preconnected. To remove the third-party request,
  download the font files into `assets/fonts/` and replace the `<link>` tags with
  `@font-face` rules in `css/styles.css`.
- Motion respects `prefers-reduced-motion`; print styles are included for the
  admissions pages.

---

## 9. Credits and content

School details, names, statistics and dates in this build are placeholders to be
confirmed by the school office before publication. Photographs must come from the
school, with guardian consent for any child who is identifiable.

Built for Grace Bilingual Nursery and Primary School, Foumban.

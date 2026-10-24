# Umeka Ply — Website

**Umeka Ply · Trusted with Pride.** The official website for Umeka plywood, block board and flush doors.

Built with **Next.js 15 (App Router) · TypeScript · Tailwind CSS v4**, exported as a fully static site, so it can be hosted anywhere.

---

## 1. Quick start

Requirements: **Node.js 20+** (LTS recommended).

```bash
npm install          # install dependencies (first time only)
npm run dev          # local development at http://localhost:3000
npm run build        # production build → static site in /out
node scripts/preview.mjs 4000   # preview the built /out folder at http://localhost:4000
```

> **Windows PowerShell note:** if `npm` is blocked by the execution policy, use `npm.cmd` instead (e.g. `npm.cmd run dev`).

---

## 2. Project structure

```
umeka-next/
├─ public/
│  ├─ brand/              Logo files (colour + white)
│  ├─ images/             Optimised images (generated — do not edit by hand)
│  ├─ downloads/          Put catalogue / technical-sheet PDFs here
│  ├─ favicon.png, apple-touch-icon.png
├─ source-images/         Original, full-size photos (input for the image script)
│  ├─ lifestyle/          Licensed interior photography
│  └─ generated/          AI-generated TEMPORARY placeholders (replace before launch)
├─ scripts/
│  ├─ optimize-images.mjs Builds AVIF/WebP/JPEG sizes + image manifest
│  ├─ make-icons.mjs      Builds favicons from the logo emblem
│  └─ preview.mjs         Serves /out locally
└─ src/
   ├─ app/                Pages (one folder per URL) + sitemap.ts, robots.ts
   ├─ components/
   │  ├─ layout/          Header, Footer, mobile action bar
   │  ├─ sections/        Reusable page sections (hero, product cards, timeline …)
   │  ├─ forms/           Enquiry form + tabbed enquiry hub
   │  └─ ui/              Buttons, headings, Picture, breadcrumbs, icons …
   ├─ content/            ★ ALL EDITABLE CONTENT LIVES HERE ★
   └─ lib/                SEO, schema markup, form validation, analytics helpers
```

---

## 3. Editing content (no design changes needed)

All text and data are in `src/content/`. Pages update automatically on the next build.

| File | What it controls |
|---|---|
| `site.ts` | Company name, phone, email, addresses, social links, navigation, legal name |
| `products.ts` | Categories and every product line: names, grades, benefits, sizes, thicknesses, specs, certifications, warranty |
| `applications.ts` | Application pages (kitchens, wardrobes, offices …) |
| `articles.ts` | Knowledge Centre articles |
| `company.ts` | Timeline, values, strengths, quality steps, downloads, testimonials, FAQs |
| `dealers.ts` | Dealer / distributor directory |
| `forms.ts` | Form fields and dropdown options |

### Placeholder system
Any value set to `null` (or flagged `verified: false` / `nameIsPlaceholder: true`) is shown on the site with a dashed **"To be confirmed"** badge. Nothing unverified can be mistaken for a fact. When you have real data, replace the `null` with the value and the badge disappears.

**Examples**
```ts
// products.ts — publish real thicknesses
thicknesses: ['6 mm', '9 mm', '12 mm', '19 mm'],

// products.ts — confirm a spec value
{ label: 'Bonding resin', value: 'Phenol formaldehyde (PF)' },

// company.ts — publish a PDF (upload to public/downloads/ first)
{ id: 'product-catalogue', …, file: '/downloads/umeka-catalogue-2026.pdf', size: '4.2 MB' },

// company.ts — add a genuine testimonial (with permission)
{ quote: '…', name: 'R. Patel', role: 'Interior Designer', city: 'Ahmedabad' },

// dealers.ts — add a dealer
{ name: 'ABC Plywood House', type: 'Dealer', city: 'Rajkot', state: 'Gujarat', phone: '+91 …' },
```

### Adding a new product
Copy any entry in `products` inside `src/content/products.ts`, give it a unique `slug`, set its `category`, and fill in the fields. Its page (`/products/<category>/<slug>/`), the listing, filters, enquiry dropdown and sitemap update automatically.

---

## 4. Images

1. Put the original photo in `source-images/` (any sub-folder) with a short, descriptive file name, e.g. `kitchen-green-shutters.jpg`.
2. Run `npm run images`. It creates AVIF/WebP/JPEG versions at several widths and updates `src/content/image-manifest.json`.
3. Use the file name (without extension) anywhere an `image` is expected in the content files, e.g. `image: 'kitchen-green-shutters'`.

To **replace** an image, overwrite the file in `source-images/` with the same name and run `npm run images` again.

> The images in `source-images/generated/` are AI-generated placeholders (plywood stack, block board, flush door, kitchen, wardrobe, office, factory, ply edge). Replace them with real Umeka product and facility photography before launch.

---

## 5. Forms (enquiries)

The site has three forms: **General**, **Product** and **Dealer/Distributor**, all with client-side validation, loading, error and success states, plus a hidden honeypot field against spam bots.

Submissions are sent as JSON (`POST`) to the URL in `NEXT_PUBLIC_FORM_ENDPOINT`. Copy `.env.example` to `.env.local` and set it. Compatible services include:

- **Formspree / Web3Forms / Getform:** paste the endpoint URL they give you.
- **Google Apps Script:** a small script that appends rows to a Google Sheet and emails the sales team.
- **Your own serverless function** (Vercel/Netlify/Cloudflare): forward to email + WhatsApp Business API + Google Sheets.

**Whatever you choose, validate again on the server and add rate limiting / CAPTCHA (e.g. Cloudflare Turnstile).** Client-side checks exist for user experience, not security.

Until an endpoint is set, the site runs in **preview mode**: forms validate and show the success screen (with a visible "preview mode" note) and offer a WhatsApp hand-off with the details pre-filled.

---

## 6. Analytics

Set `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` in `.env.local` to enable Google Analytics 4. Successful form submissions fire a `generate_lead` event (`src/lib/analytics.ts`).

---

## 7. SEO

- Unique title, description, canonical URL and Open Graph/Twitter tags on every page (`src/lib/seo.ts`).
- `sitemap.xml` and `robots.txt` generated at build time from the content files.
- JSON-LD schema: Organization, WebSite, BreadcrumbList, Product, Article and FAQPage (`src/lib/schema.ts`).
- Set `NEXT_PUBLIC_SITE_URL` to the live domain before building for production.

---

## 8. Deployment

The build outputs a static site to `/out`.

- **Vercel / Netlify / Cloudflare Pages:** connect the repository; build command `npm run build`; output directory `out`. Add the environment variables in the dashboard.
- **Traditional hosting (cPanel, etc.):** run `npm run build` locally and upload the *contents* of `/out` to `public_html`. Pages use trailing slashes (`/about/index.html`), which works on any web server. Configure the server to serve `404.html` for missing pages.

---

## 9. Accessibility & performance notes

- Semantic landmarks, one `<h1>` per page, skip link, visible focus states, keyboard-operable menus, tabs and accordions.
- All animations respect `prefers-reduced-motion`. Content stays visible if JavaScript fails.
- Images are responsive (AVIF → WebP → JPEG), lazy-loaded below the fold, with reserved dimensions to prevent layout shift.
- Add `?qa` to any URL to disable reveal animations (handy for full-page screenshots).

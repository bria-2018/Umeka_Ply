# Umeka Website — Agent Build Brief

Read this file first. It tells you what to build, what's already decided, and what to ask the client for before inventing anything. The other two files in this folder are source material:

- `umeka-homepage.html` — an approved, working homepage prototype (single self-contained HTML/CSS/JS file). Treat this as the design and interaction reference, not throwaway. Rebuild it faithfully in the chosen stack rather than redesigning it.
- `umeka-website-strategy.md` — the full strategy doc: sitemap, page-by-page content, design tokens, tech stack recommendation, SEO plan and open questions.

---

## 1. What to build

A production website for **Umeka** ("Trusted with Pride"), an Indian plywood/block board/flush door brand, covering the sitemap in `umeka-website-strategy.md` (Stage 2). Start with:

1. Homepage — port `umeka-homepage.html` into the project's component structure. Keep the copy, layout, breakpoints and the "Built layer by layer" interactive explorer exactly as built; that section is the brand's signature interaction, not decoration.
2. A reusable **product detail template** (spec in Stage 4.5 of the strategy doc) — needed before real product pages can be entered.
3. Category pages for Calibrated Plywood, Block Board, Flush Doors (Stage 4.2–4.4).
4. Contact/enquiry page with the same form fields and routing behavior as the homepage form.
5. About, Why Umeka, Professionals, Dealers, Resources/FAQ per Stage 4.

Do not build features not in the sitemap (no e-commerce, no login/cart) unless the client asks.

## 2. Tech stack

Use the stack recommended in Stage 7 of the strategy doc: **Next.js + TypeScript + Tailwind CSS**, a headless CMS (Sanity preferred) for products/FAQs/guides/documents, hosted on Vercel. If the environment or client has a different preference already set up, defer to that — the design tokens and content below are stack-agnostic.

Design tokens (also in the HTML's `:root`):
```
--ivory:#F7F4EE   --sand:#E7DDCB   --stone:#D6CBB6
--walnut:#5C3F2A  --charcoal:#26251F
--green:#1F3A31   --green-2:#2B4A3F
--bronze:#A9803F  --bronze-ink:#7A5A26
Display font: Noto Serif Display (light weights)
Body font: Inter
```

## 3. Content rules — read before writing any copy

- **Never copy content from margoply.com or any competitor.** The strategy doc's content is already original; use it as-is or extend it in the same voice.
- **Never invent facts.** Any line marked `[VERIFY]` in the strategy doc (product specs, certificates, warranty terms, manufacturing details, dealer counts, years of experience, etc.) must stay as a placeholder or empty CMS slot until the client supplies real data. Do not fill gaps with plausible-sounding numbers.
- The homepage's "Pride, backed by paper" section and the testimonials section are intentionally empty/placeholder states (dashed borders, "Pending verification" labels). Keep that pattern for any other unverified content — don't quietly remove the disclosure.
- Do not use the word "Margo" or reference the sibling brand anywhere in code, comments, alt text, metadata or copy.

## 4. Open items to get from the client before/while building

Listed in full at the end of `umeka-website-strategy.md` ("Open questions"). The blocking ones for a real build:
- Product line names, grades, thicknesses, sizes, standards per product (needed for the CMS schema and category/product pages).
- Logo files (SVG preferred) — the prototype uses a temporary text wordmark.
- Confirmation of whether the Kutch facility is Umeka's own unit or a partner unit (affects "we make" language).
- Certificates/test reports/warranty terms, if and when available.
- Legal entity name for footer copyright and privacy policy.
- Dedicated sales WhatsApp number, if different from +91 97252 08788.

## 5. Form/enquiry behavior

The prototype's enquiry form (fields: name, phone, email [optional], city, "I am a", product interest, requirement [optional]) currently opens WhatsApp with a pre-filled message as a stand-in. In production, wire it to:
1. Send an email to info@umekainternational.in
2. Send a WhatsApp notification to the sales number
3. Log the submission to a Google Sheet

Add spam protection (Turnstile or reCAPTCHA) and server-side validation.

## 6. QA checklist before calling anything done

- Matches the responsive behavior of `umeka-homepage.html` at 360/600/900/1200/1680px.
- Lighthouse/Core Web Vitals: LCP < 2.5s on mid-range mobile, CLS < 0.1.
- Keyboard navigable, visible focus states, `prefers-reduced-motion` respected (the layer explorer and hero animation both already check for this in the prototype — preserve that).
- No placeholder/lorem-ipsum content shipped to production without a visible "pending" indicator, per the Kajaria PLY cautionary example in the strategy doc.
- Organization/Product/FAQ schema present per Stage 8.

## 7. Full detail

Everything else — exact page copy, SEO plan, roadmap and phasing, feature priority (Phase 1/2/3) — is in `umeka-website-strategy.md`. That document is the source of truth for content; this file is the source of truth for how to execute it.

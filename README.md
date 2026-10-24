# Umeka Ply — Production Website Documentation

> **Tagline:** Trusted with Pride  
> **Brand Journey:** Established in 1998 as Jyoti Enterprise  
> **Official Instagram:** [@umeka.ply](https://www.instagram.com/umeka.ply)  
> **Sales Desk & WhatsApp:** +91 97252 08788 (`info@umekainternational.in`)  
> **Manufacturing Hub:** Survey No. 416, 1 & 2, Chopadva, Bhachau, Kutch, Gujarat 370 140  
> **Corporate HQ:** E-1, Highway Estate, Sarkhej-Sanand Road, Sarkhej, Ahmedabad, Gujarat 382 210  

---

## 1. Project Overview & Architecture

Umeka Ply is a static, high-performance, multi-page website built with modern HTML5, CSS3, and vanilla JavaScript. It is designed to be lightweight, instant-loading, search-engine indexable, and easy to host on any standard web server without runtime dependencies.

### Directory Structure

```
e:/Umeka/Umeka_Website/
├── index.html                           # Master Homepage (Hero slider, layer explorer, process video, founder note)
├── sitemap.xml                          # XML Sitemap with all 32 pages indexed
├── robots.txt                           # Search engine crawling directives
├── sitemap.html                         # User-facing visual sitemap
├── privacy-policy.html                  # Privacy policy
├── terms.html                           # Terms of service
│
├── assets/
│   ├── css/
│   │   ├── main.css                     # Complete production stylesheet (Brand tokens, typography, layouts)
│   │   └── explorer.css                 # 3D layer explorer component styles
│   ├── js/
│   │   ├── main.js                      # Core JS (Sticky header, mobile drawer, popup, modals, WhatsApp forms)
│   │   ├── layer-explorer.js            # Interactive layer explosion module
│   │   └── product-finder.js            # "Where are you building?" interactive decision engine
│   └── images/
│       ├── logo-color.png               # High-res color brand logo (for light backgrounds)
│       ├── logo-white.png               # High-res white brand logo (for dark headers & footers)
│       ├── logo.png                     # Standard icon
│       ├── hero-1.jpg .. hero-4.jpg     # Homepage slider photography
│       ├── prod-ply.jpg .. prod-door.jpg# Product photography
│       └── space-*.jpg                  # Living spaces & gallery photography
│
├── products/
│   ├── index.html                       # Products Hub (Showcase cards & comparative matrix)
│   ├── calibrated-plywood.html          # Calibrated Plywood technical spec sheet
│   ├── block-board.html                 # Block Board solid timber batten core guide
│   ├── flush-doors.html                 # Flush Doors acoustic & dimensional stability spec
│   └── product-detail-template.html     # Reusable layout template for new products
│
├── applications/
│   ├── index.html                       # Applications Hub ("Where Are You Building?")
│   ├── kitchens.html                    # Modular Kitchens & under-sink BWP carcass guidelines
│   ├── wardrobes-and-bedrooms.html      # 8-Foot tall wardrobe shutters & bed platform boxes
│   ├── living-rooms-tv-units.html       # Floating TV consoles (anti-sag block board) & wall panelling
│   ├── tables-and-shelving.html         # Long dining tables & heavy library shelves
│   ├── doors-and-partitions.html        # Flush doors & floor-to-ceiling privacy dividers
│   └── offices-commercial.html          # Modular workstations & executive boardroom cladding
│
├── about/
│   └── index.html                       # 1998 heritage, Founder Sandeep Mishra address, Kutch plant
│
├── why-umeka/
│   ├── index.html                       # 6-step manufacturing process & layer inspection
│   ├── standards.html                   # IS 303, IS 710, IS 1659, IS 2202 verification status & preview modals
│   └── warranty.html                    # Transparent warranty policy & claim procedures
│
├── dealers/
│   └── index.html                       # Channel distribution, POS display rack, onboarding form
│
├── professionals/
│   ├── index.html                       # Trade hub for architects, contractors & buyers
│   ├── architects-designers.html        # BOQ specifications, BIM/CAD details & sample box requests
│   ├── contractors-carpenters.html      # Zero-shimming calibration & WhatsApp tech hotline
│   └── project-buyers.html              # Bulk volume procurement & staged container delivery
│
├── resources/
│   ├── index.html                       # Material knowledge hub & 5 guide cards
│   ├── how-to-choose-plywood.html       # Buyer's guide for room conditions & thickness
│   ├── mr-bwr-bwp-explained.html        # Boiling water tests, resin chemistry & IS grades
│   ├── block-board-vs-plywood.html      # Solid battens vs cross-grain veneers structural comparison
│   ├── choosing-flush-door.html         # Internal stiles, infill battens & lock blocks
│   └── how-to-spot-quality-plywood.html # 7-point on-site quality inspection checklist
│
└── contact/
    └── index.html                       # Ahmedabad sales HQ & Kutch plant desks, 9-field enquiry
```

---

## 2. Local Preview & Testing

To preview the website locally on your computer:

```bash
# Using Node.js built-in HTTP server or any static server
npx serve e:/Umeka/Umeka_Website -p 4000
```
Open **`http://localhost:4000/`** in any browser.

To test the page without the first-time welcome popup appearing, append `?nopopup` to any URL (e.g. `http://localhost:4000/?nopopup`).

---

## 3. Brand & Typography System

- **Serif Heading Font:** `Cormorant Garamond` (weights: 400, 500, 600, 700)  
- **Sans-Serif Body Font:** `Inter` (weights: 300, 400, 500, 600, 700)  
- **Brand Colors:**
  - Deep Forest Green: `--green: #1F3A31`
  - Accent Gold: `--yellow: #C59B27`
  - Warm Sand / Ivory: `--sand: #F7F4EE`, `--ivory: #FDFBF7`
  - Dark Charcoal Ink: `--ink: #1A1D1A` (Strictly zero `#000000` pure black)
- **Buttons:** Rounded pills with `border-radius: var(--radius-pill)` (9999px).

---

## 4. How to Replace Placeholder Images

Every inner page includes dedicated architectural image placeholders (`.img-placeholder`) with exact recommended dimensions and photo briefs.

To drop in a photo:
1. Resize and optimize your image to the recommended size (e.g. `1200 × 600 px` for heroes, `600 × 400 px` for cards) in WebP or JPEG format.
2. Save the file into `assets/images/`.
3. In the corresponding HTML file, replace the placeholder `<div>` with an `<img>` tag:
   ```html
   <img src="../assets/images/your-photo.jpg" alt="Description" style="width:100%;height:auto;border-radius:4px;">
   ```
*(Refer to `photo_asset_master_guide.md` in the documentation folder for the complete slot-by-slot photo schedule).*

---

## 5. WhatsApp & Lead Generation Integration

All enquiry forms on the homepage and inner pages route directly to WhatsApp with pre-filled lead details:
- **Default Number:** `+91 97252 08788`
- **Submission Format:**
  ```text
  Hello Umeka Team, I would like to connect regarding a requirement.

  👤 Name: [User Name]
  📞 Phone: [User Phone]
  🏢 Firm / Business: [Firm Name]
  ✉️ Email: [Email]
  📍 City & State: [City]
  💼 Category / Role: [Architect / Dealer / Contractor / Homeowner]
  🪵 Product Interest: [Calibrated Plywood / Block Board / Flush Doors]
  🏗️ Project Type: [Residential / Commercial]
  📦 Approximate Requirement: [e.g. 50 sheets 18mm]
  💬 Requirement Details: [User Message]
  ```
To change the recipient WhatsApp number, update the phone number in `assets/js/main.js` (line 271: `https://wa.me/919725208788`).

---

## 6. Deployment Guidelines

This website is 100% static and can be deployed instantly to any host:
- **cPanel / Apache / Nginx:** Upload all files directly to your `public_html/` or `/var/www/html/` directory.
- **Vercel / Netlify / Cloudflare Pages:** Push to a Git repository and deploy with root directory set to `.`.
- **AWS S3 + CloudFront:** Sync the files to an S3 bucket configured for static web hosting.

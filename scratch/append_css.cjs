const fs = require('fs');

const innerCss = `

/* ==========================================================================
   UMEKA INNER PAGES & DESIGN SYSTEM EXTENSIONS
   Consistent Typography (Cormorant Garamond & Inter), Brand Green & Gold,
   Architectural Image Placeholders with Exact Dimensions, Spec Tables, & Forms
   ========================================================================== */

/* Page Hero */
.page-hero {
  background: var(--sand);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding-block: clamp(2.75rem, 5vw, 4.5rem);
  position: relative;
}
.page-hero.hero-dark {
  background: var(--green);
  color: var(--white);
}
.page-hero.hero-dark h1,
.page-hero.hero-dark .breadcrumbs a,
.page-hero.hero-dark .breadcrumbs span {
  color: var(--white);
}
.page-hero.hero-dark .lede {
  color: rgba(255, 255, 255, 0.88);
}

.breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--grey);
  margin-bottom: 1.15rem;
  letter-spacing: 0.03em;
}
.breadcrumbs a {
  color: var(--grey);
  text-decoration: none;
  transition: color 0.2s ease;
}
.breadcrumbs a:hover {
  color: var(--green);
}
.breadcrumbs span[aria-hidden="true"] {
  color: rgba(0, 0, 0, 0.25);
}

.page-hero h1 {
  font-family: var(--serif);
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  line-height: 1.12;
  color: var(--green);
  margin: 0.75rem 0 1rem;
  font-weight: 600;
  max-width: 26ch;
}
.page-hero .lede {
  font-size: clamp(1.02rem, 1.35vw, 1.18rem);
  color: var(--ink-soft);
  max-width: 65ch;
  line-height: 1.62;
  margin: 0;
}
.page-hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1.5rem;
}

/* Architectural Image Placeholder Component */
.img-placeholder {
  position: relative;
  width: 100%;
  background: linear-gradient(135deg, #F4EFE6 0%, #EAE2D5 100%);
  border: 1.5px dashed rgba(197, 155, 39, 0.5);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1.75rem;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}
.img-placeholder:hover {
  border-color: var(--yellow);
  box-shadow: 0 8px 24px rgba(197, 155, 39, 0.08);
}

.img-placeholder-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.3rem 0.85rem;
  background: var(--green);
  color: var(--white);
  font-family: var(--sans);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-radius: var(--radius-pill);
  margin-bottom: 0.75rem;
}
.img-placeholder-size {
  font-family: monospace;
  font-size: 0.96rem;
  font-weight: 700;
  color: var(--green);
  margin-bottom: 0.35rem;
  background: rgba(255, 255, 255, 0.75);
  padding: 0.2rem 0.65rem;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.06);
}
.img-placeholder-desc {
  font-size: 0.85rem;
  color: var(--grey);
  max-width: 48ch;
  line-height: 1.45;
  margin: 0;
}

/* Aspect Ratios */
.img-ratio-16-9 {
  aspect-ratio: 16 / 9;
}
.img-ratio-3-2 {
  aspect-ratio: 3 / 2;
}
.img-ratio-4-3 {
  aspect-ratio: 4 / 3;
}
.img-ratio-2-1 {
  aspect-ratio: 2 / 1;
  min-height: 240px;
}
.img-ratio-banner {
  aspect-ratio: 21 / 9;
  min-height: 260px;
}
.img-ratio-portrait {
  aspect-ratio: 3 / 4;
  min-height: 380px;
}

/* 2-Column Overview Split (Hero Visual + Key Points) */
.inner-split-2 {
  display: grid;
  gap: clamp(2rem, 4vw, 3.5rem);
  align-items: center;
}
@media (min-width: 900px) {
  .inner-split-2 {
    grid-template-columns: 1fr 1fr;
  }
  .inner-split-2.visual-large {
    grid-template-columns: 1.15fr 0.85fr;
  }
}

/* Spec Sheet & Technical Table */
.spec-table-wrap {
  width: 100%;
  overflow-x: auto;
  margin-top: 1.5rem;
  background: var(--white);
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
}
.spec-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.92rem;
}
.spec-table thead th {
  background: #F7F4EE;
  color: var(--green);
  font-family: var(--sans);
  font-weight: 600;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.95rem 1.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
.spec-table tbody td {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  color: var(--ink-soft);
  line-height: 1.5;
  vertical-align: middle;
}
.spec-table tbody tr:last-child td {
  border-bottom: none;
}
.spec-table tbody tr:hover td {
  background: rgba(247, 244, 238, 0.45);
}
.pending {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.2rem 0.6rem;
  background: rgba(197, 155, 39, 0.12);
  color: #8C6D15;
  border: 1px solid rgba(197, 155, 39, 0.3);
  font-size: 0.78rem;
  font-weight: 600;
  border-radius: var(--radius-pill);
}

/* Card Grids for Products, Applications, & Pillars */
.card-grid-3 {
  display: grid;
  gap: 1.75rem;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
}
.card-grid-2 {
  display: grid;
  gap: 1.75rem;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
}
.card-grid-4 {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.feature-card {
  background: var(--white);
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 4px;
  padding: clamp(1.5rem, 3vw, 2rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.02);
}
.feature-card:hover {
  border-color: rgba(197, 155, 39, 0.5);
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
}
.feature-card h2, .feature-card h3 {
  font-family: var(--serif);
  color: var(--green);
  line-height: 1.25;
}
.feature-card p {
  color: var(--grey);
  font-size: 0.94rem;
  line-height: 1.6;
}
.feature-card-num {
  font-family: var(--serif);
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--yellow);
  line-height: 1;
  margin-bottom: 0.75rem;
}

/* 3-Pillar Highlight Grid */
.pillars {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
.pillars > div {
  background: var(--white);
  padding: 1.75rem;
  border-left: 3px solid var(--yellow);
  border-radius: 0 4px 4px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
  border-top: 1px solid rgba(0, 0, 0, 0.04);
  border-right: 1px solid rgba(0, 0, 0, 0.04);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}
.pillars h3 {
  font-family: var(--serif);
  font-size: 1.35rem;
  color: var(--green);
  margin-bottom: 0.5rem;
}
.pillars p {
  font-size: 0.92rem;
  color: var(--grey);
  line-height: 1.55;
  margin: 0;
}

/* Editorial & Guide Content Wrappers */
.article-wrap {
  max-width: 820px;
  margin: 0 auto;
  line-height: 1.75;
  font-size: 1.05rem;
  color: var(--ink-soft);
}
.article-wrap h2 {
  font-family: var(--serif);
  font-size: clamp(1.8rem, 3vw, 2.3rem);
  color: var(--green);
  margin: 2.75rem 0 1rem;
  line-height: 1.25;
}
.article-wrap h3 {
  font-family: var(--serif);
  font-size: 1.5rem;
  color: var(--green);
  margin: 2rem 0 0.75rem;
}
.article-wrap p {
  margin-bottom: 1.35rem;
}
.article-wrap ul, .article-wrap ol {
  margin: 1rem 0 1.5rem 1.5rem;
}
.article-wrap li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}
.article-wrap blockquote {
  background: var(--sand);
  border-left: 4px solid var(--yellow);
  padding: 1.25rem 1.75rem;
  margin: 2rem 0;
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.25rem;
  color: var(--green);
  border-radius: 0 4px 4px 0;
}
.article-lead {
  font-size: 1.18rem;
  line-height: 1.65;
  color: var(--ink);
  font-weight: 400;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding-bottom: 1.5rem;
}
.checklist {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}
.checklist li {
  position: relative;
  padding-left: 1.85rem;
  margin-bottom: 0.85rem;
}
.checklist li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--green);
  font-weight: 700;
  font-size: 1.1rem;
}
.warning-callout {
  background: #FEF7EE;
  border: 1px solid #F5D3A6;
  border-left: 4px solid #D97706;
  padding: 1.25rem 1.5rem;
  border-radius: 2px;
  margin: 2rem 0;
}
.warning-callout h4 {
  font-size: 1rem;
  color: #92400E;
  margin-bottom: 0.4rem;
  font-weight: 600;
}
.warning-callout p {
  font-size: 0.92rem;
  color: #78350F;
  margin: 0;
  line-height: 1.55;
}

/* Inner Page Contact & Enquiry Form */
.c-grid {
  display: grid;
  gap: clamp(2rem, 5vw, 4rem);
}
@media (min-width: 900px) {
  .c-grid {
    grid-template-columns: 1fr 1.15fr;
  }
}
.reach {
  display: grid;
  gap: 1.5rem;
  margin-top: 1.75rem;
}
.reach dt {
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--grey);
  margin-bottom: 0.25rem;
  font-weight: 600;
}
.reach dd {
  margin: 0;
  font-size: 1.05rem;
  color: var(--green);
  font-weight: 500;
}
.reach dd a {
  color: var(--green);
  text-decoration: none;
}
.reach dd a:hover {
  color: var(--yellow);
}

.enq-form {
  background: var(--white);
  padding: clamp(1.75rem, 3.5vw, 2.5rem);
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.03);
  display: grid;
  gap: 1.2rem;
}
.f-row {
  display: grid;
  gap: 1rem;
}
@media (min-width: 600px) {
  .f-row {
    grid-template-columns: 1fr 1fr;
  }
}
.enq-form label {
  display: grid;
  gap: 0.4rem;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--ink);
}
.enq-form input,
.enq-form select,
.enq-form textarea {
  width: 100%;
  padding: 0.65rem 0.9rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 3px;
  font-family: var(--sans);
  font-size: 0.94rem;
  background: var(--white);
  color: var(--ink);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.enq-form input:focus,
.enq-form select:focus,
.enq-form textarea:focus {
  outline: none;
  border-color: var(--green);
  box-shadow: 0 0 0 3px rgba(31, 58, 49, 0.1);
}
.enq-form textarea {
  min-height: 110px;
  resize: vertical;
}
.f-note {
  font-size: 0.8rem;
  color: var(--grey);
  font-weight: 400;
}

/* Callout Band */
.inner-cta-band {
  background: var(--green);
  color: var(--white);
  padding: clamp(2.5rem, 4vw, 3.5rem);
  border-radius: 4px;
  margin-top: 3.5rem;
  display: grid;
  gap: 1.5rem;
  align-items: center;
}
@media (min-width: 860px) {
  .inner-cta-band {
    grid-template-columns: 1.4fr 1fr;
  }
}
.inner-cta-band h3 {
  font-family: var(--serif);
  font-size: clamp(1.8rem, 2.5vw, 2.3rem);
  color: var(--white);
  margin-bottom: 0.5rem;
}
.inner-cta-band p {
  color: rgba(255, 255, 255, 0.88);
  font-size: 1rem;
  margin: 0;
  line-height: 1.6;
}

/* Footer & Global Consistency across Inner Pages */
.f-grid {
  display: grid;
  gap: clamp(2rem, 4vw, 3.5rem);
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}
.f-base {
  margin-top: 3.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.84rem;
  color: rgba(255, 255, 255, 0.7);
}
.f-base a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-left: 1.25rem;
}
.f-base a:hover {
  color: var(--yellow);
}

.mbar {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--green);
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  z-index: 990;
  padding: 0.65rem 1rem;
  justify-content: space-around;
}
@media (max-width: 768px) {
  .mbar {
    display: flex;
  }
}
.mbar a {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--white);
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 500;
}
.mbar a.wa {
  color: #25D366;
  font-weight: 600;
}

/* End of extensions */
`;

fs.appendFileSync('e:/Umeka/Umeka_Website/assets/css/main.css', innerCss);
console.log('Appended inner page CSS successfully');

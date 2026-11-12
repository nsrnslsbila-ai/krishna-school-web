# Krishna Montessori School — Website Pitch Prototype

> **Concept website, not an official Krishna Montessori School website.**
>
> This project is a complete static, responsive, multi-page website for a client pitch. Its text, photos, events, programs, and interactions demonstrate a proposed direction. All unverified school facts are intentionally excluded or marked as concept placeholders.

## Overview

**Working concept:** *Little minds. Big possibilities.*  
**Creative direction:** Warm, playful, editorial Montessori-inspired, with navy / sky blue informed by the reference logo.  
**Technology:** Accessible HTML5, CSS3, vanilla JavaScript. **No runtime dependencies, build step, environment variables, or API keys.**

This no-build stack was chosen for the prototype so its exported website can be uploaded to GitHub and served directly on Vercel, with minimal opportunity for build failures. A later production phase can migrate the approved design to Next.js/TypeScript and connect a CMS or admissions CRM as needed.

## Pages

| URL | Purpose |
|---|---|
| `/` | Homepage, core narrative, sample learning pathways, School Life preview, embedded Learning Path Finder, demo events, primary CTAs |
| `/about/` | Mission-style *concept* copy, approach, proposed values, credentials framework without invented factual claims |
| `/programs/` | Three **sample** pathways: Early Discovery, Kindergarten, Elementary |
| `/school-life/` | Filterable stock photo gallery, photo detail modal, illustrative daily rhythm |
| `/events/` | Six **fictional** event concepts, Upcoming/Past filters, event detail modals, demo RSVP, demo newsletter |
| `/admissions/` | Admission steps concept, Learning Path Finder, school tour request demo with validation, FAQs |
| `/contact/` | School Instagram, placeholder contacts, local-only message form |
| `/credits/` | Photo source links and presentation disclosures |

## Interactive features

- Mobile navigation with accessible state (`aria-expanded`)
- Learning Path Finder: choose child's age group and traffic interest; get a relevant concept-page recommendation; restart at any point
- Gallery filtering and full-size modal preview with source attribution
- Sample event filtering, detail preview, and simulated RSVP
- School tour request, contact form, and newsletter signup with validation, **demo-only confirmations**
- Collapsible FAQs, animated reveals with `prefers-reduced-motion` support
- Responsive layouts for phones, tablets, desktop

**IMPORTANT — forms do not transmit or persist personal data.** There is no CRM, email service, database, analytics, or registration backend. Form submissions are stopped in JavaScript and show local, simulated confirmations. Do not use this as a real admissions form until a backend, privacy policy, security controls, and school staff workflow are implemented.

## Start a local preview

Unzip the project, then in the extracted folder run:

```bash
python3 -m http.server 8000
```

Open **http://localhost:8000**. Using a local web server is preferred because the site uses absolute paths (`/about/`, `/assets/...`) for clean Vercel URLs.

The site will load visual photography from `images.unsplash.com`. An Internet connection is required for those demo images and for the external Google Fonts CSS request. Layouts have gradient image placeholders if the CDN is unavailable.

## Deploy through GitHub → Vercel

1. Create a new **empty** GitHub repository, for example `krishna-montessori-pitch`.
2. Extract this ZIP, open a terminal in the extracted folder, and run:

```bash
git init
git add .
git commit -m "Add Krishna Montessori pitch website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/krishna-montessori-pitch.git
git push -u origin main
```

3. Open Vercel → **Add New → Project** → Import Git Repository.
4. Select the repository. Set **Framework Preset: Other**. No build command, install command, or environment variables are required. Serve the repository root as the output.
5. Deploy. Vercel will provide a `*.vercel.app` URL. Subsequent pushes to `main` can trigger automatic deployments via Git integration.

Alternatively, after installing/authenticating Vercel CLI and selecting the correct account/team/project:

```bash
vercel
# after preview verification, only if authorized to publish production:
vercel --prod
```

A custom domain is **not** included. The prototype intentionally has `<meta name="robots" content="noindex, nofollow">`, an `X-Robots-Tag` header, and `robots.txt` disallowing indexing. Remove/adjust these controls only after formal client approval and replacement of placeholders.

## Files and editing

```text
.
├── index.html                # Home
├── about/index.html
├── programs/index.html
├── school-life/index.html
├── events/index.html
├── admissions/index.html
├── contact/index.html
├── credits/index.html
├── assets/
│   ├── styles.css           # All styles and responsive breakpoints
│   ├── site.js              # Finder, filtering, modals, forms, mobile menu
│   ├── logo-concept.svg     # Proposal-only wordmark icon
│   ├── favicon.svg
│   └── illustration-leaf.svg
├── build_site.py            # Source-of-truth for reusable headers, pages, photo URLs
├── docs/
│   ├── PITCH-GUIDE.md
│   ├── CONTENT-REPLACEMENT-CHECKLIST.md
│   ├── PHOTO-SOURCES.md
│   ├── logo-reference-upload.png
│   └── sitemap-template.xml
├── robots.txt
├── vercel.json
└── README.md
```

For text/structural edits, update `build_site.py` then regenerate static HTML:

```bash
python3 build_site.py
```

For palette and layout edits: `assets/styles.css`, especially the `:root` variables.  
For interactive logic: `assets/site.js`.  
For photo changes: the `PHOTOS` map in `build_site.py` (only use approved assets for live launch).

**Note:** If regenerating after manually editing generated HTML, your manual HTML changes will be overwritten. Edit `build_site.py` for persistent content changes.

## Before sending a live site to real parents

- Replace proposal-only logo with official branding after permission
- Verify institution name, official school sites, programs, age eligibility, timetable, curriculum, school address, contact details, tuition and admission rules
- Add authentic school media with parental consent/appropriate child image rights
- Replace fictional events with verified, approved event content
- Add verified credentials (do not confuse formal accreditation with Montessori training/association membership)
- Connect approved admissions, CRM, CMS, secure data capture, and staff notifications
- Implement privacy notice and consent relevant to the actual service
- Add final Indonesian/English copy and SEO after official approval
- Review third-party image and identifiable-person rights before commercial public use

## Image license and credits

See `docs/PHOTO-SOURCES.md` and `/credits/` for per-image photo-page links and photographer names.

Unsplash License: https://unsplash.com/license — free commercial and noncommercial use is generally permitted, attribution encouraged. **The license does not automatically clear rights of identifiable people (including children), trademarks, property, or school endorsements.** Treat these images as visual references for pitching and replace/recheck permissions before public production.

## Suggested future production architecture

After approval: Next.js + TypeScript + Tailwind, editable content in a CMS, secure admissions endpoints, tour scheduling integration, SEO, privacy/cookie policy as applicable, analytics with consent settings, and optional Bahasa Indonesia / English localization.

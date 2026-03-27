# Plan: Form Submissions, SEO, Google Analytics

## 1. Form Email Submission
- Create `netlify/functions/contact.ts` — receives POST, sends email via nodemailer + Gmail SMTP
- Install `nodemailer` + `@types/nodemailer`
- Add `/api/contact` redirect in `netlify.toml`
- Wire up Home hero form with state + submit handler
- Wire up Contact page form with state + submit handler
- Both forms POST `{ source, name, email, phone, area?, postcode?, subject?, message? }`
- Env vars needed: `GMAIL_USER`, `GMAIL_APP_PASSWORD`

## 2. SEO Improvements
- Add `public/robots.txt` with sitemap reference
- Add `public/sitemap.xml` with all public routes
- Improve keyword density for: "driving lessons London", "driving instructor London", "pass driving test London"
- Add FAQPage structured data on Home page
- Add BreadcrumbList structured data in SEO component
- Add `keywords` meta tag on all pages
- Ensure canonical links on all pages

## 3. Google Analytics 4
- Add gtag.js snippet in `index.html` with placeholder `G-XXXXXXXXXX`
- Create `src/lib/analytics.ts` with `trackEvent()` helper
- Track page views on route change in Layout.tsx
- Fire `generate_lead` conversion event on form submissions
- Fire `contact` event on Contact form submission

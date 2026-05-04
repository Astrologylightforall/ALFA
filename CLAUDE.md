# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ALFA (Astrology Light For All)** is a modern Next.js 16 website for a Vedic astrology consultation service. It features a bilingual interface (English/Hindi), 3D visual effects, an admin dashboard, and a simple file-based CMS for blog management.

- **Framework**: Next.js 16 with App Router (React 19, TypeScript)
- **Styling**: Tailwind CSS v4 with PostCSS
- **Animations**: GSAP, Framer Motion, React Three Fiber (Three.js)
- **Content**: MDX/markdown-based blog system
- **Admin**: Protected dashboard for managing blogs and appointments
- **Email**: Nodemailer integration for form submissions and notifications
- **Internationalization**: Custom LanguageProvider (en/hi)

## Development Commands

### Basic Setup
```bash
npm install          # Install dependencies
npm run dev          # Start development server at http://localhost:3000
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint (Next.js config with TypeScript)
```

### Single Test / Development Workflow
```bash
npm run dev          # Run dev server with hot reload
# Edit files in app/, components/, or lib/ — changes auto-reload
```

### Admin Access
1. Navigate to `/admin/login`
2. The admin panel uses cookie-based authentication (`alfa_admin_session`)
3. Admin routes protected by middleware (`middleware.ts`)
4. Features: Dashboard, Appointments, Blog CRUD, Settings

## Architecture & Structure

### App Router (Next.js 16)
```
app/
├── layout.tsx         # Root layout with providers (Lenis, Language, PageTransition)
├── page.tsx           # Homepage (composes section components)
├── globals.css        # Global styles + Tailwind directives
├── api/               # API routes (RESTful)
│   ├── auth/          # Login/logout endpoints
│   ├── blogs/[slug]/  # Single blog CRUD (GET, POST)
│   ├── appointments/  # Appointment management
│   ├── leads/         # Lead capture
│   └── submit/        # Contact/free-analysis form handler (email)
├── blog/
│   ├── page.tsx       # Blog listing
│   └── [slug]/page.tsx # Dynamic blog post pages
├── services/
│   ├── page.tsx       # Services grid
│   └── [slug]/page.tsx # Individual service pages (from SERVICES_DATA)
├── admin/             # Protected admin dashboard
│   ├── layout.tsx     # Admin shell with sidebar/nav
│   ├── page.tsx       # Dashboard overview
│   ├── login/page.tsx # Admin login
│   ├── blogs/         # Blog management (list + create + edit)
│   ├── appointments/  # Appointment list
│   └── settings/      # Site settings (TODO?)
└── [other pages]      # about, contact, free-analysis, testimonials, privacy, terms
```

### Components Organization
```
components/
├── layout/            # Layout wrappers (Header, Footer, StickyMobileBar, FloatingWhatsApp)
├── providers/         # Context providers (LanguageProvider, LenisProvider, PageTransitionProvider)
├── sections/          # Page sections used on homepage (Hero, ServicesGrid, CTABanner, etc.)
├── ui/                # Reusable UI elements (MysticBall, CustomCursor, ScrollProgress, AnimatedGrain)
└── seo/               # SchemaMarkup for structured data
```

### Data & Content
- **Static Data**: `lib/data.ts` contains `SERVICES_DATA`, `TESTIMONIALS_DATA`, `STATS_DATA`, `CONTACT_INFO`
- **Blog Content**: Markdown files in `content/blog/` with frontmatter (title, date, image, published)
- **Blog API**: `app/api/blogs/route.ts` reads/writes to `content/blog/` directory (file-based CMS)
- **Localization**: JSON files in `locales/` (`en.json`, `hi.json`) — accessed via LanguageProvider

### Key Utilities (`lib/`)
- `data.ts`: Centralized static content (services, testimonials, contact info)
- `email.ts`: Nodemailer helpers for admin/client notifications
- `gsap.ts`: GSAP animation configuration/helpers

### Styling & Theming
- **Tailwind**: `tailwind.config.js` with content scanning
- **PostCSS**: `postcss.config.mjs` with `@tailwindcss/postcss` plugin
- **Fonts**: Google Fonts (Cormorant Garamond, DM Sans, Noto Sans Devanagari) via `next/font`
- **CSS Variables**: Font families use CSS custom properties (`--font-cormorant`, etc.)
- **Custom UI**: MysticBall, CustomCursor, AnimatedGrain for visual flair

### 3D & Advanced Graphics
- `@react-three/fiber` + `@react-three/drei` for 3D scenes
- Components: `HeroStars`, `Starfield` (Three.js scenes)
- GSAP used for scroll-triggered animations (`@gsap/react`, `gsap`, `ScrollTrigger`)

### Internationalization
- `LanguageProvider` (components/providers/LanguageProvider.tsx) manages `lang` context
- Languages: English ('en'), Hindi ('hi')
- Static translations stored in `locales/*.json`
- UI toggles language; text content switches accordingly

### Authentication & Middleware
- Simple cookie-based session: `alfa_admin_session` = 'authenticated'
- `middleware.ts` protects all `/admin/*` routes (except login)
- Login: `POST /api/auth/login` (sets cookie), `POST /api/auth/logout` (clears cookie)
- No database; session is in-memory cookie (restart clears it)

### API Routes (Serverless)
- **Form Submission**: `POST /api/submit` — sends email via nodemailer (contact & free-analysis forms)
- **Blogs**: `GET/POST /api/blogs` — list all blogs, create new (markdown file)
- **Blog Slug**: `GET/POST /api/blogs/[slug]` — read, edit existing blog (by filename)
- **Appointments**: `GET/POST /api/appointments` — capture consultation bookings
- **Appointment by ID**: `GET/PATCH /api/appointments/[id]` — view/update status
- **Auth**: `POST /api/auth/login`, `POST /api/auth/logout`
- **Leads**: `GET/POST /api/leads` — lead capture (maybe email/newsletter)

### Environment Variables
Required for email functionality (stored in `.env.local`):
- `GMAIL_USER` — sender email (e.g., astrologylightforall@gmail.com)
- `GMAIL_APP_PASSWORD` — Google App Password for SMTP auth
- `EMAIL_TO` (optional) — where form emails are sent (default: same as GMAIL_USER)
- `SMTP_HOST` (optional, default: smtp.gmail.com)
- `SMTP_PORT` (optional, default: 465)

## Important Patterns & Conventions

- **Client Components**: Most components are "use client" especially interactive ones (animations, hooks)
- **Route Segments**: Dynamic routes use `[slug]` for blog and service pages
- **MDX Support**: `next-mdx-remote` renders blog content (markdown with JSX components)
- **Form Handling**: React Hook Form + Zod validation (see contact/free-analysis pages)
- **Scroll Effects**: Lenis smooth scrolling + GSAP ScrollTrigger for parallax/reveal animations
- **Responsive Design**: Tailwind breakpoints; mobile-first approach
- **Icons**: Lucide React (`lucide-react`) for consistent iconography
- **Colors**: Custom Tailwind palette likely defined in globals.css (gold theme: `gold-primary`, `cream`, etc.)
- **Accessibility**: Semantic HTML, ARIA labels where needed, focus states

## Known Constraints & Gotchas

- **No Database**: All data is file-based or in-memory. Blog posts are markdown files. Appointments are not persisted to disk (likely just in-memory array or needs implementation). Admin blog edit updates files on server filesystem.
- **Authentication**: Cookie-based session is NOT secure for production; only suitable for demo/personal use. No password hashing beyond plain text comparison (admin login appears to be hardcoded or simple check).
- **Email Configuration**: Without `GMAIL_APP_PASSWORD`, form submissions fail silently (returns 500 with warning in logs). Use a Google account with 2FA and generate App Password.
- **Next.js Version**: 16.1.7 — ensure compatibility with React 19 and new features (e.g., `next/font`, `next/image` optimized)
- **Three.js**: Large bundle; ensure lazy-loading if page performance suffers.
- **Tailwind v4**: Uses `@tailwindcss/postcss` plugin; ensure PostCSS is configured correctly.

## File Locations of Interest

- **Homepage Composition**: `app/page.tsx` (imports all section components)
- **Service Pages**: `app/services/[slug]/page.tsx` reads `SERVICES_DATA` from `lib/data.ts`
- **Blog Rendering**: `app/blog/[slug]/page.tsx` fetches markdown from `/api/blogs/[slug]` and renders with MDX
- **Admin Login**: `app/admin/login/page.tsx`
- **Admin Blog CRUD**: `app/admin/blogs/page.tsx` (list + create) and `app/admin/blogs/edit/[slug]/page.tsx`
- **Contact Form**: `app/contact/page.tsx` with `react-hook-form` posting to `/api/submit`
- **Main Layout**: `app/layout.tsx` wraps entire app with UI providers and global components

## Development Tips

- **Run dev with logs**: `npm run dev 2>&1 | tee dev.log` to capture server output
- **Test email locally**: Ensure `.env.local` has Gmail credentials; use real Gmail with App Password (not regular password)
- **Add new service**: Add entry to `SERVICES_DATA` in `lib/data.ts`; create dynamic `[slug]` page will auto-render.
- **Add new blog**: Use admin panel or manually create `.md` file in `content/blog/` with frontmatter.
- **Internationalization**: Add new keys to `locales/en.json` and `locales/hi.json`; use `useLanguage()` hook to access `t()` function.

## Testing

No formal test suite exists. Manual testing approach:
- Check admin panel CRUD operations (blogs, appointments)
- Verify form submits send email (check inbox/spam)
- Switch language and ensure all static text translates
- Test on mobile and desktop viewports
- Verify 3D scenes load without WebGL errors
- Check blog pages render markdown correctly (including code blocks, images)

## Git Workflow

- Main branch: `main`
- Recent work: ALFA admin + consultation matrix, Google Search Console, updated contact info with email API, Privacy Policy & Terms pages.
- Package files are modified (`package.json`, `package-lock.json`) — be cautious when reinstalling dependencies.

## Deployment Notes

- Hosted on Vercel (Next.js optimized)
- Static assets in `public/`
- Environment variables must be set in Vercel project settings for production email
- Build command: `npm run build`, output in `.next/`

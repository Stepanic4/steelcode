# SteelCode.cz | Senior Development Studio

Professional software engineering and high-end digital solutions. High performance, zero bloat, cold logic.

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router) — React Server Components by default.
- **Language:** TypeScript — Strict mode enabled.
- **Styling:** Tailwind CSS — Utility-first, zero runtime CSS.
- **State Management:** TanStack Query (optional) / React Context.
- **Runtime:** Node.js 22 (LTS) — Recommended for stability.

## 🏗 Architecture
Проект следует модульной структуре для обеспечения масштабируемости:
- `/app` — Routing and Server Components.
- `/components` — Reusable UI (Atomic design or feature-based).
- `/lib` — Core utilities and third-party configurations.
- `/hooks` — Shared client-side logic.
- `/types` — Global TypeScript definitions.

## 🚀 Key Features
- **Performance:** Optimized Core Web Vitals (LCP, FID, CLS).
- **Responsiveness:** Precision-tuned for resolutions from 320px to 4K.
- **i18n:** Full support for English and Czech (cs-CZ) out of the box.
- **SEO:** Dynamic Metadata API, JSON-LD, and automated sitemaps.
- **Theming:** System-preferred Dark/Light modes with CSS variables.

## 💻 Getting Started

### 1. Environment Setup
Create a `.env.local` file based on `.env.example`.

### 2. Install Dependencies
```Bash```
npm install

### 3. Development Server
```Bash```
npm run dev

### 4. Code Quality & Build
```Bash```
# Type-check
npm run type-check

# Linting
npm run lint

# Production build
npm run build
⚖️ Standards
Commits: Follow Conventional Commits (feat, fix, refactor).

Styling: Use Prettier and ESLint for consistent formatting.

Deployment: Vercel / Docker-ready.

## ⚖️ License
Copyright © 2026 SteelCode.cz. All rights reserved. 
Proprietary software. Unauthorized copying of files, via any medium is strictly prohibited.

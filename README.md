
SteelCode.cz | Senior Development Studio
Professional software engineering and high-end digital solutions. High performance, zero bloat, cold logic.

🛠 Tech Stack
Framework: Next.js 16.1 (App Router) — React 19 (Server Components).
Language: TypeScript 5 — Strict mode enabled.
Styling: Tailwind CSS 4.0 — Zero-runtime, engine-optimized styling.
3D/Graphics: Three.js, React Three Fiber, Framer Motion 12.
Runtime: Node.js 22 (LTS) — Recommended for production stability.

🏗 Architecture
The project follows a modular structure with strict separation of concerns within the src directory:
src/app/[locale] — Typed routing and Server Components with native i18n support.
src/components — UI component library (Shared, UI, Sections, Structure).
src/i18n — Localization configuration and routing logic.
src/context — Global application state.
messages/ — Localization repository (JSON-based).

🚀 Key Features
Performance: Optimized Core Web Vitals (LCP, FID, CLS) utilizing Turbopack.
Visuals: Integration of complex 3D scenes and Lottie animations with zero performance overhead.
i18n: Full support for English, Czech, and German out of the box (Dynamic Routing).
SEO: Dynamic Metadata API, automated sitemap generation, and structured data (JSON-LD).
PWA: Progressive Web App support with standalone installation capabilities.

💻 Getting Started
1. Environment Setup
Create a .env.local file based on .env.example.

2. Install Dependencies
```Bash```
npm install

3. Development Server
```Bash```
npm run dev

4. Quality Control
Type-check: npx tsc --noEmit
Linting: npm run lint
Production Build: npm run build

⚖️ Standards
Commits: Conventional Commits (feat, fix, refactor, style).
Code Style: ESLint 9 + Prettier for strict repository hygiene.
Deployment: Vercel / Docker-ready.

⚖️ License
Copyright © 2026 SteelCode.cz. All rights reserved. Proprietary software. Unauthorized copying of files via any medium is strictly prohibited.
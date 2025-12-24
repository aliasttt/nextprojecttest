# Marketplace Frontend (Technical Assessment)

Production-grade marketplace frontend inspired by Meshur, built with Next.js App Router.

## Tech stack

- **Next.js 16 (App Router)**
- **TypeScript (strict)**
- **Tailwind CSS**
- **Zustand** (global state)
- **Storybook** (UI catalog)
- **Framer Motion** (light usage)
- **ESLint + Prettier**

## Quick start

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Run Storybook:

```bash
npm run storybook
```

Run tests:

```bash
npm test
```

Build (production):

```bash
npm run build
npm run start
```

## Project scope

Minimum pages implemented:

- **Home**: product listing
- **Product detail**
- **Favorites**

Assumptions:

- A REST API exists (based on Meshur docs). For the assessment we simulate responses with **mock JSON**.

## Architecture overview

The goal is “real-world maintainability” without over-engineering:

- **`src/data/`**: mock “API client” + API response types (Meshur-inspired)
  - `src/data/products.json`: mock response payload
  - `src/data/meshur-api/products.client.ts`: data access (simulated REST)
- **`src/services/`**: UI-facing services (compose fetching + mapping)
  - `src/services/productService.ts`: returns domain `Product` models to pages
- **`src/domain/`**: domain types + mapping (business/data transformation)
  - `src/domain/product/product.mappers.ts`: maps API → UI/domain models
- **`src/components/`**: Atomic Design UI
  - `atoms/`, `molecules/`, `organisms/`, `templates/`
- **`src/stores/`**: Zustand stores (state logic isolated from UI)
  - `useFavoritesStore.ts`: normalized favorites state (persisted)
  - `useThemeStore.ts`: persisted theme preference
- **`src/store/`**: test files for stores
  - `favorites-store.test.ts`: unit tests for favorites store
- **`src/i18n/`**: centralized URL-based i18n
  - typed dictionaries and a provider hook (`useI18n`)

## URL-based i18n (`/en`, `/tr`)

Requirement: **URL-based** locale routing and **no hardcoded UI strings**.

- `middleware.ts` enforces locale prefixes:
  - `/` → `/en`
  - unknown paths → prefixed with `/en`
  - sets `NEXT_LOCALE` cookie for `<html lang>` in the root layout
- Dictionaries live in `src/i18n/en.json` and `src/i18n/tr.json` (centralized).
- UI components read strings through `useI18n()` instead of inline literals.

## Rendering strategy (SSR / SSG / ISR)

Rendering decisions are chosen per route (and documented inline in code):

- **Home (`/[locale]`) → ISR**
  - `revalidate = 60`
  - Product lists change; ISR keeps it fast + periodically fresh without full rebuilds.
  - This matches typical marketplace needs: fast cached listing pages + “fresh enough” data.
- **Favorites (`/[locale]/favorites`) → SSG “shell”**
  - Favorites are **client-specific** (persisted locally), so server renders a stable shell.
  - The list hydrates client-side and uses component-level code splitting.
- **Product detail (`/[locale]/products/[productId]`) → SSR**
  - Detail pages can change frequently; SSR ensures fresh data per request.
  - Alternative could be ISR, but SSR is a safer “always fresh” default for price-sensitive pages.

## State management (Zustand)

Favorites store is **normalized** and scalable:

- `ids: string[]`
- `byId: Record<string, { productId, addedAt }>`

Actions (`add/remove/toggle/has`) are defined in the store, and UI calls them via hooks.

Theme store is persisted and applied via:

- `ThemeInitScript` (prevents theme “flash” on first paint)
- `ThemeSync` (keeps `<html class="dark">` in sync)

## Data layer (mock API + mapping)

UI components and pages never reshape API payloads directly:

- API payload types: `src/data/meshur-api/product.api-types.ts`
- Mapper: `src/domain/product/product.mappers.ts`
- Service layer: `src/services/productService.ts` (fetch + map for pages)
- Formatting: `src/lib/format/format-currency.ts`

This keeps pages/components focused on rendering, not business logic.

## Performance

Implemented intentionally (no premature optimization):

- **`next/image`** for product images
- **Route-level code splitting** via App Router segments
- **Component-level code splitting** via dynamic import on Favorites list
- **Memoization where it matters** (e.g., filtering favorites list)

## SEO

- **Dynamic metadata** via `generateMetadata` (per page where relevant)
- **OpenGraph + Twitter** (notably on product detail)
- **Schema.org JSON-LD** on product detail pages
- **Custom 404** (`src/app/not-found.tsx`)
- **Custom 500-ish** behavior via error boundaries
  - `src/app/[locale]/error.tsx` and `src/app/global-error.tsx`
- **`sitemap.xml`** (`src/app/sitemap.ts`) and **`robots.txt`** (`src/app/robots.ts`)

## Storybook

Representative stories included:

- Button (atoms)
- ProductCard (organisms)
- Header (organisms)

Storybook runs with the **React + Vite** framework for reliability with Next 16.
Next-specific imports are stubbed only in Storybook (e.g. `next/image`, `next/link`, `next/navigation`).

## Testing (bonus)

Minimal Jest + React Testing Library tests:

- `src/store/favorites-store.test.ts`: core store behavior
- `src/components/molecules/FavoriteButton.test.tsx`: critical UI interaction

## Deployment (Vercel)

The project is deploy-ready:

- `npm run build` succeeds
- uses App Router conventions
- no server-only dependencies outside Next

## What’s intentionally kept simple (trade-offs)

- Authentication, real backend integration, pagination, filtering, and search are out of scope.
- Mock API is kept minimal but structured to swap to real REST calls later.
- Styling system is lean (Tailwind utilities) instead of a heavy design token framework.


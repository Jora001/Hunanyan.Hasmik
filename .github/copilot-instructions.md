<!-- Short, repo-specific instructions for AI coding agents -->
# Copilot / AI agent instructions for this repo

Summary
- This is a Vite + React + TypeScript portfolio site using Tailwind CSS and shadcn-style UI primitives.

Quick facts (use these as ground truth)
- Scripts: run `npm run dev` (vite), `npm run build`, `npm run preview`, `npm run lint` — see package.json for exact commands.
- Tooling: Vite, TypeScript, Tailwind, ESLint. Ignore the top-level README referencing Next.js — it is outdated.

Architecture & important paths
- App entry: `src/main.tsx` loads React and styles.
- Pages / sections: `src/components/*` contains all page sections (e.g. [src/components/AboutSection.tsx](src/components/AboutSection.tsx#L1)).
- UI primitives: `src/components/ui/` holds Radix-based primitives wrapped for this project (accordion, dialog, toast, input, etc.). Prefer these over ad-hoc markup.
- Hooks: `src/hooks/` contains small reusable hooks (e.g. `use-mobile.tsx`, `use-toast.ts`). Inspect `use-toast.ts` for how to use `sonner`/toaster.
- Utilities: `src/lib/utils.ts` for small helpers; check before adding duplicate utilities.

Conventions and patterns
- Component style: small, focused React components using TypeScript. Follow existing prop and export patterns.
- Styling: Tailwind utility classes. Many components use `class-variance-authority` + `clsx` for variant handling — follow that pattern for new composite components.
- Radix wrappers: Use components in `src/components/ui/` (e.g. `dialog.tsx`, `toast.tsx`) rather than direct Radix imports when building UI to preserve project conventions.
- State & data: Local UI state in components; async data uses `@tanstack/react-query` when added — check existing examples before introducing new global stores.

Developer workflows
- Dev server: `npm run dev`. Vite handles HMR.
- Build: `npm run build` (production) or `npm run build:dev` for dev-mode build.
- Lint: `npm run lint` runs ESLint across the repo.
- Testing: There are no test scripts in `package.json`; if adding tests, match TypeScript and vite-friendly tooling (Vitest or React Testing Library + Vitest).

Integration points & external dependencies to notice
- Routing: This is a single-page Vite React app (no Next routing). If you need per-page routes, `react-router-dom` is the dependency to use.
- Theming: `next-themes` is included — used for color mode toggling. Inspect `Navigation.tsx` and `main.tsx` for usage.
- Notifications: `sonner` + `src/hooks/use-toast.ts` are the established pattern for toasts.

When making changes
- Keep UI primitive wrappers consistent: update or add files under `src/components/ui/` when introducing new Radix patterns.
- Prefer reusing small hooks in `src/hooks/` over creating new ones unless functionality is broadly reusable.
- Update `tailwind.config.ts` if adding new global classes or plugin configuration.

Files to inspect when starting work
- [src/main.tsx](src/main.tsx#L1)
- [src/components/ui](src/components/ui)
- [src/hooks/use-toast.ts](src/hooks/use-toast.ts#L1)
- [package.json](package.json#L1)
- [vite.config.ts](vite.config.ts#L1)

If you find conflicting docs
- Trust `package.json` and the code in `src/` over root README text. Call out mismatches in PR descriptions.

Questions for maintainers
- Confirm the intended dev server port (README mentions a non-default port). Use `npm run dev` and report if a custom port is required.

If unclear sections remain, ask for a quick pointer to the component or workflow to inspect.

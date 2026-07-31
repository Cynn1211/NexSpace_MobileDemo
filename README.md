# NexSpace Mobile Demo

NexSpace 租客員工行動版互動原型，已遷移為標準 **Next.js App Router** 專案，可直接由 Vercel 建置及部署。

## Local development

```bash
npm install
npm run dev
npm run build
```

## Vercel deployment

1. Import `Cynn1211/NexSpace_MobileDemo` into Vercel.
2. Vercel will detect Next.js automatically; `vercel.json` explicitly sets `npm install` and `npm run build`.
3. Deploy without environment variables or API configuration. The prototype uses local mock data only.

## Project structure

- `app/` — Next.js App Router UI and interactions.
- `public/` — static assets.
- `next.config.ts` — Next.js configuration.
- `vercel.json` — Vercel build configuration.

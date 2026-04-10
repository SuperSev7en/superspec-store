# SUPER Spec — SuperSpec.store

Next.js storefront for **SUPER Spec**, migrated from a Shopify (Prestige theme) export. Product data is loaded from CSV exports; images can be mirrored under `public/assets/product-images/` via manifest mapping.

## Single source of truth for project docs

| Document | Purpose |
|----------|---------|
| [docs/HOW_TO_OPERATE.md](docs/HOW_TO_OPERATE.md) | Run locally, env vars, deploy, images |
| [docs/PROGRESS.md](docs/PROGRESS.md) | Progress tracker (Shopify → Next parity) |
| [docs/RESOURCES.md](docs/RESOURCES.md) | Official docs & reference links |
| [docs/SHOPIFY_THEME_PARITY.md](docs/SHOPIFY_THEME_PARITY.md) | Liquid theme ↔ Next.js mapping |

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Common commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run images:download` | Download product images from CSV URLs into `public/assets/product-images/` and refresh `manifest.json` |

## Deploy (Vercel)

```bash
npm run deploy:vercel
```

Requires [Vercel CLI](https://vercel.com/docs/cli) and a linked project. The script creates a git tag per deploy for rollback reference. See [docs/HOW_TO_OPERATE.md](docs/HOW_TO_OPERATE.md).

## Repository layout (short)

- `app/` — App Router pages (home, products, collections, cart, static pages, API).
- `components/shopify/` — Theme sections (home), header, footer.
- `components/store/` — Store-specific helpers (images, contact form).
- `lib/catalog/` — CSV catalog loader + image manifest resolution.
- `lib/shopify/` — Theme settings from exported `settings_data.json`.
- `public/assets/` — Theme CSS/JS and static images.
- `Shopify files/` — Original theme export + product CSVs (reference).

## License

Private project.

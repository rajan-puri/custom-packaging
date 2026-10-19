# Packform Custom Packaging Configurator

A responsive B2B concept configurator for custom-printed wet wipes packaging. It combines dedicated raster mockups with clipped HTML/CSS artwork layers so buyers can explore a visual direction, compare package specifications and prepare a quote request.

## Setup

```bash
npm install
npm run dev
```

Production and quality checks:

```bash
npm run build
npm run lint
npm test
```

## Project structure

- `src/config/catalog.js` — package, closure, material, finish, artwork and quantity options.
- `src/config/pricing.js` — illustrative pricing inputs and volume-tier calculations.
- `src/components/` — configurator, preview, summary and quote form UI.
- `public/mockups/` — one generated PNG base mockup for each supported package type.

## Preview assets

The four package mockups were generated specifically for this prototype and are stored locally. The coloured/sample or uploaded artwork is a separate clipped browser layer positioned over each format. PNG and JPG artwork can be previewed and scaled. PDF files are validated and retained in the UI, but are not rasterised for preview without a dedicated PDF rendering library or prepress service.

If a future package type has no matching image asset, add a dedicated mockup and overlay geometry before exposing it in `catalog.js`; the interface should never reuse an incorrect product image.

## Pricing and quote limitations

- All prices are illustrative demo values in USD. They are not production prices and exclude tooling, plates, freight, taxes and prepress.
- The quote form validates required contact fields and prepares a confirmation state, but it deliberately does **not** claim submission. There is no API endpoint in this prototype.
- Connect the submit handler in `QuoteDialog.jsx` to an authenticated CRM, email service or backend endpoint before production use. Only show a sent/success state after that endpoint confirms receipt.

## Preview limitations

This is an image-based visual composition, not a manufacturing-accurate 3D render or print proof. Perspective, print boundaries, material colour, finishing effects and dielines must be verified through prepress and physical sampling.

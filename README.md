# Stayfinder

A responsive Ghana-focused stays discovery demo built with React, TypeScript, and Vite.

## Features

- Search by Ghanaian city or region
- Browse coastal, countryside, heritage, city, and design stays
- Filter by nightly budget, bedrooms, and amenities
- Save stays during your visit
- View listing details and a demo availability flow
- Display prices in Ghanaian cedis (GH₵)

The property names, listing descriptions, ratings, and prices are illustrative sample data. Photos are representative and load from Unsplash. The booking interaction is a demo; it does not reserve a real property or collect payment.

## Run locally

Requirements: Node.js 22.12 or later and npm.

```bash
npm install
npm run dev
```

Open the local address printed by Vite.

Create a production build:

```bash
npm run build
npm run preview
```

## Upload to GitHub

1. Extract the downloaded ZIP file.
2. Create a new empty repository on GitHub.
3. Upload the extracted project files, keeping the `src` and `public` folders in place.

Alternatively, open a terminal in the extracted folder and run:

```bash
git init
git add .
git commit -m "Add Stayfinder"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the two uppercase placeholders with your GitHub username and repository name. Do not upload `node_modules` or the generated `dist` folder.
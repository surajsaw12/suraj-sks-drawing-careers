# SURAJ SKS — Drawing Skills & Careers

A responsive, static website starter for GitHub Pages. It contains 30 creative categories and a career catalogue with dedicated, data-driven profile pages.

## Included

- `index.html` — branded homepage, category cards, career search and learning sections.
- `category.html` — category detail page; each category lists its careers.
- `career.html` — full career profile template with overview, skills, workflow, visual references, tools, good practices, exercises, roadmap and opportunities.
- `data.js` — editable source of truth for all 30 categories and their career names.
- `app.js`, `category.js`, `career.js` — website behaviour and profile rendering.
- `styles.css` — responsive dark charcoal and gold visual theme.
- `assets/` — SKS logo and generated branded hero artwork.

Career pages use a URL such as `career.html?id=portrait-artist&category=portrait-figure`. Each career has its own URL and its content is rendered from the catalogue and profile template.

## Publish on GitHub Pages

1. Download and extract `SURAJ-SKS-Drawing-Skills-Careers.zip`.
2. Sign in to GitHub and create a new **Public** repository, for example `sks-drawing-careers`.
3. Upload **all files and folders inside this project folder** to the repository root. Do not upload only the ZIP file.
4. Open the repository's **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch **main** and folder **/(root)**, then click **Save**.
7. Wait for GitHub Pages to finish publishing. Your website address will look like `https://YOUR-USERNAME.github.io/sks-drawing-careers/`.

If you want the shorter address `https://YOUR-USERNAME.github.io/`, name the repository exactly `YOUR-USERNAME.github.io` and upload the project files to its root.

## Edit your website

- **Change career names or add careers:** edit `window.SKS_CATEGORIES` in `data.js`. Add a career name to the appropriate category's `careers` array.
- **Add a new category:** add an object with a unique `id`, `title`, `intro`, `image` (Unsplash photo ID) and `careers` array. The homepage count is derived from this data; the visual design currently expects your 30-category structure.
- **Change branding:** replace `assets/sks-logo.svg` with your own logo, keeping the same filename, or edit the SVG.
- **Change contact details:** replace the placeholder `hello@example.com` in `index.html` with your real email or contact link.
- **Change colours/layout:** edit CSS variables near the top of `styles.css`.

## Images and internet access

The custom SKS hero artwork is included locally. Category and career reference photographs are loaded from Unsplash image URLs, so visitors need an internet connection to see them. Replace image IDs in `data.js` or the image references in `career.js` with images you own, have permission to use, or have generated for your project. Always check the licence and attribution requirements for any image before publishing.

## Important content note

Career profile pages provide a structured educational starting point. The shared profile template adapts its introduction to each career and includes a practical general workflow, skills, tools, good-practice checklist and learning roadmap. Some specialist careers require additional discipline-specific research, professional standards, software or qualifications; verify those details for your region before relying on them professionally.

## Local preview

You can open `index.html` in a modern browser for a quick preview. For a more reliable local preview, run a simple static server from this folder, for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.


## Career profile content update
- The catalogue contains 30 categories and 268 career entries.
- Each career profile now selects a specialist learning pathway (for example: spatial design, technical drafting, fashion, jewellery, character art, fine art, illustration, decorative art, 3D, transportation, graphic design or product design).
- Profile pages include role overview, career-specific skills, workflow, reference images, tools, good practice, a portfolio exercise and a learning roadmap.
- Career and category cards request topic-related reference photography using a distinct query/lock for each career. These images are supplied by an external photo service and require an internet connection. For a permanent public educational resource, replace external image results with original or properly licensed images and verify image suitability before publishing.

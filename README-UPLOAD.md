# Rodion Architecture — upload guide

## Included
- New responsive `index.html`
- 14 project pages in `/projects/`
- Custom vanilla-JS lightbox (no jQuery / UniteGallery)
- Mobile menu
- YouTube facades that create the iframe only after a click
- Local favicon on every page
- `404.html`, `robots.txt`, `sitemap.xml`
- 143 project images converted to WebP; largest is below 600 KB
- No separate thumbnail folders

## Recommended folder naming
Use lowercase Latin characters and hyphens only: `beloostrov-snt`, `lisiy-nos`, `kamennoostrovskiy-prospekt`. Do not use spaces, Cyrillic, punctuation, or leading order numbers.

## Image naming
Photos/renders: `01.webp`, `02.webp`, `03.webp`...
Plans: `plan-01.webp`, `plan-02.webp`...
Facade/elevation drawings: `facade-01.webp`, `facade-02.webp`...

Project images live in: `assets/images/projects/<project-slug>/`

## Replace images in an existing project
Replace the WebP files in the matching folder using the same filenames. If the image count changes, update the matching HTML in `/projects/<slug>.html`.

## Add a new project
1. Create `assets/images/projects/new-project-slug/`.
2. Upload `01.webp`, `02.webp`, etc.
3. Copy one existing `/projects/*.html` page, rename it, and change title/meta/gallery paths.
4. Add one `.project-card` to `index.html`.
5. Add the new URL to `sitemap.xml`.

## Deploy to GitHub Pages
1. Create a backup branch first.
2. Upload the CONTENTS of this package to the root of `rodion-arch.github.io`.
3. Commit to the branch currently used by GitHub Pages.
4. Test the site.
5. After confirming it works, delete obsolete `unitegallery/`, old particle scripts and any old unused image folders.

The legacy `/htm/2.html`, `/3.html`, `/5.html`, `/6.html`, `/7.html`, `/8.html`, `/9.html`, `/10.html` URLs redirect to matching new pages. Old pages without a direct match route back to the portfolio section.

## V2 visual / gallery changes
- Warm architectural palette instead of plain white: ivory, limestone, soft sage and restrained bronze.
- The home-page hero now uses `assets/images/projects/vaskelovo/03.webp`.
- `intro.webp` was re-graded to a softer, less saturated warm-neutral architectural look.
- Rodion's portrait is substantially larger on desktop and tablet.
- Project galleries use two large balanced masonry columns on screens wider than 720 px.
- Images keep their natural aspect ratio. The old grey filler bands caused by stretched CSS Grid rows are removed.
- Mobile project galleries collapse to one full-width column.
- New favicon/brand monogram: `Яш` (`favicon.ico`, 16×16, 32×32, 512×512 and Apple Touch Icon).
- A matching `Яш` monogram is also used as a restrained header detail on wide screens.

### Gallery behavior
Do not create thumbnails. Keep uploading the same WebP files (`01.webp`, `02.webp`, etc.). JavaScript distributes them across two balanced columns using the intrinsic `width` and `height` already present in the HTML.

### Important
If you replace an image but keep the same filename, it will work immediately. If its dimensions are very different, update that image's `width` and `height` attributes in the matching project HTML so the masonry balancing estimate stays accurate before the image loads.

## V3 refinements
- Homepage hero image remains `assets/images/projects/vaskelovo/03.webp`, but now uses `object-position: center top`, so the roof peak stays visible and the crop is taken from the bottom.
- Homepage project cards are exactly two per row above 760 px.
- Consecutive project rows alternate by a small equal left/right offset to keep the portfolio grid structured but less rigid.
- Mobile project cards return to one column and all row offsets are disabled.
- The brand name `Родион Яшников` now uses Cormorant Garamond with a Cyrillic-safe fallback stack.
- The hero metadata `Родион Яшников / Частная практика с 2005 года` is slightly larger.
- Added animated hover behavior for project captions, contact links, project back/next links, partner links and the new `Партнеры:` label.

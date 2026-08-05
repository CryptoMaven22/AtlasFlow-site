# AtlasFlow Portfolio

Static, dependency-free portfolio site.

## Structure

- `index.html` — semantic page markup
- `css/styles.css` — all visual styling
- `js/app.js` — entry, methodology, lightbox, and interaction logic
- `assets/` — optimized images and résumé PDF

## Deploy

Drop the contents of this folder into the root of a Git repository and deploy as a static site. Vercel requires no build command.

## Notes

- Embedded Base64 images and résumé data were extracted into normal assets.
- Large PNG case-study images were converted to WebP.
- Duplicate Vercel Live feedback scripts were removed.
- Vercel Insights remains enabled.


## Compatibility fix
The production CSS and JavaScript are embedded in `index.html` so the page renders correctly when opened locally or deployed through a simple Git/Vercel static setup. Image and PDF assets remain in `/assets`.

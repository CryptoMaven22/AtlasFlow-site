# Matt McGreal Portfolio

Static portfolio site prepared for GitHub and Vercel.

## Deploy
1. Copy all files and folders into the root of your Git repository.
2. Commit and push.
3. In Vercel, use **Other** as the framework preset and leave the build command blank.

## Structure
- `index.html` — site markup
- `assets/css/styles.css` — presentation
- `assets/js/main.js` — navigation, reveal effects, and case-study modal
- `assets/images/` — optimized portfolio graphics
- `assets/docs/` — résumé PDF

The former single-file HTML embedded every image and the résumé as Base64. This package separates and compresses those assets for faster loads and easier maintenance.

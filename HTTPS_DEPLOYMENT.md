# HTTPS Deployment

The app is PWA-ready, but it must be hosted from HTTPS before staff can install it on phones.

## Fastest Upload Method

1. Compress the full `Market intel app` folder into a ZIP file.
2. Upload the ZIP or folder contents to an HTTPS static host such as Cloudflare Pages, Netlify, Vercel, GitHub Pages, or Codex Sites.
3. Make sure these files are at the website root:
   - `index.html`
   - `app.js`
   - `styles.css`
   - `manifest.webmanifest`
   - `sw.js`
   - `sky-audio-icon.svg`
   - `_headers`
   - `staticwebapp.config.json`

## Staff Install

After deployment, send staff the HTTPS link. They can install it from Safari on iPhone or Chrome on Android using Add to Home Screen / Install app.

## Note

Opening the app from `file://` works for testing, but phones cannot install it as a PWA from a local file.

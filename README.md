# Sky Audio Market Intel

Standalone responsive web app for Sky Audio lead and event tracking.

Open `index.html` in a browser to use it. Contacts and events are saved in the browser on that device. Use Export and Import to move the same data to another computer or phone.

For installable PWA behavior, serve the folder from an HTTPS website. Service workers and home-screen install prompts are blocked when opening the file directly from disk.

## HTTPS Hosting

This is a static PWA. Upload the full folder to any HTTPS static host such as Cloudflare Pages, Netlify, Vercel, GitHub Pages, or Codex Sites. Keep `index.html`, `app.js`, `styles.css`, `manifest.webmanifest`, `sw.js`, `sky-audio-icon.svg`, and `_headers` together at the site root.

## Tabs

- Dashboard: contact totals, stage progress, segment counts, remaining 2026 events by month.
- Events: searchable event list with editable status and opportunity details.
- Directory: lead contacts split by Organiser, Venue, Event Agency, and Hotel.
- Manage: add, edit, delete, import, export, and reset contacts or events.

## PWA

- Web app manifest with Sky Audio icon and theme color.
- Offline cache for the app shell.
- Install button on supported desktop and Android browsers.
- iPhone home-screen metadata for Safari.

## Stages

Identified, Need Intro, Contacted, Met, Presented, Connected.

# Recall V1 — Landing Page Update

This update replaces the public landing page and its styles with a responsive design.

## Files updated
- `public/index.html` — complete landing page content and structure
- `public/css/index.css` — responsive styling and dashboard preview
- `public/js/index.js` — mobile navigation, current year, and contact form mailto handling

## Before publishing
1. Open `public/js/index.js`.
2. Replace `your-email@example.com` with the real email address you want students to contact.
3. Check that `public/login.html` and `public/register.html` exist and contain your authentication pages.
4. Google Fonts requires an internet connection. A system font fallback is included.

The contact form currently opens the visitor's email application using `mailto:`. It does not store messages on a server. Connect it to your Express backend when that part is ready.

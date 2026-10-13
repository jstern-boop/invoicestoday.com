# invoicestoday.com — Your Automation Architect

Static version of the site, ready for GitHub Pages.

## Upload to GitHub
1. Create a public repo (e.g. `invoicestoday`).
2. **Add file → Upload files**, drag in *everything in this folder* (keep the folders as they are), and commit.
3. **Settings → Pages →** Deploy from a branch → `main` / `(root)` → Save.
4. The `CNAME` file already sets the custom domain to `invoicestoday.com`. Update your DNS (A records to 185.199.108–111.153, `www` CNAME to `yourusername.github.io`), then turn on **Enforce HTTPS**.

## Before you go live — edit `js/site.js`
- **paymentLinks**: paste a Stripe Payment Link for each paid service. Use a **one-time** (not recurring) link for the $125/year website plan, since it's renewed manually. Blank links fall back to "Request this service" → Contact page.
- **formEndpoint**: paste a Formspree URL or a Zapier Catch Hook URL so the contact form works.

## Images
Images are still loaded from Squarespace's image server. Download them into an `images/` folder and update the links **before cancelling Squarespace**, or they may stop showing.

## Pages
| Old Squarespace URL | New file |
|---|---|
| `/` | `index.html` |
| `/services-store` | `services-store/index.html` |
| `/about` | `about/index.html` |
| `/appointments` | `appointments/index.html` |
| `/contact` | `contact/index.html` |

The old Cart and individual product pages are gone; their "Buy now" buttons now use payment links.

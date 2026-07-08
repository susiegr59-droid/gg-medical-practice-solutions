# Render Upload Steps for G&G Medical Practice Solutions

## What to upload

Upload the contents of this folder as a static site:

- `index.html`
- `styles.css`
- `assets/`
- `render.yaml`

## Render settings

If creating the service manually in Render:

- Service type: Static Site
- Name: `gg-medical-practice-solutions`
- Build command: `true`
- Publish directory: `.`
- Custom domain: `ggmedpro.com`

## Squarespace domain step

After the Render static site is created, add `ggmedpro.com` as a custom domain in Render.
Render will show the DNS records that need to be added or changed in Squarespace.

Use the DNS values Render gives you, because they are specific to the service Render creates.

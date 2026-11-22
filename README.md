# Academic website — Georgios Th. Papadopoulos

Personal academic website built with [Jekyll](https://jekyllrb.com/) and hosted on GitHub Pages.
No theme and no external build: GitHub builds the site automatically on every push.

## Where the content lives

| What | File |
|---|---|
| Name, title, contact details, profile links, menu | `_config.yml` |
| Home page text (bio) | `index.html` |
| Publications | `_data/publications.yml` |
| Projects | `_data/projects.yml` |
| Group members (PhD / MSc / alumni) | `_data/group.yml` |
| Courses | `_data/courses.yml` |
| News items | `_posts/YYYY-MM-DD-short-title.md` (one file per item) |
| Images | `assets/img/` (news images in `assets/img/news/<year>/`) |
| Design (colors, fonts, layout) | `assets/css/main.css` |

### Add a news item
Create `_posts/2026-11-21-my-news.md`:

```markdown
---
title: "New paper | IEEE Access"
type: paper            # paper | talk | project | event | visit | vacancy | news
image: /assets/img/news/2026/my-image.jpg   # optional thumbnail
---

Text of the news item (Markdown). Images: ![caption](/assets/img/news/2026/photo.jpg)
```

### Add a publication
Add an entry to `_data/publications.yml` (copy an existing one). Set `selected: true` to show it on the home page.

## Publish on GitHub Pages
1. Create a public repository named **`gthpapadopoulos.github.io`** on GitHub.
2. Upload the contents of this folder (or `git init`, `git add .`, `git commit`, `git push`).
3. In the repository: **Settings → Pages → Build and deployment → Deploy from a branch**, branch `main`, folder `/ (root)`.
4. `url:` in `_config.yml` is `https://gthpapadopoulos.github.io`.
5. The site appears at `https://gthpapadopoulos.github.io` within a minute or two.

## Preview locally (optional)
Requires Ruby. In this folder: `bundle install` once, then `bundle exec jekyll serve` and open http://localhost:4000.

## Redirect from the old site
Pages keep the old paths (`/publications/`, `/projects/`, `/news/`, each news item's `/<slug>/`), and old paths that changed
(`/doctoral-students/` → `/group/`, `/courses/` → `/teaching/`) redirect automatically. On the WordPress site, a single
301 rule sends everything to the new address, e.g. with the *Redirection* plugin (source `^/(.*)` regex → target
`https://gthpapadopoulos.github.io/$1`) or in `.htaccess`:

```apache
RewriteEngine On
RewriteRule ^(.*)$ https://gthpapadopoulos.github.io/$1 [R=301,L]
```

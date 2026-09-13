# Akesh Mallia Portfolio

Credit to Nisar Hassan for the template: https://github.com/nisarhassan12/portfolio-template


## Project tile years and organization logos

In `index.html`, find `<!-- Project 1 -->` through `<!-- Project 6 -->`.
Each tile contains a `PROJECT BADGE` comment followed by:

```html
<div class="project-tile__badge">
  <span class="project-tile__year">YYYY</span>
  <img class="project-tile__logo" src="./images/logos/placeholder.svg" alt="Organization logo placeholder" width="48" height="48" />
</div>
```

1. Replace `YYYY` with the project year or range, such as `2026` or `2025–2026`.
2. Upload your square PNG, SVG, or WebP logo to `images/logos/` on the same branch.
3. Replace `./images/logos/placeholder.svg` with its exact path, such as `./images/logos/rocket-lab.png`. Filenames are case-sensitive.
4. Replace the image's `alt` with the organization name, such as `Rocket Lab`.

| Tile | Project |
| --- | --- |
| 1 | High-Pressure Quick Disconnect |
| 2 | Northstar Rocket |
| 3 | Hydraulic Test Fixture |
| 4 | Camp Randall Vibrations Research |
| 5 | NASA CubeSats |
| 6 | ME 201 Crane |

All six years and logos start as placeholders. The same logo file can be reused on multiple tiles. Logos fit inside a 48-pixel white square without cropping. Badge styling is in the Project Tiles section of `index.css`. Keep the grayscale filter on `.project-tile__image`, not its wrapper, to preserve the badge colors.

Review changes on the feature branch before merging into the live `2026_07_08` branch.


## Project hero badges

Each `project-1.html` through `project-6.html` now has a centered badge immediately below its hero heading, replacing the organization and year subtitles. `project-template.html` includes a placeholder version for future projects.

Search for `HERO BADGE` in the project page. Edit the text inside `project-hero__year`, the logo `src`, and its organization `alt` text. Keep these values in sync with the matching tile in `index.html`; these are static HTML copies, so neither updates automatically. Initial values match the current homepage tiles, including NASA's `2024` year.

The `project-hero__badge` styles in `index.css` control the centered layout. Hero logos scale from 60 to 72 pixels while remaining square; the year text scales from 20 to 24 pixels.

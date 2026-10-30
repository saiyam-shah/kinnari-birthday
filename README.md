# Kinnari's Birthday Site

A plain HTML, CSS, and JavaScript site with no build step. Vercel can serve the folder as-is.

## Main files

- `index.html` – page structure, hidden home hotspots, and browser-tab icon path
- `css/style.css` – visual styles
- `js/content.js` – timeline, gift riddles, hidden messages, and Explore links
- `js/app.js` – navigation, counters, hidden finds, and saved progress
- `js/pages/` – individual page experiences
- `assets/` – backgrounds, illustrations, and photos

## Add your images and video

- Timeline photos: add `first.jpg`, `second.jpg`, `third.jpg`, and `fourth.jpg` to `assets/photos/`. They are assigned to timeline steps 1–4; steps 5–6 currently have no photos.
- World map: add your image at `assets/backdrops/world-map.jpg`.
- Browser-tab icon: add the girl's square photo at `assets/kinnari-icon.png`. The site heading remains “Kinnari's Birthday ♥”.
- Next Adventures video: copy the 52 MB vertical MP4 into `assets/videos/` and name it `game.mp4`. It plays directly in the page with controls and portrait sizing. The full path is `assets/videos/game.mp4`.

## Add your messages

Replace the placeholder `body` text in `js/content.js` under `finds` for `g:flowerL`, `g:flowerR`, and `g:puppy`. Those are the three hidden message spots and the message counter total is set by `totals.g` near the top of the same file. You can edit those three `body` values yourself; the archive is linked from a found message.

For additional messages, add another `finds` entry in `js/content.js`, add a matching hidden hotspot with its `data-find` key in `index.html`, and increase `totals.g`.

## Gift riddles

There are 22 gift riddles tucked across the home illustration and other page backgrounds. Their locations give off occasional, faint glints; hovering reveals a soft shimmer. The Hint button gives a vague clue and briefly sweeps light across the current section. Each answer reveals its gift, and progress is saved in the visitor's browser. Edit the gift names, answer words, and riddle text in the `gifts` list in `js/content.js`. Answers are checked in the browser, so this is a playful puzzle rather than secure password protection.

## Preview and publish

Open `index.html` through a local web server such as VS Code Live Server. Add `?unlock` to preview every page, or `?reset` to clear saved progress in the current browser. The site also clears saved counters, found messages, gifts, and page progress every 24 hours from the first visit; the 24-hour cycle restarts after each reset.

To publish, upload the contents of this folder to a private GitHub repository and import it into Vercel using the “Other” preset with no build command or output directory. Anyone with the deployed link can open the site, so share it only with the intended recipient.

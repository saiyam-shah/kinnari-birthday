# Kinnari's Birthday Site

A plain HTML / CSS / JavaScript site. There is no build step, no installs, no frameworks.
Vercel serves the folder exactly as it is.

## What is where

```
index.html            the page itself (layout, and the clickable spots on the picture)
css/style.css         how everything looks
js/content.js         ALL the words, dates, song links, hints and banter. Edit this like a table.
js/app.js             the logic (counters, locks, hints, music). Rarely needs touching.
js/pages/             one small file per full page (timeline, countdown, archive, final video, ...)
assets/               pictures. The home picture is assets/home.jpg, page backdrops are in assets/backdrops/
```

Put new pictures in `assets/` (make subfolders like `assets/characters/`, `assets/backdrops/`, `assets/photos/`).

## The Timeline page

Its backdrop is `assets/backdrops/timeline.jpg`. The numbered lanterns on the path are the milestones.
Edit the dates, titles, text and photos under `timeline` in `js/content.js`. To add a photo to a milestone,
put the file in `assets/photos/` and set `photo: 'assets/photos/the-file.jpg'`. Add or remove entries freely;
`x` and `y` say where each lantern sits on the picture (in %).

## Preview it on your laptop

1. Install **VS Code** (free) and, inside it, the **Live Server** extension.
2. Open this folder in VS Code (File > Open Folder).
3. Right-click `index.html` > **Open with Live Server**. Every time you save a file, the page refreshes.

Two handy switches, added to the end of the address in your browser:

- `?unlock` opens every page, so you can work on any page without hunting for the unlock first
- `?reset` clears her saved progress, so you can test the journey from scratch

## Put it online (Vercel)

1. Make a free **GitHub** account and create a new repository called `kinnari-birthday`. Set it to **Private**.
2. On the repository page choose **Add file > Upload files**, drag in everything inside this folder (the files and the folders, not the folder that contains them), and press **Commit changes**.
3. Make a free **Vercel** account (use "Continue with GitHub").
4. In Vercel choose **Add New > Project**, pick the `kinnari-birthday` repository, and press **Import**.
5. Leave every setting as it is (Framework Preset: **Other**, no build command, no output directory). Press **Deploy**.
6. About a minute later you get an address like `kinnari-birthday.vercel.app`. That is the live site.

From then on, whenever you upload changed files to GitHub, Vercel updates the live site by itself.

Anyone who has the address can open the site, so share it only with her.

## The Suitcase page

Its backdrop is `assets/backdrops/suitcase.jpg`. Each item sits inside the suitcase and opens one memory.
Edit the items under `suitcase` in `js/content.js`. Until you have a real picture of an item, the emoji in `icon`
is shown. To use a picture, save a PNG with a transparent background in `assets/items/` and set
`image: 'assets/items/ticket.png'`. `x`, `y` and `rot` set where the item sits and how it is tilted.

## The Movie page

Its backdrop is `assets/backdrops/movie.jpg`. Your video plays on the cinema screen. Upload it to YouTube as **Unlisted**,
copy the ID (the part after `v=`) and set `movie.youtubeId` in `js/content.js`. Until then the screen shows a Coming soon card.

## The Letter page

Its backdrop is `assets/backdrops/letter.jpg`. She taps the sealed envelope on the desk and your letter unfolds.
Write it under `letter` in `js/content.js`: a greeting, one entry per paragraph, and the sign-off.

## The 52 Reasons page\n\nIts backdrop is `assets/backdrops/hundred.jpg`. She taps the jar and a heart opens with one reason on it.\nYour list is under `hundred.items` in `js/content.js`, one line per reason (the page counts them). `title` and `noun` change the wording.\nWhich ones she has read is remembered in her browser.\n\n## The Future page

Its backdrop is `assets/backdrops/future.jpg`, a dream board. Each card, tag, the map and the compass opens one dream.
Edit them under `future.dreams` in `js/content.js` (`x`, `y`, `w`, `h` place each one on the picture, in %).

## The Next Adventure page

Its backdrop is `assets/backdrops/next.jpg`. A live countdown to the trip date (`dates.trip`), plus the passports, suitcase and backpack
on the table, which open the route, the packing list and a rule. Edit them under `trip` in `js/content.js`.

## Music (Spotify)

The player works out of the box with your playlist: tap the music icon, then Play.
For **Next** and **Shuffle**, open `js/content.js` and paste the song links into `tracksRaw`, one per line
(in the Spotify desktop app, select the songs and copy them with Ctrl+C or Cmd+C, then paste).
Make sure the playlist is set to **Public** in Spotify.

Check this first on your laptop: press Play inside the music panel. If nothing plays, press the play button
inside the Spotify box itself, and tell me what happened.

## Adding a page

1. Create `js/pages/timeline.js` (copy `countdown.js` as a starting point) and fill the box:
   `window.PAGES.timeline = function (box, ctx) { box.innerHTML = '...'; };`
2. Add `<script src="js/pages/timeline.js"></script>` in `index.html`, above the line for `app.js`.
3. Anything not given its own file shows a placeholder.
4. To give a page the whole screen (like the Timeline), add `PAGES.timeline.full = true;` after the function.

## Final video

Upload it to YouTube as **Unlisted**, copy the ID (the part after `v=`), and set `youtubeId` in `js/content.js`.

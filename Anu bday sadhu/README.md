# sadhuuu's Birthday Website

A small, static birthday website made with HTML, CSS, and JavaScript. It includes a splash screen, background music, animated decorations, photo memories, a timeline, a gift page, and a closing birthday wish.

## Open the site

1. Add the optional assets described below.
2. Open `index.html` in a browser.
3. Tap the splash screen to enter the site and unlock the music.

For the most reliable browser behavior, serve this folder with any local static server and open the URL it provides. No build step or package installation is required.

## Project structure

- `index.html` - Entry point with the splash screen, music, and page frame
- `home.html` - Welcome page
- `about.html` - About us
- `reasons.html` - Reasons I love you
- `timeline.html` - Relationship timeline
- `gift.html` - Gift page
- `closing.html` - Final birthday wish
- `css/styles.css` - Shared theme and layout styles
- `js/main.js` - Shared navigation, animations, lightbox, and music controls
- `js/nav-bridge.js` - Navigation helper used by the individual pages
- `photos/` - Personal photos
- `audio/` - Background music

## Add the music

Place an MP3 named `song.mp3` in `audio/`:

```text
audio/song.mp3
```

The visitor must click the splash screen before browsers will allow the music to play.

## Add photos

Place your photos in `photos/` and update the `src` paths in the HTML pages. Search for `REPLACE:` in the HTML files to find the photo slots and their captions. Square or portrait photos work best because the gallery crops images into square polaroids.

If a photo is missing, the site displays a styled placeholder automatically.

## Customize

- Edit page text and captions in the HTML files.
- Edit colors, fonts, spacing, and shared layout in `css/styles.css`.
- Edit animations, decorations, and interactive behavior in `js/main.js`.
- Update the splash screen and music path in `index.html`.

## License

See `LICENSE` for license information.

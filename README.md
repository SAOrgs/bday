# sadhuuu's Birthday Website

A small, static birthday website made with HTML, CSS, and JavaScript. It includes a splash screen, background music, animated decorations, photo memories, a timeline, a gift page, and a closing birthday wish.

## Open the site

1. Add the optional assets described below.
2. Open `Anu bday sadhu/index.html` in a browser.
3. Tap the splash screen to enter the site and unlock the music.

For the most reliable browser behavior, serve this folder with any local static server and open the URL it provides. No build step or package installation is required.

## Deploy to Vercel

This repository includes `vercel.json` because the website files are inside the `Anu bday sadhu/` folder.

### Dashboard

1. Push the repository to GitHub.
2. In Vercel, choose **Add New > Project** and import the repository.
3. Leave the framework preset as **Other** and keep the default build settings.
4. Click **Deploy**.

The root `vercel.json` automatically routes the deployment to the website folder.

### CLI

From the repository root, run:

```bash
npx vercel
```

For a production deployment:

```bash
npx vercel --prod
```

## Project structure

- `Anu bday sadhu/index.html` - Entry point with the splash screen, music, and page frame
- `Anu bday sadhu/home.html` - Welcome page
- `Anu bday sadhu/about.html` - About us
- `Anu bday sadhu/reasons.html` - Reasons I love you
- `Anu bday sadhu/timeline.html` - Relationship timeline
- `Anu bday sadhu/gift.html` - Gift page
- `Anu bday sadhu/closing.html` - Final birthday wish
- `Anu bday sadhu/css/styles.css` - Shared theme and layout styles
- `Anu bday sadhu/js/main.js` - Shared navigation, animations, lightbox, and music controls
- `Anu bday sadhu/js/nav-bridge.js` - Navigation helper used by the individual pages
- `Anu bday sadhu/photos/` - Personal photos
- `Anu bday sadhu/audio/` - Background music

## Add the music

Place an MP3 named `song.mp3` in `Anu bday sadhu/audio/`:

```text
Anu bday sadhu/audio/song.mp3
```

The visitor must click the splash screen before browsers will allow the music to play.

## Add photos

Place your photos in `Anu bday sadhu/photos/` and update the `src` paths in the HTML pages. Search for `REPLACE:` in the HTML files to find the photo slots and their captions. Square or portrait photos work best because the gallery crops images into square polaroids.

If a photo is missing, the site displays a styled placeholder automatically.

## Customize

- Edit page text and captions in the HTML files.
- Edit colors, fonts, spacing, and shared layout in `Anu bday sadhu/css/styles.css`.
- Edit animations, decorations, and interactive behavior in `Anu bday sadhu/js/main.js`.
- Update the splash screen and music path in `Anu bday sadhu/index.html`.

## License

See `LICENSE` for license information.

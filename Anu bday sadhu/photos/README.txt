HOW TO ADD YOUR PHOTOS
======================

This site expects photos named photo1.jpg through photo37.jpg in THIS folder.

Until you add them, each photo shows a pretty pink placeholder with its caption,
so the site looks complete right away. Swap them whenever you're ready.

STEPS
-----
1. Drop your photos into this "photos" folder.
2. Name them photo1.jpg, photo2.jpg, ... OR keep your own names and update the
   src="photos/photoN.jpg" in the HTML.
3. In the HTML files, each photo has a comment like:

      <!-- REPLACE: photos/photo1.jpg — caption: "our first trip together" -->

   Search your editor for "REPLACE:" to jump to every photo quickly.

4. Change the caption in TWO spots for each photo:
      - the alt="..."      (used for the lightbox + placeholder text)
      - the <figcaption class="caption">...</figcaption>

WHICH PHOTO IS WHERE
--------------------
  photo1–4    Home (index.html)
  photo5–9    About Us (about.html)
  photo10–16  Reasons I Love You (reasons.html)
  photo17–22  Our Timeline (timeline.html)
  photo23–34  Memory Wall (memories.html)
  photo35–36  Open Your Gift (gift.html)
  photo37     Closing (closing.html)

TIPS
----
- Square-ish photos look best (they're cropped to a square in the polaroid).
- .jpg, .png, and .webp all work.
- Photos are lazy-loaded, so having many of them keeps the site smooth.

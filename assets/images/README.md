# Images and media

Every photograph on the site is currently a labelled placeholder. Nothing here is
generated art — the slots are deliberately empty so the school can use its own
photographs of its own children.

## Where to put files

```
assets/
  images/      photographs (jpg, webp, png, svg)
  videos/      optional: self-hosted mp4 files
  documents/   the PDF downloads linked on the Academics page
```

## Sizes

| Slot | Recommended size | Notes |
| --- | --- | --- |
| Hero (arched frame) | 1600 × 2000 px | Portrait; faces sit in the lower two-thirds |
| Page hero banner | 1600 × 1000 px | Landscape |
| News card | 1600 × 1000 px | Landscape; safe area in the centre |
| Gallery tile | 800 × 800 px | Square; the tall and wide variants are noted in the markup |
| Staff portrait | 900 × 1125 px | 4:5 portrait |
| Map slot | 1200 × 900 px | Replace with a Google Maps embed iframe instead |

Export JPEG or WebP at quality 80. A photograph should rarely exceed 300 KB;
the whole site is designed to load fast on a mobile connection.

## How to replace a placeholder

A placeholder looks like this in the HTML:

```html
<div class="ph" data-label="Upload School Image Here" data-hint="1600 × 2000 px">
  <span class="ph__hint">Main entrance, morning light</span>
</div>
```

Replace the whole element with an image:

```html
<img src="assets/images/courtyard.jpg" alt="Pupils crossing the courtyard before morning assembly"
     width="1600" height="2000" loading="lazy">
```

Keep the `width` and `height` attributes — they stop the page jumping while images
load. Use `loading="lazy"` for everything below the first screen, and omit it for
the hero image. The arched frame in the hero already crops its child element, so no
extra classes are needed.

## Gallery and video entries

Gallery tiles and video slots are generated from `js/data.js`. To add a photograph,
add an object to the `photos` array:

```js
{ title: "The new science room", cat: "classroom", label: "Upload Classroom Image Here", hint: "1200 × 900 · JPG" }
```

`cat` must be one of `campus`, `classroom`, `pupils`, `sport`, `arts`, `events` so the
filter chips keep working. To use a real photograph instead of the placeholder, edit
`galleryItem()` in `js/site.js` to output an `<img>` when the entry has a `src`:

```js
{ title: "The new science room", cat: "classroom", src: "assets/images/science-room.jpg",
  alt: "Two pupils measuring water in the new science room" }
```

## Consent

Do not publish a photograph in which a child is identifiable without written
permission from that child's guardian. Keep the permission slips on file; if a
guardian withdraws permission, remove the image within ten working days.

## Open Graph image

Add a single `assets/images/og-image.jpg` at 1200 × 630 px (the crest, the school
name, and one good photograph), then uncomment the `og:image` lines in the `<head>`
of `index.html` and copy them to the other pages.

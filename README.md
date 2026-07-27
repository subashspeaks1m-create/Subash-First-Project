# Subash-First-Project

To Build a Complete website

---

## Crystal Reveal — customizable motion graphic

`index.html` is a self-contained recreation of the crystal/frame title animation, built to be
edited live from a control panel. Open the file in any modern browser — there is no build step,
no bundler and no dependency to install.

### The sequence

Five cards, each revealed with the same move, then gathered into a closing recap.

| time | beat |
|------|------|
| 0.0s | dark bokeh field, drifting dust and stars |
| 0.3s | blue quartz crystal tumbles in from the top right and sweeps past the lens |
| 0.5s | the card ladder slides in as the camera pans right |
| 1.2s | an S-curve draws itself from off-screen into card 1's left node |
| 1.9s | card 1's crystal pops in over the numeral |
| 2.7s | **1 — Measure your Baseline** resolves out of a horizontal blur |
| 5.2s | camera drops to card 2; curve, crystal and title repeat |
| 8.1s | **3 — Kill Procrastination** |
| 11.0s | **4 — A Magical Tool** |
| 13.9s | **5 — Purpose** |
| 17.1s | the ladder gathers into the closing board — the opening stone returns at scale on the left and fans a connector into every card |
| 21.9s | loop |

Each card holds a genuinely different stone — its own silhouette as well as its own colour, so
the five read as five minerals rather than one prop recoloured:

| card | stone | colour | why |
|------|-------|--------|-----|
| 1 — Measure your Baseline | quartz point | ice cyan | instruments, cold data, a first reading |
| 2 — Eliminate the Leakage | rough boulder | emerald | the unrefined thing you are clearing out |
| 3 — Kill Procrastination | shard cluster | crimson | jagged, the one you have to fight |
| 4 — A Magical Tool | cut gem | violet | the instrument — and the source clip's own colour |
| 5 — Purpose | obelisk | gold | the monolith at the summit |

Shapes come from a small library of named silhouettes (quartz point, rough rock, cut gem, shard
cluster, smooth pebble, obelisk, geode) — pick one per card from the panel, and the shape seed
re-rolls its irregularities. A cluster is several stones splayed around one socket, not a single
mesh. Colour pairs all keep the same value structure — a bright saturated tip over a deep base —
so only hue varies and the set still holds together. The frame and numerals stay neutral white,
leaving the stones to carry all the colour.

Cards ahead of the camera sit dimmed in the ladder and brighten as each is reached, so the
whole list is always implied before it is read. Total runtime is derived from the card count and
the per-card beat length — change either and the piece (and the scrubber) re-times itself.

Everything is drawn procedurally on a `<canvas>` — the crystals are real low-poly meshes that are
rotated, projected, z-sorted and shaded per facet. There are no images or video files involved.

### Controls

| key | action |
|-----|--------|
| `Space` | play / pause |
| `R` | restart |
| `F` | **fullscreen** |
| `C` | show / hide the customize panel |

The transport bar (bottom centre) has the same buttons plus a scrubber, and auto-hides after a
few idle seconds. The fullscreen button is the ⤢ icon.

### What you can customize

Open the panel with `C` or the slider icon. Every group updates live:

- **Card 1–5** — each card gets its own section: title, number, stone shape, shape seed, and its
  three colours (tip, base, edge glow). Wrap any run of a title in `*asterisks*` to mark it as
  the accent word.
- **Headline style** — font, size, weight, tracking, colour, glow, position, and the reveal
  timing (start, per-character duration, stagger, slide distance), shared across all cards
- **Numerals** — style, colour, opacity, size and weight of the number behind each crystal
- **Card crystals / Intro crystal** — overall size, glow, spin and when card 1 appears. Each
  card's stone shape and colours live in its own section.
- **Cards & path** — colour, thickness, glow, card size, rail gap, position, corner nodes, how
  far unvisited cards are dimmed, and the curve's draw-in window
- **Closing recap** — whether to show it, how long the gather takes, how long it holds, the full
  layout of the rows (position, card size, row pitch, text gap and size), plus the hub stone's
  position and size and how far the connectors bow
- **Atmosphere** — base and haze colour, brightness, vignette, bokeh count/size/drift/colour,
  star field, film grain, bloom
- **Motion & format** — playback speed, seconds per card, camera-move intensity, idle drift,
  loop, cinematic bars and their aspect ratio
- **Presets** — save to the browser, reload, reset to defaults, or export/import the whole
  configuration as JSON

### Notes

- The file has **no network dependency**. Montserrat (latin, variable weight) is embedded as a
  data URI, so the type renders identically offline — just double-click the file.
- Numerals are set in the embedded typeface so all five read as one set. The source's hand-drawn
  "1" (a long raked flag on a broad flat-footed stem, which no font reproduces) is still
  available as **Stylised 1** under Numerals — it only reads as a "1", so it suits a
  single-card version of the piece.
- The composition is authored in a fixed 1920×968 space and always fits the window, so the
  framing is identical at any size or aspect ratio.
- Rendering cost is dominated by the bloom and grain passes. If the frame rate drops, the page
  quietly steps those down and restores them when there is headroom again.
- `window.CrystalReveal` exposes `cfg`, `seek(t)`, `play()`, `pause()`, `applyPreset(obj)` and
  `refresh()` if you want to drive the animation from your own script.

# Subash-First-Project

To Build a Complete website

---

## Crystal Reveal — customizable motion graphic

`index.html` is a self-contained recreation of the crystal/frame title animation, built to be
edited live from a control panel. Open the file in any modern browser — there is no build step,
no bundler and no dependency to install.

### The shot

| time | beat |
|------|------|
| 0.0s | dark bokeh field, drifting dust and stars |
| 0.3s | blue quartz crystal tumbles in from the top right and sweeps past the lens |
| 0.5s | glowing wireframe "ladder" frame slides in as the camera pans right |
| 1.2s | an S-curve draws itself from off-screen into the frame's left node |
| 1.9s | purple crystal pops in over a large translucent numeral |
| 2.7s | headline resolves left-to-right out of a horizontal blur |
| 5.6s | settle, gentle float, then loop |

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

- **Headline** — text, font, size, weight, tracking, colour, glow, position, and the full reveal
  timing (start, per-character duration, stagger, slide distance). Wrap any run in
  `*asterisks*` to mark it as the accent word — its weight, italic and colour are separate
  controls. Example: `Real growth happens in *isolation*`
- **Number card** — the big translucent glyph behind the crystal (any text, not just digits)
- **Hero crystal / Intro crystal** — tip and base colour, edge glow, size, position, facet count,
  facet bands, roughness, girth, point length, shape seed, glow, spin, and when it appears
- **Frame & path** — colour, thickness, glow, box size, rail gap, position, corner nodes, and the
  curve's draw-in window
- **Atmosphere** — base and haze colour, brightness, vignette, bokeh count/size/drift/colour,
  star field, film grain, bloom
- **Motion & format** — playback speed, camera-move intensity, idle drift, loop, cinematic bars
  and their aspect ratio
- **Presets** — save to the browser, reload, reset to defaults, or export/import the whole
  configuration as JSON

### Notes

- The file has **no network dependency**. Montserrat (latin, variable weight) is embedded as a
  data URI, so the type renders identically offline — just double-click the file.
- The number card is drawn as vector art rather than a font glyph, because the source numeral is
  custom lettering (a long raked flag on a broad flat-footed stem) that no font reproduces.
  Switch it to **Text label** in the panel to use any word or number instead.
- The composition is authored in a fixed 1920×968 space and always fits the window, so the
  framing is identical at any size or aspect ratio.
- Rendering cost is dominated by the bloom and grain passes. If the frame rate drops, the page
  quietly steps those down and restores them when there is headroom again.
- `window.CrystalReveal` exposes `cfg`, `seek(t)`, `play()`, `pause()`, `applyPreset(obj)` and
  `refresh()` if you want to drive the animation from your own script.

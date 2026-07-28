# Subash-First-Project

## Flicker — glowing text motion graphics

`index.html` is a self-contained tool that reproduces the blown-out title-card
effect from the reference clip: huge condensed caps, a heavy white bloom, and a
failing-tube flicker on the way in and out. Every value is adjustable live.

Open the file in any browser — there is nothing to install and no network
request. The four typefaces are embedded in the file itself.

### The effect

Timings and glow were measured frame by frame off the reference recording, so
the defaults are the reference, not an approximation:

| | measured | default |
|---|---|---|
| Entry | on 67ms → off 33ms → on | 1 blip, 33ms frames |
| Exit | off 33ms → on 33ms → off | 1 blip |
| Time on screen | 4.3s | 4.3s |
| Zoom drift | scales 1.08 → 0.92 across the shot | on |
| Glow reach | ~0.24em past the letter edge | 100% spread |

### Controls

**Text** — words (multi-line), typeface, uppercase, sizing, tracking, line spacing.
Sizing defaults to fitting the text to a chosen share of the frame width, so the
type re-fits itself whenever the words or the frame shape change.

**Look** — text, glow and background colours, glow strength, glow spread, glow
breathing, and frame shape (9:16, 16:9, 1:1, 4:5, or fill the window).

**Motion** — blip length, number of blips on entry and exit, time on screen,
dark pause before repeating, the slow zoom drift and its start/end scale, and
whether it loops.

The strip above the transport draws the actual on/off rhythm, with a playhead
that runs in sync — you can see the flicker pattern you are editing.

### Keys

`Space` replay · `F` fullscreen · `H` hide controls

**Copy link** writes every setting into the address, so a configured look can be
sent to someone else as a plain URL. Settings also persist locally between
visits.

### Notes

Animation runs on `opacity` and `transform` only, so it stays on the compositor
and holds a steady frame rate; the bloom is rasterised once rather than
re-rendered per frame. If the system asks for reduced motion, the text is shown
static and waits for you to press Replay.

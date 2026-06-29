# Portfolio Redesign Brief — "Deep Bioluminescence" Theme
*(Camera path & scroll mechanics: do not touch)*

## 0. The one rule everything else follows

The 3D camera path is the hardest-won part of this build — it's choreographed scroll math, not decoration. This redesign touches **color, material, type, and layout only**. Nothing that maps scroll position to camera position, triggers a section, or fires a click handler should change shape, even if you rename a class or restyle a panel around it.

If you (or an AI pair-programmer) are implementing this, treat the section below as a fence, not a suggestion.

## 1. Inventory — leave these exactly as they are

Find and freeze the following before you touch anything else:

- **Scroll-depth config** — the total scroll length (10 "pages" of depth) and any constant that defines it.
- **Scroll → camera mapping** — wherever scroll progress (0–100%, or per-page progress) is interpolated into camera `position` and `lookAt`/target. This includes any `lerp`, `damp`, GSAP `ScrollTrigger`, or `useFrame`/`requestAnimationFrame` logic driving the camera.
- **Camera waypoints** — the actual coordinate/rotation values for each section (Hero, About, Skills, Projects, Contact). Don't round them, "clean them up," or re-derive them from a different curve.
- **Section breakpoints** — the scroll-percentage thresholds that decide which HTML overlay is visible/active at a given scroll position.
- **Click/raycast handlers** — whatever detects clicks on the skill plants and the project orbs and opens the modal. The *hitboxes and triggers* stay; their *materials/colors* are fair game.
- **Loading → canvas handoff** — the logic that gates the 3D scene's first render behind asset load completion. The loading screen's *visuals* are fair game; the *gating logic* is not.

If any of this lives in the same file as styling (e.g., colors set inline on a `THREE.Material`), separate the concerns: change the color value, not the object it's attached to or when it's created.

## 2. What's fully free to change

- All CSS (backgrounds, glass panel treatment, typography, buttons, badges, borders, shadows).
- Material *colors* and emissive/glow *intensity* on the 3D objects (plants, orbs, fog) — not their geometry, position, or animation curve.
- Fog color (currently tied to `#050810`).
- Loading screen visuals, modal visuals, copy/microcopy.

## 3. Why move off the current palette

The current look — near-black background, single bright acid-green accent, glass panels — is one of the three palettes AI-assisted design gravitates toward by default. It's not wrong, but it's also not distinctive: swapping the single neon color for a different single neon color (e.g., green → purple) would just be the same template in a different hue.

The brief already has a real motif underneath the cliché, though: "Ecosystem," "skill plants," glowing "orbs," "Initialize Sequence." That's biological/organism language sitting on top of a generic cyberpunk skin. The redesign below leans into the motif that's already there instead of fighting it.

## 4. New direction: Deep Bioluminescence

Two accent colors instead of one, each doing a *different job* — warm for things that grow (skills), cool for things that emit light in the dark (projects). This also gives you a free wayfinding device: color tells the visitor what kind of object they're looking at before they click it.

### Color tokens

```css
:root {
  --void:          #0B0710;  /* background — deep aubergine-black, not blue-black */
  --void-deep:      #050308;  /* fog far color */
  --glass-tint:     rgba(22, 15, 28, 0.55); /* panel background, with backdrop-blur as before */
  --glass-border:   rgba(255, 157, 92, 0.16); /* hairline on panels */

  --ember:          #FF9D5C;  /* warm accent — skills, badges, growth */
  --ember-glow:     #FFC089;

  --bioluminescent: #36E2C2;  /* cool accent — project orbs, modal, links */
  --bioluminescent-glow: #7FF5DE;

  --text-primary:   #F3ECE6;  /* warm off-white, not pure white */
  --text-muted:     #9C8FA3;  /* dusty mauve-grey for secondary copy */
}
```

### Typography

- **Display** (Hero "David", "Ecosystem", section headers): a characterful serif with some warmth — **Fraunces** (variable, soft optical curves). A serif against a 3D/tech backdrop reads as a deliberate choice, not a default, and softens the "cyberpunk dev portfolio" sameness.
- **UI/body** (badges, nav, buttons, captions): keep **Outfit** — it's already clean and geometric, low-risk to retain, and contrasts nicely against the serif.

### Motif rationale

Plants glow ember (warm, growing, close to the viewer). Orbs glow bioluminescent teal (cool, distant, deep-water). Fog shifts from flat dark-navy to a void with a faint plum undertone, so it reads less "outer space," more "ocean trench" — different enough from the current mood to genuinely feel new, while staying dark and atmospheric per the brief.

## 5. Section-by-section spec

For each section: visual treatment changes; DOM hooks/triggers that must survive unchanged are called out explicitly.

### Hero
- "David" gradient: `--text-primary` → `--ember-glow` (was white → neon green).
- Subtitle "Full-Stack & Mobile Developer" in `--text-muted`, Outfit.
- "Scroll to explore" prompt: small, `--bioluminescent`, slow opacity pulse.
- *Keep untouched:* whatever scroll listener marks Hero as "passed" to kick off the camera's first move.

### About ("Initialize Sequence")
- Glass panel: `--glass-tint` + `--glass-border`, same offset/position as now.
- Tech badges (React, Three.js, WebGL): pill shape stays; recolor border + glow to `--ember`.
- *Keep untouched:* the panel's scroll-trigger class/id if your IntersectionObserver or ScrollTrigger selects it by name.

### Skills ("Ecosystem")
- Header in Fraunces, large, `--text-primary` with a soft `--ember-glow` text-shadow (replacing the white glow).
- "Interact with the glowing skill plants" prompt in `--text-muted`.
- Plant materials: emissive color → `--ember`. Geometry, placement, and interaction radius unchanged.

### Projects Gallery
- Header drop-shadow: blue → `--bioluminescent-glow`.
- "Click the glowing orbs" prompt unchanged in structure, recolored.
- Orb materials: emissive color → `--bioluminescent`. *Click/raycast hitbox unchanged.*

### Contact
- "Let's connect" header: `--ember` glow instead of green.
- Email button: background shifts to a subtle `--bioluminescent` → `--ember` gradient on hover (one cool, one warm — ties the two accents together at the close of the journey).

### Project Modal
- Backdrop: same dim + blur.
- Title color: blue → `--bioluminescent`.
- Tech badges: border `--bioluminescent`, fill transparent.
- Buttons: **Live Demo** filled `--bioluminescent` (primary action, filled = do this one), **View Source** ghost/outline `--ember` (secondary).
- *Keep untouched:* open/close trigger wiring, the orb-click → modal-open handoff.

### Loading Screen
- Replace single-color pulsing green text with a slow breathing gradient text-fill, `--ember` → `--bioluminescent`, synced to a 2–3s ease pulse.
- Progress bar fill: linear-gradient(`--ember` → `--bioluminescent`) instead of flat green.
- *Keep untouched:* the load-percentage source of truth and the gate that delays canvas render until 100%.

## 6. Signature element

Make the "breathing" pulse the one consistent, deliberate motion across the whole site: skill plants breathe ember, orbs breathe bioluminescent, the loading bar breathes between both. One animation idea, reused with intent, rather than scattered one-off effects on every element — that repetition *is* the ecosystem feeling.

## 7. Pre-ship checklist

- [ ] Snapshot current camera waypoints/curve before any styling change, so you have a diff baseline.
- [ ] After restyling, scroll through all 10 pages and confirm camera position/lookAt at each breakpoint is pixel-identical to before.
- [ ] Confirm orb and plant hitboxes still register clicks (color change shouldn't move geometry, but raycasting can silently break if a mesh gets swapped instead of re-materialed).
- [ ] Confirm loading screen still gates canvas render — only its visuals changed.
- [ ] Check contrast: `--text-muted` on `--void` and `--glass-tint` for accessibility at body-text sizes.

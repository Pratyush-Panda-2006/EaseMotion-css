# Animated Text Split Reveal (`ease-text-split-reveal`)

A self-contained entrance reveal animation where a cover text splits apart in halves (horizontally or vertically) and fades away, exposing hidden content directly behind it.

---

## 1. What does this do?

It provides an entrance reveal animation (`ease-text-split-reveal`) where a text block splits in half (left/right or top/bottom) and translates away with an opacity fade (`opacity: 1 → 0`), revealing a background layer or element underneath.

---

## 2. How is it used?

Structure your HTML using a container element with the `.ease-text-split-reveal` class and a matching `data-text` attribute. Inside, include a spacer element (`.cover-text`) to preserve layout dimensions, followed by the actual `.reveal-content` to be exposed:

```html
<div class="ease-text-split-reveal" data-text="WELCOME VISITOR">
  <!-- Invisible text copy that defines the layout height and width -->
  <span class="cover-text" style="visibility: hidden;">WELCOME VISITOR</span>

  <!-- Content revealed behind the split halves -->
  <div class="reveal-content">
    <span class="highlight">EASEMOTION CSS</span>
  </div>
</div>
```

### Configurable Modifiers

You can combine the base class with speed, distance, and orientation modifier classes:

- **Orientation Modifiers**:
  - `(Default)`: Splits horizontally (left and right halves).
  - `.reveal-vertical`: Splits vertically (top and bottom halves).

- **Speed Modifiers**:
  - `.reveal-fast`: Duration of `0.4s` and reveal delay of `0.1s`.
  - `.reveal-slow`: Duration of `1.5s` and reveal delay of `0.4s`.
  - _Default_: `0.8s` duration and `0.2s` delay.

- **Distance Modifiers**:
  - `.reveal-dist-short`: Splits apart by a shorter distance (`30%`).
  - `.reveal-dist-long`: Splits apart by a longer distance (`120%`).
  - _Default_: `60%` split distance.

```html
<!-- Example of a fast vertical split reveal -->
<div
  class="ease-text-split-reveal reveal-vertical reveal-fast"
  data-text="INITIAL HEADER"
>
  <span class="cover-text" style="visibility: hidden;">INITIAL HEADER</span>
  <div class="reveal-content">
    <h2>REVEALED TITLE</h2>
  </div>
</div>
```

### Custom Styling with CSS Variables

Override the default properties dynamically using these CSS custom variables:

- `--ease-split-distance` (Default: `60%`)
- `--ease-split-duration` (Default: `0.8s`)
- `--ease-split-easing` (Default: `cubic-bezier(0.25, 1, 0.5, 1)`)
- `--ease-reveal-delay` (Default: `0.2s`)
- `--ease-split-text-color` (Default: `inherit`)

```html
<div
  class="custom-reveal ease-text-split-reveal"
  data-text="LOCKED"
  style="--ease-split-distance: 150px; --ease-split-text-color: #ef4444;"
>
  <span class="cover-text" style="visibility: hidden;">LOCKED</span>
  <div class="reveal-content">UNLOCKED</div>
</div>
```

---

## 3. Why is it useful?

- **Zero JavaScript**: High-impact text reveal transition powered entirely by CSS grid alignment and `clip-path`.
- **Vertical & Horizontal Modes**: Support for both horizontal side-splitting and vertical hinge-splitting reveals.
- **Perfect for Heroes**: Adds a professional, cinematic entry hook to header lines and branding banners.
- **Accessibility Native**: Respects the user's OS preference (`prefers-reduced-motion: reduce`) by disabling the split motion and showing the revealed content instantly.

# Animated Flip Out Y (`ease-flip-out-y`)

A self-contained exit animation utility that flips elements away by rotating them around the vertical (Y) axis.

---

## 1. What does this do?
It provides an exit animation utility (`ease-flip-out-y`) that transitions elements from fully visible to completely hidden (`opacity: 1` to `opacity: 0`) while rotating them around the vertical (Y) axis from `rotateY(0deg)` to `rotateY(90deg)` using standard ease-in timing (`cubic-bezier(0.4, 0, 1, 1)`).

---

## 2. How is it used?

Apply the base class `.ease-flip-out-y` to the element you want to animate out:

> [!NOTE]
> 3D rotation animations require a perspective perspective context. You can apply the helper class `.ease-3d-parent` to the parent container.

```html
<div class="ease-3d-parent">
  <div class="sidebar-panel ease-flip-out-y">
    Sidebar Content
  </div>
</div>
```

### Configurable Modifiers

Combine the base class with speed, angle, and origin modifier classes:

- **Speed Modifiers**:
  - `.exit-fast`: Speeds up the exit transition to `0.25s`.
  - `.exit-slow`: Slows down the exit transition to `0.8s`.
  - *Default*: `0.4s`

- **Angle Modifiers**:
  - `.exit-angle-reverse`: Flips to `-90deg` instead of `90deg`.
  - `.exit-angle-shallow`: Flips to a shallow `45deg` angle.
  - *Default*: `90deg`

- **Transform Origin Modifiers**:
  - `.exit-origin-left`: Flips relative to the left hinge edge.
  - `.exit-origin-right`: Flips relative to the right hinge edge.
  - *Default*: `center`

```html
<!-- Example of a fast right-hinged flip exit -->
<div class="ease-3d-parent">
  <div class="sidebar-panel ease-flip-out-y exit-fast exit-origin-right">
    Sidebar Content
  </div>
</div>
```

### Custom Styling with CSS Variables
Override the defaults dynamically via inline styles or custom selectors using the following CSS custom properties:

- `--ease-flip-angle` (Default: `90deg`)
- `--ease-flip-duration` (Default: `0.4s`)
- `--ease-flip-easing` (Default: `cubic-bezier(0.4, 0, 1, 1)`)

```html
<div class="custom-panel ease-flip-out-y" style="--ease-flip-angle: -60deg; --ease-flip-duration: 0.5s;">
  Customized exit panel.
</div>
```

---

## 3. Why is it useful?

- **Pairs with Entrance**: Serves as the natural exit animation counterpart for `.ease-flip-in-y`, completing the animation lifecycle of widgets and sidebar panels.
- **Zero JavaScript**: Pure CSS-driven 3D animation ensuring maximum performance and zero scripting overhead.
- **Highly Configurable**: Custom properties allow developers to tweak angles and speeds to fit any theme or system.
- **Accessibility Native**: Includes a media query check for `prefers-reduced-motion: reduce` to disable 3D rotation and instantly hide the element.

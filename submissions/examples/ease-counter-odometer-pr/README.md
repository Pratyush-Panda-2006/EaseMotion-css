# Mechanical Odometer Counter (`ease-counter-odometer`)

A high-fidelity mechanical rolling counter animation component. Numbers roll vertically like a mechanical odometer, dashboard statistic widget, or slot machine when their values change, rather than immediately updating.

## What does this do?

This component provides a smooth vertical digit rolling transition for numeric values. Each digit column houses a reel containing digits from `0` to `9`. When the target digit changes, the reel translates vertically using CSS transitions controlled by custom properties, giving a mechanical, satisfying rolling motion.

## How is it used?

### 1. HTML Structure

Add the core class `.ease-counter-odometer` along with a speed variant to the container. Each digit is wrapped in a `.ease-odometer-column` with a `.ease-odometer-reel` inside:

```html
<div class="ease-counter-odometer ease-odometer-medium">
  <!-- Digit Column for '7' -->
  <span class="ease-odometer-column">
    <span class="ease-odometer-reel" style="--ease-odometer-digit: 7;">
      <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span>
      <span>5</span><span>6</span><span>7</span><span>8</span><span>9</span>
    </span>
  </span>

  <!-- Static Separator Comma -->
  <span class="ease-odometer-separator">,</span>

  <!-- Digit Column for '2' -->
  <span class="ease-odometer-column">
    <span class="ease-odometer-reel" style="--ease-odometer-digit: 2;">
      <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span>
      <span>5</span><span>6</span><span>7</span><span>8</span><span>9</span>
    </span>
  </span>
</div>
```

### 2. Updating Values via JavaScript

To update the odometer value, simply set the `--ease-odometer-digit` CSS custom property on the reel elements to the new digit character:

```javascript
const reelElement = document.querySelector('.ease-odometer-reel');
reelElement.style.setProperty('--ease-odometer-digit', '9'); // rolls smoothly to 9
```

*Note: For a fully automated solution, review the dynamic DOM diffing logic in `demo.html`.*

## Speed Variants

Customize the transition duration by applying one of the following classes to the `.ease-counter-odometer` container:

- `.ease-odometer-fast`: Sets rolling duration to `150ms` (standard Fast utility).
- `.ease-odometer-medium`: Sets rolling duration to `300ms` (standard Medium utility).
- `.ease-odometer-slow`: Sets rolling duration to `600ms` (standard Slow utility).

## Accessibility (Reduced Motion)

This component automatically respects system accessibility preferences. If a user has `prefers-reduced-motion: reduce` configured on their operating system, the vertical transition is automatically disabled, causing numbers to switch immediately without motion.

## Why is it useful?

Traditional numeric counters jump instantly, which lacks weight and visual feedback. Simple counting animations run on a single element and change numbers as plain text.

The mechanical odometer rolling counter:
- Mimics physical dials to draw focus.
- Enhances financial, inventory, slot machine, gamified scoreboards, or live traffic dashboards.
- Integrates seamlessly with monospace fonts for robust, non-shifting grid alignments.
- Requires zero JS for the animation itself, leaving developers only responsible for setting target numbers.

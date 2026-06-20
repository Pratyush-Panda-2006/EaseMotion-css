# ease-ingredient-checklist-fill-pp

Issue: #14037

## What does this do?

An animated recipe ingredient checklist component where checking items triggers a pop bounce on the custom checkbox box, draws the checkmark, draws a strikethrough line from left to right across the item, and dims the checked item text.

## How is it used?

Structure your checklists using nested inputs inside labels:

```html
<div class="ease-ingredient-checklist">
  <label class="ease-ingredient-item">
    <input type="checkbox" class="ease-ingredient-checkbox" />
    <span class="ease-checkbox-custom">
      <svg class="checkmark-svg" viewBox="0 0 24 24">
        <polyline
          points="20 6 9 17 4 12"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span class="ease-ingredient-text">
      <span class="ingredient-amount">200g</span>
      <span class="ingredient-name">Bronze-cut Spaghetti</span>
    </span>
  </label>
</div>
```

## Why is it useful?

It provides a highly polished, interactive shopping/recipe app checklist. Standard checkboxes feel plain; this component integrates multiple micro-animations (checkmark path-drawing, box pop bounce, text dimming, and custom line-through draw transition) that respond dynamically on checkbox toggle. All transitions are handled purely in CSS, retaining full keyboard accessibility and reduced-motion fallback patterns.

## Main Classes

- `.ease-ingredient-checklist`: Base container for the list of elements.
- `.ease-ingredient-item`: Flex row wrapper representing one checklist item.
- `.ease-ingredient-checkbox`: Hidden native checkbox input (remains focusable).
- `.ease-checkbox-custom`: Styled custom checkbox container.
- `.checkmark-svg`: Checkmark vector container.
- `.ease-ingredient-text`: Checklist description text that dims and shows strikethrough drawing.
- `.ingredient-amount`: Strong highlight class for quantities.

## Tech Stack

- HTML5 (custom inline SVGs)
- CSS3 (transitions, keyframe animations, pseudo-elements, focus rings, media queries)
- Pure JavaScript (only used in the demo to calculate check percentages and update progress bars)

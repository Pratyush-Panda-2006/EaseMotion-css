# Wiggle Effect for Invalid Form Input

## What does this example do?

This example demonstrates a subtle **horizontal wiggle animation** that triggers when a form input is marked as invalid. The animation provides immediate visual feedback to users when they enter invalid data, drawing attention to the affected field without interrupting the user experience.

The implementation uses **pure HTML and CSS** - no JavaScript required for the animation itself. It leverages the CSS `:invalid` pseudo-class combined with `:not(:placeholder-shown)` to ensure the animation only plays after user interaction.

## How is it used?

1. **Open `demo.html` directly in any modern browser** - no build tools, servers, or dependencies required
2. **Try submitting the form with invalid data** - leave fields empty, enter invalid email format, use short passwords, etc.
3. **Watch the wiggle animation** - invalid fields will shake horizontally to indicate an error
4. **Test accessibility** - enable "Reduce Motion" in your OS settings to see the animation disable while keeping error styling

### Form Fields Included:
- **Email** - validates email format using `type="email"`
- **Username** - requires 3-20 alphanumeric characters/underscores via `pattern` attribute
- **Password** - minimum 8 characters via `minlength`
- **Confirm Password** - custom validation via JavaScript (for demo purposes)
- **Terms Checkbox** - required checkbox with custom invalid styling

## Why is it useful?

### For Users
- **Immediate feedback** - No need to wait for server response or read error messages first
- **Non-intrusive** - Subtle animation doesn't block interaction or cause layout shifts
- **Accessible** - Respects `prefers-reduced-motion`, includes ARIA live regions for screen readers

### For Developers
- **Zero JavaScript** for the core animation - works with native HTML5 validation
- **Easy to customize** - Adjust timing, distance, and colors via CSS custom properties
- **Framework agnostic** - Drop into any project (React, Vue, vanilla HTML, etc.)
- **Production ready** - Includes dark mode, high contrast, print styles, and responsive design

### For Design Systems
- **Reusable pattern** - The `@keyframes wiggleInput` can be applied to any invalid input
- **Design token friendly** - Uses CSS custom properties for colors, spacing, timing
- **Extensible** - Works with any form validation approach (native, constraint validation API, or JS libraries)

## Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome  | ✅ 4+   |
| Firefox | ✅ 4+   |
| Safari  | ✅ 5+   |
| Edge    | ✅ 12+  |

**Features used:**
- CSS `@keyframes` animations
- `:invalid` and `:placeholder-shown` pseudo-classes
- CSS Custom Properties (variables)
- `prefers-reduced-motion` media query
- `prefers-contrast` media query
- `transform` property (hardware accelerated)

## Accessibility Considerations

### Motion Sensitivity
```css
@media (prefers-reduced-motion: reduce) {
  input:invalid:not(:placeholder-shown) {
    animation: none;
  }
}
```
When users enable "Reduce Motion" in their OS settings, the wiggle animation is disabled while keeping all visual error indicators (red border, error icon, error message).

### Screen Readers
- Each error message uses `aria-live="polite"` for announcements
- Error messages linked to inputs via `aria-describedby`
- Required fields marked with `aria-required="true"` (implied by `required` attribute)
- Semantic `<form>`, `<label>`, and `<input>` elements throughout

### Color Contrast
- Error state uses `#dc2626` (red-600) on white - **WCAG AA compliant** (4.5:1)
- Dark mode uses `#ef4444` (red-500) on dark background - **WCAG AA compliant**
- High contrast mode increases border width for better visibility

### Focus Indicators
- Visible focus rings on all interactive elements
- Uses `:focus-visible` for keyboard-only focus styles
- Focus styles work in both light and dark modes

## Customization Examples

### Change Animation Timing
```css
input:invalid:not(:placeholder-shown) {
  animation: wiggleInput 0.8s ease-in-out; /* Slower */
  /* or */
  animation: wiggleInput 0.3s ease-in-out; /* Faster */
}
```

### Change Wiggle Distance
```css
@keyframes wiggleInput {
  0%, 100% { transform: translateX(0); }
  20%      { transform: translateX(-10px); }  /* Further */
  40%      { transform: translateX(10px); }
  60%      { transform: translateX(-6px); }
  80%      { transform: translateX(6px); }
}
```

### Custom Error Colors
```css
:root {
  --color-error: #your-brand-red;
  --color-error-light: #your-light-red-bg;
  --color-error-border: #your-red-border;
}
```

### Apply to Specific Fields Only
```css
/* Only wiggle email fields */
input[type="email"]:invalid:not(:placeholder-shown) {
  animation: wiggleInput 0.5s ease-in-out;
}

/* Only wiggle fields with .validate class */
.validate:invalid:not(:placeholder-shown) {
  animation: wiggleInput 0.5s ease-in-out;
}
```

### Disable for Specific Fields
```css
.no-wiggle:invalid:not(:placeholder-shown) {
  animation: none;
}
```

## File Structure

```
wiggle-effect-for-invalid-form-input-pr/
├── demo.html    # Self-contained demo page
├── style.css    # All styles including animation
└── README.md    # This file
```

## Implementation Details

### The Wiggle Animation
```css
@keyframes wiggleInput {
  0%, 100% { transform: translateX(0); }
  20%      { transform: translateX(-6px); }
  40%      { transform: translateX(6px); }
  60%      { transform: translateX(-4px); }
  80%      { transform: translateX(4px); }
}
```

**Why these values?**
- **0.5s duration** - Fast enough to feel responsive, slow enough to be noticeable
- **Easing** - `ease-in-out` creates natural acceleration/deceleration
- **Decreasing amplitude** - 6px → 4px mimics a physical "shake" settling down
- **Transform only** - No layout thrashing, GPU accelerated

### Triggering the Animation
```css
input:invalid:not(:placeholder-shown) {
  animation: wiggleInput 0.5s ease-in-out;
}
```

The `:not(:placeholder-shown)` ensures the animation only triggers **after** the user has interacted with the field (typed something then cleared it, or tabbed away). This prevents the wiggle from showing on page load for required empty fields.

## Contributing

This example follows the EaseMotion CSS contribution guidelines:
- ✅ Self-contained in `submissions/examples/`
- ✅ Includes `demo.html`, `style.css`, `README.md`
- ✅ Pure HTML/CSS (JS only for confirm password demo)
- ✅ Respects `prefers-reduced-motion`
- ✅ Accessible (ARIA, semantic HTML, focus states)
- ✅ Responsive design
- ✅ Dark mode support
- ✅ High contrast mode support
- ✅ Print styles
- ✅ No modifications to core framework files

## License

MIT License - Part of the [EaseMotion CSS](https://github.com/SAPTARSHI-coder/EaseMotion-css) project.
# @quadcn/core

The foundation of the QuadCn design system, providing design tokens and grid utilities with zero runtime dependencies.

## Installation

```bash
pnpm install @quadcn/core
```

## Usage

### CSS Variables

The quickest way to adopt the 4px grid system is through CSS variables:

```html
<!-- Import reset (optional but recommended) -->
<link rel="stylesheet" href="node_modules/@quadcn/core/dist/css/reset.css" />

<!-- Import variables -->
<link
  rel="stylesheet"
  href="node_modules/@quadcn/core/dist/css/variables.css"
/>
```

Then use the variables in your CSS:

```css
.card {
  /* Spacing (multiples of 4px) */
  padding: var(--quad-space-4); /* 16px */
  margin-bottom: var(--quad-space-6); /* 24px */

  /* Border radius (multiples of 4px) */
  border-radius: var(--quad-space-2); /* 8px */

  /* Typography with grid-aligned line heights */
  font-size: var(--quad-font-md); /* 16px */
  line-height: var(--quad-line-md); /* 24px */

  /* Colors from semantic system */
  color: var(--quad-text-primary);
  background-color: var(--quad-bg-base);
  border: var(--quad-border-hairline) solid var(--quad-border-default);
}

.button {
  /* Component heights (multiples of 4px) */
  height: var(--quad-height-md); /* 40px */
  padding: 0 var(--quad-space-4); /* 0 16px */
}
```

### JavaScript Tokens

For programmatic access or use with CSS-in-JS:

```js
import {
  spacing,
  typography,
  radii,
  heights,
  colors,
  GRID_UNIT,
} from "@quadcn/core";

// Create styles using tokens
const styles = {
  padding: spacing[4], // "16px"
  fontSize: typography.fontSizes.md, // "16px"
  lineHeight: typography.lineHeights.md, // "24px"
  borderRadius: radii.md, // "8px"
  height: heights.md, // "40px"
  color: colors.text.primary,
  backgroundColor: colors.bg.base,
};

console.log(GRID_UNIT); // 4 (px)
```

## The 4px Grid System

### Mathematical Foundation

The entire quadcn system is built on a single principle: **every measurement must be a multiple of 4px**. This creates a consistent visual rhythm and perfect alignment throughout your interface.

```
┌────┬────┬────┬────┬────┬────┬────┬────┐
│    │    │    │    │    │    │    │    │
├────┼────┼────┼────┼────┼────┼────┼────┤
│    │    │    │    │    │    │    │    │
├────┼────┼────┼────┼────┼────┼────┼────┤
│    │    │    │    │    │    │    │    │
├────┼────┼────┼────┼────┼────┼────┼────┤
│    │    │    │    │    │    │    │    │
└────┴────┴────┴────┴────┴────┴────┴────┘
    4px  8px  12px 16px 20px 24px 28px 32px
```

### Grid Unit

```js
import { GRID_UNIT } from "@quadcn/core";
// GRID_UNIT = 4 (px)
```

## Token Reference

### Spacing

All spacing values are multiples of the 4px grid unit:

| Token         | Value     | CSS Variable      | Description                         |
| ------------- | --------- | ----------------- | ----------------------------------- |
| `spacing[0]`  | `"0px"`   | `--quad-space-0`  | Zero spacing                        |
| `spacing[1]`  | `"4px"`   | `--quad-space-1`  | Extra small spacing (1 grid unit)   |
| `spacing[2]`  | `"8px"`   | `--quad-space-2`  | Small spacing (2 grid units)        |
| `spacing[3]`  | `"12px"`  | `--quad-space-3`  | Medium-small spacing (3 grid units) |
| `spacing[4]`  | `"16px"`  | `--quad-space-4`  | Medium spacing (4 grid units)       |
| `spacing[5]`  | `"20px"`  | `--quad-space-5`  | Medium-large spacing (5 grid units) |
| `spacing[6]`  | `"24px"`  | `--quad-space-6`  | Large spacing (6 grid units)        |
| `spacing[8]`  | `"32px"`  | `--quad-space-8`  | Extra large spacing (8 grid units)  |
| `spacing[10]` | `"40px"`  | `--quad-space-10` | 10 grid units                       |
| `spacing[12]` | `"48px"`  | `--quad-space-12` | 12 grid units                       |
| `spacing[16]` | `"64px"`  | `--quad-space-16` | 16 grid units                       |
| `spacing[20]` | `"80px"`  | `--quad-space-20` | 20 grid units                       |
| `spacing[24]` | `"96px"`  | `--quad-space-24` | 24 grid units                       |
| `spacing[32]` | `"128px"` | `--quad-space-32` | 32 grid units                       |

### Typography

Font sizes with grid-aligned line heights:

| Token                      | Font Size | Line Height | CSS Variables                        |
| -------------------------- | --------- | ----------- | ------------------------------------ |
| `typography.fontSizes.xs`  | `"12px"`  | `"16px"`    | `--quad-font-xs`, `--quad-line-xs`   |
| `typography.fontSizes.sm`  | `"14px"`  | `"20px"`    | `--quad-font-sm`, `--quad-line-sm`   |
| `typography.fontSizes.md`  | `"16px"`  | `"24px"`    | `--quad-font-md`, `--quad-line-md`   |
| `typography.fontSizes.lg`  | `"20px"`  | `"28px"`    | `--quad-font-lg`, `--quad-line-lg`   |
| `typography.fontSizes.xl`  | `"24px"`  | `"32px"`    | `--quad-font-xl`, `--quad-line-xl`   |
| `typography.fontSizes.2xl` | `"32px"`  | `"40px"`    | `--quad-font-2xl`, `--quad-line-2xl` |
| `typography.fontSizes.3xl` | `"40px"`  | `"48px"`    | `--quad-font-3xl`, `--quad-line-3xl` |

Line heights are calculated using this formula to ensure grid alignment:

```
lineHeight = ceil(fontSize / GRID_UNIT) * GRID_UNIT
```

For example:

- 16px font size: ceil(16/4) _ 4 = 4 _ 4 = 16px (but we use 24px for better readability)
- 14px font size: ceil(14/4) _ 4 = 4 _ 4 = 16px (but we use 20px for better readability)

### Border Radius

Border radii that align to the 4px grid:

| Token        | Value      | CSS Variable         | Description                         |
| ------------ | ---------- | -------------------- | ----------------------------------- |
| `radii.none` | `"0px"`    | `--quad-radius-none` | No rounding                         |
| `radii.sm`   | `"4px"`    | `--quad-radius-sm`   | Small rounding (1 grid unit)        |
| `radii.md`   | `"8px"`    | `--quad-radius-md`   | Medium rounding (2 grid units)      |
| `radii.lg`   | `"12px"`   | `--quad-radius-lg`   | Large rounding (3 grid units)       |
| `radii.xl`   | `"16px"`   | `--quad-radius-xl`   | Extra large rounding (4 grid units) |
| `radii.full` | `"9999px"` | `--quad-radius-full` | Circular/pill shape                 |

### Border Widths

Border widths are a special case in the 4px grid system:

| Token                   | Value   | CSS Variable             | Description                           |
| ----------------------- | ------- | ------------------------ | ------------------------------------- |
| `borderWidths.none`     | `"0px"` | `--quad-border-none`     | No border                             |
| `borderWidths.hairline` | `"1px"` | `--quad-border-hairline` | Thin border (requires compensation)   |
| `borderWidths.thin`     | `"2px"` | `--quad-border-thin`     | Medium border (requires compensation) |
| `borderWidths.thick`    | `"4px"` | `--quad-border-thick`    | Thick border (1 grid unit)            |

### Component Heights

Standard component heights, all multiples of 4px:

| Token         | Value    | CSS Variable        | Description                                     |
| ------------- | -------- | ------------------- | ----------------------------------------------- |
| `heights.xs`  | `"24px"` | `--quad-height-xs`  | Extra small height (6 grid units)               |
| `heights.sm`  | `"32px"` | `--quad-height-sm`  | Small height (8 grid units)                     |
| `heights.md`  | `"40px"` | `--quad-height-md`  | Medium height (10 grid units) - standard button |
| `heights.lg`  | `"48px"` | `--quad-height-lg`  | Large height (12 grid units)                    |
| `heights.xl`  | `"56px"` | `--quad-height-xl`  | Extra large height (14 grid units)              |
| `heights.2xl` | `"64px"` | `--quad-height-2xl` | Double extra large height (16 grid units)       |

### Colors

Our color system is designed with semantic tokens that separate color usage from specific values:

```js
colors.text.primary; // Primary text color
colors.text.secondary; // Secondary text color
colors.bg.base; // Base background color
colors.bg.subtle; // Subtle background color
colors.accent.default; // Default accent color
```

Full color reference is available in our [color documentation](https://docs.example.com/colors).

## Grid Utilities

### Validation and Creation

```js
import { validateGridValue, createGridValue } from "@quadcn/core";

// Check if a value aligns to the grid
validateGridValue(16); // true - divisible by 4
validateGridValue(15); // false - not divisible by 4

// Create a grid-aligned value
createGridValue(4); // "16px" (4 grid units)
createGridValue(2.5); // "10px" (2.5 grid units)
```

### Border Compensation

When using non-grid-aligned borders (1px or 2px), you must compensate other dimensions to maintain grid alignment:

```css
/* A button that CORRECTLY maintains 40px total height with 1px borders */
.button {
  height: 40px; /* 10 grid units */
  border-width: 1px;
  /* Subtract 1px from each side of standard padding */
  padding-top: 9px; /* Standard is 10px */
  padding-bottom: 9px; /* Standard is 10px */
  padding-left: 15px; /* Standard is 16px */
  padding-right: 15px; /* Standard is 16px */
}
```

The core package includes helpers to calculate these compensations:

```js
import { calculateBorderCompensation } from "@quadcn/core";

const result = calculateBorderCompensation({
  desiredHeight: 40, // 10 grid units
  borderTop: 1,
  borderBottom: 1,
  desiredPaddingY: 10,
  desiredPaddingX: 16,
});

console.log(result);
// {
//   paddingTop: 9,
//   paddingBottom: 9,
//   paddingLeft: 15,
//   paddingRight: 15,
//   innerHeight: 38 // height - (borderTop + borderBottom)
// }
```

## Using with CSS-in-JS Libraries

```js
import { spacing, colors, radii } from "@quadcn/core";

// With styled-components
const Button = styled.button`
  height: ${heights.md};
  padding: 0 ${spacing[4]};
  background-color: ${colors.accent.default};
  border-radius: ${radii.md};
  color: white;
`;

// With emotion
const styles = css`
  height: ${heights.md};
  padding: 0 ${spacing[4]};
  background-color: ${colors.accent.default};
  border-radius: ${radii.md};
  color: white;
`;
```

## Browser Support

- Chrome/Edge 90+
- Firefox 90+
- Safari 15+

## License

MIT

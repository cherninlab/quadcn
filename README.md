<div align="center">
  <h1>quadcn</h1>
  <p><strong>The 4px grid system.</strong></p>
  
  [![Version](https://img.shields.io/npm/v/@quadcn/core.svg)](https://www.npmjs.com/package/@quadcn/core)
  [![Bundle Size](https://img.shields.io/bundlephobia/minzip/@quadcn/core)](https://bundlephobia.com/package/@quadcn/core)
  [![License](https://img.shields.io/npm/l/@quadcn/core.svg)](LICENSE)
</div>

## The Mathematical Foundation

quadcn is built on a single, non-negotiable principle: **every measurement must be a multiple of 4px**.

## Why Choose quadcn

- **Zero Runtime Dependencies**: No external bloat
- **Framework Agnostic**: Works with any framework
- **Border Compensation**: Maintain grid alignment despite browser rendering quirks
- **Complete Token System**: Design tokens for spacing, typography, color, and components

## Quick Start

```bash
# Install core package
pnpm install @quadcn/core

# Optional React components
pnpm install @quadcn/components
```

Three implementation options:

### 1. CSS Variables

```html
<!-- Import reset and variables -->
<link rel="stylesheet" href="node_modules/@quadcn/core/dist/reset.css" />
<link rel="stylesheet" href="node_modules/@quadcn/core/dist/variables.css" />

<div class="card">
  <h2>Perfect Alignment</h2>
  <p>Every element aligns to the 4px grid.</p>
  <button class="button button-primary">Learn More</button>
</div>

<style>
  .card {
    padding: var(--quad-space-6); /* 24px */
    border-radius: var(--quad-radius-md); /* 8px */
    border: var(--quad-border-hairline) solid var(--quad-border-default);
  }

  .button {
    height: var(--quad-height-md); /* 40px */
    padding: 0 var(--quad-space-4); /* 0 16px */
  }
</style>
```

### 2. JavaScript Tokens

```js
import { spacing, radii, heights } from "@quadcn/core";

const Card = ({ children }) => (
  <div
    style={{
      padding: spacing[6], // "24px"
      borderRadius: radii.md, // "8px"
      border: "1px solid var(--quad-border-default)",
    }}
  >
    {children}
  </div>
);
```

### 3. React Components

```jsx
import { Card, Text, Button } from "@quadcn/components";

const Example = () => (
  <Card padding={6} borderRadius="md">
    <Text variant="heading">Grid-Perfect Typography</Text>
    <Text variant="body">Line heights are always multiples of 4px.</Text>
    <Button variant="primary" size="md">
      Exactly 40px Tall
    </Button>
  </Card>
);
```

## Token System

| Category              | Base                 | Examples                                       |
| --------------------- | -------------------- | ---------------------------------------------- |
| **Spacing**           | 4px multiples        | `0, 4px, 8px, 12px, 16px, 20px, 24px, 32px...` |
| **Typography**        | 4px line heights     | `16px text → 20px or 24px line height`         |
| **Component Heights** | 10 grid units (40px) | `Button: 32px, 40px, or 48px height`           |
| **Border Radii**      | 4px multiples        | `0px, 4px, 8px, 12px, 16px`                    |
| **Border Widths**     | Special case         | `hairline (1px), thin (2px), thick (4px)`      |

## Grid Verification

quadcn provides built-in tools to verify grid compliance:

```jsx
// Toggle grid overlay to check alignment
import { GridOverlay } from "@quadcn/utilities";

<GridOverlay visible={true} color="rgba(0, 0, 255, 0.1)" />;
```

## Philosophy

"Constraints breed creativity." The 4px grid isn't restrictive—it's liberating. By eliminating arbitrary decisions about spacing and sizing, you're free to focus on solving real design problems instead of debating pixels.

## License

[MIT](LICENSE)

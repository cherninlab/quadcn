# QuadCN Library: Guide for Claude

## What is QuadCN?

QuadCN is a precision-focused design system built on a strict 4px grid system. The fundamental principle is that **every measurement must be a multiple of 4px**. This creates a consistent visual rhythm and perfect alignment throughout interfaces.

## Package Structure

The library consists of two main packages:

1. **@quadcn/core**: Foundation package with design tokens, CSS variables, and utilities
   - Zero runtime dependencies
   - Framework-agnostic
   - Provides tokens for spacing, typography, colors, borders, etc.
   - Contains utilities for maintaining grid alignment

2. **@quadcn/components**: React components built on the core package
   - Implements grid-aligned React components
   - Components handle border compensation automatically
   - Includes layout, typography, input, and display components

## The 4px Grid System

- **Grid Unit**: 4px (exported as `GRID_UNIT`)
- **Border Compensation**: Special handling for non-grid-aligned borders (1px and 2px)
- **Line Heights**: All typography has line heights that are multiples of 4px
- **Component Heights**: Standard component heights (24px, 32px, 40px, 48px, 56px, 64px)

## Core Design Tokens

### Spacing

```typescript
// All spacing values are multiples of 4px
export type SpacingToken = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32;
// Where:
// 1 = 4px
// 2 = 8px
// 3 = 12px
// 4 = 16px
// etc.
```

### Typography

```typescript
// Font sizes (not all are multiples of 4px)
export type FontSizeToken = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
// Where:
// xs = 12px
// sm = 14px
// md = 16px
// lg = 20px
// xl = 24px
// etc.

// Line heights (all MUST be multiples of 4px)
export type LineHeightToken = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
// Where:
// xs = 16px (4 grid units)
// sm = 20px (5 grid units)
// md = 24px (6 grid units)
// etc.

// Font weights
export type FontWeightToken = "thin" | "extralight" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";
```

### Borders

```typescript
// Border widths
export type BorderWidthToken = "none" | "hairline" | "thin" | "thick";
// Where:
// none = 0px
// hairline = 1px (exception to 4px grid, requires compensation)
// thin = 2px (exception to 4px grid, requires compensation)
// thick = 4px (1 grid unit)

// Border radius
export type RadiusToken = "none" | "sm" | "md" | "lg" | "xl" | "full";
// Where:
// none = 0px
// sm = 4px (1 grid unit)
// md = 8px (2 grid units)
// lg = 12px (3 grid units)
// xl = 16px (4 grid units)
// full = "9999px" (circle/pill)
```

### Component Heights

```typescript
export type HeightToken = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
// Where:
// xs = 24px (6 grid units)
// sm = 32px (8 grid units)
// md = 40px (10 grid units) - standard button
// lg = 48px (12 grid units)
// xl = 56px (14 grid units)
// 2xl = 64px (16 grid units)
```

### Colors and Themes

The library uses a semantic color system with light and dark themes:

```typescript
export interface BaseTheme {
  name: string;
  colors: {
    bg: {
      base: string;    // Main background
      subtle: string;  // Secondary background
      sunken: string;  // Inset background
      elevated: string; // Raised elements background
    };
    text: {
      primary: string;   // Main text
      secondary: string; // Supporting text
      tertiary: string;  // Subdued text
      disabled: string;  // Inactive text
      inverse: string;   // Text on accent colors
    };
    border: {
      default: string; // Standard borders
      subtle: string;  // Light borders
      strong: string;  // Prominent borders
      focus: string;   // Focus state borders
    };
    accent: {
      default: string;  // Primary action color
      subtle: string;   // Light accent background
      muted: string;    // Subdued accent
      emphasis: string; // Strong accent (hover)
    };
    state: {
      info: { bg: string; text: string; border: string };
      success: { bg: string; text: string; border: string };
      warning: { bg: string; text: string; border: string };
      error: { bg: string; text: string; border: string };
    };
  };
}
```

## Key Components

### Box (Foundation)

The fundamental building block for layouts:

```jsx
<Box
  padding={4} // 16px
  margin={2} // 8px
  borderWidth="hairline" // 1px border
  borderRadius="md" // 8px radius
  borderColor="default"
  backgroundColor="subtle"
  height={10} // 40px
  width={80} // 320px
  display="flex"
  as="section" // Render as different element
>
  Content
</Box>
```

### Stack, VStack, HStack (Layout)

For arranging content with consistent spacing:

```jsx
// Vertical stack
<VStack spacing={4}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</VStack>

// Horizontal stack
<HStack spacing={2} justify="between" align="center">
  <Button>Cancel</Button>
  <Button variant="primary">Submit</Button>
</HStack>
```

### Text and Heading (Typography)

For text content with grid-aligned line heights:

```jsx
<Text
  size="md" // "xs", "sm", "md", "lg", "xl", "2xl", "3xl"
  weight="bold" // "normal", "medium", "semibold", "bold"
  color="primary"
  truncate={true}
>
  Text with 24px line height
</Text>

<Heading
  level={2} // 1-6 for h1-h6
  size="xl" // Size variant, default varies by level
>
  Heading with grid-aligned line height
</Heading>
```

### Button (Input)

Buttons with standardized heights:

```jsx
<Button
  variant="primary" // "primary", "secondary", "outline", "ghost", "danger"
  size="md" // "sm" (32px), "md" (40px), "lg" (48px), "xl" (48px)
  width="full" // "auto", "full"
  leftIcon={<Icon />} // Optional left icon
  rightIcon={<Icon />} // Optional right icon
  disabled={false}
  loading={false}
>
  Click Me
</Button>
```

### Card (Container)

Card component with header, body, and footer:

```jsx
<Card variant="outline"> // "outline", "elevated", "filled"
  <Card.header
    title="Card Title"
    subtitle="Card Subtitle"
    action={<Button>Action</Button>}
  />
  <Card.body>
    <Text>Card content with perfect grid alignment</Text>
  </Card.body>
  <Card.footer>
    <HStack spacing={2}>
      <Button variant="outline">Cancel</Button>
      <Button variant="primary">Submit</Button>
    </HStack>
  </Card.footer>
</Card>
```

### Panel (Container)

Simple container with consistent padding and styling:

```jsx
<Panel 
  variant="outline" // "outline", "filled", "subtle", "elevated" 
  padding={4}
  borderRadius="md"
>
  Panel content
</Panel>
```

### GridOverlay (Debug)

Visualization tool for the 4px grid:

```jsx
<GridOverlay
  initialVisible={true}
  color="rgba(63, 81, 181, 0.15)"
  position="bottom-right"
/>
```

## Theming

The library includes a ThemeProvider for theme context:

```jsx
import { ThemeProvider } from "@quadcn/components";

// Use default themes
<ThemeProvider theme="light"> // or "dark"
  <App />
</ThemeProvider>

// Access theme in components
function CustomComponent() {
  const theme = useTheme();
  return (
    <div style={{ color: theme.colors.text.primary }}>
      Custom styled component
    </div>
  );
}
```

## Border Compensation

The library automatically handles border compensation to maintain grid alignment:

```jsx
// These two boxes have EXACTLY the same total height (40px)
<Box height={10} backgroundColor="accent">
  No border, full 40px height
</Box>

<Box height={10} borderWidth="hairline" borderColor="default">
  1px border with internally adjusted padding to maintain 40px total height
</Box>
```

The `calculateBorderCompensation` utility is used internally to adjust dimensions:

```javascript
// This is handled automatically by components, but can be used manually
const result = calculateBorderCompensation({
  desiredHeight: 40, // 10 grid units
  borderTop: 1,
  borderBottom: 1,
  desiredPaddingY: 10,
});
```

## Usage Notes and Common Patterns

1. **Always use tokens** for spacing, sizing, and typography to maintain grid alignment.

2. **Standard component heights** follow specific multiples of 4px:
   - Small (sm): 32px (8 grid units)
   - Medium (md): 40px (10 grid units) - standard for buttons and inputs
   - Large (lg): 48px (12 grid units)
   - Extra Large (xl): 56px (14 grid units)

3. **Border handling** is automatic in components, but requires special consideration when using custom styles:
   - 1px and 2px borders require compensation
   - 4px borders align naturally to the grid

4. **Semantic color tokens** separate color usage from specific values:
   - Use `text.primary` instead of specific hex values
   - Theme-aware colors switch automatically between light and dark modes

5. **Typography** always has line heights that are multiples of 4px:
   - 16px text uses 24px line height (6 grid units)
   - 14px text uses 20px line height (5 grid units)

6. **Compound components** like Card use nested components:
   ```jsx
   <Card>
     <Card.header title="Title" />
     <Card.body>Content</Card.body>
     <Card.footer>Actions</Card.footer>
   </Card>
   ```

## Implementation in Different Frameworks

### React

```jsx
import { Box, Button, Card, ThemeProvider } from "@quadcn/components";

function App() {
  return (
    <ThemeProvider theme="light">
      <Box padding={4}>
        <Card>
          <Card.body>
            <Button variant="primary">Click Me</Button>
          </Card.body>
        </Card>
      </Box>
    </ThemeProvider>
  );
}
```

### CSS Variables (Framework Agnostic)

```html
<link rel="stylesheet" href="node_modules/@quadcn/core/dist/css/reset.css" />
<link rel="stylesheet" href="node_modules/@quadcn/core/dist/css/variables.css" />

<style>
  .quad-button {
    height: var(--quad-height-md); /* 40px */
    padding: 0 var(--quad-space-4); /* 0 16px */
    border-radius: var(--quad-radius-md); /* 8px */
    background-color: var(--quad-accent-default);
    color: var(--quad-text-inverse);
  }
</style>

<button class="quad-button">Click Me</button>
```

### JavaScript Tokens (Framework Agnostic)

```javascript
import { spacing, heights, radii, colors } from "@quadcn/core";

const buttonStyle = {
  height: heights.md, // "40px"
  padding: `0 ${spacing[4]}`, // "0 16px"
  borderRadius: radii.md, // "8px"
  backgroundColor: colors.accent.default,
  color: colors.text.inverse,
};
```

## Explaining to Users

When explaining this library to users, emphasize:

1. The **mathematical consistency** of the 4px grid system
2. How it ensures **pixel-perfect alignment**
3. That the system handles **border compensation** automatically
4. The **zero dependencies** approach for better performance
5. The **standardized component heights** for consistency

Core philosophy: "Constraints breed creativity." The 4px grid isn't restrictive—it's liberating by eliminating arbitrary decisions about spacing and sizing.
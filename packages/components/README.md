# @quadcn/components

React components built on the QuadCn 4px grid system, ensuring pixel-perfect alignment with zero compromise.

## Installation

```bash
pnpm install @quadcn/components @quadcn/core
```

## Development

This package provides a set of React components built on top of the `@quadcn/core` package, leveraging its grid system, tokens, and utilities.

### Getting Started

```bash
# Install dependencies
pnpm install

# Start development mode
pnpm run dev
```

### Available Scripts

- `pnpm run build` - Build the component library for production
- `pnpm run dev` - Start development mode with watch
- `pnpm run typecheck` - Check TypeScript types
- `pnpm run lint` - Lint the codebase
- `pnpm run prepublishOnly` - Run before publishing (automatically runs build)

## Components Architecture

Components are structured to properly use the core package, making use of:

- Core tokens for spacing, borders, colors, etc.
- Border compensation utilities for proper grid alignment
- Theme system integration

## Directory Structure

```
src/
├── foundation/
│   ├── Box.tsx          # Fundamental layout component
│   ├── Stack.tsx        # Stacking layout component
│   └── Text.tsx         # Typography component
├── components/
│   ├── Button.tsx       # Button component
│   ├── Card.tsx         # Card component
│   └── ...
├── theme/
│   ├── ThemeProvider.tsx # Theme provider component
│   └── useTheme.ts      # Theme hook
├── utils/
│   └── classNames.ts    # Utility for combining class names
└── index.ts             # Main exports
```

## Usage

```jsx
import { Box, Button, ThemeProvider, useTheme } from "@quadcn/components";

function App() {
  return (
    <ThemeProvider theme="light">
      <Box padding={4} borderRadius="md">
        <Button variant="primary" size="md">
          Click me
        </Button>
      </Box>
    </ThemeProvider>
  );
}
```

## Why quadcn Components?

Our components go beyond conventional design systems with an unwavering commitment to the 4px grid:

1. **Perfect Grid Alignment** - Every dimension is a multiple of 4px
2. **Border Compensation** - Automatic adjustments maintain grid alignment even with 1px borders
3. **Standardized Heights** - Consistent component heights (24px, 32px, 40px, 48px, 56px, 64px)
4. **Zero Runtime Dependencies** - Minimal bundle impact with no external runtime dependencies
5. **Type Safety** - Full TypeScript support with strict prop validation

## Layout Components

### Box

The fundamental building block for layouts:

```jsx
<Box
  padding={4} // Spacing tokens from 0-32 (multiples of 4px)
  paddingX={4} // Horizontal padding
  paddingY={2} // Vertical padding
  margin={2} // Margin scale
  marginTop={1} // Individual margin sides
  borderWidth="hairline" // "none", "hairline", "thin", "thick"
  borderRadius="md" // "none", "sm", "md", "lg", "xl", "full"
  borderColor="default" // Semantic color tokens
  backgroundColor="subtle" // Semantic background colors
  height={10} // Height in grid units (10 = 40px)
  width={80} // Width in grid units (80 = 320px)
  position="relative" // CSS position property
  display="flex" // CSS display property
  flexDirection="column" // Flex properties
  justifyContent="center" // Flex alignment
  alignItems="center" // Flex alignment
  as="section" // Render as different element
>
  Content
</Box>
```

#### Grid-Aligned Borders

Box automatically compensates for borders to maintain grid alignment:

```jsx
// These two boxes have EXACTLY the same total height (40px)
<Box height={10} backgroundColor="accent">
  No border, full 40px height
</Box>

<Box height={10} borderWidth="hairline" borderColor="default">
  1px border with internally adjusted padding to maintain 40px total height
</Box>
```

### Stacks

Stack components for managing spacing between children:

#### VStack

Vertical stack with consistent spacing:

```jsx
<VStack spacing={4}>
  {" "}
  {/* 16px gap between all children */}
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</VStack>
```

#### HStack

Horizontal stack with consistent spacing:

```jsx
<HStack spacing={2}>
  {" "}
  {/* 8px gap between all children */}
  <Button>Cancel</Button>
  <Button variant="primary">Submit</Button>
</HStack>
```

#### Stack

Flexible stack with configurable direction:

```jsx
<Stack direction="vertical" spacing={4}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Stack>

<Stack
  direction="horizontal"
  spacing={3}
  wrap="wrap"              // Enable wrapping
  align="center"           // Cross-axis alignment
  justify="space-between"  // Main-axis alignment
>
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</Stack>
```

### Grid

CSS Grid-based layout component:

```jsx
<Grid
  columns={2} // Default 1
  gap={4} // 16px gap between grid cells
  columnGap={4} // Horizontal gap
  rowGap={2} // Vertical gap
  templateColumns="1fr 2fr" // Custom grid template
  autoRows="40px" // Fixed height rows
>
  <Box>Item 1</Box>
  <Box gridColumn="span 2">Item 2 (spans 2 columns)</Box>
  <Box>Item 3</Box>
</Grid>
```

## Typography

### Text

Typography with grid-aligned line heights:

```jsx
<Text
  variant="heading" // "heading", "subheading", "body", "caption"
  size="lg" // "xs", "sm", "md", "lg", "xl", "2xl", "3xl"
  weight="bold" // "normal", "medium", "semibold", "bold"
  align="center" // "left", "center", "right"
  color="primary" // Semantic text colors
  lineHeight="md" // Override default line height
  isTruncated={true} // Add ellipsis for overflow
>
  Perfectly aligned text
</Text>
```

### Heading

Semantic heading components:

```jsx
<Heading
  level={2} // 1-6 for h1-h6
  size="xl" // Size variant, default varies by level
  color="primary" // Text color
>
  Aligned Heading with 4px Line Height
</Heading>
```

## Form Components

### Button

Buttons with standardized, grid-aligned heights:

```jsx
<Button
  variant="primary" // "primary", "secondary", "outline", "ghost"
  size="md" // "sm" (32px), "md" (40px), "lg" (48px)
  width="full" // "auto", "full", or grid units (e.g., 40)
  leftIcon={<Icon />} // Optional left icon
  rightIcon={<Icon />} // Optional right icon
  isDisabled={false} // Disabled state
  isLoading={false} // Loading state
  onClick={handleClick} // Event handler
>
  Click Me
</Button>
```

### Input

Text inputs with grid alignment:

```jsx
<Input
  size="md" // "sm" (32px), "md" (40px), "lg" (48px)
  placeholder="Enter value"
  value={value}
  onChange={handleChange}
  width="full" // "auto", "full", or grid units
  isDisabled={false}
  isInvalid={false}
  errorMessage="Error text"
  leftElement={<Icon />}
  rightElement={<Button>Clear</Button>}
/>
```

### Checkbox

```jsx
<Checkbox
  checked={checked}
  onChange={handleChange}
  label="Remember me"
  size="md" // "sm", "md", "lg"
  isDisabled={false}
/>
```

### Radio

```jsx
<RadioGroup value={value} onChange={setValue}>
  <VStack spacing={2} alignItems="flex-start">
    <Radio value="option1">Option 1</Radio>
    <Radio value="option2">Option 2</Radio>
    <Radio value="option3" isDisabled>
      Option 3
    </Radio>
  </VStack>
</RadioGroup>
```

### Select

```jsx
<Select
  value={value}
  onChange={handleChange}
  placeholder="Select option"
  size="md"
  width="full"
>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
</Select>
```

## Container Components

### Card

```jsx
<Card
  padding={4}
  borderRadius="md"
  variant="outlined" // "elevated", "outlined", "filled"
>
  <CardHeader
    title="Card Title"
    subtitle="Card Subtitle"
    action={<Button>Action</Button>}
  />
  <CardBody>
    <Text>Card content with perfect grid alignment</Text>
  </CardBody>
  <CardFooter>
    <HStack spacing={2}>
      <Button variant="outline">Cancel</Button>
      <Button variant="primary">Submit</Button>
    </HStack>
  </CardFooter>
</Card>
```

### Modal

```jsx
function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader>Perfect Alignment</ModalHeader>
        <ModalBody>
          <Text>This modal has precise 4px grid alignment</Text>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={2}>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary">Submit</Button>
          </HStack>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

## Theming System

quadcn uses a semantic color system that separates color usage from specific values. This makes it easy to create consistent interfaces and switch between themes.

### Using the Theme Provider

```jsx
import { ThemeProvider } from "@quadcn/components";

function App() {
  return (
    <ThemeProvider theme="light">
      {" "}
      {/* or "dark" */}
      <YourApp />
    </ThemeProvider>
  );
}
```

### Available Color Categories

The theming system is organized into semantic categories:

```tsx
// Theme structure
type Theme = {
  name: string;
  bg: {
    base: string; // Main background
    subtle: string; // Secondary background
    sunken: string; // Inset background
    elevated: string; // Raised elements background
  };
  text: {
    primary: string; // Main text
    secondary: string; // Supporting text
    tertiary: string; // Subdued text
    disabled: string; // Inactive text
    inverse: string; // Text on accent colors
  };
  border: {
    default: string; // Standard borders
    subtle: string; // Light borders
    strong: string; // Prominent borders
    focus: string; // Focus state borders
  };
  accent: {
    default: string; // Primary action color
    subtle: string; // Light accent background
    muted: string; // Subdued accent
    emphasis: string; // Strong accent (hover)
  };
  state: {
    info: { bg: string; text: string; border: string };
    success: { bg: string; text: string; border: string };
    warning: { bg: string; text: string; border: string };
    error: { bg: string; text: string; border: string };
  };
};
```

### Creating a Custom Theme

You can create and register custom themes:

```jsx
import { createTheme, ThemeProvider } from "@quadcn/components";

// Create a custom theme
const brandTheme = createTheme({
  name: "brand",
  bg: {
    base: "#ffffff",
    subtle: "#f8f9fa",
    sunken: "#f1f3f5",
    elevated: "#ffffff",
  },
  text: {
    primary: "#212529",
    secondary: "#495057",
    tertiary: "#868e96",
    disabled: "#adb5bd",
    inverse: "#ffffff",
  },
  border: {
    default: "#dee2e6",
    subtle: "#f1f3f5",
    strong: "#adb5bd",
    focus: "#5046e4",
  },
  accent: {
    default: "#5046e4", // Brand purple
    subtle: "#f3f0ff",
    muted: "#b197fc",
    emphasis: "#4338ca",
  },
  state: {
    info: {
      bg: "#e7f5ff",
      text: "#1971c2",
      border: "#74c0fc",
    },
    success: {
      bg: "#ebfbee",
      text: "#2b8a3e",
      border: "#8ce99a",
    },
    warning: {
      bg: "#fff9db",
      text: "#e67700",
      border: "#ffd43b",
    },
    error: {
      bg: "#fff5f5",
      text: "#c92a2a",
      border: "#ffa8a8",
    },
  },
});

// Use the custom theme
function App() {
  return (
    <ThemeProvider theme="brand">
      <YourApp />
    </ThemeProvider>
  );
}
```

### Extending Existing Themes

```jsx
import { extendTheme, ThemeProvider } from "@quadcn/components";

// Extend the light theme
const customTheme = extendTheme("light", {
  accent: {
    default: "#0066ff", // Custom blue
    emphasis: "#0052cc",
  },
});

// Register the extended theme
registerTheme("custom", customTheme);
```

### Using Theme Values in Custom Components

```jsx
import { useTheme } from "@quadcn/components";

function CustomComponent() {
  const theme = useTheme();

  return (
    <div
      style={{
        color: theme.text.primary,
        backgroundColor: theme.bg.subtle,
      }}
    >
      Custom styled component
    </div>
  );
}
```

### Default Themes

quadcn comes with two default themes:

1. **Light Theme** - Clean, accessible light mode with subtle shadows
2. **Dark Theme** - Carefully calibrated dark mode with proper contrast ratios

### Color Contrast Verification

All default themes are verified for WCAG AA compliance. When creating custom themes, use the contrast verification utility:

```jsx
import { verifyThemeContrast } from "@quadcn/utilities";

const contrastIssues = verifyThemeContrast(myCustomTheme);
if (contrastIssues.length > 0) {
  console.warn("Theme has contrast issues:", contrastIssues);
}
```

## Custom Styling

All components accept a `className` prop for custom styling and an `as` prop for rendering as different HTML elements:

```jsx
<Box as="section" className="custom-class" padding={4}>
  Custom section element
</Box>
```

## Style Property Reference

Every component accepts these grid-aligned style props:

| Category       | Props                                                                                           | Example                    |
| -------------- | ----------------------------------------------------------------------------------------------- | -------------------------- |
| **Spacing**    | `margin`, `marginX`, `marginY`, `marginTop`, `marginRight`, `marginBottom`, `marginLeft`        | `marginTop={2}`            |
|                | `padding`, `paddingX`, `paddingY`, `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft` | `padding={4}`              |
| **Layout**     | `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight`                             | `height={10}`              |
| **Position**   | `position`, `top`, `right`, `bottom`, `left`, `zIndex`                                          | `position="relative"`      |
| **Border**     | `borderWidth`, `borderRadius`, `borderColor`, `borderTopWidth`, etc.                            | `borderWidth="thin"`       |
| **Color**      | `backgroundColor`, `color`                                                                      | `backgroundColor="subtle"` |
| **Typography** | `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`, `textAlign`                            | `fontSize="md"`            |
| **FlexBox**    | `display`, `flexDirection`, `flexWrap`, `justifyContent`, `alignItems`, `alignContent`, `gap`   | `justifyContent="center"`  |

## Responsive Styles

All components support responsive values:

```jsx
<Box
  padding={{
    base: 2, // 8px on mobile
    md: 4, // 16px on medium screens
    lg: 6, // 24px on large screens
  }}
  width={{
    base: "full",
    md: 80, // 320px on medium screens
  }}
>
  Responsive Box
</Box>
```

## Development Status

Components are in active development. Current completion status:

- ✅ Core Layout (Box, Stack, Grid)
- ✅ Typography (Text, Heading)
- ✅ Basic Inputs (Button, Input, Checkbox, Radio)
- 🚧 Selection Controls (Select, Combobox)
- 🚧 Containment (Card, Modal, Tabs)
- 🚧 Feedback (Alert, Toast, Progress)
- 📋 Data Display (Table, List)
- 📋 Navigation (Menu, Breadcrumb)

## License

MIT

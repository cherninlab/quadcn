import type * as React from "react";
import type { BoxProps } from "./Box";
import { Box } from "./Box";

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type TextWeight = "normal" | "medium" | "semibold" | "bold";
export type TextVariant = "body" | "body-small" | "caption" | "code";

interface TextProps extends BoxProps {
	/** Text size */
	size?: TextSize;
	/** Font weight */
	weight?: TextWeight;
	/** Text variant */
	variant?: TextVariant;
	/** Whether to truncate text with an ellipsis */
	truncate?: boolean;
}

/**
 * Text component for rendering text content with proper grid-aligned typography.
 * All line heights are multiples of 4px to maintain vertical rhythm.
 */
export const Text: React.FC<TextProps> = ({
	size,
	weight,
	variant = "body",
	truncate = false,
	children,
	className = "",
	...props
}) => {
	// Map variant to default size and weight
	const variantDefaults = {
		body: { size: "md", weight: "normal" },
		"body-small": { size: "sm", weight: "normal" },
		caption: { size: "xs", weight: "normal" },
		code: { size: "sm", weight: "normal" },
	}[variant];

	// Use provided values or defaults from variant
	const finalSize = size || variantDefaults.size;
	const finalWeight = weight || variantDefaults.weight;

	// Build class names
	const classes = [
		`quad-text-${finalSize}`,
		`quad-font-${finalWeight}`,
		truncate && "quad-truncate",
		className,
	]
		.filter(Boolean)
		.join(" ");

	// For code variant, use a monospace font
	const style =
		variant === "code" ? { fontFamily: "var(--quad-font-mono)" } : undefined;

	return (
		<Box as="p" className={classes} style={style} {...props}>
			{children}
		</Box>
	);
};

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

interface HeadingProps extends Omit<TextProps, "variant"> {
	/** Heading level (h1-h6) */
	level?: HeadingLevel;
}

/**
 * Default heading sizes by level, mapping to the design tokens
 */
const defaultHeadingSizes: Record<HeadingLevel, HeadingSize> = {
	1: "3xl",
	2: "2xl",
	3: "xl",
	4: "lg",
	5: "md",
	6: "sm",
};

/**
 * Heading component for rendering headings with proper grid-aligned typography.
 */
export const Heading: React.FC<HeadingProps> = ({
	level = 2,
	size,
	weight = "bold",
	children,
	...props
}) => {
	// Determine element and default size based on level
	const as = `h${level}` as React.ElementType;
	const defaultSize = defaultHeadingSizes[level];

	return (
		<Text as={as} size={size || defaultSize} weight={weight} {...props}>
			{children}
		</Text>
	);
};
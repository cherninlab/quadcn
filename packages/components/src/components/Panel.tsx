import type React from "react";
import type { BoxProps } from "../foundation/Box";
import { Box } from "../foundation/Box";

export type PanelVariant = "outline" | "filled" | "subtle" | "elevated";

export interface PanelProps extends BoxProps {
	/** Panel variant */
	variant?: PanelVariant;
}

/**
 * Panel is a simple container component with consistent padding and styling.
 * It automatically maintains grid alignment and provides a simple way
 * to create card-like containers with minimal configuration.
 */
export const Panel: React.FC<PanelProps> = ({
	variant = "outline",
	children,
	className = "",
	...props
}) => {
	// Map variants to appropriate styles
	const variantStyles: Record<PanelVariant, Record<string, unknown>> = {
		outline: {
			borderWidth: "hairline",
			borderColor: "default",
			backgroundColor: "base",
		},
		filled: {
			backgroundColor: "subtle",
		},
		subtle: {
			backgroundColor: "subtle",
			borderWidth: "hairline",
			borderColor: "subtle",
		},
		elevated: {
			backgroundColor: "elevated",
			className: "quad-shadow-md",
		},
	};

	// Get styles for selected variant
	const variantStyle = variantStyles[variant];
	const variantClassName = variantStyle.className as string | undefined;

	// Create a new object without the className property
	const { className: _, ...restVariantProps } = variantStyle;

	// Combine classes
	const combinedClassNames = [
		"quad-panel",
		`quad-panel-${variant}`,
		variantClassName,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<Box
			className={combinedClassNames}
			padding={4}
			borderRadius="md"
			{...restVariantProps}
			{...props}
		>
			{children}
		</Box>
	);
};

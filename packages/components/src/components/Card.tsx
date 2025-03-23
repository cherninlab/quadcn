import type React from "react";
import type { BoxProps } from "../foundation/Box";
import { Box } from "../foundation/Box";
import { HStack } from "../foundation/Stack";
import { Heading, Text } from "../foundation/Text";

export type CardVariant = "outline" | "elevated" | "filled";

export interface CardProps extends BoxProps {
	/** Card variant */
	variant?: CardVariant;
}

/**
 * Card component with automatic spacing and border handling.
 */
export const Card: React.FC<CardProps> = ({
	variant = "outline",
	children,
	className = "",
	...props
}) => {
	// Map variants to styles
	const variantClass = `quad-card-${variant}`;

	// Combine classes
	const classes = ["quad-card", variantClass, className]
		.filter(Boolean)
		.join(" ");

	// The card component automatically applies appropriate padding,
	// border radius, and other styling to maintain grid alignment

	return (
		<Box className={classes} borderRadius="md" {...props}>
			{children}
		</Box>
	);
};

export interface CardHeaderProps extends BoxProps {
	/** Card title */
	title?: React.ReactNode;
	/** Card subtitle */
	subtitle?: React.ReactNode;
	/** Action component */
	action?: React.ReactNode;
}

/**
 * Card header with title, subtitle, and optional action.
 */
export const CardHeader: React.FC<CardHeaderProps> = ({
	title,
	subtitle,
	action,
	children,
	className = "",
	...props
}) => {
	// Use className prop
	const classes = ["quad-card-header", className].filter(Boolean).join(" ");

	return (
		<Box
			className={classes}
			paddingX={6}
			paddingTop={6}
			paddingBottom={subtitle ? 3 : 6}
			style={{
				borderBottom: subtitle
					? "none"
					: "var(--quad-border-hairline) solid var(--quad-border-subtle)",
			}}
			{...props}
		>
			<HStack style={{ justifyContent: "space-between", alignItems: "center" }}>
				<Box>
					{title &&
						(typeof title === "string" ? (
							<Heading level={3} size="lg">
								{title}
							</Heading>
						) : (
							title
						))}

					{subtitle &&
						(typeof subtitle === "string" ? (
							<Text size="md" color="secondary" marginTop={1}>
								{subtitle}
							</Text>
						) : (
							subtitle
						))}

					{!(title || subtitle) && children}
				</Box>

				{action && <Box marginLeft={4}>{action}</Box>}
			</HStack>
		</Box>
	);
};

export interface CardBodyProps extends BoxProps {}

/**
 * Card body component for the main content.
 */
export const CardBody: React.FC<CardBodyProps> = ({
	children,
	className = "",
	...props
}) => {
	const classes = ["quad-card-body", className].filter(Boolean).join(" ");

	return (
		<Box className={classes} paddingX={6} paddingY={6} {...props}>
			{children}
		</Box>
	);
};

export interface CardFooterProps extends BoxProps {}

/**
 * Card footer component for actions.
 */
export const CardFooter: React.FC<CardFooterProps> = ({
	children,
	className = "",
	...props
}) => {
	const classes = ["quad-card-footer", className].filter(Boolean).join(" ");

	return (
		<Box
			className={classes}
			paddingX={6}
			paddingTop={3}
			paddingBottom={6}
			style={{
				borderTop:
					"var(--quad-border-hairline) solid var(--quad-border-subtle)",
			}}
			{...props}
		>
			{children}
		</Box>
	);
};

// Create compound component
export const CompoundCard = Object.assign(Card, {
	header: CardHeader,
	body: CardBody,
	footer: CardFooter,
});

import { type CSSProperties, Children, forwardRef } from "react";
import type { BoxProps } from "./Box";
import { Box } from "./Box";

interface StackProps extends BoxProps {
	/** Space between children (in grid units) */
	spacing?: 0 | 1 | 2 | 3 | 4 | 6 | 8;
	/** Whether to reverse the order of children */
	reverse?: boolean;
	/** Whether to wrap children */
	wrap?: boolean;
	/** Horizontal alignment of children */
	justify?: "start" | "center" | "end" | "between" | "around";
	/** Vertical alignment of children */
	align?: "start" | "center" | "end" | "stretch" | "baseline";
	/** Additional styling */
	style?: CSSProperties;
}

/**
 * Stack arranges its children in a column or row with consistent spacing.
 * All spacing is aligned to the 4px grid.
 */
export const Stack = forwardRef<HTMLElement, StackProps>(
	(
		{
			spacing = 4,
			reverse = false,
			wrap = false,
			justify,
			align,
			children,
			style = {},
			...props
		},
		ref,
	) => {
		// Create class names for flex styles
		const flexClasses = [
			"quad-flex",
			wrap ? "quad-flex-wrap" : "quad-flex-nowrap",
			reverse ? "quad-flex-reverse" : "",
		]
			.filter(Boolean)
			.join(" ");

		// Create style object for justify and align
		const flexStyles: CSSProperties = { ...style };

		// Map justify prop to CSS property
		if (justify) {
			switch (justify) {
				case "start":
					flexStyles.justifyContent = "flex-start";
					break;
				case "center":
					flexStyles.justifyContent = "center";
					break;
				case "end":
					flexStyles.justifyContent = "flex-end";
					break;
				case "between":
					flexStyles.justifyContent = "space-between";
					break;
				case "around":
					flexStyles.justifyContent = "space-around";
					break;
				default:
					flexStyles.justifyContent = "flex-start";
					break;
			}
		}

		// Map align prop to CSS property
		if (align) {
			switch (align) {
				case "start":
					flexStyles.alignItems = "flex-start";
					break;
				case "center":
					flexStyles.alignItems = "center";
					break;
				case "end":
					flexStyles.alignItems = "flex-end";
					break;
				case "stretch":
					flexStyles.alignItems = "stretch";
					break;
				case "baseline":
					flexStyles.alignItems = "baseline";
					break;
				default:
					flexStyles.alignItems = "stretch";
					break;
			}
		}

		return (
			<Box
				display="flex"
				className={flexClasses}
				style={flexStyles}
				ref={ref}
				{...props}
			>
				{Children.map(children, (child, index) => {
					if (index === 0) {
						return child;
					}

					return <Box style={{ marginLeft: `${spacing * 4}px` }}>{child}</Box>;
				})}
			</Box>
		);
	},
);

Stack.displayName = "Stack";

/**
 * VStack arranges its children vertically with consistent spacing.
 */
export const VStack = forwardRef<HTMLElement, StackProps>(
	({ reverse = false, children, style = {}, ...props }, ref) => {
		const vStackStyles: CSSProperties = {
			...style,
			flexDirection: reverse ? "column-reverse" : "column",
		};

		return (
			<Stack style={vStackStyles} ref={ref} {...props}>
				{children}
			</Stack>
		);
	},
);

VStack.displayName = "VStack";

/**
 * HStack arranges its children horizontally with consistent spacing.
 */
export const HStack = forwardRef<HTMLElement, StackProps>(
	({ reverse = false, children, style = {}, ...props }, ref) => {
		const hStackStyles: CSSProperties = {
			...style,
			flexDirection: reverse ? "row-reverse" : "row",
		};

		return (
			<Stack style={hStackStyles} ref={ref} {...props}>
				{children}
			</Stack>
		);
	},
);

HStack.displayName = "HStack";

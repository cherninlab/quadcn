import type { BorderWidthToken, RadiusToken, SpacingToken } from "@quadcn/core";
import type React from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";
import { forwardRef } from "react";
import {
	applyBorderCompensation,
	buildBoxClassNames,
	getWidthHeightStyles,
} from "../utils/boxUtils";

export interface BoxProps {
	/** HTML element to render as */
	as?: ElementType;

	/** Padding on all sides (in grid units) */
	padding?: SpacingToken;
	/** Padding on X-axis (in grid units) */
	paddingX?: SpacingToken;
	/** Padding on Y-axis (in grid units) */
	paddingY?: SpacingToken;
	/** Padding on top (in grid units) */
	paddingTop?: SpacingToken;
	/** Padding on right (in grid units) */
	paddingRight?: SpacingToken;
	/** Padding on bottom (in grid units) */
	paddingBottom?: SpacingToken;
	/** Padding on left (in grid units) */
	paddingLeft?: SpacingToken;

	/** Margin on all sides (in grid units) */
	margin?: SpacingToken | "auto";
	/** Margin on X-axis (in grid units) */
	marginX?: SpacingToken | "auto";
	/** Margin on Y-axis (in grid units) */
	marginY?: SpacingToken;
	/** Margin on top (in grid units) */
	marginTop?: SpacingToken;
	/** Margin on right (in grid units) */
	marginRight?: SpacingToken | "auto";
	/** Margin on bottom (in grid units) */
	marginBottom?: SpacingToken;
	/** Margin on left (in grid units) */
	marginLeft?: SpacingToken | "auto";

	/** Width */
	width?: SpacingToken | "full" | "auto" | string;
	/** Height */
	height?: SpacingToken | "full" | "auto" | string;

	/** Border width */
	borderWidth?: BorderWidthToken;
	/** Border radius */
	borderRadius?: RadiusToken;
	/** Border color */
	borderColor?: string;

	/** Background color */
	backgroundColor?: string;
	/** Text color */
	color?: string;

	/** Display property */
	display?:
		| "block"
		| "inline"
		| "inline-block"
		| "flex"
		| "inline-flex"
		| "grid"
		| "none";

	/** Position properties */
	position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
	top?: number | string;
	right?: number | string;
	bottom?: number | string;
	left?: number | string;
	zIndex?: number;

	/** CSS class names */
	className?: string;

	/** Style props */
	style?: CSSProperties;

	/** Children */
	children?: ReactNode;

	/** Standard HTML attributes */
	id?: string;
	role?: string;
	tabIndex?: number;

	/** Events */
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
	onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
	onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
	onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLElement>) => void;

	/** For button elements */
	type?: "button" | "submit" | "reset";
	disabled?: boolean;

	/** For anchor elements */
	href?: string;
	target?: string;
	rel?: string;

	/** For input elements */
	value?: string | number | readonly string[];
	defaultValue?: string | number | readonly string[];
	placeholder?: string;

	/** ARIA attributes */
	"aria-label"?: string;
	"aria-hidden"?: boolean | "true" | "false";
	"aria-disabled"?: boolean | "true" | "false";
	"aria-expanded"?: boolean | "true" | "false";
	"aria-controls"?: string;
	"aria-selected"?: boolean | "true" | "false";

	/** Data attributes */
	[key: `data-${string}`]: unknown;
}

/**
 * Box is the fundamental building block in the QuadCN component library.
 * It provides a simple way to apply spacing, borders, and other styles
 * while maintaining grid alignment.
 */
export const Box = forwardRef<HTMLElement, BoxProps>((props, ref) => {
	const {
		as: Component = "div",
		width,
		height,
		borderWidth,
		paddingY,
		position,
		top,
		right,
		bottom,
		left,
		zIndex,
		style = {},
		...rest
	} = props;

	// Build class names
	const classes = buildBoxClassNames(props);
	const classNames = classes.join(" ");

	// Get basic width/height styles
	let customStyle = { ...style, ...getWidthHeightStyles(width, height) };

	// Add position styles if provided
	if (position) {
		customStyle.position = position;
	}
	if (top !== undefined) {
		customStyle.top = typeof top === "number" ? `${top}px` : top;
	}
	if (right !== undefined) {
		customStyle.right = typeof right === "number" ? `${right}px` : right;
	}
	if (bottom !== undefined) {
		customStyle.bottom = typeof bottom === "number" ? `${bottom}px` : bottom;
	}
	if (left !== undefined) {
		customStyle.left = typeof left === "number" ? `${left}px` : left;
	}
	if (zIndex !== undefined) {
		customStyle.zIndex = zIndex;
	}

	// Apply border compensation if needed
	if (height !== undefined && typeof height === "number" && borderWidth) {
		customStyle = applyBorderCompensation(
			customStyle,
			height,
			borderWidth,
			paddingY,
		);
	}

	// Create the element
	const ElementType = Component;
	return (
		<ElementType
			ref={ref}
			className={classNames}
			style={customStyle}
			{...rest}
		/>
	);
});

Box.displayName = "Box";

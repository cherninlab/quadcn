import type { BorderWidthToken, SpacingToken } from "@quadcn/core";
import {
	GRID_UNIT,
	calculateBorderCompensation,
	createGridValue,
} from "@quadcn/core";
import type { BoxProps } from "../foundation/Box";

type CSSProperties = {
	[key: string]: string | number | undefined;
};

/**
 * Builds class names for a Box component based on props
 * @param props Box component props
 * @returns Array of class names
 */
export function buildBoxClassNames(props: BoxProps): string[] {
	const classes = ["quad"];
	const {
		padding,
		paddingX,
		paddingY,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		margin,
		marginX,
		marginY,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		display,
		borderWidth,
		borderRadius,
		borderColor,
		backgroundColor,
		color,
		className = "",
	} = props;

	// Add padding classes
	if (padding !== undefined) {
		classes.push(`quad-p-${padding}`);
	}

	if (paddingX !== undefined) {
		classes.push(`quad-px-${paddingX}`);
	}

	if (paddingY !== undefined) {
		classes.push(`quad-py-${paddingY}`);
	}

	if (paddingTop !== undefined) {
		classes.push(`quad-pt-${paddingTop}`);
	}

	if (paddingRight !== undefined) {
		classes.push(`quad-pr-${paddingRight}`);
	}

	if (paddingBottom !== undefined) {
		classes.push(`quad-pb-${paddingBottom}`);
	}

	if (paddingLeft !== undefined) {
		classes.push(`quad-pl-${paddingLeft}`);
	}

	// Add margin classes
	if (margin !== undefined) {
		if (margin === "auto") {
			classes.push("quad-m-auto");
		} else {
			classes.push(`quad-m-${margin}`);
		}
	}

	if (marginX !== undefined) {
		if (marginX === "auto") {
			classes.push("quad-mx-auto");
		} else {
			classes.push(`quad-mx-${marginX}`);
		}
	}

	if (marginY !== undefined) {
		classes.push(`quad-my-${marginY}`);
	}

	if (marginTop !== undefined) {
		classes.push(`quad-mt-${marginTop}`);
	}

	if (marginRight !== undefined) {
		if (marginRight === "auto") {
			classes.push("quad-mr-auto");
		} else {
			classes.push(`quad-mr-${marginRight}`);
		}
	}

	if (marginBottom !== undefined) {
		classes.push(`quad-mb-${marginBottom}`);
	}

	if (marginLeft !== undefined) {
		if (marginLeft === "auto") {
			classes.push("quad-ml-auto");
		} else {
			classes.push(`quad-ml-${marginLeft}`);
		}
	}

	// Add display class
	if (display) {
		classes.push(`quad-${display}`);
	}

	// Add border classes
	if (borderWidth) {
		classes.push(`quad-border-${borderWidth}`);
	}

	if (borderRadius) {
		classes.push(`quad-rounded-${borderRadius}`);
	}

	if (borderColor) {
		classes.push(`quad-border-${borderColor}`);
	}

	// Add color classes
	if (backgroundColor) {
		classes.push(`quad-bg-${backgroundColor}`);
	}

	if (color) {
		classes.push(`quad-text-${color}`);
	}

	// Add custom class names
	if (className) {
		classes.push(className);
	}

	return classes;
}

/**
 * Generate styles for width and height
 * @param width Width value
 * @param height Height value
 * @returns CSS properties object
 */
export function getWidthHeightStyles(
	width?: SpacingToken | "full" | "auto" | string,
	height?: SpacingToken | "full" | "auto" | string,
): CSSProperties {
	const style: CSSProperties = {};

	if (width !== undefined) {
		if (width === "full") {
			style.width = "100%";
		} else if (width === "auto") {
			style.width = "auto";
		} else if (typeof width === "number") {
			style.width = createGridValue(width);
		} else {
			style.width = width;
		}
	}

	if (height !== undefined) {
		if (height === "full") {
			style.height = "100%";
		} else if (height === "auto") {
			style.height = "auto";
		} else if (typeof height === "number") {
			style.height = createGridValue(height);
		} else {
			style.height = height;
		}
	}

	return style;
}

/**
 * Apply border compensation to maintain grid alignment
 * @param style Existing style object
 * @param height Height in grid units
 * @param borderWidth Border width token
 * @param paddingY Padding Y value
 * @returns Adjusted style object
 */
export function applyBorderCompensation(
	style: CSSProperties,
	height: number,
	borderWidth: BorderWidthToken,
	paddingY?: SpacingToken,
): CSSProperties {
	// No need to check if borderWidth is defined since it's required by the type
	const compensation = calculateBorderCompensation({
		desiredHeight: height * GRID_UNIT,
		borderTop: borderWidth,
		borderBottom: borderWidth,
		desiredPaddingY: paddingY ? Number(paddingY) * GRID_UNIT : 0,
	});

	// Apply compensation to maintain grid alignment
	const adjustedStyle = { ...style };
	adjustedStyle.height = `${compensation.innerHeight}px`;

	if (compensation.paddingTop > 0) {
		adjustedStyle.paddingTop = `${compensation.paddingTop}px`;
	}

	if (compensation.paddingBottom > 0) {
		adjustedStyle.paddingBottom = `${compensation.paddingBottom}px`;
	}

	return adjustedStyle;
}

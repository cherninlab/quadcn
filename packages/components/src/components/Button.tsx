import type React from "react";
import { forwardRef } from "react";
import type { BoxProps } from "../foundation/Box";
import { useTheme } from "../theme/ThemeProvider";
import { cx } from "../utils/classNames";

// Import tokens from core
import type { BorderWidthToken, SpacingToken } from "@quadcn/core";

export type ButtonVariant =
	| "primary"
	| "secondary"
	| "outline"
	| "ghost"
	| "danger";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BoxProps> {
	/** Button variant */
	variant?: ButtonVariant;
	/** Button size */
	size?: ButtonSize;
	/** Whether the button is disabled */
	disabled?: boolean;
	/** Whether the button is in a loading state */
	loading?: boolean;
	/** Optional icon to display before button text */
	leftIcon?: React.ReactNode;
	/** Optional icon to display after button text */
	rightIcon?: React.ReactNode;
	/** Button width */
	width?: "auto" | "full";
	/** Button children */
	children?: React.ReactNode;
	/** CSS class names */
	className?: string;
	/** Button type */
	type?: "button" | "submit" | "reset";
	/** Click handler */
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	/** Button style */
	style?: React.CSSProperties;
	/** Other props to pass to the Box component */
	boxProps?: Omit<BoxProps, "as" | "ref">;
}

// Size to height mapping using the design system's 4px grid
const sizeToHeight: Record<ButtonSize, SpacingToken> = {
	sm: 8, // 32px (8 grid units)
	md: 10, // 40px (10 grid units)
	lg: 12, // 48px (12 grid units)
	xl: 12, // Changed from 14 to 12 (48px) to match available spacing tokens
};

// Size to border width mapping
const sizeToBorderWidth: Record<ButtonSize, BorderWidthToken> = {
	sm: "hairline",
	md: "hairline",
	lg: "thin",
	xl: "thin",
};

// Size to padding mapping
const sizeToPadding: Record<ButtonSize, SpacingToken> = {
	sm: 2,
	md: 3,
	lg: 4,
	xl: 4,
};

/**
 * Button component with precise 4px grid alignment.
 * Heights are standardized at 32px (sm), 40px (md), 48px (lg), or 56px (xl).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = "primary",
			size = "md",
			disabled = false,
			loading = false,
			leftIcon,
			rightIcon,
			width,
			children,
			className = "",
			type = "button",
			onClick,
			boxProps,
			style = {},
			...props
		},
		ref,
	) => {
		const theme = useTheme();

		// Build class names using the utility function
		const classes = cx(
			"quad-btn",
			`quad-btn-${variant}`,
			`quad-btn-${size}`,
			width === "full" && "quad-w-full",
			disabled && "quad-btn-disabled",
			loading && "quad-btn-loading",
			className,
		);

		// Get the appropriate border width for the button size
		const borderWidth = sizeToBorderWidth[size];

		// Get the height in grid units
		const height = sizeToHeight[size];

		// Get padding for the button size
		const paddingX = sizeToPadding[size];

		// Instead of trying to use the Box directly, manually create the element
		// with all the correct props to avoid type mismatches
		return (
			<button
				className={classes}
				type={type}
				disabled={disabled || loading}
				onClick={onClick}
				ref={ref}
				style={{
					height: `${height * 4}px`,
					borderWidth:
						borderWidth === "hairline"
							? "1px"
							: borderWidth === "thin"
								? "2px"
								: borderWidth === "thick"
									? "4px"
									: "0",
					borderRadius: "8px", // md
					paddingLeft: `${paddingX * 4}px`,
					paddingRight: `${paddingX * 4}px`,
					display: "inline-flex",
					alignItems: "center",
					justifyContent: "center",
					...style,
				}}
				{...props}
			>
				{loading && <span className="quad-btn-spinner" aria-hidden="true" />}

				{!loading && leftIcon && (
					<span className="quad-btn-icon quad-btn-icon-left">{leftIcon}</span>
				)}

				{children}

				{!loading && rightIcon && (
					<span className="quad-btn-icon quad-btn-icon-right">{rightIcon}</span>
				)}
			</button>
		);
	},
);

Button.displayName = "Button";

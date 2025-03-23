import type { BaseTheme } from "./base";

export const darkTheme: BaseTheme = {
	name: "dark",
	colors: {
		bg: {
			base: "#18181b",
			subtle: "#27272a",
			sunken: "#1f1f23",
			elevated: "#27272a",
		},
		text: {
			primary: "#f4f4f5",
			secondary: "#a1a1aa",
			tertiary: "#71717a",
			disabled: "#52525b",
			inverse: "#18181b",
		},
		border: {
			default: "#27272a",
			subtle: "#3f3f46",
			strong: "#52525b",
			focus: "#818cf8",
		},
		accent: {
			default: "#818cf8",
			subtle: "#1e293b",
			muted: "#334155",
			emphasis: "#6366f1",
		},
		state: {
			info: {
				bg: "#0c4a6e",
				text: "#7dd3fc",
				border: "#0284c7",
			},
			success: {
				bg: "#14532d",
				text: "#86efac",
				border: "#16a34a",
			},
			warning: {
				bg: "#78350f",
				text: "#fcd34d",
				border: "#d97706",
			},
			error: {
				bg: "#7f1d1d",
				text: "#fca5a5",
				border: "#dc2626",
			},
		},
	},
};

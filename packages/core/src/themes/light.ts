import type { BaseTheme } from "./base";

export const lightTheme: BaseTheme = {
	name: "light",
	colors: {
		bg: {
			base: "#ffffff",
			subtle: "#f8f8fa",
			sunken: "#f4f4f5",
			elevated: "#ffffff",
		},
		text: {
			primary: "#18181b",
			secondary: "#52525b",
			tertiary: "#71717a",
			disabled: "#a1a1aa",
			inverse: "#ffffff",
		},
		border: {
			default: "#e4e4e7",
			subtle: "#f4f4f5",
			strong: "#d4d4d8",
			focus: "#3f51b5",
		},
		accent: {
			default: "#3f51b5",
			subtle: "#e8eaf6",
			muted: "#c5cae9",
			emphasis: "#303f9f",
		},
		state: {
			info: {
				bg: "#e0f2fe",
				text: "#0369a1",
				border: "#7dd3fc",
			},
			success: {
				bg: "#dcfce7",
				text: "#15803d",
				border: "#86efac",
			},
			warning: {
				bg: "#fef3c7",
				text: "#92400e",
				border: "#fcd34d",
			},
			error: {
				bg: "#fee2e2",
				text: "#b91c1c",
				border: "#fca5a5",
			},
		},
	},
};

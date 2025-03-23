import type { BaseTheme } from "@quadcn/core";
import { darkTheme, lightTheme } from "@quadcn/core";
import type * as React from "react";
import { createContext, useContext } from "react";

// Create context using the BaseTheme interface from core
const ThemeContext = createContext<BaseTheme>(lightTheme);

export interface ThemeProviderProps {
	theme?: "light" | "dark" | BaseTheme;
	children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
	theme = "light",
	children,
}) => {
	// Use themes directly from core
	let themeValue: BaseTheme;

	if (typeof theme === "string") {
		themeValue = theme === "light" ? lightTheme : darkTheme;
	} else {
		themeValue = theme;
	}

	return (
		<ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);

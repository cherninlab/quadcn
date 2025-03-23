import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { Box } from "../foundation/Box";

interface GridOverlayProps {
	/** Whether the grid overlay is initially visible */
	initialVisible?: boolean;
	/** Color of the grid lines */
	color?: string;
	/** Position of the toggle button */
	position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
	/** Z-index of the overlay */
	zIndex?: number;
}

/**
 * GridOverlay component for visualizing the 4px grid.
 * Provides a toggle button and keyboard shortcut to show/hide the grid.
 */
export const GridOverlay: React.FC<GridOverlayProps> = ({
	initialVisible = false,
	color = "rgba(63, 81, 181, 0.15)",
	position = "bottom-right",
	zIndex = 9999,
}) => {
	const [visible, setVisible] = useState(initialVisible);

	// Toggle grid visibility - use useCallback to memoize the function
	const toggleGrid = useCallback(() => setVisible((prev) => !prev), []);

	// Add keyboard shortcut (Alt+G)
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.altKey && event.key === "g") {
				toggleGrid();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [toggleGrid]); // Add toggleGrid to the dependency array

	// Position styles for toggle button
	const positionStyles: Record<
		string,
		{ top?: number; bottom?: number; left?: number; right?: number }
	> = {
		"top-right": { top: 4, right: 4 },
		"top-left": { top: 4, left: 4 },
		"bottom-right": { bottom: 4, right: 4 },
		"bottom-left": { bottom: 4, left: 4 },
	};

	return (
		<>
			{/* Grid overlay */}
			{visible && (
				<Box
					position="fixed"
					top={0}
					left={0}
					right={0}
					bottom={0}
					zIndex={zIndex}
					className="quad-grid-overlay"
					style={{
						pointerEvents: "none",
						backgroundImage: `
              linear-gradient(${color} 1px, transparent 1px),
              linear-gradient(90deg, ${color} 1px, transparent 1px)
            `,
						backgroundSize: "4px 4px",
					}}
				/>
			)}

			{/* Toggle button */}
			<Box
				position="fixed"
				zIndex={zIndex + 1}
				padding={2}
				className={`quad-grid-toggle ${visible ? "quad-grid-toggle-active" : ""}`}
				backgroundColor={visible ? "accent" : "subtle"}
				color={visible ? "inverse" : "primary"}
				borderRadius="sm"
				style={{
					...positionStyles[position],
					cursor: "pointer",
					fontSize: "12px",
					fontWeight: 500,
					boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
				}}
				onClick={toggleGrid}
			>
				{visible ? "Hide Grid" : "Show Grid (Alt+G)"}
			</Box>
		</>
	);
};

export default GridOverlay;

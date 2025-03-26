import { Box, Button, HStack, Text } from "@quadcn/components";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function NotFound({ children }: { children?: ReactNode }) {
	return (
		<Box padding={4} marginY={4}>
			<Box marginBottom={4}>
				<Text color="secondary">
					{children || <p>The page you are looking for does not exist.</p>}
				</Text>
			</Box>
			<HStack spacing={2}>
				<Button variant="outline" onClick={() => window.history.back()}>
					Go back
				</Button>
				<Link
					to="/"
					style={{
						display: "inline-block",
						backgroundColor: "var(--quad-accent-default)",
						color: "var(--quad-text-inverse)",
						padding: "4px 8px",
						borderRadius: "4px",
						fontWeight: "bold",
						fontSize: "14px",
						textTransform: "uppercase",
						textDecoration: "none",
					}}
				>
					Start Over
				</Link>
			</HStack>
		</Box>
	);
}

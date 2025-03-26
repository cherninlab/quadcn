import { Box, HStack, ThemeProvider } from "@quadcn/components";
import {
	HeadContent,
	Link,
	Outlet,
	Scripts,
	createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type * as React from "react";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { NotFound } from "~/components/NotFound";
import appCss from "~/styles/app.css?url";
import { seo } from "~/utils/seo";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			...seo({
				title: "QuadCN Documentation | Precision-focused 4px Grid System",
				description:
					"QuadCN is a precision-focused design system built on a strict 4px grid system for pixel-perfect UIs.",
			}),
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/favicon-32x32.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: "/favicon-16x16.png",
			},
			{ rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
			{ rel: "icon", href: "/favicon.ico" },
		],
	}),
	errorComponent: (props) => {
		return (
			<RootDocument>
				<DefaultCatchBoundary {...props} />
			</RootDocument>
		);
	},
	notFoundComponent: () => <NotFound />,
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<ThemeProvider theme="light">
					<Box padding={2}>
						<HStack spacing={2}>
							<Link
								to="/"
								activeProps={{
									style: { fontWeight: "bold" },
								}}
								activeOptions={{ exact: true }}
								style={{ fontSize: "var(--quad-font-lg)" }}
							>
								Home
							</Link>{" "}
							<Link
								// @ts-expect-error
								to="/this-route-does-not-exist"
								activeProps={{
									style: { fontWeight: "bold" },
								}}
								style={{ fontSize: "var(--quad-font-lg)" }}
							>
								This Route Does Not Exist
							</Link>
						</HStack>
					</Box>
					<Box as="hr" borderWidth="hairline" borderColor="subtle" />
					{children}
					<TanStackRouterDevtools position="bottom-right" />
					<Scripts />
				</ThemeProvider>
			</body>
		</html>
	);
}

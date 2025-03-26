import {
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	GridOverlay,
	Heading,
	Panel,
	Text,
	VStack,
} from "@quadcn/components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<Box padding={6}>
			{/* Debug grid overlay - useful during development */}
			<GridOverlay initialVisible={false} position="bottom-right" />

			<VStack spacing={6}>
				<Heading level={1} size="3xl">
					QuadCN Documentation
				</Heading>

				<Text>
					Welcome to the QuadCN documentation. This site is built using QuadCN
					itself, demonstrating the 4px grid system in action.
				</Text>

				<Panel variant="subtle" padding={4} borderRadius="md">
					<VStack spacing={3}>
						<Heading level={2} size="xl">
							Getting Started
						</Heading>
						<Text>
							QuadCN is a precision-focused design system built on a strict 4px
							grid system. Every measurement must be a multiple of 4px, creating
							a consistent visual rhythm throughout interfaces.
						</Text>
						<Button variant="primary" size="md">
							Installation Guide
						</Button>
					</VStack>
				</Panel>

				<Card>
					<CardHeader title="Example Components" />
					<CardBody>
						<VStack spacing={4}>
							<Text>
								Below are some example components from the QuadCN library. Each
								component adheres strictly to the 4px grid system.
							</Text>

							<Box
								padding={4}
								borderWidth="hairline"
								borderRadius="md"
								borderColor="default"
							>
								<Text>
									This box has a 1px border with proper grid compensation.
								</Text>
							</Box>

							<Panel variant="outline" padding={4}>
								<Text>This is a simple panel component.</Text>
							</Panel>

							<Text>
								Button heights are standardized at 32px (sm), 40px (md), or 48px
								(lg).
							</Text>

							<Box display="flex" style={{ gap: "16px" }}>
								<Button size="sm" variant="outline">
									Small Button
								</Button>
								<Button size="md" variant="primary">
									Medium Button
								</Button>
								<Button size="lg" variant="secondary">
									Large Button
								</Button>
							</Box>
						</VStack>
					</CardBody>
					<CardFooter>
						<Text size="sm">
							All components maintain perfect 4px grid alignment.
						</Text>
					</CardFooter>
				</Card>
			</VStack>
		</Box>
	);
}

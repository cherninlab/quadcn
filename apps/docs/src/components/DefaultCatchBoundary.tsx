import { Box, Button, VStack } from "@quadcn/components";
import type { ErrorComponentProps } from "@tanstack/react-router";
import {
	ErrorComponent,
	Link,
	rootRouteId,
	useMatch,
	useRouter,
} from "@tanstack/react-router";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
	const router = useRouter();
	const isRoot = useMatch({
		strict: false,
		select: (state) => state.id === rootRouteId,
	});

	return (
		<Box padding={4}>
			<ErrorComponent error={error} />
			<VStack spacing={2} marginTop={4}>
				<Button
					type="button"
					variant="primary"
					onClick={() => {
						router.invalidate();
					}}
				>
					Try Again
				</Button>
				{isRoot ? (
					<Link to="/">Home</Link>
				) : (
					<Link
						to="/"
						onClick={(e) => {
							e.preventDefault();
							window.history.back();
						}}
					>
						Go Back
					</Link>
				)}
			</VStack>
		</Box>
	);
}

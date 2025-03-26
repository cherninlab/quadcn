import { createFileRoute } from "@tanstack/react-router";
import { Markdown } from "~/components/Markdown";
import { NotFound } from "~/components/NotFound";
import { postsManifest } from "./-manifest";

export const Route = createFileRoute("/d/$slug")({
	component: BlogPostRouteComponent,
});

function BlogPostRouteComponent() {
	const { slug } = Route.useParams();
	const post = postsManifest.find(
		({ frontmatter }) => frontmatter.slug === slug,
	);

	if (!post) {
		return <NotFound />;
	}

	return (
		<Markdown className="mb-16">
			<post.default />
		</Markdown>
	);
}

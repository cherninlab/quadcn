declare module "~/content/*.mdx" {
	export const frontmatter: { title: string; slug: string };
	export default () => ReactNode;
}

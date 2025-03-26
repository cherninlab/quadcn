import { MDXProvider } from "@mdx-js/react";
import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

const components = {
	Image,
	img: Image,
	Video,
	Youtube,
};

interface MarkdownProps extends ComponentProps<"div"> {
	children?: ReactNode;
}

export function Markdown({ children, className, ...props }: MarkdownProps) {
	return (
		<div className={clsx("prose max-w-full", className)} {...props}>
			<MDXProvider components={components}>{children}</MDXProvider>
		</div>
	);
}

function Image({ src, alt, className = "", ...props }: ComponentProps<"img">) {
	return (
		<img
			{...props}
			className={clsx("mx-auto", className)}
			src={src}
			alt={alt || ""}
		/>
	);
}

function Video({ src }: { src: string }) {
	return (
		<picture className="flex w-full justify-center">
			<video
				muted={true}
				autoPlay={true}
				loop={true}
				controls={true}
				src={src}
				className="max-w-[600px]"
			/>
		</picture>
	);
}

function Youtube({ id }: { id: string }) {
	return (
		<iframe
			width="560"
			height="315"
			src={`https://www.youtube.com/embed/${id}`}
			title="YouTube video player"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerPolicy="strict-origin-when-cross-origin"
			allowFullScreen={true}
			className="mx-auto"
		/>
	);
}

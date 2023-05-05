import React from "react";
import { graphql, Link, PageProps } from "gatsby";
import { Layout } from "../components/layout";

type PageContext = {
	next: {
		blogsId: string;
		title: string;
	} | null;
	previous: {
		blogsId: string;
		title: string;
	} | null;
};

export default function BlogPage({
	data,
	pageContext: { next, previous },
	location,
}: PageProps<Queries.BlogPageQuery, PageContext>) {
	const { microcmsBlogs } = data;
	return (
		<Layout pageTitle={microcmsBlogs?.title || ""}>
			<div dangerouslySetInnerHTML={{ __html: microcmsBlogs?.content ?? "" }} />
			<ul>
				{next && (
					<li>
						次へ：
						<Link to={`/blog/${next.blogsId}/`}>{next.title}</Link>
					</li>
				)}
				{previous && (
					<li>
						前へ：
						<Link to={`/blog/${previous.blogsId}/`}>{previous.title}</Link>
					</li>
				)}
			</ul>
		</Layout>
	);
}

export const query = graphql`
	query BlogPage($id: String!) {
		microcmsBlogs(blogsId: { eq: $id }) {
			blogsId
			title
			content
			publishedAt
		}
	}
`;

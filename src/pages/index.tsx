import * as React from "react";
import { HeadFC, Link, PageProps, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import { Layout } from "../components/layout";
import { Seo } from "../components/seo";

export default function IndexPage({ data }: PageProps<Queries.IndexPageQuery>) {
	const { allMicrocmsBlogs } = data;
	return (
		<Layout pageTitle="Home Page">
			<p>hey, it's home.</p>
			<p>microCMS below</p>
			<ul>
				{allMicrocmsBlogs.nodes.map((node) => (
					<li key={node.blogsId}>
						<Link to={`/blogs/${node.blogsId}/`}>{node.title}</Link>
					</li>
				))}
			</ul>
			<Link to="/blogs/">もっとみる</Link>
			<p>microCMS above</p>
			<StaticImage
				alt="Clifford, a reddish-brown pitbull, posing on a couch and looking stoically at the camera"
				src="https://pbs.twimg.com/media/E1oMV3QVgAIr1NT?format=jpg&name=large"
			/>{" "}
		</Layout>
	);
}

export const Head: HeadFC = () => <Seo title="Home Page" />;

export const query = graphql`
	query IndexPage {
		allMicrocmsBlogs {
			nodes {
				title
				blogsId
				content
				createdAt
			}
		}
	}
`;

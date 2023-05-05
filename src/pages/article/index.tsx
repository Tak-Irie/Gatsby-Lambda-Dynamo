import * as React from "react";
import { PageProps, graphql, Link } from "gatsby";

import { Layout } from "../../components/layout";
import { Seo } from "../../components/seo";

type Data = {
	allMdx: {
		nodes: [
			{
				id: string;
				frontmatter: {
					title: string;
					date: string;
					slug: string;
				};
			}
		];
	};
};
const Article: React.FC<PageProps<Data>> = ({ data }) => {
	return (
		<Layout pageTitle="My Article Posts">
			{data.allMdx.nodes.map((node) => (
				<article key={node.id}>
					<h2>
						<Link to={`/article/${node.frontmatter.slug}`}>
							{node.frontmatter.title}
						</Link>
					</h2>
					<p>Posted: {node.frontmatter.date}</p>
				</article>
			))}
		</Layout>
	);
};

export const query = graphql`
	query {
		allMdx(sort: { frontmatter: { date: DESC } }) {
			nodes {
				frontmatter {
					date(formatString: "MMMM D, YYYY")
					title
					slug
				}
				id
			}
		}
	}
`;

export const Head = () => <Seo title="My Blog Posts" />;

export default Article;

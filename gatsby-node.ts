import { Actions, GatsbyNode, graphql } from "gatsby";
import path from "path";

export const createPages: GatsbyNode["createPages"] = async ({
	graphql,
	actions: { createPage },
	reporter,
}) => {
	const result = await graphql<Queries.CreatePagesQuery>(`
		query CreatePages {
			allMicrocmsBlogs(sort: { publishedAt: DESC }) {
				edges {
					node {
						blogsId
					}
					next {
						blogsId
						title
					}
					previous {
						blogsId
						title
					}
				}
			}
		}
	`);

	if (result.errors) {
		reporter.panicOnBuild(
			`There was an error loading your blog posts`,
			result.errors
		);
		return;
	}

	result.data?.allMicrocmsBlogs.edges.forEach((edge) => {
		createPage({
			path: `/blog/${edge.node.blogsId}/`,
			component: path.resolve("src/templates/blog.tsx"),
			context: {
				id: edge.node.blogsId,
				next: edge.next,
				previous: edge.previous,
			},
		});
	});
};

export const query = graphql`
	query CreatePages {
		allMicrocmsBlogs(sort: { publishedAt: DESC }) {
			edges {
				node {
					blogsId
				}
				next {
					blogsId
					title
				}
				previous {
					blogsId
					title
				}
			}
		}
	}
`;

import { Actions, GatsbyNode, graphql } from "gatsby";
import path from "path";
import { getPagesContext } from "./src/utils/getPageContext";

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
				totalCount
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

	const {
		allMicrocmsBlogs: { totalCount, edges },
	} = result.data!;

	edges.forEach((edge) => {
		createPage({
			path: `/blogs/${edge.node.blogsId}/`,
			component: path.resolve("src/templates/blog.tsx"),
			context: {
				id: edge.node.blogsId,
				next: edge.next,
				previous: edge.previous,
			},
		});
	});

	const pagesContext = getPagesContext({
		totalCount,
		limit: 10, // 1ページあたり10コンテンツを表示させる
	});

	pagesContext.forEach((context) => {
		const component = path.resolve("src/templates/blogs.tsx");

		if (context.currentPageNum === 1) {
			createPage({
				path: `/blogs/`,
				component,
				context,
			});
			return;
		}

		createPage({
			path: `/blogs/page/${context.currentPageNum}/`,
			component,
			context,
		});
	});
};

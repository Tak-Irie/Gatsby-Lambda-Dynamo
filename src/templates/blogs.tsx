import { graphql, PageProps, navigate, Link } from "gatsby";
import React from "react";
import { Layout } from "../components/layout";

type PageContext = {
	limit: number;
	offset: number;
	totalCount: number;
	currentPageNum: number;
	totalPagesCount: number;
};

export default function BlogsPage({
	data,
	pageContext: { limit, offset, totalCount, currentPageNum, totalPagesCount },
	location,
}: PageProps<Queries.BlogsPageQuery, PageContext>) {
	const { allMicrocmsBlogs } = data;
	return (
		<Layout pageTitle="ブログ一覧">
			<p>
				{totalCount} 件中 {offset + 1} 件目から {limit} 件表示
			</p>
			<ul>
				{allMicrocmsBlogs.nodes.map((node) => (
					<li key={node.blogsId}>
						<Link to={`/blogs/${node.blogsId}/`}>{node.title}</Link>
					</li>
				))}
			</ul>

			<select
				onChange={(e) => {
					navigate(
						e.target.value === "1"
							? "/blogs/"
							: `/blogs/page/${e.target.value}/`
					);
				}}
			>
				{new Array(totalPagesCount).fill("").map((_, i) => {
					const pageNum = i + 1;
					return (
						<option
							value={pageNum}
							key={i}
							selected={pageNum === currentPageNum}
						>
							{pageNum} ページ目
						</option>
					);
				})}
			</select>
		</Layout>
	);
}

export const query = graphql`
	query BlogsPage($limit: Int!, $offset: Int!) {
		allMicrocmsBlogs(
			limit: $limit
			skip: $offset
			sort: { publishedAt: DESC }
		) {
			nodes {
				blogsId
				title
				publishedAt
				revisedAt
			}
		}
	}
`;

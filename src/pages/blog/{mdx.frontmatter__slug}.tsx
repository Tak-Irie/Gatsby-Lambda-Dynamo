import * as React from "react";
import { PageProps, HeadProps, Link } from "gatsby";
import { graphql } from "gatsby";

import { Layout } from "../../components/layout";
import { Seo } from "../../components/seo";

type BlogPostProps = {
	mdx: {
		frontmatter: {
			title: string;
			date: string;
		};
	};
};

const BlogPost: React.FC<PageProps<BlogPostProps>> = ({ data, children }) => {
	return (
		<Layout pageTitle={data.mdx.frontmatter.title}>
			<p>{data.mdx.frontmatter.date}</p>
			{children}
			<Link to={`/blog/`}>Back</Link>
		</Layout>
	);
};

export const query = graphql`
	query ($id: String) {
		mdx(id: { eq: $id }) {
			frontmatter {
				title
				date(formatString: "MMMM D, YYYY")
			}
		}
	}
`;

export const Head = (props: HeadProps<BlogPostProps>) => (
	<Seo title={props.data.mdx.frontmatter.title} />
);

export default BlogPost;

import * as React from "react";
import { PageProps, HeadProps, Link, graphql } from "gatsby";
import { GatsbyImage, ImageDataLike, getImage } from "gatsby-plugin-image";

import { Layout } from "../../components/layout";
import { Seo } from "../../components/seo";

type ArticlePostProps = {
	mdx: {
		frontmatter: {
			title: string;
			date: string;
			hero_image: ImageDataLike | null;
			hero_image_alt: string;
			hero_image_credit_link: string;
			hero_image_credit_text: string;
		};
	};
};

const ArticlePost: React.FC<PageProps<ArticlePostProps>> = ({
	data,
	children,
}) => {
	const image = getImage(data.mdx.frontmatter.hero_image);
	return (
		<Layout pageTitle={data.mdx.frontmatter.title}>
			<p>Posted: {data.mdx.frontmatter.date}</p>
			<GatsbyImage image={image!} alt={data.mdx.frontmatter.hero_image_alt} />
			<p>
				Photo Credit:{" "}
				<a href={data.mdx.frontmatter.hero_image_credit_link}>
					{data.mdx.frontmatter.hero_image_credit_text}
				</a>
			</p>
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
				date(formatString: "MMMM DD, YYYY")
				hero_image_alt
				hero_image_credit_link
				hero_image_credit_text
				hero_image {
					childImageSharp {
						gatsbyImageData
					}
				}
			}
		}
	}
`;

export const Head = (props: HeadProps<ArticlePostProps>) => (
	<Seo title={props.data.mdx.frontmatter.title} />
);

export default ArticlePost;

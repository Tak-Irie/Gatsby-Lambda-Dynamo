import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";

type SeoProps = {
	title: string;
};

export const Seo: React.FC<SeoProps> = ({ title }) => {
	const data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
				}
			}
		}
	`);

	return (
		<title>
			{title} | {data.site.siteMetadata.title}
		</title>
	);
};

import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import { Layout } from "../components/layout";
import { Seo } from "../components/seo";

const IndexPage: React.FC<PageProps> = () => {
	return (
		<Layout pageTitle="Home Page">
			<p>hey, it's home.</p>
			<StaticImage
				alt="Clifford, a reddish-brown pitbull, posing on a couch and looking stoically at the camera"
				src="https://pbs.twimg.com/media/E1oMV3QVgAIr1NT?format=jpg&name=large"
			/>
		</Layout>
	);
};

export default IndexPage;

export const Head: HeadFC = () => <Seo title="Home Page" />;

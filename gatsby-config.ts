import "dotenv/config";
import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
	siteMetadata: {
		title: `Gatsby-Lambda-Dynamo`,
		siteUrl: `https://www.yourdomain.tld`,
	},
	// More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
	// If you use VSCode you can also use the GraphQL plugin
	// Learn more at: https://gatsby.dev/graphql-typegen
	graphqlTypegen: true,
	plugins: [
		"gatsby-plugin-emotion",
		"gatsby-plugin-image",
		"gatsby-plugin-sharp",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: `blog`,
				path: `${__dirname}/blog`,
			},
		},
		"gatsby-plugin-mdx",
		"gatsby-transformer-sharp",
		{
			resolve: "gatsby-source-microcms",
			options: {
				apiKey: process.env.MICROCMS_API_KEY,
				serviceId: process.env.MICROCMS_SERVICE_ID,
				apis: [
					{
						endpoint: "blogs",
					},
					{
						endpoint: "categories",
					},
				],
			},
		},
	],
};

export default config;

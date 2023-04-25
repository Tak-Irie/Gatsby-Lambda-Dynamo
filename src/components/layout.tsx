import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { css } from "@emotion/react";

type LayoutProps = {
	pageTitle: string;
	children: React.ReactNode;
};

const nav = css({
	background: "gray",
});

const ul = css({
	display: "flex",
	listStyle: "none",
});

const li = css({
	margin: "10px",
});

const siteTitle = css({
	fontSize: "3rem",
	color: "gray",
	fontWeight: "700",
	margin: "3rem 0",
});

export const Layout: React.FC<LayoutProps> = ({ pageTitle, children }) => {
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
		<div>
			<header css={siteTitle}>{data.site.siteMetadata.title}</header>
			<nav css={nav}>
				<ul css={ul}>
					<li css={li}>
						<Link to="/">Home</Link>
					</li>
					<li css={li}>
						<Link to="/about">About</Link>
					</li>
				</ul>
			</nav>
			<main>
				<h1>{pageTitle}</h1>
				{children}
			</main>
		</div>
	);
};

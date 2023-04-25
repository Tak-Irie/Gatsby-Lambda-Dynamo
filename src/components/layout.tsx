import * as React from "react";
import { Link } from "gatsby";
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
});

const li = css({
	margin: 2,
});

export const Layout: React.FC<LayoutProps> = ({ pageTitle, children }) => {
	return (
		<div>
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

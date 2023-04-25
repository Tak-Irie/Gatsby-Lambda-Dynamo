import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Link } from "gatsby"

const AboutPage: React.FC<PageProps> = () => {
  return (
    <main>
      <h1>hey, it's about</h1>
      <Link to="/">Back to Home</Link>
    </main>
  )
}

export default AboutPage

export const Head: HeadFC = () => <title>About Page</title>

import * as React from "react"
import { Link } from "gatsby"
import type { HeadFC, PageProps} from "gatsby"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <h1>initial</h1>
      <Link to="/about">About</Link>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>

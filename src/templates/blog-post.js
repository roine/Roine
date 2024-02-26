import React, { createElement, Fragment } from 'react'
import { Link, graphql } from 'gatsby'
import * as prod from 'react/jsx-runtime'

import Layout from '../components/Layout'
import Tags from '../components/Tags'
import SEO from '../components/seo'
import { rhythm, scale } from '../utils/typography'
import rehypeReact from 'rehype-react'
import { Callout } from '../components/Callout'
import { unified } from 'unified'

const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs }

const processor = unified().use(
  rehypeReact,
  Object.assign(
    {
      createElement,
      components: {
        callout: Callout,
      },
    },
    production
  )
)

const renderAst = (ast) => {
  return processor.stringify(ast)
}

/**
 * Single article page
 */
class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </p>
        <div>{renderAst(post.htmlAst)}</div>
        <Tags tags={post.frontmatter.tags} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.frontmatter.path} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.frontmatter.path} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { path: { eq: $slug } }) {
      id
      htmlAst
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        path
        tags
      }
    }
  }
`

import React from 'react'
import { Link, graphql } from 'gatsby'

import Tags from '../components/Tags'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`, `elm`, `graphql`]}
        />

        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.frontmatter.path
          return (
            <div
              key={node.frontmatter.path}
              style={{
                background: '#fff',
                margin: '10px 0',
                borderRadius: 3,
              }}
            >
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                  marginTop: 0,
                  fontSize: rhythm(0.75),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.frontmatter.path}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <Tags
                tags={node.frontmatter.tags}
                style={{ paddingLeft: '20px', paddingRight: '20px' }}
              />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            path
            tags
          }
        }
      }
    }
  }
`

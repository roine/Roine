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
                boxShadow: '0 1px 3px #ccc',
                borderRadius: 3,
              }}
            >
              <div style={{ padding: '20px' }}>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                    marginTop: 0,
                    fontSize: rhythm(1),
                  }}
                >
                  <Link
                    style={{ boxShadow: `none` }}
                    to={node.frontmatter.path}
                  >
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
                <div
                class="post__content"
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.tags.includes('til')
                      ? node.html
                      : node.excerpt,
                  }}
                />
              </div>
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          html
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

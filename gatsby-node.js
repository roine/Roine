const path = require(`path`)
const _ = require('lodash')
const { createFilePath } = require(`gatsby-source-filesystem`)
const kebabCase = require('lodash/kebabCase')
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tagTemplate = path.resolve('src/templates/tags.js')
  return graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
        edges {
          node {
            frontmatter {
              title
              tags
              path
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    let tags = []
    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node
      tags = tags.concat(post.node.frontmatter.tags)

      // path need to be identical in context and created path as it is used from context to find the path later on
      createPage({
        path: post.node.frontmatter.path,
        component: blogPost,
        context: {
          slug: post.node.frontmatter.path,
          previous,
          next,
        },
      })
    })

    tags = Array.from(new Set(tags))

    tags.forEach((tag) => {
      createPage({
        path: `/tags/${kebabCase(tag)}/`,
        component: tagTemplate,
        context: {
          tag,
        },
      })
    })
  })
}

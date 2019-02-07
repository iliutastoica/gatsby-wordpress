/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)

// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress posts (route : /post/{slug})
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const PageTemplate = path.resolve('./src/templates/page.js')
  const PostTemplate = path.resolve('./src/templates/post.js')
  const MediaTemplate = path.resolve('./src/templates/media.js')

  return graphql(`
    {
      allWordpressPage {
        edges {
          node {
            wordpress_id
            slug
            type
          }
        }
      }
      allWordpressPost {
        edges {
          node {
            wordpress_id
            slug
            type
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Pages
    const pages = result.data.allWordpressPage.edges
    pages.forEach(page => {
      createPage({
        path: `/${page.node.slug}`,
        component: PageTemplate,
        context: {
          id: page.node.wordpress_id,
        },
      })
    })

    // Posts
    const posts = result.data.allWordpressPost.edges
    posts.forEach(post => {
      createPage({
        path: `/post/${post.node.slug}`,
        component: PostTemplate,
        context: {
          id: post.node.wordpress_id,
        },
      })
    })
  })
}

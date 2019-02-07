import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    {data.allWordpressPost.edges.map(post => (
      <article
        style={{
          margin: '20px 0',
          padding: '20px 0',
          borderBottom: '1px solid #ddd',
        }}
      >
        <Link
          to={`/post/${post.node.slug}`}
          style={{ display: 'flex', textDecoration: 'none' }}
        >
          <Img
            fixed={post.node.featured_media.localFile.childImageSharp.fixed}
            style={{ marginRight: 20 }}
          />
          <div>
            <h3 style={{ marginBottom: 0 }}>{post.node.title}</h3>
            <div
              dangerouslySetInnerHTML={{ __html: post.node.excerpt }}
              style={{ color: '#333' }}
            />
          </div>
        </Link>
      </article>
    ))}
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allWordpressPost {
      edges {
        node {
          title
          excerpt
          slug
          featured_media {
            localFile {
              childImageSharp {
                fixed(width: 100, height: 100) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`

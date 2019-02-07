import React from 'react'
import Img from 'gatsby-image'
import Layout from '../components/layout'

const PostTemplate = ({ data }) => (
  <Layout>
    <h1>{data.wordpressPost.title}</h1>
    <Img
      fixed={data.wordpressPost.featured_media.localFile.childImageSharp.fixed}
    />
    <div dangerouslySetInnerHTML={{ __html: data.wordpressPost.content }} />
  </Layout>
)
export default PostTemplate

export const query = graphql`
  query PostQuery($id: Int!) {
    wordpressPost(wordpress_id: { eq: $id }) {
      title
      content
      featured_media {
        localFile {
          childImageSharp {
            fixed(width: 800, height: 300) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
    }
  }
`

import React from 'react'
import Layout from '../components/layout'

const PageTemplate = ({ data }) => (
  <Layout>
    <h1>{data.wordpressPage.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: data.wordpressPage.content }} />
  </Layout>
)
export default PageTemplate

export const query = graphql`
  query PageQuery($id: Int!) {
    wordpressPage(wordpress_id: { eq: $id }) {
      title
      content
    }
  }
`

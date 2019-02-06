import { StaticQuery, Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
  <StaticQuery
    query={graphql`
      query {
        wordpressSiteMetadata {
          name
        }
        allWordpressWpApiMenusMenusItems(
          filter: { slug: { eq: "main-menu" } }
        ) {
          edges {
            node {
              name
              items {
                title
                url
              }
            }
          }
        }
      }
    `}
    render={data => {
      const menu = data.allWordpressWpApiMenusMenusItems.edges[0].node
      const siteTitle = data.wordpressSiteMetadata.name
      menu.items.map(item => {
        let parts = item.url.split('/')
        parts = parts.slice(3)
        item.slug = parts.join('/')
        return item.slug
      })
      return (
        <header style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Link to="/">{siteTitle}</Link>
          <ul style={{ display: 'flex', listStyle: 'none' }}>
            {menu.items.map(item => (
              <li key={item.title}>
                <Link to={`/${item.slug}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </header>
      )
    }}
  />
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

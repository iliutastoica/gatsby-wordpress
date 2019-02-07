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
          filter: { slug: { eq: "main-navigation" } }
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
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            background: 'orange',
          }}
        >
          <Link
            to="/"
            style={{
              fontSize: 24,
              color: 'white',
              textDecoration: 'none',
              fontFamily: 'sans-serif',
            }}
          >
            {siteTitle}
          </Link>
          <ul
            style={{
              display: 'flex',
              alignItems: 'center',
              listStyle: 'none',
              margin: 15,
            }}
          >
            {menu.items.map(item => (
              <li key={item.title} style={{ margin: 0 }}>
                <Link
                  to={`/${item.slug}`}
                  style={{
                    padding: '0 15px',
                    color: 'white',
                    textDecoration: 'none',
                    fontFamily: 'sans-serif',
                  }}
                >
                  {item.title}
                </Link>
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

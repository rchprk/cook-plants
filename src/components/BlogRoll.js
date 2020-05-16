//BlogRoll is a list of blog posts, starting from most recent

import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (

      <div className="all-blog-list">
        {posts &&
          posts.map(({ node: post }) => (

            <div className="is-parent columns is-12 blog-list-item box" key={post.id}>

                {post.frontmatter.featuredimage ? (
                    <div className="featured-thumbnail column is-narrow">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                        }}
                      />
                    </div>
                ) : null}

                <div className="post-text column box">
                    <p className="post-meta">
                        <Link
                          className="title has-text-primary is-size-4"
                          to={post.fields.slug}
                        >
                          {post.frontmatter.title}
                        </Link>
                    </p>
                    <p className="preview">
                      {post.excerpt}
                      <br />
                    </p>
                </div>

            </div>
          ))}
      </div>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)



{/* paste after return in between brackets - original one column version
    <div className="all-blog-list">
      {posts &&
        posts.map(({ node: post }) => (
          <div className="is-parent columns is-12" key={post.id}>
            <article
              className={`blog-list-item box `}
              //className={`blog-list-item tile is-child box notification`}
            >
              <header>
              {post.frontmatter.featuredimage ? (
                  <div className="featured-thumbnail column is-narrow">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.frontmatter.featuredimage,
                        alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                      }}
                    />
                  </div>
              ) : null}

              <div className="post-text column box">
                  <p className="post-meta">
                      <Link
                        className="title has-text-primary is-size-4"
                        to={post.fields.slug}
                      >
                        {post.frontmatter.title}
                      </Link>
                  </p>
                  <p className="preview">
                    {post.excerpt}
                    <br />
                  </p>
              </div>
              </header>
            </article>
          </div>
        ))}
    </div>
    */}

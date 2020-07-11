import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import LayoutPost from '../components/LayoutPost'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'


export const BlogPostTemplate = ({
  content,
  contentComponent,
  meal,
  date,
  title,
  featuredimage,
  helmet,
  ingredients,
  method,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="recipe-info-and-images">
                <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                  {title}
                </h1>
                <div className="date">
                    <span>{date}</span>
                </div>

                <div className="meal">
                    {meal && meal.length ? (
                      <div style={{ marginTop: `4rem` }}>
                        <ul className="taglist">
                          {meal.map((tag) => (
                            <li key={tag + `tag`}>
                              <Link to={`/meal/${kebabCase(tag)}/`}>{tag}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                </div>
                <div className="featured-image">
                    {featuredimage ? (
                      <div className="ft">
                        <PreviewCompatibleImage
                          imageInfo={{
                            image: featuredimage,
                            alt: `featured image thumbnail for post ${title}`,
                          }}
                        />
                      </div>
                    ) : null}
                    <span>image here</span>

                </div>




            </div>


            <PostContent content={content} />




            <div className="recipe-body">
                <div className="recipe-text">Recipe</div>
                <div className="recipe-ingredients">
                    <div className="recipe-subheading">
                        <table>
                          <tr>
                            <td>1</td>
                            <td>Ingredients</td>
                          </tr>
                        </table>
                    </div>

                    {ingredients && ingredients.length ? (

                        <ul className="ingredients-list">
                          {ingredients.map((tag) => (
                            <li key={tag + `tag`}>
                                <label className="checkbox-ingredient-container">
                                    <div className="checkbox-container">
                                        <input type="checkbox"/>
                                        <div className="checkmark"></div>

                                    </div>

                                  <span>{tag}</span>
                                </label>
                            </li>
                          ))}
                        </ul>
                    ) : null}

                    </div>
                    <div className="recipe-method">

                        <div className="recipe-subheading">
                            <table>
                              <tr>
                                <td>2</td>
                                <td>Method</td>
                              </tr>
                            </table>
                        </div>

                        <ol className="method-list">
                          {method.map((tag) => (
                            <li key={tag + `tag`}>
                            <div className="step-arrow">&#x2794;</div>

                            <span>{tag}</span>
                            </li>
                          ))}
                        </ol>
                    </div>
                </div>
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <LayoutPost>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        date={post.frontmatter.date}
        meal={post.frontmatter.meal}
        title={post.frontmatter.title}
        ingredients={post.frontmatter.ingredients}
        method={post.frontmatter.method}
        featuredimage={post.frontmatter.featuredimage}
      />
    </LayoutPost>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "DD/MM.")
        title
        meal
        serves
        cost
        time
        ingredients
        method
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
`

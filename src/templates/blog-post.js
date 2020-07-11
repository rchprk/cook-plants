import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import LayoutPost from '../components/LayoutPost'
import Content, { HTMLContent } from '../components/Content'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  meal,
  title,
  helmet,
  ingredients,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>

            <PostContent content={content} />


            <div className="recipe-body">
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
                        


                    </div>


                </div>




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
        meal={post.frontmatter.meal}
        title={post.frontmatter.title}
        ingredients={post.frontmatter.ingredients}
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
        date(formatString: "MMMM DD, YYYY")
        title
        meal
        serves
        cost
        time
        ingredients
      }
    }
  }
`

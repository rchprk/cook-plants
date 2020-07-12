import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { graphql, Link } from 'gatsby'
import LayoutPost from '../components/LayoutPost'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'


export const RecipePostTemplate = ({
  content,
  contentComponent,
  meal,
  date,
  title,
  featuredimage,
  ingredients,
  method,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">

      <div className="container content recipe">
            <div className="recipe-split recipe-info-and-images left">
                <div className="date">
                    <span>{date}</span>
                </div>

                    <div className="title-padding">
                        <h1 className="fake">
                          {title}
                        </h1>
                    </div>
                <div className="featured-image-and-title">




                    <div className="title">

                        <h1 className="real">
                          {title}
                        </h1>
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
                    </div>


                </div>

                <div className="meal">
                    {meal && meal.length ? (
                        <ul>
                          {meal.map((tag) => (
                            <span key={tag + `tag`}>
                             {tag}
                            </span>
                          ))}
                        </ul>
                    ) : null}
                </div>





            </div>






            <div className="recipe-split recipe-body right">
                <div className="recipe-text">
                    <span>Recipe</span>
                </div>
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
    </section>
  )
}

RecipePostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
}

const RecipePost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <LayoutPost>
      <RecipePostTemplate
        content={post.html}
        contentComponent={HTMLContent}

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

RecipePost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default RecipePost

export const pageQuery = graphql`
  query RecipePostByID($id: String!) {
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
            fluid(maxWidth: 300, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

import LayoutMain from '../components/LayoutMain'
//import Features from '../components/Features'
import RecipeRoll from '../components/RecipeRoll'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const IndexPageTemplate = ({

}) => (
    <section className="section section--gradient">

      <div className="container">

        <div className="section">
        <div
          className="meal-list"
        >
            <Link className="meal-item" to="/about">
              Breakfast
            </Link>
            <Link className="meal-item" to="/recipe">
              Lunch
            </Link>
            <Link className="meal-item" to="/contact">
              Dinner
            </Link>
            <Link className="meal-item" to="/contact/examples">
              Dessert
            </Link>
        </div>
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="column is-12">
                  <RecipeRoll />
                  <div className="column is-1 has-text-centered">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <LayoutMain>
      <IndexPageTemplate
        title={frontmatter.title}

      />
    </LayoutMain>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        description
      }
    }
  }
`

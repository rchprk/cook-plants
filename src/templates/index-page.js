import React from 'react'
import PropTypes from 'prop-types'
//import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
//import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  description,
  intro,
}) => (
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">

                <div className="column is-12">
                  <BlogRoll />
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
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
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

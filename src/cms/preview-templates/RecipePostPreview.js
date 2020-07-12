import React from 'react'
import PropTypes from 'prop-types'
import { RecipePostTemplate } from '../../templates/recipe-post'

const RecipePostPreview = ({ entry, widgetFor }) => {
  const meal = entry.getIn(['data', 'meal'])

  return (
    <RecipePostTemplate
      content={widgetFor('body')}
      description={entry.getIn(['data', 'description'])}
      meal={meal && meal.toJS()}

      title={entry.getIn(['data', 'title'])}
    />
  )
}

RecipePostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default RecipePostPreview

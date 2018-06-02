import React from 'react';
import { connect } from 'react-redux';
import RecipeForm from './RecipeForm';
import selectRecipes from '../selectors/recipes';
import { startEditRecipe, startRemoveRecipe } from '../actions/recipes';
import { resetFilters } from '../actions/filters';

export class EditRecipePage extends React.Component {
    onSubmit = (recipe) => {
        this.props.startEditRecipe(this.props.recipe.id, recipe);
        this.props.history.push('/');
    };

    onRemoveRecipe = (id) => {
        this.props.startRemoveRecipe(id);
        this.props.resetFilters();
        this.props.history.push('/');
    };

    render() {
        return (
            <div className="container__page">
                <div className="editRecipe">
                    <h3 className="editRecipe__title">Edit Recipe</h3>
                    <RecipeForm
                        recipe={this.props.recipe}
                        onSubmit={this.onSubmit}
                        onRemove={this.onRemoveRecipe}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        recipe: state.recipes.find((recipe) => recipe.id === state.filters.recipe)
    };
};
  
const mapDispatchToProps = (dispatch, props) => ({
    startEditRecipe: (id, recipe) => dispatch(startEditRecipe(id, recipe)),
    startRemoveRecipe: (data) => dispatch(startRemoveRecipe(data)),
    resetFilters: () => dispatch(resetFilters())
});
  
export default connect(mapStateToProps, mapDispatchToProps)(EditRecipePage);
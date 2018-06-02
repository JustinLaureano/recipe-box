import React from 'react';
import { connect } from 'react-redux';
import RecipeForm from './RecipeForm';
import { startAddRecipe } from '../actions/recipes';

export class AddRecipePage extends React.Component {
    onSubmit = (recipe) => {
        this.props.startAddRecipe(recipe);
        this.props.history.push('/');
    };
    render() {
        return (
            <div className="container__page">
                <div className="addRecipe">
                    <h3 className="addRecipe__title">Add New Recipe</h3>
                    <RecipeForm
                        onSubmit={this.onSubmit}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        recipes: state.recipes
    };
};

const mapDispatchToProps = (dispatch) => ({
    startAddRecipe: (recipe) => dispatch(startAddRecipe(recipe))
  });

  export default connect(mapStateToProps, mapDispatchToProps)(AddRecipePage);
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectRecipes from '../selectors/recipes';
import { sortByRecipe } from '../actions/filters';

export class RecipeList extends React.Component {
    constructor(props) {
        super(props);
    };

    onRecipeChange = (e) => {
        this.props.sortByRecipe(e.target.id);
    };

    onAutoCapitalize(text) {
        return text.slice(0,1).toUpperCase() + text.slice(1, text.length);
    };

    render() {
        return (
            <div className="recipeList">
                <ul className="recipeList__items">
                    {this.props.recipes.map((recipe) => {
                        return (
                            <li
                                key={recipe.id}
                                id={recipe.id}
                                className="recipeList__listItem"
                                onClick={this.onRecipeChange}
                            >
                                {this.onAutoCapitalize(recipe.name)}
                            </li>)
                    })}                
                </ul>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        recipes: selectRecipes(state.recipes, state.filters)
    };
};

const mapDispatchToProps = (dispatch) => ({
    sortByRecipe: (recipe) => dispatch(sortByRecipe(recipe))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { sortByCategory, sortByRecipe, resetFilters } from '../actions/filters';
import recipesByCategory from '../selectors/recipesByCategory';


export class RecipeNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.uuidv1 = require('uuid/v1');
    };
    
    onCategoryChange = (e) => {
        this.props.sortByCategory(e.target.value);
    };

    onRecipeChange = (e) => {
        const recipeId = e.target.label;
        this.props.sortByRecipe(e.target.value);
    };

    onResetRecipeFilters = () => {
        this.props.resetFilters();
    };

    onAutoCapitalize(text) {
        return text.slice(0,1).toUpperCase() + text.slice(1, text.length);
    };

    render() {
        return (
            <nav className="recipeNav">
                <div
                    className="recipeNav__item"
                    onClick={this.onResetRecipeFilters}    
                >
                    <h2>Recipes</h2>
                </div>
        
                <div className="recipeNav__item">
                    <select
                        className="recipeNav__select"
                        value={this.props.filters.category}
                        onChange={this.onCategoryChange}
                    >
                    <option key={this.uuidv1()} value="Categories">Categories</option>
                    { this.props.filters.categories.map((category) => {
                        return <option key={this.uuidv1()} value={category}>{category}</option>
                    })}
                    </select>
                </div>
                {
                    (this.props.filters.category === 'Categories') ?
                    '' :
                    <div className="recipeNav__itemRecipe">
                        <select
                            className="recipeNav__selectRecipe"
                            value={this.props.filters.recipe}
                            onChange={this.onRecipeChange}
                        >
                            <option id="All">All</option>
                            { this.props.recipes.map((recipe) => {
                                return (
                                    <option
                                        label={this.onAutoCapitalize(recipe.name)}
                                        key={recipe.id}
                                    >
                                        { recipe.name }
                                    </option>
                                ) 
                            }) }
                        </select>
                    </div>
                }        
            </nav>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        recipes: recipesByCategory(state.recipes, state.filters),
        filters: state.filters
    };
};

const mapDispatchToProps = (dispatch) => ({
    sortByCategory: (category) => dispatch(sortByCategory(category)),
    sortByRecipe: (recipe) => dispatch(sortByRecipe(recipe)),
    resetFilters: () => dispatch(resetFilters())
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeNavigation);
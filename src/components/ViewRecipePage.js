import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import uuid from 'uuid';
import moment from 'moment';
import selectRecipes from '../selectors/recipes';

export class ViewRecipePage extends React.Component {
    constructor(props) {
        super(props);
        this.uuidv1 = require('uuid/v1');
    };

    onAutoCapitalize(text) {
        return text.slice(0,1).toUpperCase() + text.slice(1, text.length);
    };

    render() {
        return (
            <div className="viewRecipe">
                {this.props.recipes.map((recipe) => {
                    return (
                        <div key={this.uuidv1()} className="container__viewRecipe">
                            <section className="viewRecipe__info">
                                <Link to={`/editRecipe/${recipe.id}`} className="viewRecipe__edit">
                                    <img
                                        src="../images/buttonIcons/editButton.png"
                                        className="viewRecipe__editBtn"
                                        id={recipe.id}
                                    />
                                    <p>Edit Recipe</p>
                                </Link>
                                <p className="viewRecipe__createdAt">
                                    Created {moment(recipe.createdAt).format('MMMM Do, YYYY')}
                                </p>
                            </section>

                            <section className="viewRecipe__general">
                                <h2 className="viewRecipe__name">{ this.onAutoCapitalize(recipe.name) }</h2>
                                {   recipe.description !== '' &&
                                    <p className="viewRecipe__description">"{this.onAutoCapitalize(recipe.description)}"</p>
                                }
                            </section>
                            
                            <section className="viewRecipe__ingredients">
                                <h4>Ingredients</h4>
                                <ul className="viewRecipe__ingredientsList">
                                    {recipe.ingredients.map((ingredient) => {
                                        return (
                                            <li key={this.uuidv1()} className="viewRecipe__ingredientItem">
                                                <p className="viewRecipe__ingredientAmount">{ingredient.amount}</p>
                                                <p className="viewRecipe__ingredient">{this.onAutoCapitalize(ingredient.ingredient)}</p>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </section>

                            <section>
                                <h4>Procedure</h4>
                                <ul className="viewRecipe__proceduresList">
                                    {recipe.procedures.map((procedure, index) => {
                                        return (
                                            <li key={this.uuidv1()} className="viewRecipe__procedureStep">
                                                {index + 1}. {this.onAutoCapitalize(procedure)}.
                                            </li>
                                        );
                                    })}
                                </ul>
                            </section>
                        </div>
                    );
                })}
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        recipes: selectRecipes(state.recipes, state.filters),
        filters: state.filters
    };
};
export default connect(mapStateToProps)(ViewRecipePage);

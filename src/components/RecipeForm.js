import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import uuid from 'uuid';

export class RecipeForm extends React.Component {
    constructor(props) {
        super(props);
        this.uuidv1 = require('uuid/v1');
        
        this.state = {
            name: props.recipe ? props.recipe.name : '',
            description: props.recipe ? props.recipe.description : '',
            category: props.recipe ? props.recipe.category : 'Breakfast',
            newAmount: '',
            newIngredient: '',
            ingredients: props.recipe ? props.recipe.ingredients : [],
            newProcedure: '',
            procedures: props.recipe ? props.recipe.procedures : [],
            createdAt: props.recipe ? moment(props.recipe.createdAt) : moment(),
            error: ''
        };
    };

    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name }));
    };

    onCategoryChange = () => {
        this.setState(() => ({ category: event.target.value }));
    };

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };

    onAmountChange = (e) => {
        const newAmount = e.target.value;
        this.setState(() => ({ newAmount }));
    };

    onIngredientChange = (e) => {
        const newIngredient = e.target.value;
        this.setState(() => ({ newIngredient }));
    };

    onAddNewIngredient = (e) => {
        if (this.state.newAmount !== '' && this.state.newIngredient !== '') {
            const fullIngredient = {
                amount: this.state.newAmount,
                ingredient: this.state.newIngredient
            };
            this.setState(() => ({
                newAmount: '',
                newIngredient: '',
                ingredients: [...this.state.ingredients, fullIngredient],
            }));
        }

    };

    onRemoveIngredient = (e) => {
        const ingredients = this.state.ingredients;
        const index = e.target.id;
        this.setState({
            ingredients: [...ingredients.slice(0, index), ...ingredients.slice(index + 1)]
        });
    };

    onProcedureChange = (e) => {
        const newProcedure = e.target.value;
        this.setState(() => ({ newProcedure }));
    };

    onAddNewProcedure = (e) => {
        if (this.state.newProcedure !== '') {
            const newProcedure = this.state.newProcedure;
            this.setState(() => ({
                newProcedure: '',
                procedures: [...this.state.procedures, newProcedure]
            }));
        }
    };

    onRemoveProcedure = (e) => {
        const procedures = this.state.procedures;
        const index = e.target.id;
        this.setState({
            procedures: [...procedures.slice(0, index), ...procedures.slice(index + 1)]
        });
    };

    onClearRecipeForm = () => {
        this.setState({
            name: '',
            description: '',
            category: 'Breakfast',
            newAmount: '',
            newIngredient: '',
            ingredients: [],
            newProcedure: '',
            procedures: [],
            error: ''
        })
    };

    onRemoveRecipe = () => {
        this.props.onRemove({ id: this.props.recipe.id });
    };

    onSubmit = (e) => {
        e.preventDefault();
    
        if (!this.state.name || this.state.ingredients.length === 0 || this.state.procedures.length === 0) {
          this.setState(() => ({ error: 'Please provide a recipe name, and at least one ingredient and procedure.' }));
        } else {
          this.setState(() => ({ error: '' }));
          this.props.onSubmit({
            name: this.state.name,
            description: this.state.description,
            category: this.state.category,
            ingredients: this.state.ingredients,
            procedures: this.state.procedures,
            createdAt: this.state.createdAt.valueOf(),
          });
        }
      };

    render() {
        return (
            <form className="recipeForm" onSubmit={this.onSubmit}>
                <div className="recipeForm__grid">
                    <fieldset className="recipeForm__general">
                        <div>
                            <label htmlFor="recipeForm__category">Category:</label>
                            <select
                                className="recipeForm__category"
                                onChange={this.onCategoryChange}
                                value={this.state.category}
                            >
                                { this.props.filters.categories.map((category) => {
                                    if (category !== 'All') {
                                        return <option key={this.uuidv1()} value={category}>{category}</option>
                                    }
                                })}
                            </select>
                        </div>

                        <div className="recipeForm__inputGroup">
                            <input
                                className="recipeForm__name recipeForm__inputRequired"
                                type="text"
                                value={this.state.name}
                                onChange={this.onNameChange}
                                required
                            />
                            <label>Recipe Name</label>
                        </div>
                        <h4 className="recipeForm__descriptionLabel">Description</h4>
                        <textarea
                            className="recipeForm__textarea"
                            placeholder="Recipe Description (Optional)" 
                            rows="3"
                            value={this.state.description}
                            onChange={this.onDescriptionChange}
                        />
                    </fieldset>

                    <div className="recipeForm__addIngredients">
                        <h4>Add Ingredients</h4>

                        <section className="recipeForm__addIngredientForm">
                            <div className="recipeForm__inputGroup">
                                <input
                                    className="recipeForm__input--amount"
                                    type="text"
                                    placeholder= ' '
                                    value={this.state.newAmount}
                                    onChange={this.onAmountChange}
                                    
                                />
                                <label>Amount</label>
                            </div>

                            <div className="recipeForm__inputGroup">
                                <input
                                    className="recipeForm__input"
                                    type="text"
                                    placeholder= ' '
                                    value={this.state.newIngredient}
                                    onChange={this.onIngredientChange}
                                />
                                <label>Ingredient</label>
                            </div>

                            <div 
                                className="recipeForm__addIngredientBtn"
                                onClick={this.onAddNewIngredient}
                            >
                                <img src="../images/buttonIcons/addButton.png" className="recipeForm__addIngredientBtnImg" />
                                <p>Add Ingredient</p>
                            </div>
                        </section>
                    </div>

                    <section className="recipeForm__ingredientList">
                        {(this.state.ingredients.length > 0) ? (
                            this.state.ingredients.map((ingredient, index) => {
                                return (
                                <div
                                    key={this.uuidv1()}
                                    className="recipeForm__ingredientListItem"
                                >
                                    <p className="recipeForm__ingredientListItem--amount">{ingredient.amount}</p>
                                    <p className="recipeForm__ingredientListItem--ingredient">{ingredient.ingredient}</p>
                                    <img
                                        src="../images/buttonIcons/removeButton.png"
                                        className="recipeForm__removeNewIngredientBtn"
                                        id={index}
                                        onClick={this.onRemoveIngredient}
                                    />
                                </div>
                            )})
                        ) : (
                            <p>No ingredients have been added yet.</p>
                        )}
                    </section>

                    <div className="recipeForm__addProcedures">
                        <h4>Add Procedures</h4>

                        <section className="recipeForm__addProcedureForm">
                            <textarea
                                className="recipeForm__textarea"
                                placeholder="Next Procedure"
                                rows="3"
                                value={this.state.newProcedure}
                                onChange={this.onProcedureChange}
                            />
                            <div
                                className="recipeForm__addProcedureBtn"
                                onClick={this.onAddNewProcedure}
                            >
                                <img src="../images/buttonIcons/addButton.png" className="recipeForm__addNewProcedureBtnImg" />
                                Add Procedure
                            </div>
                        </section>
                    </div>

                    <section className="recipeForm__procedureList">
                        {(this.state.procedures.length > 0) ? (
                            this.state.procedures.map((procedure, index) => {
                                return (
                                    <div
                                        key={this.uuidv1()}
                                        className="recipeForm__procedureListItem"
                                    >
                                        <p>{index + 1}. {procedure}</p>
                                        <img
                                            src="../images/buttonIcons/removeButton.png"
                                            className="recipeForm__removeNewProcedureBtn"
                                            id={index}
                                            onClick={this.onRemoveProcedure}
                                        />
                                    </div>
                                )
                            })
                        ) : (
                            <p>No procedures have been added yet.</p>
                        )}
                    </section>
                </div>

                {this.state.error !== '' &&
                    <section>
                        <p>{this.state.error}</p>
                    </section>
                }

                <section className="recipeForm__formBtns">
                    {this.props.recipe ?
                        <button
                            type="button"
                            id="recipeForm__removeRecipeButton"
                            onClick={this.onRemoveRecipe}
                        >
                            Remove Recipe
                        </button> : ''
                    }
                    <button
                        type="button"
                        id="recipeForm__clearRecipeFields"
                        onClick={this.onClearRecipeForm}
                    >
                        Clear Recipe
                    </button>
                    <button type="submit" id="recipeForm__submitRecipeButton">Add Recipe</button>
                </section>                    
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(RecipeForm);
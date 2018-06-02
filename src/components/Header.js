import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import { startLogin, startLogout } from '../actions/auth';
import { sortByCategory, sortByRecipe, resetFilters } from '../actions/filters';

export class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: '',
			suggestions: []
		};
	};

	onAutoCapitalize(text) {
		return text.slice(0,1).toUpperCase() + text.slice(1, text.length);
	};

	getSuggestions = (value) => {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;
	  
		return inputLength === 0 ? [] : this.props.recipes.filter(recipe =>
		  recipe.name.toLowerCase().slice(0, inputLength) === inputValue
		);
	};

	renderSuggestion = (suggestion) => (
		<div>
		  <b>{this.onAutoCapitalize(suggestion.name)}</b> in {suggestion.category}
		</div>
	);

	onChange = (event, { newValue }) => {
		this.setState({
		  value: newValue
		});
	};

	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
		  suggestions: this.getSuggestions(value)
		});
	};

	onSuggestionsClearRequested = () => {
		this.setState({
		  suggestions: []
		});
	};

	getSuggestionValue = suggestion => suggestion.name;

	onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
			this.props.sortByCategory(suggestion.category);
			this.props.sortByRecipe(suggestion.id);
			this.setState({
				value: ''
			});
			this.props.history.push('/');
		};

	onResetRecipeFilters = () => {
        this.props.resetFilters();
    };

	render() {
		const { value, suggestions } = this.state;

		// Autosuggest will pass through all these props to the input.
		const inputProps = {
		  placeholder: 'Find your favorite recipe...',
		  value,
		  onChange: this.onChange
		};

		return (
			<header className="header">
			<div className="header__content">
				<Link
					className="header__title"
					to="/dashboard"
					onClick={this.onResetRecipeFilters}
				>
					RecipeBox
				</Link>
				
				{this.props.isAuthenticated ? (
					<div className="header__nav">
						<Autosuggest
							suggestions={this.state.suggestions}
							onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
							onSuggestionsClearRequested={this.onSuggestionsClearRequested}
							onSuggestionSelected={this.onSuggestionSelected}
							getSuggestionValue={this.getSuggestionValue}
							renderSuggestion={this.renderSuggestion}
							inputProps={inputProps}
						/>
						<Link to="/dashboard" onClick={this.onResetRecipeFilters}>Recipes</Link>
						<Link to="/addRecipe">+Add Recipe</Link>
						<Link to="/" onClick={this.props.startLogout}>Log Out</Link>
					</div>
				) : (
					<div className="header__nav--public">
						<Link to="/" onClick={this.props.startLogin}>Log In</Link>
					</div>
				)}			
			</div>
		  </header>
		);
	};
};

const mapStateToProps = (state) => ({
	isAuthenticated: !!state.auth.uid,
	recipes: state.recipes,
	filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
	startLogin: () => dispatch(startLogin()),
	startLogout: () => dispatch(startLogout()),
	sortByCategory: (category) => dispatch(sortByCategory(category)),
	sortByRecipe: (recipe) => dispatch(sortByRecipe(recipe)),
	resetFilters: () => dispatch(resetFilters())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

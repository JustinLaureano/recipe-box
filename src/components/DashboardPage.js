import React from 'react';
import { connect } from 'react-redux';
import RecipeNavigation from './RecipeNavigation';
import CategoryList from './CategoryList';
import CategoryIcons from './CategoryIcons';
import RecipeList from './RecipeList';
import ViewRecipePage from './ViewRecipePage';

const DashboardPage = (props) => (
  	<div className="container__page">
    	<div className="dashboard">
			<RecipeNavigation />
			{(props.filters.category === 'Categories') ?
				<section className="dashboard__overview">
					<CategoryList />
					<CategoryIcons />
				</section> :
				(props.filters.recipe === 'All') ?
				<RecipeList /> :
				<section className="dashboard__recipeView">
					<ViewRecipePage />
				</section>
			}
    	</div>
  	</div>
);

const mapStateToProps = (state) => {
	return {
	  	filters: state.filters
	};
};
  
export default connect(mapStateToProps)(DashboardPage);
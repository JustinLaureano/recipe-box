import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { sortByCategory } from '../actions/filters';
import CategoryIcon from './CategoryIcon';

export class CategoryIcons extends React.Component {
    constructor(props) {
        super(props);
        this.uuidv1 = require('uuid/v1');
    };

    onCategoryChange = (e) => {
        this.props.sortByCategory(e.target.id);
    };

    render() {
        return (
            <div className="categoryIcons">
                <div className="categoryIcons__layout">
                    { this.props.filters.categories.map((category, index) => {
                        const numberOfRecipes = category === 'All' ? 
                            this.props.recipes.length : 
                            this.props.recipes.filter((recipe) => recipe.category === category).length;

                        const props = {
                            category,
                            numberOfRecipes,
                            onCategoryChange: this.onCategoryChange
                        };
                        return <CategoryIcon
                            key={this.uuidv1()}
                            {...props} />
                    })}
                </div>
            </div>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        recipes: state.recipes,
        filters: state.filters
    };
};

const mapDispatchToProps = (dispatch) => ({
    sortByCategory: (category) => dispatch(sortByCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryIcons);
import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { sortByCategory } from '../actions/filters';

export class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.uuidv1 = require('uuid/v1');
    };

    onCategoryChange = (e) => {
        console.log(e.target.id);
        this.props.sortByCategory(e.target.id);
    };

    render() {
        return (
            <div className="categoryList">
                <ul className="categoryList__items">
                    { this.props.filters.categories.map((category) => {
                        return (
                        <li
                            key={this.uuidv1()}
                            id={category}
                            className="categoryList__item"
                            value={category}
                            onClick={this.onCategoryChange}
                        >
                            {category}
                        </li>
                    )})}
                </ul>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
      recipes: state,
      filters: state.filters
    };
};

const mapDispatchToProps = (dispatch) => ({
    sortByCategory: (category) => dispatch(sortByCategory(category))
});
  
  export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
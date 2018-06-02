//Filters Reducer

const filtersReducerDefaultState = {
    categories: [
        'All',
        'Breakfast',
        'Lunch',
        'Beverages',
        'Breads',
        'Appetizers',
        'Soups',
        'Salads',
        'Beef',
        'Poultry',
        'Pork',
        'Seafood',
        'Vegetables',
        'Pasta',
        'Sides',
        'Desserts',
        'Other'
    ],
    category: 'Categories',
    recipe: 'All'
};

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SORT_BY_CATEGORY':
            return {
                ...state,
                category: action.category,
                recipe: 'All'
            };
        case 'SORT_BY_RECIPE':
            return {
                ...state,
                recipe: action.recipe
            };
        case 'RESET_FILTERS':
            return {
                ...state,
                category: 'Categories',
                recipe: 'All'
            };
        default:
            return state;
    }
};
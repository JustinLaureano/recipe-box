//Sort By Category
export const sortByCategory = (category) => ({
    type: 'SORT_BY_CATEGORY',
    category
});

//Sort By Recipe
export const sortByRecipe = (recipe) => ({
    type: 'SORT_BY_RECIPE',
    recipe
});

//Reset Filters
export const resetFilters = () => ({
    type: 'RESET_FILTERS'
});
// Get filtered Recipes by Category

export default (recipes, { category }) => {
    if (category === 'All') {
        return recipes;
    }
    return recipes.filter(recipe => recipe.category === category);
};
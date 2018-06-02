// Get filtered Recipes

export default (recipes, { category, recipe }) => {
    if (category === 'All' && recipe === 'All') {
        return recipes;
    }
    if (category === 'All' && recipe !== 'All') {
        return recipes.filter(currentRecipe => currentRecipe.id === recipe)
    }
    if (recipe !== 'All') {
        return recipes.filter(currentRecipe => currentRecipe.category === category && currentRecipe.id === recipe);
    }
    return recipes.filter(currentRecipe => currentRecipe.category === category);
};
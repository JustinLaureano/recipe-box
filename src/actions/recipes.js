import database from '../firebase/firebase';

// Add Recipe
export const addRecipe = (recipe) => ({
    type: 'ADD_RECIPE',
    recipe: recipe
});

export const startAddRecipe = (recipeData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            name = '',
            description = '',
            category = '',
            ingredients = [],
            procedures = [],
            createdAt = 0
        } = recipeData;
        const recipe = { name, description, category, ingredients, procedures, createdAt };
  
        return database.ref(`users/${uid}/recipes`).push(recipe).then((ref) => {
            dispatch(addRecipe({
                id: ref.key,
                ...recipe
            }));
        });
    };
};

// Set Recipe
export const setRecipes = (recipes) => ({
    type: 'SET_RECIPES',
    recipes
  });
  
export const startSetRecipes = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/recipes`).once('value').then((snapshot) => {
            const recipes = [];

            snapshot.forEach((childSnapshot) => {
                recipes.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setRecipes(recipes));
        });
    };
};
  
// Edit Recipe
export const editRecipe = (id, updates) => ({
    type: 'EDIT_RECIPE',
    id,
    updates
});
  
export const startEditRecipe = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/recipes/${id}`).update(updates).then(() => {
            dispatch(editRecipe(id, updates));
        });
	};
};

// Remove Recipe
export const removeRecipe = ({ id } = {}) => ({
    type: 'REMOVE_RECIPE',
    id
});
  
export const startRemoveRecipe = ({ id } = {}) => {
    console.log(id);
    return (dispatch, getState) => {
		const uid = getState().auth.uid;
		return database.ref(`users/${uid}/recipes/${id}`).remove().then(() => {
        	dispatch(removeRecipe({ id }));
		});
    };
};
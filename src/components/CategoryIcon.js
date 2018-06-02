import React from 'react';

const CategoryIcon = ({ category, numberOfRecipes, onCategoryChange }) => (
    <div className="categoryIcon">
    <div className="categoryIcon__clickArea" id={category} onClick={onCategoryChange}></div>
        <div value ={category} className="categoryIcon__overlay">
            <div className="categoryIcon__info">
                <h3>{category}</h3>
                <p>{numberOfRecipes} Recipes</p>
            </div>
        </div>
        <img 
            src={require(`../images/${category}.jpg`)}
            className="categoryIcon__img"
        />
    </div>
);

export default CategoryIcon;
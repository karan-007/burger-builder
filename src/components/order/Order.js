import React from 'react';
import classes from './Order.css'

const Order = (props) =>{
    const ingredients=[];
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name:ingredientName,
            amount:props.ingredients[ingredientName]
        });
    }

    const ingredientOutput = ingredients.map(ig => {
        return(
            <span key={ig.name} 
                  style={{display:"inline-block",
                        textTransform:"capitalize",
                        margin:"0 8px",
                        padding:"5px",
                        border:"1px solid #ccc"}}>
                {ig.name} ({ig.amount})
            </span>
        );
    });

    return(
    <div className={classes.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        <p>price:<strong>{props.price}</strong></p>
    </div>
    );
};

export default Order;
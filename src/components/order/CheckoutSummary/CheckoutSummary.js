import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.css';

const CheckoutSummary = (props) => {
    return(
    <div className={classes.CheckoutSummary}>
        <h1>Here is your Burger!</h1>
        <div style ={{width:'100%',margin:'auto'}}>
            <Burger ingredients={props.ingredients}/>
        </div>
        <Button btn="Danger" clicked={props.cancel}>CANCEL</Button>
        <Button btn="Success" clicked={props.proceed}>PROCEED</Button>
    </div>
    ); 
}

export default CheckoutSummary;
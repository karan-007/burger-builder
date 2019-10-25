import React, { Component } from 'react';
import Aux from '../../../hoc/Auxi';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {

    componentDidUpdate() {
        console.log('[OrderSummary] didUpdate');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey =>{
            return(
            <li key={igKey}>
                <span style={{textTransform:'capitalize'}}>{igKey}</span>:{this.props.ingredients[igKey]}
            </li>
            );
        });
        return(
            <Aux>
                <h3>YOUR ORDER SUMMARY</h3>
                <p>This is your Burger:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price:{this.props.price}</strong></p>
                <Button btn="Danger" clicked={this.props.cancel}>CANCEL</Button>
                <Button btn="Success" clicked={this.props.proceed}>PROCEED</Button>
            </Aux>
        );
    }
}

export default OrderSummary;
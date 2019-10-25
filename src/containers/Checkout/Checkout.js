import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from '../Checkout/ContactData/ContactData';
import CheckoutSummary from '../../components/order/CheckoutSummary/CheckoutSummary';




class Checkout extends Component {

   
    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let params of query.entries()){
    //         if (params[0] === 'price'){
    //             price= params[1];
    //         } else{
    //             ingredients[params[0]] = +params[1];
    //         }
    //     } 
    //     this.setState({ingredients:ingredients,totalPrice:price});
    // }

    checkoutCancelHandler = () =>{
        this.props.history.goBack();
    }

    checkoutProceedHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/"/>
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary= (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ings}
                    cancel={this.checkoutCancelHandler}
                    proceed={this.checkoutProceedHandler}/>
                    <Route path={this.props.match.path + '/contact-data'}
                            component={ContactData}/>
            </div>
            );
        }
        return summary;
    }
}
const mapStateToProps = state =>{
    return {
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    };
}



export default connect(mapStateToProps)(Checkout);
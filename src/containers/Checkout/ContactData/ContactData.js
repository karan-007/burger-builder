import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state ={
        orderForm: {
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-Mail'
                },
                value:'',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip-Code'
                },
                value:'',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                value:'fastest',
                validation:{},
                valid: true
            }
        },
        formIsValid: false

    }
    orderHandler = (event) => {
        event.preventDefault();

         const formData = {};
         for(let id in this.state.orderForm){
             formData[id]= this.state.orderForm[id].value;
         }
        const order ={
            ingredients:this.props.ings,
            price:this.props.price,
            orderData:formData
        }
        this.props.onOrder(order,this.props.token);
    }

    
    checkValidity(value, rules) {
        let isValid = true;
        if(!rules){
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, id) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElements = {
            ...updatedOrderForm[id]
        };
        updatedFormElements.value=event.target.value;
        updatedFormElements.valid = this.checkValidity(updatedFormElements.value, updatedFormElements.validation);
        updatedFormElements.touched = true;
        updatedOrderForm[id] = updatedFormElements;
        let formIsValid = true;
        for (let id in updatedOrderForm) {
            formIsValid = updatedOrderForm[id].valid && formIsValid;
        }
        this.setState({orderForm:updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
        const formElement = [];
        for(let key in this.state.orderForm){
            formElement.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form =(
            <form onSubmit={this.orderHandler}>
                    {formElement.map(fe =>(
                        <Input
                            key={fe.id}
                            elementType={fe.config.elementType}
                            elementConfig={fe.config.elementConfig}
                            value={fe.config.value}
                            invalid={!fe.config.valid}
                            shouldValidate={fe.config.validation}
                            touched={fe.config.touched}
                            changed={(event) => this.inputChangedHandler(event, fe.id)}
                        />
                    ))}
                    <p><Button btn="Success" disabled={!this.state.formIsValid}>ORDER</Button></p>
                </form>
        );
        if(this.props.loading){
            form = <Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Details</h4>
                {form}
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onOrder: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
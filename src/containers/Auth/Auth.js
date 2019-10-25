import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';


class Auth extends Component {
    state={
        controls:{
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
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount(){
        if(!this.props.building && this.props.setRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
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

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
        [controlName]: {
            ...this.state.controls[controlName],
            value:event.target.value,
            valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
            touched : true
        }
    };
    this.setState({controls:updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
        console.log(this.state.isSignUp ? 'SIGN UP': 'SIGN IN');
    }

    switchAuthHandler = () => {
        this.setState(prevState => {
            return{isSignUp: !prevState.isSignUp};
        });
    }

    render() {
        const formElement = [];
        for(let key in this.state.controls){
            formElement.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElement.map(fe =>(
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
                    ))
        if(this.props.loading){
            form = <Spinner/>
        }
        
        let errorMessage = null;
        if(this.props.error){
            errorMessage = (<p>{this.props.error.message}</p>);
        };

        let onSignIn = null;
        if(this.props.isAuth) {
            onSignIn = <Redirect to={this.props.setRedirectPath}/>;
        }
        
        return(
            <div className={classes.Auth}>
                {onSignIn}
                {errorMessage}
                <form  onSubmit={this.submitHandler}>
                    <h4>WELCOME</h4>
                    {form}
                    <Button btn="Success">{this.state.isSignUp ? 'SIGN UP': 'SIGN IN'}</Button>
                </form>
                <Button 
                clicked={this.switchAuthHandler}
                btn="Danger">SWITCH TO {this.state.isSignUp ? 'SIGN IN': 'SIGN UP'}</Button>
            </div>
        );
    }
} 

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error:state.auth.error,
        isAuth:state.auth.token !== null,
        building:state.burgerBuilder.building,
        setRedirectPath:state.auth.setRedirectPath
    };
};

const mapDispatchToProps = dispatch =>{
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
import React, { Component }from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxi';
import classes from  './Layout.css';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../UI/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        x : false
    }

    hideSideDrawerHandler = () =>{
        this.setState({x:false});
        console.log(this.state.x);
    }

    openSideDrawerHandler = () =>{
        this.setState({x:true});
        console.log(this.state.x);
    }
    
    render () {
        return(
            <Aux>
                <Toolbar open={this.openSideDrawerHandler} isAuth={this.props.isAuth}/>
                <SideDrawer
                    isAuth={this.props.isAuth}
                    show={this.state.x}
                    clicked={this.hideSideDrawerHandler}/>
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
            </Aux>
        )
    }
}

const mapStateToProps = state =>{
    return {
        isAuth: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(Layout);
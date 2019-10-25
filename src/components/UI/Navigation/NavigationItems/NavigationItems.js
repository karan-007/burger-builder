import React from 'react';

import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact >Burger Builder</NavigationItem>
        {props.isAuth ? <NavigationItem link="/orders">My Orders</NavigationItem>: null}
        <NavigationItem link={!props.isAuth ? '/auth' : '/logout'}>{!props.isAuth ? 'Sign Up/Log In' : 'Log Out'}</NavigationItem>
    </ul>
);

export default navigationItems;
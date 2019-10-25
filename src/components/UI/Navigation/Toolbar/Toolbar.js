import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Toggle from '../../SideDrawer/Toggle/Toggle';



const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Toggle open={props.open}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.Mobile}>
            <NavigationItems isAuth={props.isAuth}/>
        </nav>
    </header>
);


export default toolbar;
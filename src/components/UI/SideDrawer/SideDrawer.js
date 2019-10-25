import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Aux from '../../../hoc/Auxi';
import BackDrop from '../Backdrop/Backdrop';


const sidedrawer = (props) => {
    return (
        <Aux>
            <div className={classes.Backdrop}>
                <BackDrop show={props.show} clicked={props.clicked}/>
            </div>          
            <div className={classes.SideDrawer}
            style={{
                transform: props.show ? 'translateX(0)' : 'translateX(-100vh)'
            }}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
}

export default sidedrawer;
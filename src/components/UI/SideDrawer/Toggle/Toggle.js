import React from 'react';
import classes from './Toggle.css'

const toggle = (props) => (
    <div onClick={props.open} className={classes.Toggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default toggle;
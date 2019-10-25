import React from 'react';

import classes from './Spinner.css';

const spinner = () =>(
    <div><div className={classes.loader}>Loading...</div></div>
);

export default spinner;
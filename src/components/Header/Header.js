import React from 'react';
import classes from './Header.module.css'

const Header = props => {
    return (
        <nav className={classes.Nav}>
          <button
            className={classes.Button}
            id="Prev"
            onClick={props.changedMonth.bind(this)} >
            &#10094;</button>
          <input 
            type="text" 
            className={classes.Search}
            readOnly
            value={`${props.monthName} ${props.year}`}
          ></input>
          <button
            className={classes.Button}
            id="Next"
            onClick={props.changedMonth.bind(this)} >
            &#10095;</button>
        </nav>
    )
}

export default Header;
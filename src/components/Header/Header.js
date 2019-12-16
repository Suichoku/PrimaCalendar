import React from 'react';
import classes from './Header.module.css'

const Header = props => {
    return (
        <header className={classes.Container}>
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
        </header>
    )
}

export default Header;
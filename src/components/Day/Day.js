import React from 'react'
import classes from './Day.module.css'

const Day = props => {

    return (
        <div className={[classes.Day, classes[props.color]].join(" ")}>
            {props.children}
        </div>
    )
}

export default Day;

import React from 'react'
import classes from './DayNames.module.css'

const DAYS = ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"];

const DayNames = props => {
    return (
        <div className={classes.Container}>
            {DAYS.map( day => (
                <div className={classes.Name} key={day}>
                    {day}
                </div>
            ))}
        </div>      
    )
}

export default DayNames


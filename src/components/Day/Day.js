import React from 'react'
import classes from './Day.module.css'

const Day = props => {

    const classNames = [classes.Day]

    if(props.machineState) {
        const { Failure } = props.machineState;
        
        const failureTime = Failure.split(":")

        const minutes = 60 * parseInt(failureTime[0]) + parseInt(failureTime[1]);

        if(minutes < 150) {
            classNames.push(classes.Low);        
        } else if (minutes < 200) {
            classNames.push(classes.Medium);
        } else {
            classNames.push(classes.High);
        }
    } else { // add alternative coloring from props
        classNames.push(classes[props.color])
    }

    

    return (
        <div className={classNames.join(" ")}>
            {props.children}
        </div>
    )
}

export default Day;

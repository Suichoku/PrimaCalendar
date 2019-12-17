import React from 'react'
import classes from './Day.module.css'
import moment from 'moment';

const Day = props => {
    // css classes
    const classNames = [classes.Day]

    if(props.machineState) { // day has machineState as prop -> use it to color tile
        const { Failure } = props.machineState; // get failure time from machineState
        
        const failureTime = Failure.split(":") // split failure time to hours, minutes, seconds

        // turn time to minutes, ignoring the seconds
        const minutes = 60 * parseInt(failureTime[0]) + parseInt(failureTime[1]);

        // choose css color class for tile
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
    // get day of the month (1st, 2nd, ...);
    const day = props.day && moment(`${props.day}`, "D").format("Do");

    let content;
    // render content based on if tile is clicked
    if(props.toggled && props.machineState) {
        content = [
            <div key="1" className={classes.BlockTitle}>Failure:</div>,
                <div key="2" className={classes.Block}>{props.machineState.Failure}</div>,
            <div key="3" className={classes.BlockTitle}>Idle:</div>,
                <div key="4" className={classes.Block}>{props.machineState.Idle}</div>,
            <div key="5" className={classes.BlockTitle}>Running:</div>,
                <div key="6" className={classes.Block}>{props.machineState.Running}</div>,
        ];
        classNames.push(classes.Alt)
    } else {
        content = [
            <div key="1" className={classes.DayNumber}>{day}</div>,
            <div key="2">{props.children}</div>
        ];
    }

    const clickFunc = props.clicked && props.clicked.bind(this, props.day);

    return (
        <div 
            onMouseEnter={clickFunc}
            onMouseLeave={clickFunc}
            className={classNames.join(" ")}>
            {content}
        </div>
    )  
}

export default Day;

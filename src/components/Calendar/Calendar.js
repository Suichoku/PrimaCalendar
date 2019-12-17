import React from 'react'
import classes from './Calendar.module.css'
import Day from '../Day/Day'

import moment from 'moment'

const Calendar = props => {

    // set moment date to currently selected month
    const m = moment(`${props.year}-${props.month}`, "YYYY-MM");
    // calculate how many filler days are needed
    let startDay = m.date(1).day();
    // fix startDay since moment starts week from sunday
    if(startDay === 0) startDay = 6; // loop over
    else startDay -= 1 // else reduce day by one
    // create array of filler days (empty days that move 1st day to right weekday)
    const fillerDays = Array(startDay).fill().map( (_, i) => i + 1);

    // get how many days there are in a month
    const daysInMonth = m.daysInMonth()
    // create that many day numbers
    const days = Array(daysInMonth).fill().map( (_, i) => i + 1);

    const dataLength = props.failureData && props.failureData.length;
    const timeLength = props.machineTime && props.machineTime.length;

    const data = Array(2);

    data[0] = days.length === dataLength ?
        props.failureData :
        null;

    data[1] = days.length === timeLength ?
        props.machineTime :
        null;

    return (
        <div className={classes.Container}>
            <div className={classes.Grid}>
            {fillerDays.map( num => (
                <Day 
                    key={"filler" + num}
                    color={"Empty"} />
            ))}
            {days.map( num => (
                <Day 
                    key={num} day={num}
                    clicked={day => props.dateClicked(day)}
                    toggled={props.clickStates[num]}
                    machineState={data[1] && data[1][num-1]}
                    color={"None"}>
                    {data[0] && data[0][num-1].Amount}
                </Day>
            ))}
            </div>
        </div>
    )
}

export default Calendar;

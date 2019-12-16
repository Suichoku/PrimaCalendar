import React from 'react'
import classes from './Calendar.module.css'
import Day from '../../components/Day/Day'

import moment from 'moment'

const Calendar = props => {

    // set moment date to currently selected month
    const m = moment(`${props.year}-${props.month}`, "YYYY-MM")
    // calculate how many filler days are needed
    const startDay = m.date(1).weekday();
    const fillerDays = Array(startDay).fill().map( (_, i) => i + 1)

    // get how many days there are in a month
    const daysInMonth = m.daysInMonth()
    const days = Array(daysInMonth).fill().map( (_, i) => i + 1)

    const dataLength = props.failureData && props.failureData.length;

    const data = days.length === dataLength ?
        props.failureData :
        null;
    // props.failureData[num-1].Amount

    return (
        <div className={classes.Container}>
            <div className={classes.Grid}>
            {fillerDays.map( num => (
                <Day key={"filler" + num}
                     color={"Empty"}></Day>
            ))}
            {days.map( num => (
                <Day 
                    key={num}
                    color={"None"}>
                    {data ? data[num-1].Amount : num}
                </Day>
            ))}
            </div>
        </div>
    )
}

export default Calendar;

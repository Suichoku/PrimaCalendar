import React, { Component } from 'react';
import Calendar from './components/Calendar/Calendar';
import classes from './App.module.css'
import DayNames from './components/DayNames/DayNames';

import moment from 'moment'
import Header from './components/Header/Header';

class App extends Component {

  

  constructor(props) {
    super(props);
    this.state = {
      month: 12, // Currently selected month
      year: 2019, // Currently selected year
      failureData: null, // Full failure count information
      machineTime: null, // Full machine state information
      monthFailureData: null, // Filtered failure count for month
      monthMachineTime: null, // Filtered machine state for month
      clickStates: null // Holds current state of all days (clicked?)
    }

    // Set initial state to false to all dates
    this.state.clickStates = this.flushClicks();
  }

  componentDidMount() {
    // Get data and save it to state
    fetch("./data/FailureData.json")
      .then(res => res.json())
      .then(data => this.setState( {failureData: data}, () => {
        this.setState( {monthFailureData: this.filterByMonth(this.state.failureData)} );
      }));
    fetch("./data/machinetime.json")
      .then(res => res.json())
      .then(data => this.setState( {machineTime: data}, () => {
        this.setState( {monthMachineTime: this.filterByMonth(this.state.machineTime)} );
      }));
  }

  // Filter data by month
  filterByMonth = data => {
    return data.filter(obj => {
      let month = obj["Date"].split(".")[1] // Get month from data
      let year = obj["Date"].split(".")[2] // Get year from data
      if( month.startsWith("0") ) month = month.substr(1, 1); // Remove starting zero
      if( parseInt(month) === this.state.month && 
          parseInt(year) === this.state.year ) return true; // Found right month & year
      return false; // Not right month & year
    })
  }

  // Reset all date states to false
  flushClicks = () => {
    const date = moment(`${this.state.year}-${this.state.month}`, "YYYY-MM");
    return Array(date.daysInMonth()).fill().map( () => false);
  }

  // Handles changing data on month change
  handleMonthChange = event => {
    let { month, year } = this.state;

    if(event.target.id === "Prev") { // Going to previous month
      if(month > 1) --month;
      else { // Months loop over to another year
        month = 12; // set month to december
        --year;
      }
    }
    if(event.target.id === "Next") { // Going to next month
      if(month < 12) ++month;
      else { // Months loop over to another year
        month = 1; // set month to january
        ++year;
      }
    }
    this.setState( {month, year}, () => { // updata month and year
      const monthFailureData = this.filterByMonth(this.state.failureData); // filter failure count based on new date
      const monthMachineTime = this.filterByMonth(this.state.machineTime); // filter machineTime based on new date
      const clickStates = this.flushClicks(); // reset all clicked dates
      this.setState( {monthFailureData, monthMachineTime, clickStates} );
    });
  }

  // Update clicked state of selected tile
  handleDayClick = dayNum => {
    this.setState(prev => {
      const clickStates = [...prev.clickStates];
      clickStates[dayNum] = !clickStates[dayNum];
      return {clickStates}
    })
  }

  render() {

    // Get current month name ("January", ...)
    const monthName = moment().month(this.state.month-1).format("MMMM");

    return(
      <div className={classes.Container}>
        <Header 
          monthName={monthName}
          year={this.state.year} 
          changedMonth={this.handleMonthChange} />
        <DayNames/>
        <Calendar
          year={this.state.year}
          month={this.state.month}
          failureData={this.state.monthFailureData}
          machineTime={this.state.monthMachineTime}
          clickStates={this.state.clickStates}
          dateClicked={this.handleDayClick} />
      </div>
    )
  }
}

export default App;

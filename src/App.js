import React, { Component } from 'react';
import Calendar from './containers/Calendar/Calendar';
import classes from './App.module.css'
import DayNames from './components/DayNames/DayNames';

import moment from 'moment'
import Header from './components/Header/Header';

class App extends Component {

  state = {
    month: 5,
    year: 2019,
    failureData: null,
    monthFailureData: null
  }

  componentDidMount() {
    // Get data and save it to state
    fetch("./data/FailureData.json")
        .then(res => res.json())
        .then(data => this.setState( {failureData: data}, () => {
          this.setState( {monthFailureData: this.filterByMonth(this.state.failureData)} );
        }));
  }

  filterByMonth = data => {
    return data.filter(obj => {
      let month = obj["Date"].split(".")[1]
      let year = obj["Date"].split(".")[2]
      if(month.startsWith("0")) month = month.substr(1, 1);
      if(parseInt(month) === this.state.month && 
         parseInt(year) === this.state.year) return true;
      return false;
    })
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
    

    this.setState({month, year}, () => this.updateMonthData());
  }

  updateMonthData = () => {
    const monthFailureData = this.filterByMonth(this.state.failureData);
    this.setState({monthFailureData})
  }

  render() {

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
          failureData={this.state.monthFailureData} />
      </div>
    )
  }
}

export default App;

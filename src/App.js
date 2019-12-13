import React, { Component } from 'react';
import Calendar from './containers/Calendar/Calendar';
import classes from './App.module.css'

class App extends Component {

  state = {
    month: 12,
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
    console.log("called", this.state.month)
    return data.filter(obj => {
      let month = obj["Date"].split(".")[1]
      let year = obj["Date"].split(".")[2]
      if(month.startsWith("0")) month = month.substr(1, 1);
      if(parseInt(month) === this.state.month && 
         parseInt(year) === this.state.year) return true;
      return false;
    })
  }

  handleMonthChange = event => {
    if(event.target.id === "Prev") {
      this.setState(prev => {
        if(prev.month > 1) return {month: prev.month - 1}
        else return {month: 12, year: prev.year - 1}
      }, () => {
        this.setState( {monthFailureData: this.filterByMonth(this.state.failureData)} );
      })
    }
    if(event.target.id === "Next") {
      this.setState(prev => {
        if(prev.month < 12) return {month: prev.month + 1}
        else return {month: 1, year: prev.year + 1}
      }, () => {
        this.setState( {monthFailureData: this.filterByMonth(this.state.failureData)} );
      })
    }
  }

  render() {
    return(
      <React.Fragment>
        <nav className={classes.Nav}>
          <button
            className={classes.Button}
            id="Prev"
            onClick={this.handleMonthChange.bind("Prev")} >
            Prev</button>
          <input 
            type="text" 
            className={classes.Search}
            readOnly
            value={`${this.state.month}/${this.state.year}`}
          ></input>
          <button
            className={classes.Button}
            id="Next"
            onClick={this.handleMonthChange.bind("Next")} >
            Next</button>
        </nav>
        <Calendar
          year={this.state.year}
          month={this.state.month}
          failureData={this.state.monthFailureData} />
      </React.Fragment>
    )
  }
}

export default App;

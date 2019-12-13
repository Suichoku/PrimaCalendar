import React, { Component } from 'react';
import Calendar from './containers/Calendar/Calendar';
import classes from './App.module.css'

class App extends Component {

  state = {
    month: 2,
    year: 2019
  }

  handleMonthChange = event => {

    if(event.target.id === "Prev") {
      this.setState(prev => {
        if(prev.month > 1) return {month: prev.month - 1}
        else return {month: 12, year: prev.year - 1}
      })
    }
    if(event.target.id === "Next") {
      this.setState(prev => {
        if(prev.month < 12) return {month: prev.month + 1}
        else return {month: 1, year: prev.year + 1}
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
          month={this.state.month} />
      </React.Fragment>
    )
  }
}

export default App;

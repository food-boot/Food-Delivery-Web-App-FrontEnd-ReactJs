import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router , Switch , Route} from "react-router-dom"
import SignIn from "./Cilent/Authentication/SignIn/SignIn";
import SignUp from "./Cilent/Authentication/SignUp/SignUp";
class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">        
        <Route path="/signIn" component={SignIn}/>
        <Route path="/signUp" component={SignUp}/>
      </div>
      </Router>
    );
  }
}

export default App;

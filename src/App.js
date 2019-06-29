import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import SignIn from "./Cilent/Authentication/SignIn/SignIn";
import SignUp from "./Cilent/Authentication/SignUp/SignUp";
import Dashbord from "./Cilent/Dashboard/Default"
import Forms from "./Cilent/Forms/FormsElements"
import Charts from "./Cilent/Charts/Nvd3Chart/index"
import Cart from "./Cilent/Cart/Carts"
import Nav from "./Cilent/layout/AdminLayout/Breadcrumb"
class App extends Component {
  
  render() {
    return (
      <Router>
        <div>          
          <Route path="/cart" component={Cart} />
          <Route  path="/signIn" component={SignIn} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/dashboard" component={Dashbord} />
          <Route path="/users" component={Forms} />
          <Route path="/chart" component={Charts} />

        </div>
      </Router>
    );
  }
}

export default App;

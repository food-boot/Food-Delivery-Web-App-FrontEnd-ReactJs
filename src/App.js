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
  constructor() {
    super();
    this.state = {
      auth: true,
    };
  }
  componentDidMount = () => {
    setTimeout(() => {
      try {
        var data = localStorage.getItem('type');
        console.log(data)
        if (data == 'user') {
          this.setState({
            auth: false
          })
        } else {
          this.setState({
            auth: true
          })
        }
      } catch{
        //   this.props.history.push('/signIn')
      }
    }, 4000);
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <br /><br />
          <Route path="/cart" component={Cart} />
          <Route exact path="/signIn" component={SignIn} />
          <Route exact path="/signUp" component={SignUp} />
          <Route path="/dashboard" component={Dashbord} />
          <Route path="/form" component={Forms} />
          <Route path="/chart" component={Charts} />

        </div>
      </Router>
    );
  }
}

export default App;

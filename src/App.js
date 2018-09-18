import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginComponent from './components/LoginComponent'
import DashboardComponent from './components/DashboardComponent';

class App extends Component {

  constructor(props) {
      super(props);
      
      this.appHandle= this.appHandler.bind(this);
      this.getLogin = this.getLogin.bind(this);
  }

  componentWillMount () {
    this.setState({
      'stage':'INIT'
    });
  }
  appHandler () {

  }

  getLogin() {
    if( this.state && this.state.stage && this.state.stage === 'INIT') {
      return (<LoginComponent appHandler={this.appHandler}></LoginComponent>)
    }
    return null;
  }
  render() {
    return (
      <Router>
        <div>
            <Route exact path="/" component={LoginComponent} />
           <Route exact path="/dashboard" component={DashboardComponent} />
        </div>
           
      </Router>
    );
  }
}

export default App;

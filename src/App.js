import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginComponent from './components/LoginComponent'
import DashboardComponent from './components/DashboardComponent';
import {connect} from 'react-redux';
import ActionType from './global-ctx/ActionTypes';

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
            <Route exact path="/" render={(props) => <LoginComponent {...props} {...this.props} />} />
           <Route  path="/dashboard" render={(props) => <DashboardComponent {...props} {...this.props} />}  />
         </div>
      </Router>
    );
  }
}


// connect
// mapStateToProps
const mapStateToProps = (state, ownProps) => {
  return {
    authenticated: state && state.authenticated,
    logged_in_user: state && state.logged_in_user,
  }
}
// mapDispatchToProps
const mapDispatchToProps = dispatch => {
  return {
    onLoginSuccess: respo => {
      dispatch({type:ActionType.LOGIN_SUCESS, payload:{...respo}});
    },
    onEmployeeCreationSuccess : respo => {
      dispatch({type:ActionType.USER_CREATED, payload:{...respo}})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

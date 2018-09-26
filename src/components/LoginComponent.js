import React, { Component } from 'react';
import AppService from '../service/AppService';

class LoginComponent extends Component {

    constructor(props, context) {
        super(props);
        this.context = context;
        this.onSubmitHandler= this.onSubmitHandler.bind(this);
        this.onLoginSuccessCallback = this.onLoginSuccessCallback.bind(this);
    }

    componentWillMount(){
        this.setState({});
    }

    componentWillReceiveProps (newProps) {
        console.log(newProps);
    }


    onLoginSuccessCallback (response) {
        this.props.onLoginSuccess({authenticated:true});
       this.props.history.push("/dashboard")
    }
    onSubmitHandler() {
        AppService.invokeLogin({
            "name": "morpheus",
            "job": "leader"
        },
        this.onLoginSuccessCallback);
    }

    render() {
        return (
            <div className="container text-center">
                <div className="form-signin">
                    <img className="mb-4" src="css/img/icons8-login-64.png" alt="" width="72" height="72"></img>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label htmlFor="inputUserName" className="sr-only">User Name</label>
                    <input type="text" id="inputUserName" className="form-control" placeholder="User Name" required="" autoFocus=""></input>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required=""></input>
                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.onSubmitHandler}>Sign in</button>
                </div>
            </div>
      );
    }
  }
  
  export default LoginComponent;
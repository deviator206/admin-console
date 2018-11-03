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
            <div className="loginWrapper">
                <div>
                    <div className="loginTitle">
                    <span>Admin App</span>
                    </div> 
                    <form>
                        <div className="form-group">
                        <label htmlFor="inputUserName">Username</label>
                        <input type="text" className="form-control" id="inputUserName" placeholder="Username"></input>
                        </div>
                        <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" className="form-control" id="inputPassword" placeholder="Password"></input>
                        </div>
                        <a className="btn btn-primary btn-block" onClick={this.onSubmitHandler} >Login</a>
                    </form>
                </div> 
            </div>
      );
    }
  }
  
  export default LoginComponent;
import React, { Component } from 'react';
import AppService from '../service/AppService';

class LoginComponent extends Component {

    constructor(props, context) {
        super(props);
        this.state = {
            username: '',
            password: '',
            data: '',
            authenticated:false,
          };
        this.context = context;
        this.onSubmitHandler= this.onSubmitHandler.bind(this);
        this.onLoginSuccessCallback = this.onLoginSuccessCallback.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.props = props;
        
    }

    componentWillMount(){
        this.setState({});
    }

    componentWillReceiveProps (newProps) {
        console.log(newProps);
    }

  

    onLoginSuccessCallback =(response) => {
        this.props.onLoginSuccess({authenticated:true});
       this.props.history.push("/dashboard")
    }

    onLoginFailureCallback (error) {
        console.log(error);
        this.props.onLoginFailure({authenticated:false});
       this.props.history.push("/")
    }
    onSubmitHandler=() => {
        
        var url = 'http://localhost:8080/login/username/'+this.state.username;
        console.log(url);
        this.setState({ authenticated: false });
        fetch(url)
        .then(response => {
            if (response.ok) {
                
              return response.json();
            } else {
              throw new Error('Something went wrong ...');
              
            }
        })
        .then(data => {
            
           if(this.state.username===data.username && this.state.password===data.password){
            console.log(data.username +':: Authenticated');
            this.props.onLoginSuccess({authenticated:true});
            this.props.history.push("/dashboard")
           }else{
            console.log(data.username +':: Not Authenticated');
            this.props.onLoginSuccess({authenticated:false});
            this.props.history.push("/")
           }
        })
        .catch(error => {
            console.log('Something is wrong with something!','error');
            this.setState({ error:error, authenticated: false })
            this.props.onLoginSuccess({authenticated:false});
                this.props.history.push("/")
        });

       
    }
    
    resetValues(evt){
        if(evt.target.id==='inputUserName'){
            evt.target.value ='';  
        }else  if(evt.target.id==='inputPassword'){
            evt.target.value ='';  
        }
    }
    handleUserChange(evt) {
        this.setState({
            username: evt.target.value,
        });
      };
    
      handlePassChange(evt) {
        this.setState({
            password: evt.target.value,
        });
      }
    
    render() {
        
        return (
            <div className="container text-center">
                <div className="form-signin">
                    <img className="mb-4" src="css/img/icons8-login-64.png" alt="" width="72" height="72"></img>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label htmlFor="inputUserName" className="sr-only">User Name</label>
                    <input type="text" id="inputUserName" className="form-control"  placeholder="User Name"  onChange={this.handleUserChange} required autoFocus></input>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password"  onChange={this.handlePassChange} required></input>
                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.onSubmitHandler}>Sign in</button>
                </div>
            </div>
      );
    }
  }
  
  export default LoginComponent;
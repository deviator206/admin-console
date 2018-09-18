import React, { Component } from 'react';
import AppConstant from './comp.const'
import CreateUserComponent from './CreateUserComponent';
import ViewAttendanceComponent from './ViewAttendanceComponent';
import ViewNotificationComponent from './ViewNotificationComponent';
import LoginContext from '../global-ctx/LoginContext';


class DashboardComponent extends Component {

    constructor(props) {
        super(props);
        this.signOutHandler = this.signOutHandler.bind(this);
        this.sideMenuClick = this.sideMenuClick.bind(this);
        this.getMainContent = this.getMainContent.bind(this);
        this.getDashboardContent =  this.getDashboardContent.bind(this);
    }
    componentWillMount () {
        this.setState({
            selectedMenu: AppConstant.CREATE_USER
        });
    }

    getMainContent() {
        const menuItem = this.state.selectedMenu;
        let compReturned = null;
        switch(menuItem) {
            case AppConstant.CREATE_USER :
             compReturned = <CreateUserComponent />;
            break;
            case AppConstant.VIEW_ATTENDANCE :
            compReturned = <ViewAttendanceComponent />;
            break;
            case AppConstant.VIEW_NOTIFICATION :
            compReturned = <ViewNotificationComponent />;
            break;
        }
        return compReturned;
    }

    signOutHandler() {
        this.props.history.push("/")
    }

    sideMenuClick(menuItem) {
        switch(menuItem) {
            case AppConstant.CREATE_USER :
            this.setState({
                selectedMenu: AppConstant.CREATE_USER
            });
            break;
            case AppConstant.VIEW_ATTENDANCE :
            this.setState({
                selectedMenu: AppConstant.VIEW_ATTENDANCE
            });
            break;
            case AppConstant.VIEW_NOTIFICATION :
            this.setState({
                selectedMenu: AppConstant.VIEW_NOTIFICATION
            });
            break;
        }
    }

    getDashboardContent(ctxInfo) {
        console.log(ctxInfo);
        if(ctxInfo && ctxInfo.loginCustomer){
            return <div  className="row">
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Inside-Out</a>
            
            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap">
                <a className="nav-link" onClick={this.signOutHandler}>Sign out</a>
                </li>
            </ul>
            </nav>
            
            <div className="container-fluid" style={{marginTop: '3em'}}>
                <div className="row">
                    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                        <div className="sidebar-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                <a class={this.state && this.state.selectedMenu === AppConstant.CREATE_USER ? 'active': ''} onClick={()=>{this.sideMenuClick(AppConstant.CREATE_USER)}}> Create User</a>  
                                </li>
                                <li className="nav-item">
                                     <a class={this.state && this.state.selectedMenu === AppConstant.VIEW_ATTENDANCE ? 'active': ''}  onClick= {()=>{this.sideMenuClick(AppConstant.VIEW_ATTENDANCE)}}> Attendance</a>  
                                    
                                </li>
                                <li className="nav-item">
                                    <a class={this.state && this.state.selectedMenu === AppConstant.VIEW_NOTIFICATION ? 'active': ''}  onClick={()=>{this.sideMenuClick(AppConstant.VIEW_NOTIFICATION)}}> View Notifications</a>  
                                </li>
                            </ul>
                        </div>
                    </nav>
            
                    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                        {this.getMainContent()}
                    </main>
            </div>
            </div>
            </div>;
        }
        return null;
    }

    render() {
      return (
          <LoginContext>
                {value =>{
                    this.getDashboardContent(value)
                }}
          </LoginContext>
        );
    }
  }
  
  export default DashboardComponent;
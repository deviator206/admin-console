import React, { Component } from 'react';
import AppConstant from './comp.const'
import CreateUserComponent from './CreateUserComponent';
import CreateVisitorComponent from './CreateVisitorComponent';
import ViewAttendanceComponent from './ViewAttendanceComponent';
import ViewNotificationComponent from './ViewNotificationComponent';
import ViewEmployeeListComponent from './ViewEmployeeListComponent';
import ViewAttendanceSingleComponent from './ViewAttendanceSingleComponent';
import ViewVisitorListComponent from './ViewVisitorListComponent';
import AppService from '../service/AppService';


class DashboardComponent extends Component {

    constructor(props) {
        super(props);
        this.signOutHandler = this.signOutHandler.bind(this);
        this.sideMenuClick = this.sideMenuClick.bind(this);
        this.getMainContent = this.getMainContent.bind(this);
        this.getDashboardContent = this.getDashboardContent.bind(this);
        this.onLogoutSuccess = this.onLogoutSuccess.bind();
        this.onPushNotificationRcvd = this.onPushNotificationRcvd.bind(this);
    }

    componentWillUnmount() {
        if (this.evtSource) {
            this.evtSource.close();
        }
    }
    componentWillMount() {
        const ranNo = Math.floor((Math.random() * 1000) + 1)
        this.setState({
            selectedMenu: AppConstant.CREATE_USER,
            notification_counter:0,
            sName:"S_"+ranNo
        });
        this.evtSource = new EventSource(AppService.getPushNotificationURL()+ranNo);
        this.evtSource.addEventListener('message', this.onPushNotificationRcvd, false);
    }

    onPushNotificationRcvd (data) {
        console.log(' PUSH NOTIFICATION RCVD');
        const {notification_counter} = this.state;
        this.setState({
            notification_counter: notification_counter+1
        });
    }

    getMainContent() {
        const menuItem = this.state.selectedMenu;
        let compReturned = null;
        switch (menuItem) {
            case AppConstant.CREATE_USER:
                compReturned = <CreateUserComponent />;
                break;
            case AppConstant.ATTENDANCE_ALL:
                compReturned = <ViewAttendanceComponent />;
                break;
            case AppConstant.VIEW_NOTIFICATION:
                compReturned = <ViewNotificationComponent />;
                break;
            case AppConstant.VIEW_EMPLOYEE:
                compReturned = <ViewEmployeeListComponent />;
                break;
            case AppConstant.CREATE_VISITOR:
                compReturned = <CreateVisitorComponent />;
                break;
            case AppConstant.ATTENDANCE_SINGLE:
                compReturned = <ViewAttendanceSingleComponent />;
                break;
            case AppConstant.VIEW_VISITOR:
                compReturned = <ViewVisitorListComponent />;
                break;
                
        }
        return compReturned;
    }

    onLogoutSuccess() {
        this.props.onLogoutSuccess();
        this.props.history.push("/")
    }
    signOutHandler() {
        this.props.onLogoutSuccess();
        this.props.history.push("/")
        /*
        AppService.postLogout({
            startDate: document.getElementById("rangeSearchStartDate").value,
            endDate: document.getElementById("rangeSearchEndDate").value
          }, this.onLogoutSuccess)
          */
        
    }

    sideMenuClick(menuItem) {
        switch (menuItem) {
            case AppConstant.CREATE_USER:
                this.setState({
                    selectedMenu: AppConstant.CREATE_USER
                });
                break;
            case AppConstant.ATTENDANCE_ALL:
                this.setState({
                    selectedMenu: AppConstant.ATTENDANCE_ALL
                });
                break;
            case AppConstant.VIEW_NOTIFICATION:
                this.setState({
                    selectedMenu: AppConstant.VIEW_NOTIFICATION
                });
                break;
            case AppConstant.VIEW_EMPLOYEE:
                this.setState({
                    selectedMenu: AppConstant.VIEW_EMPLOYEE
                });
                break;

            case AppConstant.ATTENDANCE_SINGLE:
                this.setState({
                    selectedMenu: AppConstant.ATTENDANCE_SINGLE
                });
                break;
            case AppConstant.CREATE_VISITOR:
                this.setState({
                    selectedMenu: AppConstant.CREATE_VISITOR
                });
                break;
            case AppConstant.VIEW_VISITOR:
                this.setState({
                    selectedMenu: AppConstant.VIEW_VISITOR
                });
                break;    
        }
    }

    getDashboardContent(ctxInfo) {
        const { authenticated = true, logged_in_user } = this.props;
        const {notification_counter = 0} = this.state
        if (authenticated) {
            return <div className="wrapper">
                <nav id="sidebar">
                    <div className="sidebar-header">
                        <h3>Admin App</h3>
                    </div>
                    <ul className="list-unstyled components">
                        <li className={this.state && this.state.selectedMenu === AppConstant.CREATE_USER ? 'active' : ''}  ><a onClick={() => { this.sideMenuClick(AppConstant.CREATE_USER) }}>Add New Employee</a></li>
                        <li className={this.state && this.state.selectedMenu === AppConstant.VIEW_EMPLOYEE ? 'active' : ''}  ><a onClick={() => { this.sideMenuClick(AppConstant.VIEW_EMPLOYEE) }}>View All Employee</a></li>
                        <li className={this.state && this.state.selectedMenu === AppConstant.ATTENDANCE_ALL ? 'active' : ''}  ><a onClick={() => { this.sideMenuClick(AppConstant.ATTENDANCE_ALL) }}>Attendance - All </a></li>
                        <li className={this.state && this.state.selectedMenu === AppConstant.ATTENDANCE_SINGLE ? 'active' : ''}  ><a onClick={() => { this.sideMenuClick(AppConstant.ATTENDANCE_SINGLE) }}>Attendance - Single </a></li>
                        <li className={this.state && this.state.selectedMenu === AppConstant.CREATE_VISITOR ? 'active' : ''}  ><a onClick={() => { this.sideMenuClick(AppConstant.CREATE_VISITOR) }}>Create Visitor </a></li>
                        <li className={this.state && this.state.selectedMenu === AppConstant.VIEW_VISITOR ? 'active' : ''}  ><a onClick={() => { this.sideMenuClick(AppConstant.VIEW_VISITOR) }}>View All Visitor </a></li>
                        <li className={this.state && this.state.selectedMenu === AppConstant.VIEW_NOTIFICATION ? 'active' : ''}  ><a onClick={() => { this.sideMenuClick(AppConstant.VIEW_NOTIFICATION) }}>Notification {this.state.notification_counter}</a></li>
                    </ul>
                </nav>
                <div id="content">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <button type="button" id="sidebarCollapse" className="btn btn-info">
                                <i className="fas fa-align-left"></i>
                                <span></span>
                            </button>
                            <div className="headerActionMenu">
                                <div>Welcome {this.state.sName} {logged_in_user && logged_in_user.username && (logged_in_user.username).toUpperCase()} ! </div>
                                <div><a className="nav-link" onClick={this.signOutHandler}>Logout</a></div>
                            </div>
                        </div>
                    </nav>
                    <div className="mainSection">
                        {this.getMainContent()}
                    </div>
                </div>
            </div>
        }
        return null;
    }

    render() {
        return (
            <div>
                {this.getDashboardContent()}
            </div>


        );
    }
}

export default DashboardComponent;
import React, { Component } from 'react';
import AppConstant from './comp.const'
import CreateUserComponent from './CreateUserComponent';
import ViewAttendanceComponent from './ViewAttendanceComponent';
import ViewNotificationComponent from './ViewNotificationComponent';
import ViewEmployeeListComponent from './ViewEmployeeListComponent';


class DashboardComponent extends Component {

    constructor(props) {
        super(props);
        this.signOutHandler = this.signOutHandler.bind(this);
        this.sideMenuClick = this.sideMenuClick.bind(this);
        this.getMainContent = this.getMainContent.bind(this);
        this.getDashboardContent = this.getDashboardContent.bind(this);
    }
    componentWillMount() {
        this.setState({
            selectedMenu: AppConstant.CREATE_USER
        });
    }

    getMainContent() {
        const menuItem = this.state.selectedMenu;
        let compReturned = null;
        switch (menuItem) {
            case AppConstant.CREATE_USER:
                compReturned = <CreateUserComponent />;
                break;
            case AppConstant.VIEW_ATTENDANCE:
                compReturned = <ViewAttendanceComponent />;
                break;
            case AppConstant.VIEW_NOTIFICATION:
                compReturned = <ViewNotificationComponent />;
                break;
            case AppConstant.VIEW_EMPLOYEE:
                compReturned = <ViewEmployeeListComponent />;
                break;
        }
        return compReturned;
    }

    signOutHandler() {
        this.props.history.push("/")
    }

    sideMenuClick(menuItem) {
        switch (menuItem) {
            case AppConstant.CREATE_USER:
                this.setState({
                    selectedMenu: AppConstant.CREATE_USER
                });
                break;
            case AppConstant.VIEW_ATTENDANCE:
                this.setState({
                    selectedMenu: AppConstant.VIEW_ATTENDANCE
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
        }
    }

    getDashboardContent(ctxInfo) {
        const { authenticated = true } = this.props;
        if (authenticated) {
            return <div className="wrapper">
                <nav id="sidebar">
                    <div className="sidebar-header">
                        <h3>Admin App</h3>
                    </div>
                    <ul className="list-unstyled components">
                        <li className={this.state && this.state.selectedMenu === AppConstant.CREATE_USER ? 'active' : ''}  ><a onClick={() => { this.sideMenuClick(AppConstant.CREATE_USER) }}>Add New Employee</a></li>
                        <li className={this.state && this.state.selectedMenu === AppConstant.VIEW_EMPLOYEE ? 'active' : ''}  ><a onClick={() => { this.sideMenuClick(AppConstant.VIEW_EMPLOYEE) }}>View All Employee</a></li>
                        <li className={this.state && this.state.selectedMenu === AppConstant.VIEW_ATTENDANCE ? 'active' : ''}  ><a onClick={() => { this.sideMenuClick(AppConstant.VIEW_ATTENDANCE) }}>Attendance</a></li>
                        <li className={this.state && this.state.selectedMenu === AppConstant.VIEW_NOTIFICATION ? 'active' : ''}  ><a onClick={() => { this.sideMenuClick(AppConstant.VIEW_NOTIFICATION) }}>View Notification</a></li>
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
                                <div>Welcome User!</div>
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
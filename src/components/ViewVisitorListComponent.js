import React, { Component } from 'react';
import AppService from '../service/AppService';

class ViewVisitorListComponent extends Component {

    constructor(props, context) {
        super(props);
        this.onSearchHandler= this.onSearchHandler.bind(this);
        this.renderEmployeeList = this.renderEmployeeList.bind(this);
        this.renderEmptyEmpList = this.renderEmptyEmpList.bind(this);
        this.onEmployeeFetchedSuccessHandler = this.onEmployeeFetchedSuccessHandler.bind(this);
    }

    componentWillMount(){
      this.setState({});
  }

    onEmployeeFetchedSuccessHandler(response) {
      this.setState({
        empList: response
      });
    }

    renderEmptyEmpList() {
      const {empList} = this.state;
      if(empList && empList.length === 0) {
        return (
        <div className="noDataContent alert alert-info">
        No records to display!
        </div> )
      }
      return null;
    }

    renderEmployeeList() {
      const {empList =[]} = this.state;
      let renderableEmpList =[];
      renderableEmpList = empList.map(function (singleEmp) {
        let dateOfBirth = "";
        if (singleEmp && singleEmp.dob){
          const dateIn = new Date(singleEmp.dob);
          dateOfBirth = dateIn.getUTCDay() +'/'+dateIn.getUTCMonth()+'/'+dateIn.getUTCFullYear(); 
        }
        return (
              <tr data-empID={singleEmp.empid}>
                 <th scope="row">{singleEmp.empid}</th>
                 <td>{singleEmp.name}</td>
                 <td>{singleEmp.email}</td>
                 <td>{singleEmp.phone}</td>
                 <td>{dateOfBirth}</td>
                 <td>{singleEmp.department}</td>
                 <td>{singleEmp.gender}</td>
                 <td>{singleEmp.picurl}</td>
              </tr>
        )
      });
      return renderableEmpList;
    }

    onSearchHandler() {
      const empID  = document.getElementById("inlineEmpIDInput").value;
      const empName  = document.getElementById("inlineEmpNameInput").value;
      if (empID !== "" ) {
        AppService.getEmployeesById({searchType:"emp_id",searchText:empID}, this.onEmployeeFetchedSuccessHandler)
      } 
      else if (empName !== "" ) {
        AppService.getEmployeesByName({searchType:"emp_name",searchText:empName}, this.onEmployeeFetchedSuccessHandler)
      }
    }

    render() {
      return (
        <div >
        <span className="pageHeaderTxt">Employee Search</span>
        <div id="accordion" className="searchSection">
           <div className="card">
              <div className="card-header" id="headingOne">
                   <button className="btn btn-link visible-xs hidden-sm hidden-md hidden-lg" data-toggle="collapse" data-target="#collapseSearch" aria-expanded="true" aria-controls="collapseSearch">
                     <i className="fas fa-search"></i> Search
                   </button>
              </div>

               <div id="collapseSearch" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                 <div className="card-body">
                    <div className="form-inline">
                      <label className="sr-only" htmlFor="inlineEmpIDInput">Employee ID</label>
                      <input type="text" className="form-control form-control-sm mb-2 mr-sm-2" id="inlineEmpIDInput" placeholder="Employee ID" />
                      <span className="legend mb-2 mr-sm-2" > OR </span>
                      <label className="sr-only" htmlFor="inlineEmpNameInput">Name</label>
                      <input type="text" className="form-control form-control-sm mb-2 mr-sm-2" id="inlineEmpNameInput" placeholder="Name" />

                      

                      <button type="submit" className="btn btn-sm btn-primary mb-2" onClick = { this.onSearchHandler}>Search</button>
                    </div>
               </div>
             </div>
           </div>
        </div>
        <div className="resultSection">
           <span className="boldTxt">Result</span>
           <table className="table table-sm table-hover">
             <thead>
               <tr>

                 <th scope="col">Emp ID</th>
                 <th scope="col">Name</th>
                 <th scope="col">Phone</th>
                 <th scope="col">Phone</th>
                 <th scope="col">Date of Birth</th>
                 <th scope="col">Department</th>
                 <th scope="col">Gender</th>
                 <th scope="col">Pic</th>
               </tr>
             </thead>
             <tbody>
               {this.renderEmployeeList()}
              </tbody>
           </table>
        </div>

          {this.renderEmptyEmpList()}
    </div>
      );
    }
  }
  
  export default ViewVisitorListComponent;
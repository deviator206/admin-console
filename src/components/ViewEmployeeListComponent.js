import React, { Component } from 'react';

class ViewEmployeeListComponent extends Component {

    constructor(props, context) {
        super(props);
        this.onSubmitHandler= this.onSubmitHandler.bind(this);
    }

    onSubmitHandler() {
        this.props.history.push("/dashboard")
    }

    render() {
      return (
        <div >
        <span className="pageHeaderTxt">Employee Search</span>
        <a className="btn btn-sm btn-primary mb-2 newEmplBtn" href="editEmployee.html">Create New Employee</a>
        <div id="accordion" className="searchSection">
           <div className="card">
              <div className="card-header" id="headingOne">
                   <button className="btn btn-link visible-xs hidden-sm hidden-md hidden-lg" data-toggle="collapse" data-target="#collapseSearch" aria-expanded="true" aria-controls="collapseSearch">
                     <i className="fas fa-search"></i> Search
                   </button>
              </div>

               <div id="collapseSearch" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                 <div className="card-body">
                    <form className="form-inline">
                      <label className="sr-only" htmlFor="inlineEmpID">Employee ID</label>
                      <input type="text" className="form-control form-control-sm mb-2 mr-sm-2" id="inlineEmpID" placeholder="Employee ID" />

                      <label className="sr-only" htmlFor="inlineEmpName">Name</label>
                      <input type="text" className="form-control form-control-sm mb-2 mr-sm-2" id="inlineEmpName" placeholder="Name" />

                    <label className="sr-only" htmlFor="inlineDesignation">Designation</label>
                      <input type="text" className="form-control form-control-sm mb-2 mr-sm-2" id="inlineDesignation" placeholder="Designation" />

                      <button type="submit" className="btn btn-sm btn-primary mb-2">Submit</button>
                    </form>
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
                 <th scope="col">Designation</th>
                 <th scope="col">Reporting To</th>
                 <th scope="col">Joining date</th>
                 <th scope="col">DOB</th>
                 <th scope="col">Gender</th>
                 <th scope="col">Email</th>
                 <th scope="col">Phone</th>
                 <th scope="col">Status</th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <th scope="row">1</th>
                 <td>Sandeep</td>
                 <td>Sr. Software Engineer</td>
                 <td>Shailesh</td>
                 <td>6 June, 2014</td>
                 <td>12 June, 1986</td>
                 <td>Male</td>
                 <td>sandeep.b@gmail.com</td>
                 <td>9009282636</td>
                 <td><span className="badge badge-success">Active</span></td>
               </tr>
               <tr>
                 <th scope="row">2</th>
                 <td>Jacob</td>
                 <td>Sr. Software Engineer</td>
                 <td>Srinivas</td>
                 <td>24 Oct, 2016</td>
                 <td>07 April, 1979</td>
                 <td>Male</td>
                 <td>jacob.d@gmail.com</td>
                 <td>9037545999</td>
                 <td><span className="badge badge-danger">Non Active</span></td>
               </tr>
               <tr>
                 <th scope="row">2</th>
                 <td>Shubhangi</td>
                 <td>Sr. Software Engineer</td>
                 <td>Sandeep</td>
                 <td>16 Jul, 2015</td>
                 <td>3 Nov, 1986</td>
                 <td>Female</td>
                 <td>shubhangi.g@gmail.com</td>
                 <td>9087123456</td>
                 <td><span className="badge badge-success">Active</span></td>
               </tr>
               <tr>
                 <th scope="row">3</th>
                 <td>John</td>
                 <td>Software Engineer</td>
                 <td>Sandeep</td>
                 <td>12 Feb, 2017</td>
                 <td>30 Dec, 1992</td>
                 <td>Male</td>
                 <td>john.m@gmail.com</td>
                 <td>9876034527</td>
                 <td><span className="badge badge-success">Active</span></td>
               </tr>
             </tbody>
           </table>
        </div>

        <div className="noDataContent alert alert-info">
           No records to display!
        </div>  
    </div>
      );
    }
  }
  
  export default ViewEmployeeListComponent;
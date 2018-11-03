import React, { Component } from 'react';

class ViewAttendanceComponent extends Component {

    constructor(props, context) {
        super(props);
        this.onSubmitHandler= this.onSubmitHandler.bind(this);
        

    }

    onSubmitHandler() {
        this.props.history.push("/dashboard")
    }

    render() {
      return (
        <div className="mainSection">
               <span className="pageHeaderTxt">Employee Search</span>
               
               <div id="accordion" className="searchSection">
                  <div className="card">
                     <div className="card-header" id="headingOne">
                          <button className="btn btn-link visible-xs hidden-sm hidden-md hidden-lg" data-toggle="collapse" data-target="#collapseSearch" aria-expanded="true" aria-controls="collapseSearch">
                            <i className="fas fa-search"></i> Search By
                          </button>
                     </div>

                      <div id="collapseSearch" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body">
                          	<form className="form-inline">
	                          <label className="sr-only" htmlFor="inlineEmpID">Employee ID</label>
	                          <input type="text" className="form-control form-control-sm mb-2 mr-sm-2 mt-md-2" id="inlineEmpID" placeholder="Employee ID"/>

	                          <label className="sr-only" htmlFor="inlineEmpName">Name</label>
	                          <input type="text" className="form-control form-control-sm mb-2 mr-sm-2 mt-md-2" id="inlineEmpName" placeholder="Name"/>

								<div id="datepicker" className="input-group date mr-2" data-date-format="mm-dd-yyyy">
								    <input className="form-control form-control-sm" type="text" readOnly />
								    <span className="input-group-addon"><i className="fa fa-calendar-alt"></i></span>
					            </div>

	                          <button type="submit" className="btn btn-sm btn-primary mb-2 mt-md-2 mt-sm-3">Submit</button>
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
                        <th scope="col">Leave date</th>
                        <th scope="col">Leave category</th>
                        <th scope="col">Leave reason</th>
                        <th scope="col">Leave balance</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Sandeep</td>
                        <td>24/07/2018</td>
                        <td>CL</td>
                        <td>Personal</td>
                        <td>19</td>
                        <td><span className="badge badge-success">Granted</span></td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>24/07/2018</td>
                        <td>PL</td>
                        <td>Personal</td>
                        <td>12</td>
                        <td><span className="badge badge-danger">Rejected</span></td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Shubhangi</td>
                        <td>24/07/2018</td>
                        <td>CL</td>
                        <td>Personal</td>
                        <td>19</td>
                        <td><span className="badge badge-success">Granted</span></td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>John</td>
                        <td>24/07/2018</td>
                        <td>CL</td>
                        <td>Personal</td>
                        <td>19</td>
                        <td><span className="badge badge-success">Granted</span></td>
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
  
  export default ViewAttendanceComponent;
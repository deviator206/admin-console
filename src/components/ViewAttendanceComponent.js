import React, { Component } from 'react';
import AppService from '../service/AppService';

class ViewAttendanceComponent extends Component {

  constructor(props, context) {
    super(props);
    this.onSearchClickedHandler = this.onSearchClickedHandler.bind(this);
    this.onSearchTrackerChange = this.onSearchTrackerChange.bind(this);
    this.renderSearchByRange = this.renderSearchByRange.bind(this);
    this.renderSearchByMonth = this.renderSearchByMonth.bind(this);
    this.renderSearchBySingleDate = this.renderSearchBySingleDate.bind(this);
    this.onSearchComplete = this.onSearchComplete.bind(this);
    this.renderInputError = this.renderInputError.bind(this);
    this.renderEmptyAttendanceList = this.renderEmptyAttendanceList.bind(this);
    this.renderAttendanceList = this.renderAttendanceList.bind(this);
    this.onResetClickedHandler = this.onResetClickedHandler.bind(this);
  }

  componentWillMount() {
    this.setState({
      searchOption: 'range'
    });
  }

  onSearchTrackerChange() {
    this.setState({
      searchOption: document.getElementById("searchTrackerDropDown").value,
      inputErrorMessage: ''
    });
  }

  renderSearchByRange() {
    const { searchOption } = this.state;
    if (searchOption && searchOption === 'range') {
      return (
        <div className="input-group date mr-2" >
          <label className="form-control form-control-sm" htmlFor="rangeSearchStartDate">Start Date</label>
          <input type="date" className="form-control form-control-sm" id="rangeSearchStartDate" />
          <label className="form-control form-control-sm" htmlFor="rangeSearchEndDate">End Date</label>
          <input type="date" className="form-control form-control-sm" id="rangeSearchEndDate" />
        </div>
      );
    }
    return null;
  }

  renderSearchBySingleDate() {
    const { searchOption } = this.state;
    if (searchOption && searchOption === 'date') {
      return (
        <div className="input-group date mr-2" >
          <label className="form-control form-control-sm" htmlFor="dateSearchDate">Select Date</label>
          <input type="date" className="form-control form-control-sm" id="dateSearchDate" />
        </div>
      );
    }
    return null;
  }

  renderSearchByMonth() {
    const { searchOption } = this.state;
    if (searchOption && searchOption === 'month') {
      return (
        <div className="input-group date mr-2" >
          <label className="form-control form-control-sm" htmlFor="monthSearchStartDate">Select Month</label>
          <select id='monthSearchStartDate' >
            <option value="JAN">January</option>
            <option value="FEB">February</option>
            <option value="MAR">March</option>
            <option value="APR">April</option>
            <option value="MAY">May</option>
            <option value="JUN">June</option>
            <option value="JUL">July</option>
            <option value="AUG">August</option>
            <option value="SEPT">September</option>
            <option value="OCT">October</option>
            <option value="NOV">November</option>
            <option value="DEC">December</option>
          </select>
        </div>
      );
    }
    return null;
  }

  onResetClickedHandler() {
    this.setState({
      attendanceList: undefined
    });
  }


  onSearchComplete(resp) {
    if(resp) {
      this.setState({
        attendanceList: resp
      });
    }
  }

  renderEmptyAttendanceList () {
    const  {attendanceList} = this.state;
    if(attendanceList && attendanceList.length == 0) {
      return (
        <div className="noDataContent alert alert-info">
           No records to display!
          </div>
          )
    }
    return null;
  }


  renderAttendanceList() {
    const {attendanceList =[]} = this.state;
    let renderableEmpAttList =[];
    renderableEmpAttList = attendanceList.map(function (singleAttendance) {
      let trackedDate = "";
      if (singleAttendance && singleAttendance.trackedDate){
        const dateIn = new Date(singleAttendance.trackedDate);
        trackedDate = dateIn.getUTCDay() +'/'+dateIn.getUTCMonth()+'/'+dateIn.getUTCFullYear(); 
      }
      return (
            <tr  key={singleAttendance.id}>
                <td>{trackedDate}</td>
                <td>{singleAttendance.name}</td>
                <td>{singleAttendance.in_time}</td>
                <td>{singleAttendance.out_time}</td>
                <td>{singleAttendance.total_time}</td>
            </tr>
      )
    });
    return renderableEmpAttList;
  }


  renderInputError () {
    const  {inputErrorMessage} = this.state;
    if(inputErrorMessage) {
      return (
        <div className="noDataContent alert alert-info">
         {inputErrorMessage}
          </div>
          )
    }
    return null;
  }


  onSearchClickedHandler() {
    const { searchOption } = this.state;
    switch (searchOption) {
      case 'range':
        if(document.getElementById("rangeSearchStartDate").value !== "" && document.getElementById("rangeSearchEndDate").value !== "") {
          AppService.getAttendanceForRange({
            startDate: document.getElementById("rangeSearchStartDate").value,
            endDate: document.getElementById("rangeSearchEndDate").value
          }, this.onSearchComplete)
        } else {
          this.setState({
            inputErrorMessage : 'Please select both the dates'
          });
        }
        
        break;
      case 'month':
      if(document.getElementById("monthSearchStartDate").value !== "" ) {
        AppService.getAttendanceForMonth({
          month: document.getElementById("monthSearchStartDate").value
        }, this.onSearchComplete)
      }else {
        this.setState({
          inputErrorMessage : 'Please select month '
        });
      }
        break;
      case 'date':
      if(document.getElementById("dateSearchDate").value !== "" ) {
        AppService.getAttendanceForSpecificDate({
          specificDate: document.getElementById("dateSearchDate").value
        }, this.onSearchComplete)
      }else {
          this.setState({
            inputErrorMessage : 'Please select valid date'
          });
        }
        break;
    }

  }

  render() {
    return (
      <div className="mainSection">
        <span className="pageHeaderTxt">Attendace Tracker</span>

        <div id="accordion" className="searchSection">
          <div className="card">
            <div className="card-header" id="headingOne">
            {this.renderInputError()}
           

              <button className="btn btn-link visible-xs hidden-sm hidden-md hidden-lg" data-toggle="collapse" data-target="#collapseSearch" aria-expanded="true" aria-controls="collapseSearch">
                <i className="fas fa-search"></i> Search By
                          </button>
            </div>
            <div id="collapseSearch" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
              <div className="card-body">
                <div className="form-inline">
                  <select id='searchTrackerDropDown' onChange={this.onSearchTrackerChange}>
                    <option value="range">Range</option>
                    <option value="month">Month</option>
                    <option value="date">Date</option>
                  </select>

                  {this.renderSearchByRange()}
                  {this.renderSearchByMonth()}
                  {this.renderSearchBySingleDate()}


                  <button type="submit" className="btn btn-sm btn-primary mb-2 mt-md-2 mt-sm-3" onClick={this.onSearchClickedHandler}>Submit</button>
                  <button type="submit" className="btn btn-sm btn-primary mb-2 mt-md-2 mt-sm-3" onClick={this.onResetClickedHandler}> Reset Results</button>
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
                <th scope="col">Date</th>
                <th scope="col">Name</th>
                <th scope="col">First In</th>
                <th scope="col">Last Out</th>
                <th scope="col">Total Time</th>
              </tr>
            </thead>
            <tbody>
            {this.renderAttendanceList()}
            </tbody>
          </table>
        </div>

       {this.renderEmptyAttendanceList()}
      </div>
    );
  }
}

export default ViewAttendanceComponent;
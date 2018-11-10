import React, { Component } from 'react';
import AppService from '../service/AppService';

class ViewNotificationComponent extends Component {


  constructor(props, context) {
    super(props);
    this.onSearchClickedHandler = this.onSearchClickedHandler.bind(this);
    this.onSearchTrackerChange = this.onSearchTrackerChange.bind(this);
    this.renderSearchByRange = this.renderSearchByRange.bind(this);
    this.renderSearchByMonth = this.renderSearchByMonth.bind(this);
    this.renderSearchBySingleDate = this.renderSearchBySingleDate.bind(this);
    this.onSearchComplete = this.onSearchComplete.bind(this);
    this.renderInputError = this.renderInputError.bind(this);
    this.renderEmptyNotificationList = this.renderEmptyNotificationList.bind(this);
    this.renderNotificationList = this.renderNotificationList.bind(this);
    this.onResetClickedHandler = this.onResetClickedHandler.bind(this);
  }

  componentWillMount() {
    this.setState({
      searchOption: 'date_today'
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
    if (resp) {
      this.setState({
        attendanceList: resp
      });
    }
  }

  renderEmptyNotificationList() {
    const { attendanceList } = this.state;
    if (attendanceList && attendanceList.length == 0) {
      return (
        <div className="noDataContent alert alert-info">
          No records to display!
          </div>
      )
    }
    return null;
  }


  renderNotificationList() {
    const { attendanceList = [] } = this.state;
    let renderableEmpAttList = [];
    renderableEmpAttList = attendanceList.map(function (singleVisitor) {
      let trackedDate = "";
      if (singleVisitor && singleVisitor.trackedDate) {
        const dateIn = new Date(singleVisitor.trackedDate);
        trackedDate = dateIn.getUTCDay() + '/' + dateIn.getUTCMonth() + '/' + dateIn.getUTCFullYear();
      }
      return (
        <tr key={singleVisitor.id}>

          <td>{trackedDate}</td>
          <td>{singleVisitor.type}</td>
          <td>{singleVisitor.description}</td>
          <td>
            <img src={singleVisitor.pic_url} ></img>
          </td>

          <td>
            <button
              type="submit"
              className="btn btn-sm btn-primary mb-2 mt-md-2 mt-sm-3"
              onClick={() => {

              }}> Add Employee </button>
          </td>

          <td>
            <button
              type="submit"
              className="btn btn-sm btn-primary mb-2 mt-md-2 mt-sm-3"
              onClick={() => {

              }}> Add Visitor</button>
          </td>



          <td>{singleVisitor.total_time}</td>
        </tr>
      )
    });
    return renderableEmpAttList;
  }


  renderInputError() {
    const { inputErrorMessage } = this.state;
    if (inputErrorMessage) {
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
        if (document.getElementById("rangeSearchStartDate").value !== "" && document.getElementById("rangeSearchEndDate").value !== "") {
          AppService.getNotificationForRange({
            startDate: document.getElementById("rangeSearchStartDate").value,
            endDate: document.getElementById("rangeSearchEndDate").value
          }, this.onSearchComplete)
        } else {
          this.setState({
            inputErrorMessage: 'Please select both the dates'
          });
        }

        break;
      case 'month':
        if (document.getElementById("monthSearchStartDate").value !== "") {
          AppService.getNotificationForMonth({
            month: document.getElementById("monthSearchStartDate").value
          }, this.onSearchComplete)
        } else {
          this.setState({
            inputErrorMessage: 'Please select month '
          });
        }
        break;
      case 'date':
        if (document.getElementById("dateSearchDate").value !== "") {
          AppService.getNotificationForSpecificDate({
            specificDate: document.getElementById("dateSearchDate").value
          }, this.onSearchComplete)
        } else {
          this.setState({
            inputErrorMessage: 'Please select valid date'
          });
        }
        break;
      case 'date_today':
        AppService.getNotificationForSpecificDate({
          specificDate: new Date()
        }, this.onSearchComplete)
        break;
    }

  }

  render() {
    return (
      <div className="mainSection">
        <span className="pageHeaderTxt">Notification Tracker</span>

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
                    <option value="date_today">Today</option>
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
                <th scope="col">Type</th>
                <th scope="col">Description</th>
                <th scope="col">Pic URL </th>
                <th scope="col">Conver To Empoyee</th>
                <th scope="col">Conver To Visitor</th>
              </tr>
            </thead>
            <tbody>
              {this.renderNotificationList()}
            </tbody>
          </table>
        </div>

        {this.renderEmptyNotificationList()}
      </div>
    );
  }

}

export default ViewNotificationComponent;
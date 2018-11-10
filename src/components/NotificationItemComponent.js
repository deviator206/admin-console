
import React, { Component } from 'react';

class NotificationItemComponent extends Component {

  constructor(props, context) {
    super(props);
  }

  render() {
    const { singleNotification, onEmployeeConversion, onVisitorConversion } = this.props;
    let trackedDate = "";
    if (singleNotification && singleNotification.trackedDate) {
      const dateIn = new Date(singleNotification.trackedDate);
      trackedDate = dateIn.getUTCDay() + '/' + dateIn.getUTCMonth() + '/' + dateIn.getUTCFullYear();
    }
    return (
      <tr >
        <td>{trackedDate}</td>
        <td>{singleNotification.type}</td>
        <td>{singleNotification.description}</td>
        <td>
          <img src={singleNotification.pic_url} ></img>
        </td>
        <td>
          <button
            type="submit"
            className="btn btn-sm btn-primary mb-2 mt-md-2 mt-sm-3"
            onClick={() => {
              onEmployeeConversion(singleNotification)
            }}> Add Employee </button>
        </td>

        <td>
          <button
            type="submit"
            className="btn btn-sm btn-primary mb-2 mt-md-2 mt-sm-3"
            onClick={() => {
              onVisitorConversion(singleNotification)
            }}> Add Visitor</button>
        </td>
        <td>{singleNotification.total_time}</td>
      </tr>
    )
  }
}

export default NotificationItemComponent;
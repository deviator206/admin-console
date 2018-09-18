import React, { Component } from 'react';

class ViewAttendanceComponent extends Component {

    constructor(props, context) {
        super(props);
        this.onSubmitHandler= this.onSubmitHandler.bind(this);
        // Gith@9765896417

    }

    onSubmitHandler() {
        this.props.history.push("/dashboard")
    }

    render() {
      return (
        <div className="container text-center">
            ViewAttendanceComponent
        </div>
      );
    }
  }
  
  export default ViewAttendanceComponent;
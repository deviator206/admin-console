import React, { Component } from 'react';

class ViewNotificationComponent extends Component {

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
           ViewNotificationComponent
        </div>
      );
    }
  }
  
  export default ViewNotificationComponent;
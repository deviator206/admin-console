import React, { Component } from 'react';

class CreateUserComponent extends Component {

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
            Create User
        </div>
      );
    }
  }
  
  export default CreateUserComponent;
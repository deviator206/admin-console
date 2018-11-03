import React, { Component } from 'react';

class CreateUserComponent extends Component {

    constructor(props, context) {
        super(props);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onCamerBegin = this.onCamerBegin.bind(this);
        this.takeSnap = this.takeSnap.bind(this);
        this.mediaVideStream = null;

    }
    takeSnap() {
        const canvas = document.getElementById('canvasComponent');
        const context = canvas.getContext('2d');
        const videoEle = document.getElementById('videoCaptureComponent');
        context.drawImage(videoEle, 0, 0, 640, 480);
        videoEle.pause();
    }

    onSubmitHandler() {
        const canvas = document.getElementById('canvasComponent');
        const context = canvas.getContext('2d');
        const dataUrl = canvas.toDataURL();
        const propsToBeSent = {
            "name": document.getElementById("EmpName").value,
            "gender": "male",
            "imgBase64": dataUrl,
            "dob": "2000-01-31",
            "phone": "1234567890",
            "email": "abc@abc.com",
            "empid": 6,
            "department": "HR",
            "misc": "KKKKKKKKKK",
            "picurl": "D:\\neuroImgDB\\xyz_abc.png",
            "picname": "xyz_abc.png",
            "pictemplate": null
        }
    }

    onCamerBegin() {
        const video = document.getElementById('videoCaptureComponent');
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Not adding `{ audio: true }` since we only want video now
            navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
                video.src = window.URL.createObjectURL(stream);
                video.play();
            });
        }
    }

    render() {
        return (
            <div>
                <span className="pageHeaderTxt">Add Employee details</span>
                <div className="templateForm">
                    <div className="form-row">

                        <div className="form-group col-lg-4 col-md-6">
                            <label htmlFor="EmpName">Name</label>
                            <input type="text" className="form-control form-control-sm" id="EmpName" placeholder="Name" />
                        </div>
                        <div className="form-group col-lg-4 col-md-6">
                            <label htmlFor="EmpDesignation">Designation</label>
                            <input type="text" className="form-control form-control-sm" id="EmpDesignation" placeholder="Designation" />
                        </div>

                    </div>
                    <div className="form-row">
                        <div className="form-group col-lg-4 col-md-6">
                            <label htmlFor="EmpDOB">DOB</label>
                            <div id="datepicker" className="input-group date" data-date-format="mm-dd-yyyy">
                                <input className="form-control form-control-sm" type="text" readOnly />
                                <span className="input-group-addon"><i className="fa fa-calendar-alt"></i></span>
                            </div>
                        </div>
                        <div className="form-group col-lg-4 col-md-6">
                            <label htmlFor="EmpReportingTo">Misc</label>
                            <input type="text" className="form-control form-control-sm" id="EmpReportingTo" placeholder="Reporting To" />
                        </div>
                        <div className="form-group col-lg-4 col-md-6">
                            <label htmlFor="EmpJoiningDate">Department</label>
                            <input type="text" className="form-control form-control-sm" id="EmpJoiningDate" placeholder="Joining date" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-lg-4 col-md-6">
                            <label htmlFor="EmpEmailID">Email Id</label>
                            <input type="text" className="form-control form-control-sm" id="EmpEmailID" placeholder="Email Id" />
                        </div>
                        <div className="form-group col-lg-4 col-md-6">
                            <label htmlFor="EmpPhone">Phone</label>
                            <input type="number" className="form-control form-control-sm" id="EmpPhone" placeholder="Phone" />
                        </div>
                        <div className="form-group col-lg-4 col-md-6">
                            <label htmlFor="EmpGender">Gender</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gridRadios" id="male" value="male" />
                                <label className="form-check-label mr-4" htmlFor="male">Male</label>

                                <input className="form-check-input" type="radio" name="gridRadios" id="female" value="female" />
                                <label className="form-check-label" htmlFor="female">Female</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-lg-4 col-md-6">
                            <button className="btn btn-sm btn-success" onClick={this.onCamerBegin} >Start Camera</button>
                            <video autoPlay id="videoCaptureComponent"></video>
                            <canvas id="canvasComponent" width="640" height="480"></canvas>

                            <button className="btn btn-sm btn-success" onClick={this.takeSnap}  >Capture Pic</button>
                        </div>
                    </div>
                    <div className="formfooter">
                        <button type="submit" className="btn btn-sm btn-success" onClick={this.onSubmitHandler} >Save</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default CreateUserComponent;
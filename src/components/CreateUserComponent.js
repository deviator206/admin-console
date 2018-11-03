import React, { Component } from 'react';
import AppService from '../service/AppService';

class CreateUserComponent extends Component {

    constructor(props, context) {
        super(props);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onCamerBegin = this.onCamerBegin.bind(this);
        this.takeSnap = this.takeSnap.bind(this);
        this.onEmployeeCreationSuccessHandler = this.onEmployeeCreationSuccessHandler.bind(this);
        this.mediaVideStream = null;

    }
    takeSnap() {
        const canvas = document.getElementById('canvasComponent');
        const context = canvas.getContext('2d');
        const videoEle = document.getElementById('videoCaptureComponent');
        context.drawImage(videoEle, 0, 0, 640, 480);
        videoEle.pause();
    }

    onEmployeeCreationSuccessHandler(resp) {
        this.props.onEmployeeCreationSuccess(resp);
    }

    onSubmitHandler() {
        const canvas = document.getElementById('canvasComponent');
        const context = canvas.getContext('2d');
        const dataUrl = canvas.toDataURL();
        let genderSelected = "";
        if (document.getElementById("female").checked) {
            genderSelected = "female";
        } else  if (document.getElementById("male").checked) {
            genderSelected = "male";
        } else {
            alert(" GENDER SELECTION MISSED ")
        }
        const propsToBeSent = {
            "name": document.getElementById("EmpName").value,
            "gender": genderSelected,
            "imgBase64": dataUrl,
            "dob": document.getElementById("EmpDOB").value,
            "phone": document.getElementById("EmpPhone").value, 
            "email": document.getElementById("EmpEmailID").value,
            "empid": 6,
            "department": document.getElementById("EmpJoiningDepartment").value,
            "misc":document.getElementById("EmpReportingTo").value,
            "picurl": null,
            "picname": null,
            "pictemplate": null
        }

        AppService.postCreateUser(propsToBeSent, this.onEmployeeCreationSuccessHandler)
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
                       

                    </div>
                    <div className="form-row">
                        <div className="form-group col-lg-4 col-md-6">
                            <label htmlFor="EmpDOB">DOB</label>
                            <input className="form-control form-control-sm" id="EmpDOB" type="text"  />
                            
                        </div>
                        <div className="form-group col-lg-4 col-md-6">
                            <label htmlFor="EmpReportingTo">Misc</label>
                            <input type="text" className="form-control form-control-sm" id="EmpReportingTo" placeholder="Reporting To" />
                        </div>
                        <div className="form-group col-lg-4 col-md-6">
                            <label htmlFor="EmpJoiningDepartment">Department</label>
                            <input type="text" className="form-control form-control-sm" id="EmpJoiningDepartment" placeholder="Joining Department" />
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
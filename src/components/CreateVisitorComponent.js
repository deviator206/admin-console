import React, { Component } from 'react';
import AppService from '../service/AppService';

class CreateVisitorComponent extends Component {

    constructor(props, context) {
        super(props);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onCamerBegin = this.onCamerBegin.bind(this);
        this.takeSnap = this.takeSnap.bind(this);
        this.onEmployeeCreationSuccessHandler = this.onEmployeeCreationSuccessHandler.bind(this);
        this.getInfoMessage = this.getInfoMessage.bind(this);
        this.getErrorMessage = this.getErrorMessage.bind(this);
        this.resetInputFields = this.resetInputFields.bind(this);
        this.removeCameraAccess = this.removeCameraAccess.bind(this);
        this.updateStateWithCameraAccess = this.updateStateWithCameraAccess.bind(this);
        this.updateStateWithoutCameraAccess = this.updateStateWithoutCameraAccess.bind(this);
        this.webCamDOMElement = this.webCamDOMElement.bind(this);
        this.encodeImageFileAsURL = this.encodeImageFileAsURL.bind(this);
        this.fileExplorerDOMElement = this.fileExplorerDOMElement.bind(this);
        this.mediaVideStream = null;
        window.imgBase64Local = "";
    }

    fileExplorerDOMElement() {
        if (this.state && this.state.camPresent) {
            return (

                <div className="form-group col-lg-4 col-md-6">
                    <input type="file"  accept="image/*" onChange= {(event) => {this.encodeImageFileAsURL(event.currentTarget)}} />
                </div>
            );
        }
        return null;
    }

    webCamDOMElement() {
        if (this.state && this.state.camPresent) {
            return (

                <div className="form-group col-lg-4 col-md-6">
                    <button className="btn btn-sm btn-success" onClick={this.onCamerBegin} >Start Camera</button>
                    <button className="btn btn-sm btn-success" onClick={this.takeSnap}  >Capture Pic</button>
                    <video autoPlay id="videoCaptureComponent" width="140" height="180"></video>
                    <canvas id="canvasComponent" width="140" height="180"></canvas>
                </div>
            );
        }
        return null;
    }
    takeSnap() {
        this.setState({
            imgCapturedMethod: 'SNAP_CLICKED'
        });
        const canvas = document.getElementById('canvasComponent');
        const context = canvas.getContext('2d');
        const videoEle = document.getElementById('videoCaptureComponent');
        context.drawImage(videoEle, 0, 0,canvas.width, canvas.height);
        videoEle.pause();
    }

    updateStateWithCameraAccess() {
        this.setState({
            showErrorMessage: false,
            exactErrorMsg: '',
            showInfoMessage: false,
            camPresent: true
        });
    }

    updateStateWithoutCameraAccess() {
        this.setState({
            showErrorMessage: false,
            exactErrorMsg: '',
            showInfoMessage: false,
            camPresent: false
        });
    }

    encodeImageFileAsURL(element) {
        const file = element.files[0];
        const reader = new FileReader();
        this.setState({
            imgCapturedMethod: 'SNAP_UPLOADED'
        });
        reader.onloadend = function () {
            window.imgBase64Local = reader.result;
            
            
        }
        reader.readAsDataURL(file);
    }

    componentDidMount() {
        window.imgBase64Local = "";
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            this.updateStateWithCameraAccess();
        } else {
            this.updateStateWithoutCameraAccess();
        }
    }

    onEmployeeCreationSuccessHandler(resp) {
        const {onCreationComplete, notification_details} = this.props;
        this.resetInputFields();
        this.setState({
            showInfoMessage: true
        });
        if (notification_details && onCreationComplete) {
            onCreationComplete(notification_details);
        } 
        
        

        
    }


    getInfoMessage() {
        if (this.state && this.state.showInfoMessage) {
            return (
                <div className="noDataContent alert alert-info">
                    Employee Created Successfully

                </div>
            );
        }
        return null;
    }


    getErrorMessage() {
        if (this.state && this.state.showErrorMessage) {
            return (
                <div className="noDataContent alert alert-info">
                    please fill the manadatory params

                </div>
            );
        }
        return null;
    }


    getErrorMessage() {
        if (this.state && this.state.showErrorMessage) {
            return (
                <div>
                    please fill the manadatory params

                </div>
            );
        }
        return null;
    }

    resetInputFields() {
        document.getElementById("EmpName").value = "";
        document.getElementById("EmpPhone").value = "";
        document.getElementById("EmpEmailID").value = "";
        document.getElementById("whomToMeet").value = "";
        document.getElementById("visitorPurpose").value = "";
        document.getElementById("identificationDoc").value = "";
        const videoEle = document.getElementById('videoCaptureComponent');
        const canvas = document.getElementById('canvasComponent');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        videoEle.src ="";
        this.setState({
            imgCapturedMethod: 'NONE'
        });
    }
    componentWillMount() {
        this.setState({
            imgCapturedMethod: 'NONE'
        });
    }
    componentWillUnmount() {
        window.imgBase64Local = "";
        this.removeCameraAccess();
        this.setState({
            imgCapturedMethod: 'NONE'
        });
    }

    removeCameraAccess() {
        if (window && window.currentStream && window.currentStream.getVideoTracks() && window.currentStream.getVideoTracks().length > 0) {
            window.currentStream.getVideoTracks()[0].stop()
        }
    }

    onSubmitHandler() {
        let validInfo = "";
        if (document.getElementById("EmpPhone").value !== ""){
            validInfo = document.getElementById("EmpPhone").value;
        } else if(document.getElementById("EmpEmailID").value !== ""){
            validInfo = document.getElementById("EmpEmailID").value;
        }

        const {imgCapturedMethod} = this.state;

        if (validInfo !== "" && imgCapturedMethod !== "NONE") {
            this.setState({
                showErrorMessage: false
            });

            this.removeCameraAccess();
            let dataUrl = "";
            if (this.state && this.state.camPresent) {
                const canvas = document.getElementById('canvasComponent');
                const context = canvas.getContext('2d');
                dataUrl = canvas.toDataURL();
            } else {
                dataUrl = window.imgBase64Local;
            }
            let genderSelected = "";
            if (document.getElementById("female").checked) {
                genderSelected = "female";
            } else if (document.getElementById("male").checked) {
                genderSelected = "male";
            }
            const propsToBeSent = {
                "name": document.getElementById("EmpName").value,
                "gender": genderSelected,
                "imgBase64": dataUrl,
                "phone": document.getElementById("EmpPhone").value,
                "email": document.getElementById("EmpEmailID").value,
                "whomToMeet": document.getElementById("whomToMeet").value,
                "purpose": document.getElementById("visitorPurpose").value,
                "document":document.getElementById("identificationDoc").value,
                "picurl": null,
                "picname": null,
                "pictemplate": null
            }
            AppService.postCreateVisitor(propsToBeSent, this.onEmployeeCreationSuccessHandler)

        } else {
            this.setState({
                showErrorMessage: true
            });
        }

    }

    onCamerBegin() {
        const video = document.getElementById('videoCaptureComponent');
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Not adding `{ audio: true }` since we only want video now
            navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
                window.currentStream = stream;
                video.src = window.URL.createObjectURL(stream);
                video.play();
            });
        }
    }

    render() {

        return (
            <div>
                <span className="pageHeaderTxt">Add Visitor details</span>
                <div>
                    {this.getErrorMessage()}
                </div>
                <div>
                    {this.getInfoMessage()}
                </div>
                <div className="templateForm">
                    <div className="form-row">

                        <div className="form-group col-lg-4 col-md-6">
                            <label htmlFor="EmpName">Name</label>
                            <input type="text" className="form-control form-control-sm" id="EmpName" placeholder="Name" />
                        </div>


                    </div>
                    <div className="form-row">
                        <div className="form-group col-lg-4 col-md-6">
                            <label htmlFor="visitorPurpose">Purpose</label>
                            <input type="text" className="form-control form-control-sm" id="visitorPurpose" placeholder="state purpose " />
                        </div>
                        <div className="form-group col-lg-4 col-md-6">
                            <label htmlFor="whomToMeet">Whom to Meet</label>
                            <input type="text" className="form-control form-control-sm" id="whomToMeet" placeholder="state the focal" />
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
                        
                    </div>
                    <div className="form-row">
                    <div className="form-group col-lg-4 col-md-6">
                            <label htmlFor="identificationDoc">Identification Docs</label>
                            <input type="text" className="form-control form-control-sm" id="identificationDoc" placeholder="Driving License.." />
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
                        {this.webCamDOMElement()}
                        {this.fileExplorerDOMElement()}
                        
                    </div>
                    <div className="formfooter">
                        <button type="submit" className="btn btn-sm btn-success" onClick={this.onSubmitHandler} >Save</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default CreateVisitorComponent;
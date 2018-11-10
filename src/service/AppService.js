import axios from 'axios';
import empList from './mocks/empList';
import empCreation from './mocks/empCreation';
import attendanceList from './mocks/attendanceList';
import attendanceListSingle from './mocks/attendanceListSingle';
import loginResponse from './mocks/loginResponse';
import visitorCreated from './mocks/createVisitor';
import visitorList from './mocks/visitorList';

class AppService {
	static SERVER_HOST = 'https://reqres.in/api/';//192.168.0.9
	static USE_MOCK = true;

	static failureHandler(error) {
		console.log(error);
	}

	static getServerURL() {
		return AppService.SERVER_HOST;
	}

	static invokeLogin(data, successHandler, failureHandler = this.failureHandler) {
		if(this.USE_MOCK) {
			successHandler(loginResponse);
		} else {
			axios.post(AppService.getServerURL() + 'login/', data)
			.then(function (response) {
				successHandler(response.data);
			})
			.catch(function (error) {
				failureHandler(error);
			});
		}
		
	}

	static getAttendanceForRange(data, successHandler, failureHandler = this.failureHandler) {
		if(this.USE_MOCK) {
			successHandler(attendanceList);
		} else {
			axios.get(AppService.getServerURL() + 'attendance/fromto?from='+data.startDate+'&to='+data.endDate)
			.then(function (response) {
				successHandler(response.data);
			})
			.catch(function (error) {
				failureHandler(error);
			});
		}
	}

	static getAttendanceForSpecificDate(data, successHandler, failureHandler = this.failureHandler) {
		if(this.USE_MOCK) {
			successHandler(attendanceList);
		} else {
			axios.get(AppService.getServerURL() + 'attendance/fordate/'+data.specificDate)
			.then(function (response) {
				successHandler(response.data);
			})
			.catch(function (error) {
				failureHandler(error);
			});
		}
	}

	static getAttendanceForMonth(data, successHandler, failureHandler = this.failureHandler) {
		if(this.USE_MOCK) {
			successHandler(attendanceList);
		}
		else {
			axios.get(AppService.getServerURL() + 'attendance/formonth/'+data.month)
			.then(function (response) {
				successHandler(response.data);
			})
			.catch(function (error) {
				failureHandler(error);
			});
		}
		
	}



	static getAttendanceForRangeForSinglePerson(data, successHandler, failureHandler = this.failureHandler) {
		if(this.USE_MOCK) {
			successHandler(attendanceListSingle);
		} else {
			axios.get(AppService.getServerURL() + 'attendance/'+data.searchText+'/fromto?from='+data.startDate+'&to='+data.endDate)
			.then(function (response) {
				successHandler(response.data);
			})
			.catch(function (error) {
				failureHandler(error);
			});
		}
	}

	static getAttendanceForSpecificDateForSinglePerson(data, successHandler, failureHandler = this.failureHandler) {
		if(this.USE_MOCK) {
			successHandler(attendanceListSingle);
		} else {
			axios.get(AppService.getServerURL() + 'attendance/'+data.searchText+'/fordate/'+data.specificDate)
			.then(function (response) {
				successHandler(response.data);
			})
			.catch(function (error) {
				failureHandler(error);
			});
		}
	}

	static getAttendanceForMonthForSinglePerson(data, successHandler, failureHandler = this.failureHandler) {
		if(this.USE_MOCK) {
			successHandler(attendanceListSingle);
		}
		else {
			axios.get(AppService.getServerURL() + 'attendance/'+data.searchText+'/formonth/'+data.month)
			.then(function (response) {
				successHandler(response.data);
			})
			.catch(function (error) {
				failureHandler(error);
			});
		}
		
	}

	static postCreateUser(data, successHandler, failureHandler = this.failureHandler) {
		if(this.USE_MOCK) {
			successHandler(empCreation);
		}
		 else {
			axios.post(AppService.getServerURL() + 'user', data)
			.then(function (response) {
				successHandler(response.data);
			})
			.catch(function (error) {
				failureHandler(error);
			});
		 }

	}


	static postCreateVisitor(data, successHandler, failureHandler = this.failureHandler) {
		if(this.USE_MOCK) {
			successHandler(visitorCreated);
		}
		 else {
			axios.post(AppService.getServerURL() + 'user', data)
			.then(function (response) {
				successHandler(response.data);
			})
			.catch(function (error) {
				failureHandler(error);
			});
		 }

	}


	static getEmployeesById(data, successHandler, failureHandler = this.failureHandler) {
		if(this.USE_MOCK) {
			successHandler(empList);
		} else {
			axios.get(AppService.getServerURL() + 'user/id/'+data.searchText)
			.then(function (response) {
				successHandler(response.data);
			})
			.catch(function (error) {
				failureHandler(error);
			});
		}
	}
	static getEmployeesByName(data, successHandler, failureHandler = this.failureHandler) {
		if(this.USE_MOCK) {
			successHandler(empList);
		} else {
			axios.get(AppService.getServerURL() + 'user/name/'+data.searchText)
			.then(function (response) {
				successHandler(response.data);
			})
			.catch(function (error) {
				failureHandler(error);
			});
		}
		
	}

	

	static getVisitorForRange(data, successHandler, failureHandler = this.failureHandler) {
		if(this.USE_MOCK) {
			successHandler(visitorList);
		} else {
			axios.get(AppService.getServerURL() + 'visitor/fromto?from='+data.startDate+'&to='+data.endDate)
			.then(function (response) {
				successHandler(response.data);
			})
			.catch(function (error) {
				failureHandler(error);
			});
		}
	}

	static getVisitorForSpecificDate(data, successHandler, failureHandler = this.failureHandler) {
		if(this.USE_MOCK) {
			successHandler(visitorList);
		} else {
			axios.get(AppService.getServerURL() + 'visitor/fordate/'+data.specificDate)
			.then(function (response) {
				successHandler(response.data);
			})
			.catch(function (error) {
				failureHandler(error);
			});
		}
	}

	static getVisitorForMonth(data, successHandler, failureHandler = this.failureHandler) {
		if(this.USE_MOCK) {
			successHandler(visitorList);
		}
		else {
			axios.get(AppService.getServerURL() + 'visitor/formonth/'+data.month)
			.then(function (response) {
				successHandler(response.data);
			})
			.catch(function (error) {
				failureHandler(error);
			});
		}
		
	}

	

};
export default AppService;


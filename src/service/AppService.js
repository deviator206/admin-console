import axios from 'axios';
import empList from './mocks/empList';
import empCreation from './mocks/empCreation';
import attendanceList from './mocks/attendanceList';
import loginResponse from './mocks/loginResponse';

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


	static getAttendanceForMonth(data, successHandler, failureHandler = this.failureHandler) {
		if(this.USE_MOCK) {
			successHandler(attendanceList);
		}
		else {
			axios.get(AppService.getServerURL() + 'attendance/formonth/', { params: data })
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

	

};
export default AppService;


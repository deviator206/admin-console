import axios from 'axios';
import empList from './mocks/empList';

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
		axios.post(AppService.getServerURL() + 'login/', data)
			.then(function (response) {
				successHandler(response.data);
				 /*
				 successHandler({
					"id": 3,
					"username": "admin",
					"password": "admin123",
					"role": "ADMIN"
				});
				*/

			})
			.catch(function (error) {
				failureHandler(error);
			});
	}


	static getAttendanceForMonth(data, successHandler, failureHandler = this.failureHandler) {
		axios.get(AppService.getServerURL() + 'attendance/formonth/', { params: data })
			.then(function (response) {
				// successHandler(response.data);
				successHandler([
					{
						"in_time": "2018-10-05T17:32:13.000+0000",
						"out_time": "2018-10-05T18:00:31.000+0000",
						"user_name": "anonymous01.png"
					},
					{
						"in_time": "2018-10-05T17:32:13.000+0000",
						"out_time": "2018-10-05T18:00:31.000+0000",
						"user_name": "anonymous02.png"
					}
				]);
			})
			.catch(function (error) {
				failureHandler(error);
			});
	}


	static postCreateUser(data, successHandler, failureHandler = this.failureHandler) {
		axios.post(AppService.getServerURL() + 'user', data)
			.then(function (response) {
				// successHandler(response.data);
				successHandler({
					"id": 0,
					"name": "xyz abc",
					"gender": "male",
					"dob": "2000-01-31T00:00:00.000+0000",
					"phone": "1234567890",
					"email": "abc@abc.com",
					"empid": 0,
					"department": "HR",
					"misc": "KKKKKKKKKK",
					"picurl": "D:\\neuroImgDB\\xyz_abc.png",
					"picname": "xyz_abc.png",
					"pictemplate": "iVBORw0KGgoAAAANSUh…...."
				});
			})
			.catch(function (error) {
				failureHandler(error);
			});
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


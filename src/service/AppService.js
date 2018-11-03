import axios from 'axios';

class AppService {
    static SERVER_HOST = 'https://reqres.in/api/';

    static failureHandler (error) {
        console.log(error);
    }

    static getServerURL() {
      return AppService.SERVER_HOST; 
    }

    static invokeLogin(data, successHandler, failureHandler =this.failureHandler) {
        axios.post( AppService.getServerURL()+'users/', data)
          .then(function (response) {
            // successHandler(response.data);
            successHandler({
              "id": 3,
                  "username": "admin",
                    "password": "admin123",
                  "role": "ADMIN"
          		});

          })
          .catch(function (error) {
            failureHandler(error);
          });
    }


    static getAttendanceForMonth(data, successHandler, failureHandler =this.failureHandler) {
      axios.get( AppService.getServerURL()+'attendance/formonth/', {params:data})
        .then(function (response) {
          // successHandler(response.data);
          successHandler([
            {"in_time":"2018-10-05T17:32:13.000+0000",
            "out_time":"2018-10-05T18:00:31.000+0000",
            "user_name":"anonymous01.png"
            },
            {"in_time":"2018-10-05T17:32:13.000+0000",
            "out_time":"2018-10-05T18:00:31.000+0000",
            "user_name":"anonymous02.png"
            }
          ]);
        })
        .catch(function (error) {
          failureHandler(error);
        });
	}
	

	static postCreateUser(data, successHandler, failureHandler =this.failureHandler) {
    axios.post( AppService.getServerURL()+'user/users', data)
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

  static getAllUsers(data, successHandler, failureHandler =this.failureHandler) {
		axios.get(  AppService.getServerURL()+'user/users', {params:data})
      .then(function (response) {
        // successHandler(response.data);
        successHandler([
					{"id":1,
					"name":"sri ijk",
					"gender":"Female",
					"dob":"2018-09-10T22:31:27.000+0000",
					"phone":"9812654378",
					"email":"sri@gmail.com",
					"empid":2,
					"department":"Software Developer",
					"misc":"BBBBBBB",
					"picurl":"D:\\neuroImgDB\\subject004.png",
					"picname":"subject004.png",
					"pictemplate":"iVBORw0KGgoAA..."},
					{"id":3,
					"name":"Rucha",
					"gender":"Female",
					"dob":"2018-09-10T22:34:38.000+0000",
					"phone":"9812654738",
					"email":"rucha@gmail.com",
					"empid":1,
					"department":"Marketing",
					"misc":"CCCCCCCC",
					"picurl":"D:\\neuroImgDB\\subject002.png",
					"picname":"subject002.png",
					"pictemplate":"iVBORw0KGgoAA..."},
					{"id":4,
					"name":"Trupti ",
					"gender":"Female",
					"dob":"2018-09-10T22:36:15.000+0000",
					"phone":"9814562783",
					"email":"trupti@gmail.com",
					"empid":3,
					"department":"Software Engg",
					"misc":"AAAAA",
					"picurl":"D:\\neuroImgDB\\subject005.jpg",
					"picname":"subject005.png",
					"pictemplate":"/9j/4AA..."},
					{"id":5,
					"name":"san Ba",
					"gender":"Male",
					"dob":"1983-09-22T18:30:00.000+0000",
					"phone":"9815554378",
					"email":"san@gmail.com",
					"empid":4,
					"department":"Software Developer",
					"misc":"ZZZZZ",
					"picurl":"D:\\neuroImgDB\\san_Ba.png",
					"picname":"san_Ba.png",
					"pictemplate":"iVBORw0KGgoAA..."},
					{"id":6,
					"name":"Trupti Xyz",
					"gender":"Female",
					"dob":"1982-09-22T18:30:00.000+0000",
					"phone":"9813354378",
					"email":"trupti_abc@gmail.com",
					"empid":5,
					"department":"Software Developer",
					"misc":"YYYYYY",
					"picurl":"D:\\neuroImgDB\\trupti_abc.png",
					"picname":"trupti_abc.png",
					"pictemplate":"iVBORw0KGgoAA..."},
					{"id":10,
					"name":"xyz abc",
					"gender":"male",
					"dob":"2000-01-31T00:00:00.000+0000",
					"phone":"1234567890",
					"email":"abc@abc.com",
					"empid":0,
					"department":"HR",
					"misc":"KKKKKKKKKK",
					"picurl":"D:\\neuroImgDB\\xyz_abc.png",
					"picname":"xyz_abc.png",
					"pictemplate":"iVBORw0KGgoAA..."}
					]);
      })
      .catch(function (error) {
        failureHandler(error);
      });
  }


};
export default AppService;


import axios from 'axios'
class AppService {


    static failureHandler (error) {
        console.log(error);
    }

    static invokeLogin(data, successHandler, failureHandler =this.failureHandler) {
        axios.post('https://reqres.in/api/users', data)
          .then(function (response) {
            successHandler(response.data);
          })
          .catch(function (error) {
            failureHandler(error);
          });
    }
};
export default AppService;


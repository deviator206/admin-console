LOGINDETAILS (for login)
a. Post Rest Service - For CREATING/ADDING LOGINDETAILS DATA
		URL => http://localhost:8080/login
		REQUEST BODY => {
						  	"username" : "admin", 
							"password" : "admin123",
							"role": "ADMIN"
						}
                        how about removing ROLE 
		OUTPUT => {
		    "id": 3,
		 		   "username": "admin",
		   		   "password": "admin123",
		  		  "role": "ADMIN"
		}

# RESTful API Node.js with MongoDB on AWS
### Deployed AWS using Express and Mongoose 

This repository delivers RESTFul API to make only 'POST' operations with certain filters by payload then to get data above MongoDB.

The project directory structuring:
* 'config' folder includes DB configration.
* 'server/routes' handles that routing operation from the client side. 
* 'server/routes/validation' handles validations in request payload.
* 'server/models' folder consist of DB Schema and Model.
* 'server/controllers' folder includes validated data and has functions to get data from DB.

## Installation and running

To test on localhost:
1. Clone this repository
2. `cd` into the cloned copy and run `npm install`
3. Run `node index.js`
4. Try it in a browser or a console doing a `POST` to `http://localhost:3000/records`

To test on AWS:

1. There is not any installation step to use this RestAPI.
2. Try it in a browser doing a `POST` to `http://ec2-52-15-242-69.us-east-2.compute.amazonaws.com:3000/records`

## Tests
Request Sample:

    {
    	"startDate" : "2016-09-27",
    	"endDate"	: "2016-09-27",
    	"minCount"	: 2500,
    	"maxCount"	: 2700
    }

Successful Response Sample:

    {
		"code": 0,
	    "msg": "Success",
	    "records": [
	        {
	            "key": "W3u5j2HQr8tfotrG",
	            "createdAt": "2016-09-27T09:27:20.334Z",
	            "totalCount": 2700
	        },
	        {
	            "key": "GS30ImvR0trSa37I",
	            "createdAt": "2016-09-27T10:03:01.490Z",
	            "totalCount": 2600
	        },
	        {
	            "key": "LM0kXiGnHF2yKSV7",
	            "createdAt": "2016-09-27T16:56:29.324Z",
	            "totalCount": 2600
	        }
		]
	}

## 
Another Request Sample: 

    {
		"startDate" : "2016-09-27",
		"endDate"	: "2016-09-27",
		"minCount"	: 3000,
		"maxCount"	: 2700
	}

Unsuccessful Response Sample:

    {
	    "code": 1,
	    "msg": "Error",
	    "errors": [
	        {
	            "field": [
	                "maxCount"
	            ],
	            "location": "body",
	            "messages": [
	                "\"maxCount\" must be larger than or equal to 3000"
	            ],
	            "types": [
	                "number.min"
	            ]
	        }
	    ]
    }

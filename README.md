# node-api-demo

### Prerequisites

* [Node v10.15.2 and npm](https://nodejs.org/en/download/)
* [MySQL Community Server 8.0.15](https://dev.mysql.com/downloads/mysql/)


### Installing

Clone the project from git.

```
git clone https://github.com/Jmyn/nodejs-demo-api.git
```

Install dependencies. 
In the directory \nodejs-demo-api\node-api-demo where package.json is located
```
npm install
```

* Run the init.sql script in \nodejs-demo-api\sql to init the required tables
* Change db credentials DB_USER and DB_PASS in .env in \nodejs-demo-api\node-api-demo
* Start the server
```
npm start
```

(Optional)Import the postman collection demo_api.postman_collection in \nodejs-demo-api and run to see some sample results

## Running the tests

```
npm test
```

## Notes

Additional convenience endpoints:

### Add student
* Endpoint: `POST /student`
* Headers: `Content-Type: application/json`
* Success response status: HTTP 204
* Request body example:
```
{
	"email":"commonstudent1@gmail.com"
}
```
### Delete student
* Endpoint: `DELETE /student/:email`
* Success response status: HTTP 204

### Add teacher
* Endpoint: `POST /teacher`
* Headers: `Content-Type: application/json`
* Success response status: HTTP 204
* Request body example:
```
{
	"email":"teacher@gmail.com"
}
```

### Delete teacher
* Endpoint: `DELETE /teacher/:email`
* Success response status: HTTP 204





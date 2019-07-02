![CF](../assets/iconmonstr-handshake-8-240.png) Back End JobberWocky - a Job Search App
==============================================

### JobberWocky
![Build Status](https://travis-ci.com/erikmjohnson/back_end_getTheJob.svg?branch=development)

### Author: Anthony, Erik, Lorin, Sarkis, and Xochil

### Links and Resources
* [repo](https://github.com/techhired/back_end_getTheJob)
* [travis](https://travis-ci.com/erikmjohnson/back_end_getTheJob)
* [Heroku](https://get-the-job-backend.herokuapp.com/)

___
## Web Application
This application allows users to sign-up and sign-in and search for jobs based on the programming language and area they want to work in.

## Languages and Tools

### languages
* Javascript

### tools
* node.js
* bcrypt
* cors
* debug
* dotenv
* eslint-plugin-jest
* express
* jest
* jsonwebtoken
* mongodb-memory-server
* mongoose
* mongoose-schema-jsonschema
* morgan
* nodemon
* require-directory
* superagent
* supertest
___

## Getting Started

Clone this repository to your local machine.
```
$ git clone https://github.com/YourProject
```
Once downloaded, you can either use the dotnet CLI utilities or Visual Studio 2017 (or greater) to build the web application.
```
cd YourRepo/YourProject
`npm i`
```
Starting Web App
```
cd YourRepo/YourProject
npm run start
* Separate terminal tab
npm run dbOn
```
___
## Usage Notes and Examples
* As a user, from my computer, I can access my profile and search for job from one centralized place.
* As a user, I can login to my profile and see all jobs I have saved in the past.
* As a user, I can remove jobs that I am no longer interested in.
* As a user, I can add notes about the specific job the note is attached to.
* As a user, I can update notes about the specific job the note is attached to.
* As a user, I can delete notes about the specific job the note is attached to.
* As a developer, I can test to see if I login successfully so that I can test if my hashing and authorization is running correctly.
* As a developer, I can hash the user’s data so that they are protected from malicious software.
* As a developer, I can have modular functions so that my code is not repetitive and is clean when it comes to being read by another developer.
* As a developer, I can log errors so that I know of any potential bugs or edge cases.
___
### Exported Values and Methods
* PORT=`3000`
* MONGODB_URI=`mongodb://localhost/testdb`
* SECRET= `<Choose your own secret>`
___
### Modules

#### `jobrouter.js`
* `/save` -> saves the job to the user's profile for later checking
* `/retrieve` -> finds all saved jobs to the user's profile for the front-end

#### `middleware.js`
* `_authBasic` -> deconstructing buffer and passing it to `_authentication`
* `_authentication` -> checks if user exist
* `_authError` -> outputs an error if an invalid username or password is given.

#### `noterouter.js`
* `/save` -> saves the note to the job for later reference

#### `router.js`
* `/` -> the landing route for our web page
* `/signup` -> Make a new profile
* `/signin` -> Sign in to profile

#### `404.js`
* This sends out a 404 error to our server.

#### `error.js`
* This sends out a 500 server error to our server.

#### `jobSchema.js`
* `jobSchema` -> Creates 'savedJob' as a new mongo schema, and defines types for jobTitle, location, summary, date and url.

#### `noteSchema.js`
* `noteSchema` -> Creates 'savedNotes' as a new mongo schema, and defines types for noteTitle, summary, and date.

#### `user-model.js`
* `userSchema` -> Creates 'user' as a new mongo schema, and defines types for username and password.
* `.pre` -> Hashes given password.
* `.authenticateBasic` -> Runs authenticateBasic based on compares username with what's in Schema.
* `.comparePassword` -> compares the saved password with given password

#### `app.js`
* `server` -> has all server paths
* `start` -> starts server

#### `index.js`
* `options` -> Defines our options for the mongoose database
* `mongoose.connect` -> Creates new connection to mongoose
* `.start` -> Requirement of PORT from .env

##### mongoDB 
* `username` -> An unique user profile name
* `password` -> A password for profile
 
##### methods
* `authenticateBasic` -> Check user exists and compares password to saved password
* `comparePassword` -> Checks password against stored password
* `generateToken` -> Creates new token

#### Tests
 To run tests, please use the `npm run test` command.

# API for verifying Email ID using OTP

Email ID verification using OTP

## Introduction
This API verifies the given email ID by authenticating it with the OTP sent to the provided email ID.

## Overview
It uses GET and POST method for the verification purpose.

## Using the API
* Install the node modules using 
```
npm install
```
* Start the MongoDB server using
```
mongod
```
* Open the Postman app and test the APIs.

Then the user can make the requests for authenticating the email ID.

[API documentation can be found here!](https://documenter.getpostman.com/view/9038300/SVtR3WgW?version=latest)

> :warning: You need to add your mailgun credentials in the api/config/mailer.js file.
> If you are on a free plan in mailgun, then you need to authenticate the user email id, before sending them email.

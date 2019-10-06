//'use strict';

const express = require('express');
const router = express.Router();
const randomstring = require('randomstring');
const mailer = require('../misc/mailer');



var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');

exports.list_email = function(req, res) {
  Task.find({active: {$eq: true}}, {email: 1, _id: 0} ,function(err, task) {
    if (err)
      res.send(err);
    //console.log(task[0].toObject());
    if(!task.length)
      {
        res.send("No emails verified");
        console.log(task);
      }
    //var user = task.toObject();
    //console.log(itemObject.title);
    else
    res.send(task[0].email + " is verified! ");
    
  });
};




exports.send_email = async function(req, res) {
  try {
     var user = new Task(req.body);
     const secretToken = randomstring.generate(6);
      //console.log('secretToken', secretToken);

      user.secretToken = secretToken;
      user.active = false;
      
      user.save(function(err, task) {
      if (err)
      res.send(err);
      });

      // Compose email
      const html = `Hi there,
      <br/>
      Thank you for registering!
      <br/><br/>
      Please verify your email by typing the following token:
      <br/>
      Token: <b>${secretToken}</b>
      <br/>
      Have a pleasant day.` 

      // Send email
      await mailer.sendEmail('admin@moodcafe.com', req.body.email, 'Please verify your email!', html);

      //console.log(user.secretToken);
      res.send('Please check your email!');
    } catch(error) {
      res.send(error);
    }
  
};


exports.check_status = function(req, res) {
  Task.find({active: {$eq: false}}, {email: 1, _id: 0} ,function(err, task) {
    if (err)
      res.send(err);
    if(!task.length)
      {
        res.send("Enter your Email first! ");
        console.log(task);
      }
      else
      res.send("OTP is sent to " + task[0].email + " Please enter it!");
  });
};


exports.otp_verify = async function(req, res) {
   
 try {
      const { secretToken } = req.body;

      // Find account with matching secret token
      console.log(secretToken);
      const user = await Task.findOne({ 'secretToken': secretToken });
      if (!user) {
        res.send("Error in verifying. Make sure entered OTP is correct.");
        return;
      }

      user.active = true;
      user.secretToken = '';
      await user.save();
      res.send("Thank you! Your email " + user.email + " is verfied");
    } catch(error) {
      res.send(error);
    }
  };




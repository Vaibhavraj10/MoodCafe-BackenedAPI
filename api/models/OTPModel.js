'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  email: {
    type: String,
    required: 'enter the email'
  },
  /*status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  },*/
  secretToken: String,
  active: Boolean

});

module.exports = mongoose.model('Tasks', TaskSchema);

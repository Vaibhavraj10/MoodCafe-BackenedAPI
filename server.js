var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/OTPModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/api'); 
//mongoose.connect('mongodb://localhost:27017/api', {useNewUrlParser: true});
mongoose.connect('mongodb://localhost/api', { useMongoClient: true })


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/OTPRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('API server started on: ' + port);
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
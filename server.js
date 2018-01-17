var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose   = require('mongoose');
var db = require('./config/db');
var async = require('async');
var fs = require("fs");
// connect to our mongoDB database
mongoose.connect(db.url);




/** Seting up server to accept cross-origin browser requests */

app.use(function(req, res, next) { //allow cross origin requests
res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
res.header("Access-Control-Allow-Credentials", true);
next();
});





var port = process.env.PORT || 8000;

// get all data/stuff of the body (POST) parameters
// parse application/json

/*app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));*/

//////////////implemented  parallelism/////////////+
//
function parallel(middlewares) {
  return function (req, res, next) {
    async.each(middlewares, function (mw, cb) {
      mw(req, res, cb);
    }, next);
  };
}

app.use(
  parallel([
    bodyParser.json({limit: '50mb'}),
    bodyParser.json({ type: 'application/vnd.api+json' }),
    bodyParser.urlencoded({ extended: true }),
    methodOverride('X-HTTP-Method-Override'),
    express.static(__dirname + '/public')
]));

require('./app/routes')(app);

app.listen(port);

console.log('Event Replaying Application is Started on ' + port);

exports = module.exports = app;

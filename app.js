const express = require('express');

const BodyParser = require('body-parser');

const app = express();
const alertsRoute =require ('./api/routes/alerts');
const notificationsRoute =require ('./api/routes/notifications');
const registrationRoute =require ('./api/routes/registration');
const reportRoute = require("./api/routes/report");
const bodyParser = require('body-parser');
const workersRoute= require('./api/routes/workers');
const reportsRoute= require('./api/routes/reports');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/alerts',alertsRoute);
app.use('/notifications',notificationsRoute);
app.use('/register',registrationRoute);
app.use('/report',reportRoute);
app.use('/workers',workersRoute);
app.use('/reports',reportsRoute);

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/api-db";

module.exports=app;
 
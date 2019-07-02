const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const fs = require('fs');
const app = express();

const appConfig = require('./config/config');
const connectDB = require('./config/dbconnection');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,'Authorization'");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  next();
});
const server = http.createServer(app);
// start listening to http server
const routesPath = './app/routes';

fs.readdirSync(routesPath).forEach(function (file) {
  if (~file.indexOf('.js')) {
    let route = require(routesPath + '/' + file);
    route.setRouter(app);
  }
});

server.listen(appConfig.port);
server.on('error', onError);
server.on('listening', onListening);

function onListening() {
  connectDB.connectDB()
    
  }

  function onError(error) {
   console.log(`Error in creating express server : ${error}`)
  }


  module.exports = app;
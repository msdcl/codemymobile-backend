let appConfig = {};

appConfig.port = 3005;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
        host    : "localhost",
        user    : "root",
        password: "Test123#",
        database: "mydb",
        port:3306
      
  }
appConfig.apiVersion = '/api/v1';


module.exports = {
    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    environment: appConfig.env,
    db :appConfig.db,
    apiVersion : appConfig.apiVersion
};
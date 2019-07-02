const mysql = require('mysql');
const appConfig = require('./config');
let db;
let connectDB = () => {
    if (!db) {
        let db = mysql.createConnection({
            host: appConfig.db.host,
            user: appConfig.db.user,
            password: appConfig.db.password,
            database: appConfig.db.database,
            port: appConfig.db.port
        });

        // db.connect(function (err) {
        //     if (err) {
        //         console.log(`DB connection failed with Error: ${err}`)
        //     } else {
        //         console.log("DB connection successful")
        //         return db;
        //     }
        // });
        return db;
    }
    return db; 
}

module.exports = {
    connectDB:connectDB
}
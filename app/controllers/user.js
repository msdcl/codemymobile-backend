const response = require('./../libs/responseLib');
let db = require('../../config/dbconnection')
db= db.connectDB();
let getAllUsers = (req,res)=>{
    let getUsers = (req, res) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM User`;
            db.query(sql, (error, results, fields) => {
              if (error) {
                reject(error.message);
              }
              resolve(results);
            });
        })
    }

    getUsers(req, res)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'All Users', 200, resolve)
             console.log(apiResponse)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}

let getAllFriends = (req,res)=>{

    let getFriendsList = (req, res) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM Friend Where userId=${req.body.userId}`;
            db.query(sql, (error, results, fields) => {
              if (error) {
                reject(error.message);
              }
              resolve(results);
            });
        })
    }

    let getFriendsDetails = (list)=>{
       
        return new Promise((resolve, reject) => {
            let friendArr = list[0].friend.split(',');
            friendArr = friendArr.join()
            let sql = `SELECT * FROM User Where userId IN (${ friendArr })`;
            db.query(sql, (error, results, fields) => {
              if (error) {
                reject(error.message);
              }
              resolve(results);
            });
        })
    }

    getFriendsList(req, res)
        .then (getFriendsDetails)
        .then((resolve) => {
            console.log(resolve)
            let apiResponse = response.generate(false, 'All friend details', 200, resolve)
           
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
}

let getFriendsOfFriends = (req,res)=>{
  let getFriendsList = (req, res) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT friend FROM Friend Where userId=${req.body.userId}`;
        db.query(sql, (error, results, fields) => {
          if (error) {
            reject(error.message);
          }
          console.log(results)
          resolve(results);
        });
    })
}

let getTheirFriends = (list)=>{
   
    return new Promise((resolve, reject) => {
        let friendArr = list[0].friend.split(',');
        friendArr = friendArr.join()
        let sql = `SELECT friend FROM Friend Where userId IN (${ friendArr })`;
        db.query(sql, (error, results, fields) => {
          if (error) {
            reject(error.message);
          }
          resolve(results);
        });
    })
}

let getTheirFriendsDetails = (list)=>{
   
  return new Promise((resolve, reject) => {
    let tempObj={};
      let friendArr = list.forEach((obj)=>{
          obj.friend.split(',').forEach((x)=>{
            tempObj[x]=true;
          })
      });
      friendArr = Object.keys(tempObj).join()
      let sql = `SELECT * FROM User Where userId IN (${ friendArr })`;
      db.query(sql, (error, results, fields) => {
        if (error) {
          reject(error.message);
        }
        resolve(results);
      });
  })
}

getFriendsList(req, res)
    .then (getTheirFriends)
    .then(getTheirFriendsDetails)
    .then((resolve) => {
        console.log(resolve)
        let apiResponse = response.generate(false, 'Friends of Friends', 200, resolve)
       
        res.send(apiResponse)
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    })
}
module.exports={
    getAllUsers:getAllUsers,
    getAllFriends:getAllFriends,
    getFriendsOfFriends:getFriendsOfFriends
}
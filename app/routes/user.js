const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/user");
const appConfig = require("./../../config/config")

module.exports.setRouter = (app) => {

    let baseUrl = appConfig.apiVersion;


    app.get(`${baseUrl}/allUsers` ,userController.getAllUsers);
   
    app.post(`${baseUrl}/allFriends`, userController.getAllFriends);
    app.post(`${baseUrl}/friendsOfFriends`, userController.getFriendsOfFriends);

}
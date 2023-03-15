const express = require("express");
const userController = require("../controllers/user.controller");

const route = express.Router();

route.get("/", userController.getAllUsers);
route.get('/transactions', userController.getTransactions);
route.patch("/transfer", userController.transfer);

module.exports = route;

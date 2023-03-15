const userService = require("../service/user.service");

const getAllUsers = async (req, res) => {
  try {
    const data = await userService.getAllUsers();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
};

const getTransactions = async (req, res) => {
  try {
    const data = await userService.getTransactions();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
};

const transfer = async (req, res) => {
  try {
    const payload = req.body;
    const data = await userService.transfer(payload);
    res.status(204).send();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  transfer,
  getTransactions
};

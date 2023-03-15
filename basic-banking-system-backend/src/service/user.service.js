const User = require("../model/user.model");
const Transactions = require("../model/transactions.model");

const getAllUsers = async () => {
  return await User.find();
};

const getTransactions = async () => {
  return await Transactions.find();
};

const transfer = async (payload) => {
  const { fromId, toId, amount } = payload;
  const user1 = await User.find({ id: fromId });
  const user2 = await User.find({ id: toId });
  const amount1 = user1[0].balance - amount;
  const amount2 = user2[0].balance + amount;
  await User.findOneAndUpdate({ id: fromId }, { balance: amount1 });
  await User.findOneAndUpdate({ id: toId }, { balance: amount2 });
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  today = dd + "/" + mm + "/" + yyyy;
  const newTransaction = {
    from: user1[0].name,
    to: user2[0].name,
    amount: amount,
    date: today,
  };
  const transactionDone = new Transactions(newTransaction);
  transactionDone.save();
  return;
};

module.exports = {
  getAllUsers,
  transfer,
  getTransactions
};

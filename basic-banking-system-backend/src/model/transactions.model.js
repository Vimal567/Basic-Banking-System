const mongoose = require("mongoose");

const transactionsSchema = mongoose.Schema({
  from: {
    type: String,
    required: true,
    trim: true,
  },
  to: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true
  },
});

const Transactions = mongoose.model("Transactions", transactionsSchema);

module.exports = Transactions;

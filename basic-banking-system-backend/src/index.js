const mongoose = require("mongoose");
const mongo_url =
  "mongodb+srv://vimal:vimal@grip-backend-node.pukqj6f.mongodb.net/?retryWrites=true&w=majority";
const PORT = 8082;
const cors = require("cors");
const routes = require("./routes/user.route");

mongoose.set("strictQuery", false);
const express = require("express");
const app = express();

mongoose.connect(mongo_url).then(() => {
  console.log("connected to mongodb");

  app.use(express.json());
  app.use(cors());
  app.options("*", cors());
  app.use(routes);

  app.listen(PORT, () => {
    console.log("connected to the port 8082");
  });
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes");

const server = express();

dotenv.config();

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASS
  }@cluster0-dyc8s.mongodb.net/omnistack?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);

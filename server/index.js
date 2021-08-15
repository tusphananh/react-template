const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv")

const connectMongo = async (req, res) => {
  try {
    console.log("Connecting to MongoDB");
    const uri = `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@tuphan.id0lo.mongodb.net/react?retryWrites=true&w=majority`;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

connectMongo()
server.listen(port, () => console.log(`Listening on port ${PORT}`));

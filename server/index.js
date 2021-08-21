const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
require('dotenv').config({path: __dirname + '/.env'})

const authRoute = require("./routes/auth");

const connectMongo = async (req, res) => {
  try {
    console.log("Connecting to MongoDB");
    const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.DATABASE_URL}?retryWrites=true&w=majority`;
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

// Start connect to Mongo
connectMongo()

// User Routes here
app.use(cors())
app.use(express.json());
app.use("/api/auth", authRoute);
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send(400);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

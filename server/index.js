require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectMongo } = require("./utils/mongo");
// const { redisSession } = require("./utils/redis");
const { mongoSession } = require("./utils/mongoSession");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const { corsConfigs } = require("./configs/cors");
const PORT = process.env.PORT || 5000;
const app = express();

app.set('trust proxy', 1)
app.use(cors(corsConfigs));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Start connect to Mongo
connectMongo();
// Start connect to Redis
// app.use(redisSession());
// Start connect to Mongo Session
app.use(mongoSession());
// User Routes here
app.use(express.json());
app.use("/api/auth", authRoute);
app.get("/", (req, res) => {
  res.send("this is api server");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

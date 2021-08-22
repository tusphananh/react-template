const mongoose = require("mongoose");
const { mongoConfigs, mongoOptions } = require("../configs/mongo");

const connectMongo = async () => {
  try {
    console.log("Connecting to MongoDB");
    const uri = mongoConfigs.uri;
    await mongoose.connect(uri, mongoOptions);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = {
  connectMongo,
};

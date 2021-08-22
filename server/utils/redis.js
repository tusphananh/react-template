const redis = require("redis");
const connectRedis = require('connect-redis');
const { redisConfigs } = require("../configs/redis");
const session = require("express-session");

const RedisStore = connectRedis(session)
const redisClient = redis.createClient({
    host: redisConfigs.host,
    port: redisConfigs.port,
});

redisClient.on("error", function (err) {
  console.log("Could not establish a connection with redis. " + err);
  process.exit(1);
});

redisClient.on("connect", function (err) {
  console.log("Connected to redis successfully");
});

const redisSession = () => {
  return session({
    store: new RedisStore({ client: redisClient }),
    secret: redisConfigs.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: true, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 60 * 10, // session max age in miliseconds
    },
  });
};


module.exports = {
  redisSession
};

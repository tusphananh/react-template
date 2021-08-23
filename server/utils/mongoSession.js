const session = require('express-session');
const MongoStore = require('connect-mongo');
const {mongoConfigs} = require('../configs/mongo');
const {redisConfigs} = require('../configs/redis');
const mongoSession = () => {
    return session({
      store: MongoStore.create({
        mongoUrl: mongoConfigs.uri, //YOUR MONGODB URL
        ttl: 14 * 24 * 60 * 60,
        autoRemove: 'native' 
    }),
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
    mongoSession
  };
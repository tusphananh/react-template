const redisConfigs = {
    host : process.env.REDIS_HOST,
    port : process.env.REDIS_PORT,
    secret: process.env.REDIS_SECRET,
}

module.exports = {redisConfigs};
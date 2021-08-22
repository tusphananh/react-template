const mongoConfigs = {
    uri : `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.DATABASE_URL}?retryWrites=true&w=majority`
}
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}
module.exports = {
    mongoConfigs,
    mongoOptions
}
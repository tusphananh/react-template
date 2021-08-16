const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new Schema({ 
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: false, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("User", userSchema);
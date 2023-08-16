import mongoose from "mongoose";

const Schema = mongoose.Schema
const collection = "users"

const userSchema = new Schema({
    first_name: {
        type: String,
        index: true
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    gender: {
        type: String
    }
})

const UserModel = mongoose.model(collection, userSchema)
export default UserModel
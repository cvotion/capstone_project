const mongoose = require("mongoose");
// Schema = mongoose.Schema
// import { ObjectId } from "mongodb";
// import UserModel from './Users';
const Schema = require('mongoose').Schema;

const FavoriteSchema = new mongoose.Schema({
   
    name: String,
    street: String,
    city: String,
    state: String,
    user_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        // required: true,
    }],

})

const FavoriteModel = mongoose.model("favorite", FavoriteSchema)

module.exports = FavoriteModel
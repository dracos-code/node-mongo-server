const express = require('express');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    imageData: String
})

const User = new mongoose.model("User", userSchema)
module.exports = User;
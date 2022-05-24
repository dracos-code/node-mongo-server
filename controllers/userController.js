const express  = require('express');
const User = require('../Models/userModel');

const login = (req,res)=>{
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}

const register = (req,res)=>{
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
}

const getUserdata = (req,res)=>{
    const id = req.body.id;
    User.findOne({_Id:id},(error,user)=>{
        if(user){
            res.send({user:user});
        }
    })
}

const updateUser = (req,res)=>{
    const id = req.body.id;

    let updatedData = {
        name : req.body.name,
        email : req.body.email,
        imageData : req.body.imageData,
    }
    
    User.findByIdAndUpdate(id,{$set:updatedData}).then(()=>{
        res.json({message:"User Updated Successfully"});
    }).catch(err=>{
        res.json({
            message:"An error occured",
        })
    })

}

module.exports = {
    login,
    register,
    getUserdata,
    updateUser
}


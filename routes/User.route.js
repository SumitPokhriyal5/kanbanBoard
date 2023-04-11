const express=require('express');
const { UserModel } = require('../models/User.model');
const jwt=require('jsonwebtoken');
require('dotenv').config()

const userRouter=express.Router();

/* SIGNUP ROUTE */
userRouter.post('/signup',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const alreadyUser=await UserModel.findOne({email});
        if(alreadyUser)return res.send({msg:"User already exist, please login"});
        else{
            bcrypt.hash(password, process.env.saltRounds, async(err, hash) =>{
                if(hash){
                    const user=new UserModel({
                        email,
                        password:hash
                    });
                    await user.save();
                    res.send({msg:"Signup Successfull"})
                }else{
                    res.send({msg:"Something went wrong",error:err})
                }
            });
        }
    }catch(err){
        res.send({msg:"Something went wrong",error:err})
    }
});


/* LOGIN ROUTE */
userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
       const user=await UserModel.findOne({email});
       bcrypt.compare(password, user.password, async(err, result)=> {
        if(result){
            const token=jwt.sign({userID:user._id},process.env.secretKey);
            res.send({msg:"Login Successful",token})
        }else{
            res.send({msg:"Invalid Credentials",error:err})
        }
    });
        
    }catch(err){
        res.send({msg:"Invalid Credentials",error:err})
    }
});

module.exports={
    userRouter
}
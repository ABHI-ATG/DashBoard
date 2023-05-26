const express=require("express");
require('../db/conn');
const user=require("../models/userSchema");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const authenticate=require('../middleware/authenicate');

const router = express.Router();

router.post('/register',async (req,res)=>{
    try{
        console.log("hello from register");
        const {name,email,phone,work,password,cpassword}=req.body;
        if(!name||!email||!phone||!work||!password||!cpassword||cpassword!=password){
            throw new Error("UserExist");
        }
        const userExist=await user.findOne({email:email})
        if(userExist){
            throw new Error("UserExist");
        }

        const data=new user({name,email,phone,work,password,cpassword});

        const userRegister= await data.save();
        if(userRegister){
            res.status(201).json({message:"user registered successfully"});
        }else{
            res.status(500).json({error:"Failed to registered"});
        }
    }catch(err){
        console.log(err);
    }
})

router.post('/login',async (req,res)=>{
    
    try{
        const {email,password}=req.body;
        if(!email||!password){
            res.status(422).json({error:"Fill all details"});
        }
        const userExist=await user.findOne({email:email});
        if(!userExist){
            res.status(422).json({error:"Wrong Crxedentials"});
        }
        
        const isMatch=await bcrypt.compare(password,userExist.password);
        if(isMatch){
            const token=await userExist.generateToken();
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
            })
            res.json({messege:"Login Successfully"});
        }else{
            res.status(422).json({error:"Wrong Credentials"});
        }

    }catch(err){
        console.log(err);
    }
});

router.get('/about',authenticate,(req,res)=>{
    return res.send(req.rootUser);
})

router.get('/logout',authenticate,(req,res)=>{
    res.clearCookie('jwtoken');
    return res.status(200).json({messege:"successfully log out"});
})

router.get('/contact',authenticate,(req,res)=>{
    return res.send(req.rootUser);
})

router.post('/contactsubmit',authenticate,async (req,res)=>{
    try{
        const {message}=req.body;
        if(!message){
            return res.json({error:"please fill the message"});
        }
        const data=await user.findOne({_id:req.userId});
        if(data){
            const userMessage=await data.addMessage(message);
            await userMessage.save();
            res.status(201).json({message:"message send"});
        }
    }catch(err){
        res.status(400).json({message:"message not send"});
        console.log(err);
    }
})



module.exports=router;
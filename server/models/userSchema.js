const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true,
            }
        }
    ],
    messeges:[
        {
            message:{
                type:String,
                required:true
            }
        }
    ]
})

userSchema.pre('save',async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
        this.cpassword=await bcrypt.hash(this.cpassword,10);
    }
    next(); 
})

userSchema.methods.generateToken=async function(){
    try{
        const token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

userSchema.methods.addMessage=async function(message){
    try{
        this.messeges=this.messeges.concat({message});
        await this.save();
        return this.message;
    }catch(err){
        console.log(err);
    }
}

const user=mongoose.model("user",userSchema);

module.exports=user;
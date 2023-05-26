const jwt=require("jsonwebtoken");
const user=require("../models/userSchema")

const authenticate=async (req,res,next)=>{
    try{
        const token=req.cookies.jwtoken;
        const verify=jwt.verify(token,process.env.SECRET_KEY);
        const rootUser=await user.findOne({_id:verify._id,"tokens.token":token})
        
        if(!rootUser){
            throw new Error("User Not Found");
        }

        req.token=token;
        req.rootUser=rootUser;
        req.userId=rootUser._id;

        return next();
    }catch(err){
        res.status(401).send("Unauthorised");
    }
}

module.exports=authenticate;
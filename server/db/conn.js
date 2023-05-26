const mongoose=require("mongoose");

const db=process.env.DATABASE;

mongoose.connect(db)
.then(()=>{
    console.log("Successfulll");
}).catch((err)=>{
    console.log(err);
});



const express = require("express");
const app=express();
const cookeParser=require("cookie-parser");
app.use(cookeParser());

const dotenv=require("dotenv");
dotenv.config({path:'./config.env'});
const port=process.env.PORT;

app.use(express.json());
const user=require("./models/userSchema")
app.use(require("./router/auth"));


app.listen(port,()=>{
    console.log("Connected");
})
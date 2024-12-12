const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRouter =require('./routes/user/userRoute')
const app = express();



app.use(bodyParser.json())
dotenv.config()

app.get('/',(req,res)=>{

})

app.listen(()=>{

})
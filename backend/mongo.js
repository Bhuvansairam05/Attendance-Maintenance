const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.mongoDB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log("Connected to MongoDb"))
.catch(err=>console.log("Error occured",err));
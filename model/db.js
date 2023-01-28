const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.localdb,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
},(err)=>{
    if(!err){
        console.log("Database Connected")
    }else{
        console.log("We got an error"+err);
    }
});
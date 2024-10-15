const mongoose=require("mongoose")



mongoose.connect("mongodb://localhost:27017/Login")
.then(()=>{
  console.log("mongodb conneted");
})
.catch(()=>{
  console.group("failed to connect");
})
const LogInSchema= new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  income:{
    type:Number,
    required:true
  },
  age:{
    type:Number,
    required:true
  },
  phonenumber:{
    type:Number,
    required:true
  },
  occupation:{
    type:String,
    required:true
  }
})

const collection=new mongoose.model("Collection1",LogInSchema)
module.exports=collection;
import mongoose from 'mongoose'
const patternSchema=new mongoose.Schema({
  name:{
    type:String
  } ,
  description:{
    type:String,
  } 
})

const Pattern=mongoose.model("Pattern",patternSchema);

export default Pattern;
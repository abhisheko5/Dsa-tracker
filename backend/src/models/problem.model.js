import mongoose from 'mongoose';

const ProblemSchema=new mongoose.Schema({
  problemNo:{
    type:Number,
    required:true,
    unique:true,
  },
  title:{
    type:String,
    required:true,
  },
  difficulty:{
    type:String,
    required:true,
  },

  topic:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Topic',
    required:true,
  },
  pattern:{
 type:mongoose.Schema.Types.ObjectId,
    ref:'Pattern'
  },
  problemStatus:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'ProblemStatus',
  },
  url:{
    type:String
  },
  platform:{
    type:String
  }

},{
  timestamps:true
});

const Problem= mongoose.model("Problem",ProblemSchema);

export default Problem;
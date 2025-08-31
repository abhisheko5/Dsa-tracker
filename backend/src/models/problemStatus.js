import User from './user.model.js'
import Problem from './problem.model.js'
import mongoose from 'mongoose';

const ProblemstatusSchema= new mongoose.Schema({
  user:{
  type:mongoose.Schema.Types.ObjectId,
    ref:'User'    
  },

  problem:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Problem',
    required:true
  },

  status:{
    type:String,
    enum:['solved','unsolved','attempted'],
    default:'unsolved'
  },
  lastAttempted:{
    type:Date,
    default:null,
  },
  attempts:{
    type:Number,
    default:0
  },

  revisionDate:{
    type:[Date],
    default:[],
  },

  intuition:{
    type:String
  }
},{
  timestamps:true
})

const ProblemStatus=mongoose.model("ProblemStatus",ProblemstatusSchema);

export default ProblemStatus;
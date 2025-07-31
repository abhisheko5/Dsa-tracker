import User from './models/user.model.js'
import Problem from './models/problem.model.js'

const patternprogressSchema=new mongoose.Schema({

  user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:User
    },
    problem:{
      type:mongoose.Schema.Types.ObjectId,
      ref:Problem
    },
    totalProblems:Number,
    solvedProblems:Number,
    precentageComplete:Number
  
  })
  
  const PatternProgress=mongoose.model("PatternProgress",patternprogressSchema)
  
  export default PatternProgress;

import User from './models/user.model.js'
import Problem from './models/problem.model.js'


const topicprogressSchema=new mongoose.model({
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

const TopicProgress=mongoose.model("TopicProgress",topicprogressSchema)

export default TopicProgress;
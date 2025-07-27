import User from './models/user.model.js'
import Problem from './models/problem.model.js'


const statusSchema= new mongoose.Schema({
  user:{
  type:mongoose.Schema.Types.ObjectId,
    ref:'User'    
  },

  problem:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Problem'
  },

  status:{
    type:String,
    default:'unsolved'
  },
  lastAttempted:{
    type:Date()
  },
  attempts:{
    type:Number,
    default:0
  },

  revisionDate:[Date()],

  intuition:{
    type:String
  }
})

const Status=mongoose.model(Status,"statusSchema");

export default Status;
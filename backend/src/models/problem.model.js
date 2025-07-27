import User from './models/user.model.js'


const ProblemSchema=new mongoose.Schema({
  problemNo:{
    type:Number
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
    ref:'Topic'
  },
  pattern:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Patterns'
  },
  ProblemStatus:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'status'
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

const Problem= mongoose.model(Problem,"ProblemSchema")

export default Problem;
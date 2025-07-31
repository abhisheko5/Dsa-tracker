import mongoose from 'mongoose'
const topicSchema =new mongoose.Schema({

  name:{
    type:String,
    required:true
  },
  description:String,

})

const Topic=mongoose.model("Topic",topicSchema);

export default Topic;
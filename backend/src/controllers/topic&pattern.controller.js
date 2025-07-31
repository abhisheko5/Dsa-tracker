import Topic from "../models/topic.model.js"
import Pattern from '../models/pattern.model.js';


const getTopicwiseproblemcount=async(req,res)=>{
  const count=problems.aggregate([
    {
      $lookup:{//to see in diff schemas
        from:"topics",
        localField:"topic",//field in current schema
        foreignField:"_id",//field in lookup schewa
        as:"topicinfo"
      }
    },
    {
      $unwind:"$topicinfo"//array ko into object
    },

    {
      $group:{//joining together
        _id:"$topicinfo.name",
        count:{$sum:1}//counting all
      }
    }
  ])

  return res
  .status(200)
  .json(
    new ApiResponse(200,count,"overall topics count")
  )

}

const getPatternwiseproblemcount
export  {getTopicwiseproblemcount};
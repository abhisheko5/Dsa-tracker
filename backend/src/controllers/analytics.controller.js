import User from "../models/user.model.js";
import Problem from "../models/problem.model.js";
import ProblemStatus from "../models/problemStatus.js";
import Topic from "../models/topic.model.js"
import Pattern from '../models/pattern.model.js';
import {ApiError} from '../utils/apiError.js';
import {ApiResponse} from "../utils/apiResponse.js"

const getoverallStats=async(req,res)=>{
  
  //const userId=req.user._id;

  const stats=await ProblemStatus.aggregate([
    { $group:{_id:"$status",count:{$sum:1}}
    }
  ]);

  const result={
    solved:0,
    attempted:0,
    unsolved:0
  };

      stats.forEach(({ _id, count }) => {
      if (result.hasOwnProperty(_id)) {
        result[_id] = count;
      }
    });

    return res
    .status(200)
    .json(
      new ApiResponse(200,result,"solved stats of problems")
    )
}

const getstatsbydifficulty=async(req,res)=>{

  const problem=await Problem.aggregate([
    {
      $group:{
        _id:"$difficulty",
        count:{$sum:1}}
    }
  ]);

  const formatted = {};
    problem.forEach(item => {
      formatted[item._id] = item.count;
    });

  return res
  .status(200)
  .json(
    new ApiResponse(200,formatted,"problems count acc to difficulty")
  )
}

const getstatsbyTopic=async(req,res)=>{
  
  const count=await Problem.aggregate([
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

  const formatted=count.map(topic=>({
    topic:topic._id,
    solved:topic.count,
  }));
  return res
  .status(200)
  .json(
    new ApiResponse(200,formatted,"overall topics count")
  )

}

export {getoverallStats,getstatsbydifficulty,getstatsbyTopic};
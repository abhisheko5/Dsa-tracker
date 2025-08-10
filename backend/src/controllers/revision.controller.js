import {ApiError} from '../utils/apiError.js';
import {ApiResponse} from "../utils/apiResponse.js"
import Problem from "../models/problem.model.js";
import ProblemStatus from "../models/problemStatus.js";



const markRevisiondone=async(req,res)=>{
  const{problemNo}=req.params;

if(!problemNo){
  throw new ApiError(400,"please provide problem number");
}

const problem =await Problem.findOne({problemNo});

if(!problem){
  throw new ApiError(404,"problem not found");
}

const problemtomark= await ProblemStatus.findOne({problem:problem._id});


  if (!problemtomark) {
    throw new ApiError(404, "Problem status not found");
  }

  if(problemtomark.status=='solved'){
  const today=new Date();
  today.setHours(0,0,0,0);

  problemtomark.revisionDate=problemtomark.revisionDate.filter(date=>{
    const d=new Date(date);
    d.setHours(0,0,0,0);
    return d.getTime()!==today.getTime();
  })

  console.log("Revision Dates:", problemtomark.revisionDate);



    await problemtomark.save();
}
else{
  throw new ApiError(400,"problem needs to be solved for revision");
}

    return res
    .status(200)
    .json(new ApiResponse(200,problemtomark,"revision for problem done successfully"))
};

const todayRevisionSchedule=async(req,res)=>{
  const now = new Date();

const startOfDayUTC = new Date(Date.UTC(
  now.getUTCFullYear(),
  now.getUTCMonth(),
  now.getUTCDate(),
  0, 0, 0, 0
));

const endOfDayUTC = new Date(Date.UTC(
  now.getUTCFullYear(),
  now.getUTCMonth(),
  now.getUTCDate(),
  23, 59, 59, 999
));

const result = await ProblemStatus.aggregate([
  {
    $match: {
      revisionDate:{ $elemMatch:{$gte:startOfDayUTC,$lte:endOfDayUTC}}
    }
  },
  {
    $lookup: {
      from: "problems",
      localField: "problem",
      foreignField: "_id",
      as: "problem"
    }
  },
  { $unwind: "$problem" },
  {
    $project: {
      _id:"$problem._id",
      title: "$problem.title",
      difficulty: "$problem.difficulty",
      Attempted:"$lastAttempted",
      status:"$status",
      url:"$problem.url"
    }
  }
]);



return res
.status(200)
.json(
  new ApiResponse(200,result,"todays revision Schedule")
)
}

const upcomingRevisionSchedule=async(req,res)=>{
  const today=new Date();
  today.setHours(0,0,0,0);

  const upcoming=await ProblemStatus.aggregate([
    {
      $match:{
        revisionDate:{ $elemMatch:{$gt:today} }
      }
    },
    {
      $project:{
        
      }
    }
  ])
}

export {markRevisiondone,todayRevisionSchedule};
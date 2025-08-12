import {ApiError} from '../utils/apiError.js';
import {ApiResponse} from "../utils/apiResponse.js"
import Problem from "../models/problem.model.js";
import ProblemStatus from "../models/problemStatus.js";


const markproblemStatus=async(req,res)=>{

  const{problemNo}=req.params;

if(!problemNo){
  throw new ApiError(400,"please provide problem number");
}

const problem =await Problem.findOne({problemNo});

if(!problem){
  throw new ApiError(404,"problem not found");
}

let problemtomark= await ProblemStatus.findOne({problem:problem._id});

if(problemtomark){

  if(['unsolved','attempted'].includes(problemtomark.status)){
  problemtomark.status='solved';
  problemtomark.lastAttempted=new Date();
  
  const today = new Date();
  const Revisions = [0, 3, 7, 14, 30];
  problemtomark.revisionDate = Revisions.map(days => {
    const date = new Date(today);
    date.setDate(date.getDate() + days);
    return date;
  });

  console.log("revision dates to save",problemtomark.revisionDate);
  await problemtomark.save();

}
}



await problemtomark.populate({
  path:'problem',
  populate:[
    {path:'topic'},
    {path:'pattern'}
  ]
});
return res
.status(200)
.json(
  new ApiResponse(200,problemtomark,"problem marked as solved")
)

}

const getproblemProgress=async(req,res)=>{
  const totalProblems=await Problem.countDocuments();

  const solvedProblems= await Problem.aggregate([
    {
      $lookup:{
        from:"problemstatuses",
        localField:"problemStatus",
        foreignField:"_id",
        as:"statusInfo"
    },
  },{$unwind:"$statusInfo"},
    {$match:
      {"statusInfo.status":"solved"}},
    {$count:"solved"}
]);

return res
.status(200)
.json(
  new ApiResponse(200,{
    totalProblems,
    solvedProblems,
    progress:`${solvedProblems}/${totalProblems}`
  },"overall problem solving progress"
  )
);
};
const getProblemstats=async(req,res)=>{
  const count=await ProblemStatus.aggregate([
    {
    $group:{
      _id:'$status',
      count:{$sum:1}
    }
  }
  ])


return res
.status(200)
.json(
  new ApiResponse(200,count,"problem count done successfyully")
)
};

const getLastSolvedProblems=async(req,res)=>{


    const solvedProblems= await ProblemStatus.find({
    status:"solved"
    }).
    sort({updatedAt:-1})
    .limit(5)
    .populate('problem');

    return res
    .status(200)
    .json(
      new ApiResponse(200,solvedProblems,"last 5 problems fetched")
    )
}

const addOneliner =async(req,res)=>{
  const{ProblemNo}=req.params;
  const{intuition}=req.body;
  if(!intuition){
    throw new ApiError(404,"no intuition lin found");
  }
  const problem=await Problem.findOne({ProblemNo})

  if(!problem){
    throw new ApiError(404,"problem not found");
  }

  const status=await ProblemStatus.findOne({problem:problem._id});

  if(status){
    status.intuition=intuition}

    await status.save();
    return res
    .status(200)
    .json(
      new ApiResponse(200,status,"one liner added successfully")
    )
}
export {markproblemStatus,getProblemstats,getproblemProgress,addOneliner,getLastSolvedProblems};

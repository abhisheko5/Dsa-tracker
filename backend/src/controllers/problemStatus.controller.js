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
  const spacedRevisions = [1, 3, 7, 14, 30];
  problemtomark.revisionDate = spacedRevisions.map(days => {
    const date = new Date(today);
    date.setDate(date.getDate() + days);
    return date;
  });
  await problemtomark.save();

}
}
else{
  problemtomark=new ProblemStatus({
    problem:problem._id,
    status:"solved",
    lastAttempted:new Date(),
    attempts:attempts+1
  });
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

const markRevisiondone=async(req,res)=>{
  
}
const getLastSolvedProblems=async(req,res)=>{
    const userId=req.user.id;

    const solvedProblems= await ProblemStatus.find({
      user:userId,
      status:"solved"
    }).
    sort({updatedAt:-1})
    .limit(10)
    .populate('problem');

    return res
    .status(200)
    .json(solvedProblems);
}
export {markproblemStatus};

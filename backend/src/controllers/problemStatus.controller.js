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

const getLastSolvedProblems = async (req, res) => {
  try {
    const solvedStatus = await ProblemStatus.find({ status: "solved" });
    const solvedIds = solvedStatus.map(s => s._id);

    const limit = req.query.limit ? parseInt(req.query.limit) : 0;

    const solvedProblems = await Problem.find({ problemStatus: { $in: solvedIds } })
      .populate("problemStatus", "status") 
      .sort({ updatedAt: -1 })
      .limit(limit)
      .select("problemNo title difficulty updatedAt");

    return res.status(200).json(
      new ApiResponse(200, solvedProblems, "Last solved problems fetched")
    );
  } catch (err) {
    return res.status(500).json(new ApiResponse(500, null, err.message));
  }
};


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

const getperdayproblemsolved = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      throw new ApiError(400, "Please provide a date");
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);


    const problems = await ProblemStatus.find({
      status: "solved",
      updatedAt: { $gte: startOfDay, $lte: endOfDay } // assuming you have a `solvedAt` field
    }).populate('problem','title')

    return res.status(200).json(
      new ApiResponse(200, problems, "Solved problems for the day")
    );
  } catch (err) {
    return res.status(500).json(new ApiResponse(500, null, err.message));
  }
};

export {markproblemStatus,getProblemstats,getproblemProgress,addOneliner,getLastSolvedProblems,getperdayproblemsolved};

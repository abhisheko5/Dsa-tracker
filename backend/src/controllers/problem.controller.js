import User from "../models/user.model.js";
import Problem from "../models/problem.model.js";
import ProblemStatus from "../models/problemStatus.js";
import Topic from "../models/topic.model.js"
import Pattern from '../models/pattern.model.js';
import {ApiError} from '../utils/apiError.js';
import {ApiResponse} from "../utils/apiResponse.js"

const addProblem=async(req,res)=>{
  console.log(req.body);

  
  const{title,
difficulty,
pattern,
topic,
problemStatus,
url,
platform,problemNo}=req.body;

if(!title || !difficulty || !topic || !problemNo){
  throw new ApiError(400,"please provided min details for problem");
}

const existingproblem= await Problem.findOne({
  $or:[
    {title :title},
    {problemNo:problemNo}]

});

if(existingproblem){
  throw new ApiError(400,"problem already exists");
}

const problemData={
title,
difficulty,
problemNo,
}

  const topicDoc=await Topic.findOne({name:topic});
  if(!topicDoc) throw new ApiError(404,`topic ${topic} not found`);
  problemData.topic=topicDoc._id;


if(pattern){
  const patternDoc=await Pattern.findOne({name:pattern});
  if(!patternDoc) throw new ApiError(404,`pattern ${pattern} not found`);
  problemData.pattern=patternDoc._id;
}

if(url) problemData.url=url;
if(platform) problemData.platform=platform;

const problem =new Problem(problemData)
await ProblemStatus.create({
  problem: problem._id,
  status: problemStatus,
  lastAttempted: null
});
await problem.save();



return res
.status(201)
.json(
  new ApiResponse(200,"new problem added successfully")
)
};

const updateProblem=async(req,res)=>{
  const {problemNo}=req.params;
  const data=req.body;

  if(!data || Object.keys(data).length==0){
    throw new ApiError(404,"no fields to update")
  }


  const updateFields={};


  const existingproblem= await Problem.findOne({
    problemNo:problemNo},
)

if(!existingproblem){
  throw new ApiError(404," problem not found")
}

if (data.title) updateFields.title = data.title;
  if (data.difficulty) updateFields.difficulty = data.difficulty;
  if (data.problemNo) updateFields.problemNo = data.problemNo;
  if (data.url) updateFields.url = data.url;
  if (data.platform) updateFields.platform = data.platform;

  
  if (data.topic) {
    const topicDoc = await Topic.findOne({ name: data.topic });
    if (!topicDoc) throw new ApiError(404, `Topic '${data.topic}' not found`);
    updateFields.topic = topicDoc._id;
  }

  // Lookup and assign pattern ID
  if (data.pattern) {
    const patternDoc = await Pattern.findOne({ name: data.pattern });
    if (!patternDoc) throw new ApiError(404, `Pattern '${data.pattern}' not found`);
    updateFields.pattern = patternDoc._id;
  }

  // Lookup and assign problem status ID
  if (data.problemStatus) {
    const statusDoc = await ProblemStatus.findOne({ status: data.problemStatus });
    if (!statusDoc) throw new ApiError(404, `Problem status '${data.problemStatus}' not found`);
    updateFields.problemStatus = statusDoc._id;
  }

const updatedProblem = await Problem.findOneAndUpdate(
  {problemNo},
  {$set:updateFields},
  {new:true}
);

return res
.status(200)
.json(
  new ApiResponse(200,updatedProblem,"problem updated successfully")
);
};

const deleteProblem=async(req,res)=>{
  const {problemNo}=req.params;

  const problem= await Problem.findOne({problemNo
  })
  if(!problem){
    throw new ApiError(404,"no problem found to delete");
  }

  const deletedproblem = await Problem.findOneAndDelete({problemNo})
  const deleteproblemstatus= await ProblemStatus.findOneAndDelete({problem:problem._id})

  return res
  .status(200)
  .json(
    new ApiResponse(200,deletedproblem,"problemdeletedsuccessfully")
  )
}

const getallProblems=async(req,res)=>{
  const filter={};

  //filter krdo

  if(req.query.difficulty) filter.difficulty=req.query.difficulty;
  if (req.query.topic) {
      const topicDoc = await Topic.findOne({ name: req.query.topic });
      if (!topicDoc) throw new ApiError(404, "Topic not found");
      filter.topic = topicDoc._id;
    }

    if (req.query.pattern) {
      const patternDoc = await Pattern.findOne({ name: req.query.pattern });
      if (!patternDoc) throw new ApiError(404, "Pattern not found");
      filter.pattern = patternDoc._id;
    }

    if (req.query.problemStatus) {
      const statusDoc = await ProblemStatus.findOne({ status: req.query.problemStatus });
      if (!statusDoc) throw new ApiError(404, "Status not found");
      filter.problemStatus = statusDoc._id;
    }

  const problems=await Problem.find(filter)
  .populate('topic','name -_id')
  .populate('pattern','name -_id')
  .populate('problemStatus','status')
  .lean();

  if(problems.length==0){
    throw new ApiError(404,"no problem found");
  }

  return res
  .status(200)
  .json(
    new ApiResponse(200,problems,"all filtered problems fetched successfully")
  )
}

const getsingleProblem=async(req,res)=>{

  const problems= await Problem.findOne({
    $or:[
      {title:{$regex:req.query.title, $options:'i'}},
      {problemNo :req.query.problemNo}]}
  );

  if(!problems){
    throw new ApiError(404,`no problems found with ${filter}`)
  }

  return res
  .status(200)
  .json(
    new ApiResponse(200,problems,"problems fetched successfully")
  )
}




export{addProblem,updateProblem,deleteProblem,getallProblems,getsingleProblem};

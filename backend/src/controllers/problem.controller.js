import User from "../models/user.model.js";
import Problem from "../models/problem.model.js";
import ProblemStatus from "../models/problemStatus.js";
import Topic from "../models/topic.model.js";
import Pattern from '../models/pattern.model.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from "../utils/apiResponse.js";

// Add a problem
const addProblem = async (req, res) => {
  if (!req.user) throw new ApiError(401, "Unauthorized: user not found");

  const userId = req.user._id;
  const { title, difficulty, pattern, topic, problemStatus, url, platform, problemNo } = req.body;

  if (!title || !difficulty || !topic || !problemNo) {
    throw new ApiError(400, "Please provide minimum details for problem");
  }

  const existingProblem = await Problem.findOne({ $or: [{ title }, { problemNo }], user: userId });
  if (existingProblem) throw new ApiError(400, "Problem already exists for this user");

  const problemData = { title, difficulty, problemNo, user: userId };

  const topicDoc = await Topic.findOne({ name: topic });
  if (!topicDoc) throw new ApiError(404, `Topic ${topic} not found`);
  problemData.topic = topicDoc._id;

  if (pattern) {
    const patternDoc = await Pattern.findOne({ name: pattern });
    if (!patternDoc) throw new ApiError(404, `Pattern ${pattern} not found`);
    problemData.pattern = patternDoc._id;
  }

  if (url) problemData.url = url;
  if (platform) problemData.platform = platform;

  const problem = new Problem(problemData);
  await problem.save();

  let problemStatusDoc = null;
  if (problemStatus) {
    if (problemStatus === "solved") {
      const today = new Date();
      const Revisions = [0, 3, 7, 14, 30];
      problemStatusDoc = await ProblemStatus.create({
        problem: problem._id,
        status: problemStatus,
        lastAttempted: today,
        revisionDate: Revisions.map(d => {
          const date = new Date(today);
          date.setDate(date.getDate() + d);
          return date;
        }),
      });
    } else {
      problemStatusDoc = await ProblemStatus.create({
        problem: problem._id,
        status: problemStatus,
        lastAttempted: null,
      });
    }
    problem.problemStatus = problemStatusDoc._id;
    await problem.save();
  }

  return res.status(201).json(new ApiResponse(201, problem, "New problem added successfully"));
};

// Update a problem (only by its owner)
const updateProblem = async (req, res) => {
  if (!req.user) throw new ApiError(401, "Unauthorized: user not found");

  const { problemNo } = req.params;
  const data = req.body;

  if (!data || Object.keys(data).length === 0) throw new ApiError(400, "No fields to update");

  const existingProblem = await Problem.findOne({ problemNo, user: req.user._id });
  if (!existingProblem) throw new ApiError(404, "Problem not found for this user");

  const updateFields = {};

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

  if (data.pattern) {
    const patternDoc = await Pattern.findOne({ name: data.pattern });
    if (!patternDoc) throw new ApiError(404, `Pattern '${data.pattern}' not found`);
    updateFields.pattern = patternDoc._id;
  }

  if (data.problemStatus) {
    const statusDoc = await ProblemStatus.findOne({ status: data.problemStatus });
    if (!statusDoc) throw new ApiError(404, `Problem status '${data.problemStatus}' not found`);
    updateFields.problemStatus = statusDoc._id;
  }

  const updatedProblem = await Problem.findOneAndUpdate(
    { problemNo, user: req.user._id },
    { $set: updateFields },
    { new: true }
  );

  return res.status(200).json(new ApiResponse(200, updatedProblem, "Problem updated successfully"));
};

// Delete a problem (only by owner)
const deleteProblem = async (req, res) => {
  if (!req.user) throw new ApiError(401, "Unauthorized: user not found");

  const { problemNo } = req.params;

  const problem = await Problem.findOne({ problemNo, user: req.user._id });
  if (!problem) throw new ApiError(404, "No problem found to delete for this user");

  await Problem.findOneAndDelete({ problemNo, user: req.user._id });
  await ProblemStatus.findOneAndDelete({ problem: problem._id });

  return res.status(200).json(new ApiResponse(200, problem, "Problem deleted successfully"));
};

// Get all problems for the current user (with optional filters)
const getallProblems = async (req, res) => {
  if (!req.user) throw new ApiError(401, "Unauthorized: user not found");

  const filter = { user: req.user._id };

  if (req.query.difficulty) filter.difficulty = req.query.difficulty;
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

  const problems = await Problem.find(filter)
    .populate('topic', 'name -_id')
    .populate('pattern', 'name -_id')
    .populate('problemStatus', 'status')
    .populate('user', 'name email');

  if (problems.length === 0){
    console.log("no problems found"); 
  }

  return res.status(200).json(new ApiResponse(200, problems, "All filtered problems fetched successfully"));
};

// Get single problem for user
const getsingleProblem = async (req, res) => {
  if (!req.user) throw new ApiError(401, "Unauthorized: user not found");

  const { title, problemNo } = req.query;

  const problem = await Problem.findOne({
    user: req.user._id,
    $or: [
      { title: { $regex: title || '', $options: 'i' } },
      { problemNo: problemNo }
    ]
  })
    .populate('topic', 'name -_id')
    .populate('pattern', 'name -_id')
    .populate('problemStatus', 'status')
    .populate('user', 'name email');

  if (!problem) throw new ApiError(404, "No problem found for this user");

  return res.status(200).json(new ApiResponse(200, problem, "Problem fetched successfully"));
};

export { addProblem, updateProblem, deleteProblem, getallProblems, getsingleProblem };

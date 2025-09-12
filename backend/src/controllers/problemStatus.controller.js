import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from "../utils/apiResponse.js";
import Problem from "../models/problem.model.js";
import ProblemStatus from "../models/problemStatus.js";

// Mark a problem as solved for the logged-in user
const markproblemStatus = async (req, res) => {
  const { problemNo } = req.params;
  const userId = req.user._id;

  if (!problemNo) throw new ApiError(400, "Please provide problem number");

  const problem = await Problem.findOne({ problemNo, user: userId });
  if (!problem) throw new ApiError(404, "Problem not found for this user");

  let statusDoc = await ProblemStatus.findOne({ problem: problem._id });

  if (statusDoc) {
    if (['unsolved', 'attempted'].includes(statusDoc.status)) {
      statusDoc.status = 'solved';
      statusDoc.lastAttempted = new Date();

      const today = new Date();
      const Revisions = [0, 3, 7, 14, 30];
      statusDoc.revisionDate = Revisions.map(days => {
        const date = new Date(today);
        date.setDate(date.getDate() + days);
        return date;
      });

      await statusDoc.save();
    }
  }

  await statusDoc.populate({
    path: 'problem',
    populate: [
      { path: 'topic' },
      { path: 'pattern' }
    ]
  });

  return res.status(200).json(new ApiResponse(200, statusDoc, "Problem marked as solved"));
};

// Get overall problem progress for logged-in user
const getproblemProgress = async (req, res) => {
  const userId = req.user._id;

  const totalProblems = await Problem.countDocuments({ user: userId });

  const solvedProblemsArr = await Problem.aggregate([
    { $match: { user: userId } },
    {
      $lookup: {
        from: "problemstatuses",
        localField: "problemStatus",
        foreignField: "_id",
        as: "statusInfo"
      }
    },
    { $unwind: "$statusInfo" },
    { $match: { "statusInfo.status": "solved" } },
    { $count: "solved" }
  ]);

  const solvedProblems = solvedProblemsArr.length > 0 ? solvedProblemsArr[0].solved : 0;

  return res.status(200).json(
    new ApiResponse(200, {
      totalProblems,
      solvedProblems,
      progress: `${solvedProblems}/${totalProblems}`
    }, "Overall problem solving progress")
  );
};

// Get problem count stats for logged-in user
const getProblemstats = async (req, res) => {
  const userId = req.user._id;

  const count = await ProblemStatus.aggregate([
    {
      $lookup: {
        from: "problems",
        localField: "problem",
        foreignField: "_id",
        as: "problemInfo"
      }
    },
    { $unwind: "$problemInfo" },
    { $match: { "problemInfo.user": userId } },
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);

  return res.status(200).json(new ApiResponse(200, count, "Problem count fetched successfully"));
};

// Get last solved problems for logged-in user
const getLastSolvedProblems = async (req, res) => {
  const userId = req.user._id;
  const limit = req.query.limit ? parseInt(req.query.limit) : 0;

  const solvedStatus = await ProblemStatus.find({ status: "solved" });
  const solvedIds = solvedStatus.map(s => s._id);

  const solvedProblems = await Problem.find({
    problemStatus: { $in: solvedIds },
    user: userId
  })
    .populate("problemStatus", "status")
    .sort({ updatedAt: -1 })
    .limit(limit)
    .select("problemNo title difficulty updatedAt");

  return res.status(200).json(new ApiResponse(200, solvedProblems, "Last solved problems fetched"));
};

// Add one-liner for a problem for logged-in user
const addOneliner = async (req, res) => {
  const { problemNo } = req.params;
  const { intuition } = req.body;
  const userId = req.user._id;

  if (!intuition) throw new ApiError(404, "No intuition line found");

  const problem = await Problem.findOne({ problemNo, user: userId });
  if (!problem) throw new ApiError(404, "Problem not found for this user");

  const status = await ProblemStatus.findOne({ problem: problem._id });
  if (status) {
    status.intuition = intuition;
    await status.save();
  }

  return res.status(200).json(new ApiResponse(200, status, "One-liner added successfully"));
};

// Get problems solved on a particular day for logged-in user
const getperdayproblemsolved = async (req, res) => {
  const { date } = req.query;
  const userId = req.user._id;

  if (!date) throw new ApiError(400, "Please provide a date");

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const problems = await ProblemStatus.find({
    status: "solved",
    updatedAt: { $gte: startOfDay, $lte: endOfDay }
  }).populate({
    path: 'problem',
    match: { user: userId },
    select: 'title problemNo'
  });

  // filter out any problems not belonging to the user
  const filteredProblems = problems.filter(p => p.problem !== null);

  return res.status(200).json(new ApiResponse(200, filteredProblems, "Solved problems for the day"));
};

export {
  markproblemStatus,
  getProblemstats,
  getproblemProgress,
  addOneliner,
  getLastSolvedProblems,
  getperdayproblemsolved
};

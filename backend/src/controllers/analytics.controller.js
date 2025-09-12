import User from "../models/user.model.js";
import Problem from "../models/problem.model.js";
import ProblemStatus from "../models/problemStatus.js";
import Topic from "../models/topic.model.js";
import Pattern from '../models/pattern.model.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from "../utils/apiResponse.js";

// Overall stats (solved, attempted, unsolved) for logged-in user
const getoverallStats = async (req, res) => {
  console.log
  if (!req.user) throw new ApiError(401, "Unauthorized: user not found");

  const userId = req.user._id;

  const stats = await ProblemStatus.aggregate([
    {
      $lookup: {
        from: "problems",
        localField: "problem",
        foreignField: "_id",
        as: "problemInfo"
      }
    },
    { $unwind: "$problemInfo" },
    { $match: { "problemInfo.user": userId } }, // filter by user
    {
      $group: { _id: "$status", count: { $sum: 1 } }
    }
  ]);

  const result = { solved: 0, attempted: 0, unsolved: 0 };
  stats.forEach(({ _id, count }) => {
    if (result.hasOwnProperty(_id)) {
      result[_id] = count;
    }
  });

  return res.status(200).json(new ApiResponse(200, result, "Solved stats of problems"));
};

// Stats by difficulty for logged-in user
const getstatsbydifficulty = async (req, res) => {
  if (!req.user) throw new ApiError(401, "Unauthorized: user not found");
  const userId = req.user._id;

  const problem = await Problem.aggregate([
    { $match: { user: userId } }, // filter by user
    {
      $group: {
        _id: "$difficulty",
        count: { $sum: 1 }
      }
    }
  ]);

  const formatted = {};
  problem.forEach(item => {
    formatted[item._id] = item.count;
  });

  return res.status(200).json(new ApiResponse(200, formatted, "Problems count by difficulty"));
};

// Stats by topic for logged-in user
const getstatsbyTopic = async (req, res) => {
  if (!req.user) throw new ApiError(401, "Unauthorized: user not found");
  const userId = req.user._id;

  const count = await Problem.aggregate([
    { $match: { user: userId } }, // filter by user
    {
      $lookup: {
        from: "topics",
        localField: "topic",
        foreignField: "_id",
        as: "topicInfo"
      }
    },
    { $unwind: "$topicInfo" },
    {
      $group: {
        _id: "$topicInfo.name",
        count: { $sum: 1 }
      }
    }
  ]);

  const formatted = count.map(topic => ({
    topic: topic._id,
    solved: topic.count
  }));

  return res.status(200).json(new ApiResponse(200, formatted, "Topics count for user"));
};

export { getoverallStats, getstatsbydifficulty, getstatsbyTopic };

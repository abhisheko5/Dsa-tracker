import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from "../utils/apiResponse.js";
import Problem from "../models/problem.model.js";
import ProblemStatus from "../models/problemStatus.js";

// Mark today's revision as done for a specific problem
const markRevisiondone = async (req, res) => {
  const { problemNo } = req.params;
  const userId = req.user._id;

  if (!problemNo) throw new ApiError(400, "Please provide problem number");

  const problem = await Problem.findOne({ problemNo, user: userId });
  if (!problem) throw new ApiError(404, "Problem not found for this user");

  const statusDoc = await ProblemStatus.findOne({ problem: problem._id });
  if (!statusDoc) throw new ApiError(404, "Problem status not found");

  if (statusDoc.status !== 'solved') {
    throw new ApiError(400, "Problem needs to be solved for revision");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  statusDoc.revisionDate = statusDoc.revisionDate.filter(date => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime() !== today.getTime();
  });

  await statusDoc.save();

  return res.status(200).json(
    new ApiResponse(200, statusDoc, "Revision for problem done successfully")
  );
};

// Get today's revision schedule for the logged-in user
const todayRevisionSchedule = async (req, res) => {
  const userId = req.user._id;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const startOfDay = new Date(now);
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  const result = await ProblemStatus.aggregate([
    {
      $match: {
        revisionDate: { $elemMatch: { $gte: startOfDay, $lte: endOfDay } }
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
    { $match: { "problem.user": userId } }, // Filter by user
    {
      $project: {
        _id: "$problem._id",
        title: "$problem.title",
        difficulty: "$problem.difficulty",
        Attempted: "$lastAttempted",
        problemNo: "$problem.problemNo",
        status: "$status",
        url: "$problem.url"
      }
    }
  ]);

  return res.status(200).json(new ApiResponse(200, result, "Today's revision schedule"));
};

// Get upcoming revisions for logged-in user
const upcomingRevisionSchedule = async (req, res) => {
  const userId = req.user._id;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = await ProblemStatus.aggregate([
    {
      $match: {
        revisionDate: { $elemMatch: { $gt: today } }
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
    { $match: { "problem.user": userId } },
    {
      $project: {
        _id: "$problem._id",
        title: "$problem.title",
        difficulty: "$problem.difficulty",
        nextRevisionDates: "$revisionDate",
        problemNo: "$problem.problemNo",
        status: "$status",
        url: "$problem.url"
      }
    }
  ]);

  return res.status(200).json(new ApiResponse(200, upcoming, "Upcoming revision schedule"));
};

export { markRevisiondone, todayRevisionSchedule, upcomingRevisionSchedule };

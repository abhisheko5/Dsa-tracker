import { ApiResponse } from "../utils/apiResponse.js";
import Problem from "../models/problem.model.js";
import Topic from "../models/topic.model.js";

const getTopicwiseproblemcount = async (req, res) => {
  const userId = req.user._id; // for user-specific counts

  const count = await Problem.aggregate([
    { $match: { user: userId } }, // filter by logged-in user
    {
      $lookup: {
        from: "topics",
        localField: "topic",
        foreignField: "_id",
        as: "topicinfo"
      }
    },
    { $unwind: "$topicinfo" },
    {
      $group: {
        _id: "$topicinfo.name",
        count: { $sum: 1 }
      }
    }
  ]);

  return res.status(200).json(
    new ApiResponse(200, count, "Overall topic-wise problem count")
  );
};

export { getTopicwiseproblemcount };

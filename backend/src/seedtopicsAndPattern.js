import dotenv from "dotenv";
dotenv.config();
import {connectDB} from "./db/index.js";
import Topic from "./models/topic.model.js";
import Pattern from "./models/pattern.model.js";

console.log("Mongo URI:", process.env.MONGODB_URI);


const insertData = async () => {
  await connectDB();


    // 1️⃣ Insert topics
    const topics = [
      "Array",
      "String",
      "Linked List",
      "Tree",
      "Graph",
      "Dynamic Programming",
      "Greedy",
      "Binary Search",
      "Stack",
      "Queue",
      "Heap",
      "Backtracking"
    ];

    

    // 2️⃣ Insert patterns
    const patterns = [
      "Sliding Window",
      "Two Pointers",
      "Prefix Sum",
      "DFS",
      "BFS",
      "Greedy",
      "Recursion",
      "Binary Search Tree",
      "Bit Manipulation",
      "Kadanes Algorithm"
    ];

    try {
    await Topic.deleteMany(); // Optional clean
    await Pattern.deleteMany();

    await Topic.insertMany(topics.map(name => ({ name })));
    await Pattern.insertMany(patterns.map(name => ({ name })));

    console.log("✅ Topics and Patterns inserted successfully.");
    process.exit();
  } catch (err) {
    console.error("❌ Error inserting:", err);
    process.exit(1);
  }
};

insertData();

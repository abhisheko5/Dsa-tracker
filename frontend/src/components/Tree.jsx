import React, { useState } from "react";
import { ChevronRight, ChevronDown, Trophy, Clock, BookOpen, Target, CheckCircle2, Circle } from "lucide-react";

const dsaTopics = [
  {
    id: "fundamentals",
    name: "Fundamentals",
    difficulty: "Beginner",
    estimatedTime: "2-3 weeks",
    problems: 25,
    description: "Core data structures and basic algorithms",
    topics: [
      {
        name: "Arrays & Strings",
        problems: [
          { name: "Two Sum", difficulty: "Easy", completed: false },
          { name: "Best Time to Buy/Sell Stock", difficulty: "Easy", completed: false },
          { name: "Product of Array Except Self", difficulty: "Medium", completed: false },
          { name: "Maximum Subarray (Kadane's)", difficulty: "Easy", completed: false },
          { name: "Merge Intervals", difficulty: "Medium", completed: false },
          { name: "Valid Anagram", difficulty: "Easy", completed: false },
          { name: "Group Anagrams", difficulty: "Medium", completed: false },
        ]
      },
      {
        name: "Two Pointers",
        problems: [
          { name: "Valid Palindrome", difficulty: "Easy", completed: false },
          { name: "3Sum", difficulty: "Medium", completed: false },
          { name: "Container With Most Water", difficulty: "Medium", completed: false },
          { name: "Trapping Rain Water", difficulty: "Hard", completed: false },
          { name: "Remove Duplicates from Sorted Array", difficulty: "Easy", completed: false },
        ]
      },
      {
        name: "Sliding Window",
        problems: [
          { name: "Maximum Average Subarray", difficulty: "Easy", completed: false },
          { name: "Longest Substring K Distinct", difficulty: "Medium", completed: false },
          { name: "Minimum Window Substring", difficulty: "Hard", completed: false },
          { name: "Permutation in String", difficulty: "Medium", completed: false },
        ]
      }
    ]
  },
  {
    id: "linear-structures",
    name: "Linear Data Structures",
    difficulty: "Beginner",
    estimatedTime: "3-4 weeks",
    problems: 30,
    description: "Linked lists, stacks, and queues",
    topics: [
      {
        name: "Linked Lists",
        problems: [
          { name: "Reverse Linked List", difficulty: "Easy", completed: false },
          { name: "Merge Two Sorted Lists", difficulty: "Easy", completed: false },
          { name: "Linked List Cycle", difficulty: "Easy", completed: false },
          { name: "Remove Nth Node From End", difficulty: "Medium", completed: false },
          { name: "Copy List with Random Pointer", difficulty: "Medium", completed: false },
          { name: "Add Two Numbers", difficulty: "Medium", completed: false },
          { name: "LRU Cache", difficulty: "Medium", completed: false },
        ]
      },
      {
        name: "Stacks & Queues",
        problems: [
          { name: "Valid Parentheses", difficulty: "Easy", completed: false },
          { name: "Min Stack", difficulty: "Easy", completed: false },
          { name: "Daily Temperatures", difficulty: "Medium", completed: false },
          { name: "Largest Rectangle in Histogram", difficulty: "Hard", completed: false },
          { name: "Sliding Window Maximum", difficulty: "Hard", completed: false },
        ]
      }
    ]
  },
  {
    id: "searching-sorting",
    name: "Searching & Sorting",
    difficulty: "Intermediate",
    estimatedTime: "3-4 weeks",
    problems: 20,
    description: "Binary search and sorting algorithms",
    topics: [
      {
        name: "Binary Search",
        problems: [
          { name: "Binary Search", difficulty: "Easy", completed: false },
          { name: "Search in Rotated Sorted Array", difficulty: "Medium", completed: false },
          { name: "Find Minimum in Rotated Array", difficulty: "Medium", completed: false },
          { name: "Search 2D Matrix", difficulty: "Medium", completed: false },
          { name: "Koko Eating Bananas", difficulty: "Medium", completed: false },
          { name: "Find Peak Element", difficulty: "Medium", completed: false },
          { name: "Median of Two Sorted Arrays", difficulty: "Hard", completed: false },
        ]
      }
    ]
  },
  {
    id: "trees",
    name: "Trees & Tree Algorithms",
    difficulty: "Intermediate",
    estimatedTime: "4-5 weeks",
    problems: 35,
    description: "Binary trees, BST, and tree traversals",
    topics: [
      {
        name: "Binary Trees",
        problems: [
          { name: "Binary Tree Inorder Traversal", difficulty: "Easy", completed: false },
          { name: "Maximum Depth of Binary Tree", difficulty: "Easy", completed: false },
          { name: "Same Tree", difficulty: "Easy", completed: false },
          { name: "Invert Binary Tree", difficulty: "Easy", completed: false },
          { name: "Binary Tree Level Order", difficulty: "Medium", completed: false },
          { name: "Construct Tree from Preorder/Inorder", difficulty: "Medium", completed: false },
        ]
      },
      {
        name: "Binary Search Trees",
        problems: [
          { name: "Validate Binary Search Tree", difficulty: "Medium", completed: false },
          { name: "Lowest Common Ancestor", difficulty: "Medium", completed: false },
          { name: "Serialize/Deserialize Binary Tree", difficulty: "Hard", completed: false },
        ]
      },
      {
        name: "Tries",
        problems: [
          { name: "Implement Trie", difficulty: "Medium", completed: false },
          { name: "Word Search II", difficulty: "Hard", completed: false },
          { name: "Design Add/Search Words", difficulty: "Medium", completed: false },
        ]
      }
    ]
  },
  {
    id: "heaps",
    name: "Heaps & Priority Queues",
    difficulty: "Intermediate",
    estimatedTime: "2-3 weeks",
    problems: 12,
    description: "Heap operations and priority queue applications",
    topics: [
      {
        name: "Heap Operations",
        problems: [
          { name: "Kth Largest Element", difficulty: "Medium", completed: false },
          { name: "Top K Frequent Elements", difficulty: "Medium", completed: false },
          { name: "Find Median from Data Stream", difficulty: "Hard", completed: false },
          { name: "Merge k Sorted Lists", difficulty: "Hard", completed: false },
          { name: "Task Scheduler", difficulty: "Medium", completed: false },
        ]
      }
    ]
  },
  {
    id: "backtracking",
    name: "Backtracking",
    difficulty: "Intermediate",
    estimatedTime: "3-4 weeks",
    problems: 15,
    description: "Recursive problem solving with backtracking",
    topics: [
      {
        name: "Backtracking Fundamentals",
        problems: [
          { name: "Letter Combinations Phone Number", difficulty: "Medium", completed: false },
          { name: "Generate Parentheses", difficulty: "Medium", completed: false },
          { name: "Word Search", difficulty: "Medium", completed: false },
          { name: "Palindrome Partitioning", difficulty: "Medium", completed: false },
          { name: "N-Queens", difficulty: "Hard", completed: false },
          { name: "Combination Sum", difficulty: "Medium", completed: false },
          { name: "Subsets", difficulty: "Medium", completed: false },
          { name: "Permutations", difficulty: "Medium", completed: false },
        ]
      }
    ]
  },
  {
    id: "graphs",
    name: "Graph Algorithms",
    difficulty: "Advanced",
    estimatedTime: "5-6 weeks",
    problems: 40,
    description: "Graph traversal and advanced graph algorithms",
    topics: [
      {
        name: "Graph Fundamentals",
        problems: [
          { name: "Clone Graph", difficulty: "Medium", completed: false },
          { name: "Number of Islands", difficulty: "Medium", completed: false },
          { name: "Course Schedule", difficulty: "Medium", completed: false },
          { name: "Pacific Atlantic Water Flow", difficulty: "Medium", completed: false },
          { name: "Word Ladder", difficulty: "Hard", completed: false },
        ]
      },
      {
        name: "Advanced Graph Algorithms",
        problems: [
          { name: "Minimum Spanning Tree (Kruskal)", difficulty: "Hard", completed: false },
          { name: "Dijkstra's Algorithm", difficulty: "Hard", completed: false },
          { name: "Bellman-Ford Algorithm", difficulty: "Hard", completed: false },
          { name: "Floyd-Warshall", difficulty: "Hard", completed: false },
          { name: "Network Delay Time", difficulty: "Medium", completed: false },
        ]
      }
    ]
  },
  {
    id: "dynamic-programming",
    name: "Dynamic Programming",
    difficulty: "Advanced",
    estimatedTime: "6-8 weeks",
    problems: 30,
    description: "Optimization problems using dynamic programming",
    topics: [
      {
        name: "1D DP",
        problems: [
          { name: "Climbing Stairs", difficulty: "Easy", completed: false },
          { name: "House Robber", difficulty: "Medium", completed: false },
          { name: "Coin Change", difficulty: "Medium", completed: false },
          { name: "Longest Increasing Subsequence", difficulty: "Medium", completed: false },
        ]
      },
      {
        name: "2D DP",
        problems: [
          { name: "0/1 Knapsack", difficulty: "Medium", completed: false },
          { name: "Longest Common Subsequence", difficulty: "Medium", completed: false },
          { name: "Edit Distance", difficulty: "Hard", completed: false },
          { name: "Regular Expression Matching", difficulty: "Hard", completed: false },
        ]
      },
      {
        name: "Advanced DP",
        problems: [
          { name: "Burst Balloons", difficulty: "Hard", completed: false },
          { name: "Palindrome Partitioning II", difficulty: "Hard", completed: false },
        ]
      }
    ]
  },
  {
    id: "advanced-topics",
    name: "Advanced Topics",
    difficulty: "Advanced",
    estimatedTime: "4-5 weeks",
    problems: 25,
    description: "Specialized algorithms and techniques",
    topics: [
      {
        name: "Greedy Algorithms",
        problems: [
          { name: "Jump Game", difficulty: "Medium", completed: false },
          { name: "Gas Station", difficulty: "Medium", completed: false },
          { name: "Meeting Rooms II", difficulty: "Medium", completed: false },
          { name: "Partition Labels", difficulty: "Medium", completed: false },
        ]
      },
      {
        name: "Bit Manipulation",
        problems: [
          { name: "Single Number", difficulty: "Easy", completed: false },
          { name: "Number of 1 Bits", difficulty: "Easy", completed: false },
          { name: "Counting Bits", difficulty: "Easy", completed: false },
          { name: "Sum of Two Integers", difficulty: "Medium", completed: false },
        ]
      },
      {
        name: "Math & Geometry",
        problems: [
          { name: "Rotate Image", difficulty: "Medium", completed: false },
          { name: "Spiral Matrix", difficulty: "Medium", completed: false },
          { name: "Pow(x, n)", difficulty: "Medium", completed: false },
        ]
      }
    ]
  }
];

export default function DSARoadmapTree() {
  const [selectedTopic, setSelectedTopic] = useState(dsaTopics[0]);
  const [expandedSections, setExpandedSections] = useState(new Set(['fundamentals']));
  const [completedProblems, setCompletedProblems] = useState(new Set());

  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const toggleProblem = (topicName, problemName) => {
    const problemKey = `${topicName}-${problemName}`;
    const newCompleted = new Set(completedProblems);
    if (newCompleted.has(problemKey)) {
      newCompleted.delete(problemKey);
    } else {
      newCompleted.add(problemKey);
    }
    setCompletedProblems(newCompleted);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'hard': return 'text-red-600 bg-red-50 border-red-200';
      case 'beginner': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'intermediate': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'advanced': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getProgressStats = () => {
    const totalProblems = dsaTopics.reduce((sum, topic) => 
      sum + topic.topics.reduce((topicSum, t) => topicSum + t.problems.length, 0), 0);
    const completedCount = completedProblems.size;
    const progressPercentage = totalProblems > 0 ? (completedCount / totalProblems) * 100 : 0;
    
    return { totalProblems, completedCount, progressPercentage };
  };

  const { totalProblems, completedCount, progressPercentage } = getProgressStats();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Side Panel */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <Trophy className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">DSA Roadmap</h1>
              <p className="text-blue-100 text-sm">Master Data Structures & Algorithms</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Overall Progress</span>
              <span>{completedCount}/{totalProblems}</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-xs text-blue-100 mt-1">{progressPercentage.toFixed(1)}% Complete</div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">Learning Path</h2>
            
            {dsaTopics.map((topic) => (
              <div key={topic.id} className="mb-2">
                <button
                  onClick={() => toggleSection(topic.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                    selectedTopic.id === topic.id 
                      ? 'bg-blue-50 border-blue-200 text-blue-700' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {expandedSections.has(topic.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    <div className="text-left">
                      <div className="font-medium">{topic.name}</div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span className={`px-2 py-0.5 rounded-full border text-xs ${getDifficultyColor(topic.difficulty)}`}>
                          {topic.difficulty}
                        </span>
                        <span>{topic.problems} problems</span>
                      </div>
                    </div>
                  </div>
                </button>
                
                {expandedSections.has(topic.id) && (
                  <div className="mt-2 ml-4 space-y-1">
                    {topic.topics.map((subtopic, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedTopic(topic)}
                        className="w-full text-left p-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded transition-colors"
                      >
                        • {subtopic.name} ({subtopic.problems.length})
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Content Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedTopic.name}</h2>
              <p className="text-gray-600 mt-1">{selectedTopic.description}</p>
              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{selectedTopic.estimatedTime}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <BookOpen className="w-4 h-4" />
                  <span>{selectedTopic.problems} problems</span>
                </div>
                <span className={`px-3 py-1 rounded-full border text-sm ${getDifficultyColor(selectedTopic.difficulty)}`}>
                  {selectedTopic.difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Problem Lists */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl space-y-8">
            {selectedTopic.topics.map((topic, topicIdx) => (
              <div key={topicIdx} className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center space-x-3">
                    <Target className="w-6 h-6 text-blue-600" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{topic.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{topic.problems.length} problems to master</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid gap-3">
                    {topic.problems.map((problem, problemIdx) => {
                      const problemKey = `${topic.name}-${problem.name}`;
                      const isCompleted = completedProblems.has(problemKey);
                      
                      return (
                        <div
                          key={problemIdx}
                          className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                            isCompleted 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-gray-50 border-gray-200 hover:bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => toggleProblem(topic.name, problem.name)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              ) : (
                                <Circle className="w-5 h-5" />
                              )}
                            </button>
                            <div>
                              <h4 className={`font-medium ${isCompleted ? 'text-green-800 line-through' : 'text-gray-900'}`}>
                                {problem.name}
                              </h4>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full border text-xs ${getDifficultyColor(problem.difficulty)}`}>
                            {problem.difficulty}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
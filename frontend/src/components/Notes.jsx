import React, { useState, useEffect } from 'react';
import { BookOpen, RefreshCw, Copy, Check, AlertCircle } from 'lucide-react';
import axios from 'axios';

const NotesPage = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // API call to fetch problems
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Replace with your actual API endpoint
        const response = await axios.get('/api/problems/notes');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProblems(data);
      } catch (err) {
        setError('Failed to load problems. Please try again.');
        console.error('Error fetching problems:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleRefresh = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/problems/notes');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProblems(data);
    } catch (err) {
      setError('Failed to refresh problems.');
      console.error('Error refreshing problems:', err);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
            <span className="ml-2 text-lg text-gray-600 dark:text-gray-300">Loading notes...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center h-64">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Error Loading Notes</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-500 mr-3" />
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Problem Notes</h1>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Quick one-liner solutions and key insights for coding problems
          </p>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {problems.length} problems found
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {problems.map((problem) => (
            <div
              key={problem.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      {problem.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                      {problem.category && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-medium">
                          {problem.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* One-liner Solution */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Key Insight:</h4>
                    <button
                      onClick={() => handleCopy(problem.oneLiner, problem.id)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200"
                      title="Copy insight"
                    >
                      {copiedId === problem.id ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg italic text-sm leading-relaxed">
                    "{problem.oneLiner}"
                  </p>
                </div>

                {/* Tags */}
                {problem.tags && problem.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {problem.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {problems.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No problems found</h3>
            <p className="text-gray-500 dark:text-gray-400">No coding problems available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPage;
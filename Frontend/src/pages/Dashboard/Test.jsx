import React, { useState } from "react";
import {
  ChevronLeft,
  Play,
  Upload,
  ThumbsUp,
  MessageCircle,
  Users,
} from "lucide-react";

const languageBoilerplates = {
  cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
  java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`,
  python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        pass`,
  javascript: `var twoSum = function(nums, target) {
    
};`,
};

const getDifficultyClasses = (diff) => {
  switch (diff) {
    case "Easy":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "Medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "Hard":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const Test = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(languageBoilerplates.javascript);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("testcase");

  function handleLanguageChange(e) {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCode(languageBoilerplates[lang]);
  }

  function handleRun() {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 2000);
  }

  function handleSubmit() {
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  }

  return (
    <div className="h-full flex bg-white">
      {/* Left - Problem */}
      <div className="w-1/2 px-6 py-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
          1. Two Sum{" "}
          <span
            className={`px-2 py-1 text-sm font-medium border rounded ${getDifficultyClasses(
              "Easy"
            )}`}
          >
            Easy
          </span>
        </h1>

        <p className="mt-4 text-gray-700 leading-relaxed">
          Given an array of integers{" "}
          <code className="bg-blue-50 px-1 rounded">nums</code> and an integer{" "}
          <code className="bg-blue-50 px-1 rounded">target</code>, return
          indices of the two numbers such that they add up to target.
        </p>

        <p className="mt-2 text-gray-700">
          You may assume that each input would have{" "}
          <strong>exactly one solution</strong>.
        </p>

        <div className="bg-white border mt-6 rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-2">Example</h3>
          <div className="font-mono text-sm space-y-1 text-gray-800">
            <div>Input: nums = [2,7,11,15], target = 9</div>
            <div>Output: [0,1]</div>
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-500 mt-6 border-t pt-4">
          <div className="flex gap-4">
            <div className="flex items-center gap-1 cursor-pointer hover:text-gray-800">
              <ThumbsUp className="w-4 h-4" /> 1.2k
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-gray-800">
              <MessageCircle className="w-4 h-4" /> 342
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" /> 2.3k online
          </div>
        </div>
      </div>

      {/* Right - Editor */}
      <div className="w-1/2 bg-white border-l flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b bg-blue-50">
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="px-3 py-1 border border-gray-300 rounded text-gray-900 bg-white"
          >
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="px-3 py-1 border border-blue-500 text-blue-600 rounded hover:bg-blue-100 flex items-center gap-1"
            >
              <Play className="w-4 h-4" />
              {isRunning ? "Running..." : "Run"}
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1"
            >
              <Upload className="w-4 h-4" />
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full p-4 pl-12 font-mono text-sm outline-none resize-none"
          />
          <div className="absolute top-0 left-0 p-4 text-gray-400 font-mono text-sm pointer-events-none">
            {code.split("\n").map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t">
          <div className="flex border-b bg-blue-50">
            <button
              className={`px-4 py-2 text-sm ${
                activeTab === "testcase"
                  ? "border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("testcase")}
            >
              Testcase
            </button>
            <button
              className={`px-4 py-2 text-sm ${
                activeTab === "result"
                  ? "border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("result")}
            >
              Result
            </button>
          </div>

          <div className="p-4 text-sm text-gray-700">
            {activeTab === "testcase" && (
              <>
                nums = [2,7,11,15] <br />
                target = 9
              </>
            )}
            {activeTab === "result" &&
              (isRunning ? "Running tests..." : "Run code to see result.")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;

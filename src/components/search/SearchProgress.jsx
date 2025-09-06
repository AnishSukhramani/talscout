import React from 'react';
import { Progress } from "../ui/progress";
import { CheckCircle, Loader2 } from "lucide-react";

export default function SearchProgress({ progress, stage }) {
  const stages = [
    { name: 'Initializing search...', value: 0 },
    { name: 'Saving job requirements...', value: 20 },
    { name: 'Searching LinkedIn profiles...', value: 40 },
    { name: 'Scanning Naukri.com database...', value: 60 },
    { name: 'Analyzing candidate matches...', value: 80 },
    { name: 'Ranking candidates by relevance...', value: 95 },
    { name: 'Search completed!', value: 100 }
  ];

  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 neu-card rounded-full mx-auto mb-6 flex items-center justify-center">
        {progress < 100 ? (
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        ) : (
          <CheckCircle className="w-10 h-10 text-green-600" />
        )}
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {progress < 100 ? 'Finding Your Perfect Candidates' : 'Search Complete!'}
      </h2>
      
      <p className="text-gray-600 mb-6">{stage}</p>
      
      <div className="max-w-md mx-auto">
        <Progress value={progress} className="h-3 mb-4" />
        <div className="text-center">
          <span className="text-2xl font-bold text-blue-600">{progress}%</span>
        </div>
      </div>

      <div className="mt-8 space-y-2 max-w-lg mx-auto">
        {stages.map((stageItem, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${
              progress >= stageItem.value 
                ? 'text-green-600' 
                : progress >= stageItem.value - 20
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-400'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${
              progress >= stageItem.value ? 'bg-green-600' : 'bg-gray-300'
            }`} />
            <span className="text-sm">{stageItem.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
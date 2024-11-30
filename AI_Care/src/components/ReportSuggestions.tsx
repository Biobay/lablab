import React from 'react';
import { Lightbulb } from 'lucide-react';

interface ReportSuggestion {
  title: string;
  example: string;
}

const suggestions: ReportSuggestion[] = [
  {
    title: "Infrastructure",
    example: "Report damaged roads, street lights, or signs"
  },
  {
    title: "Environment",
    example: "Report waste, pollution, or landscaping issues"
  },
  {
    title: "Safety",
    example: "Report hazardous conditions or safety concerns"
  }
];

export function ReportSuggestions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border-t border-gray-200">
      {suggestions.map((suggestion, index) => (
        <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={16} className="text-yellow-500" />
            <h3 className="font-medium text-gray-900">{suggestion.title}</h3>
          </div>
          <p className="text-sm text-gray-600">{suggestion.example}</p>
        </div>
      ))}
    </div>
  );
}
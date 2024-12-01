import React from 'react';
import { Report } from '../types';
import { BarChart3, AlertTriangle, CheckCircle } from 'lucide-react';

interface StatisticsProps {
  reports: Report[];
}

export const Statistics: React.FC<StatisticsProps> = ({ reports }) => {
  const totalReports = reports.length;
  const highPriority = reports.filter(r => r.priority === 'high').length;
  const resolvedReports = reports.filter(r => r.status === 'resolved').length;
  
  const categoryCount = reports.reduce((acc, report) => {
    acc[report.category] = (acc[report.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostCommonCategory = Object.entries(categoryCount)
    .sort(([,a], [,b]) => b - a)[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <BarChart3 className="w-8 h-8 text-blue-500 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Total Reports</p>
            <p className="text-2xl font-bold">{totalReports}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
          <div>
            <p className="text-sm text-gray-600">High Priority Issues</p>
            <p className="text-2xl font-bold">{highPriority}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Resolved Issues</p>
            <p className="text-2xl font-bold">{resolvedReports}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
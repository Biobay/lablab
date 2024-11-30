import React from 'react';
import { AlertCircle, MapPin, Camera, Clock } from 'lucide-react';

export function WelcomeMessage() {
  return (
    <div className="space-y-4 p-4 bg-blue-50 rounded-lg mb-4">
      <h2 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
        <AlertCircle size={20} />
        Welcome to the Report Assistant
      </h2>
      <p className="text-blue-800">
        I'm here to help you submit and track reports. Please include the following details in your report:
      </p>
      <ul className="space-y-2">
        <li className="flex items-center gap-2 text-blue-700">
          <MapPin size={16} /> Location of the issue
        </li>
        <li className="flex items-center gap-2 text-blue-700">
          <Camera size={16} /> Description of what you observe
        </li>
        <li className="flex items-center gap-2 text-blue-700">
          <Clock size={16} /> When you noticed the issue
        </li>
      </ul>
      <p className="text-sm text-blue-600 italic">
        Example: "There's a large pothole on Main Street near the library. I noticed it this morning. It's about 2 feet wide."
      </p>
    </div>
  );
}
import { Category, Priority } from '../types';

export function analyzePriority(description: string, category: Category): Priority {
  const keywords = {
    high: ['dangerous', 'emergency', 'hazard', 'immediate', 'safety', 'urgent'],
    medium: ['broken', 'damaged', 'issue', 'problem', 'repair'],
    low: ['minor', 'small', 'cosmetic', 'slight']
  };

  const text = description.toLowerCase();
  
  // Check for high priority keywords
  if (keywords.high.some(word => text.includes(word))) {
    return 'high';
  }

  // Category-based priority
  if (category === 'pothole' || category === 'lighting') {
    return 'medium';
  }

  // Check for medium priority keywords
  if (keywords.medium.some(word => text.includes(word))) {
    return 'medium';
  }

  return 'low';
}
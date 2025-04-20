import React from 'react';

interface StrategyRecommendationsCardProps {
  recommendations: string[];
}

const StrategyRecommendationsCard: React.FC<StrategyRecommendationsCardProps> = ({ recommendations }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Strategy Recommendations</h2>
      
      {recommendations.length > 0 ? (
        <ul className="space-y-2">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-700">{recommendation}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-4">
          <p className="text-gray-500 italic">No recommendations available</p>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Recommendations are based on the current market regime characteristics and historical performance data.
        </p>
      </div>
    </div>
  );
};

export default StrategyRecommendationsCard;
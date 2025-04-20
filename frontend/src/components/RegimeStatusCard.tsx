import React from 'react';
import { CurrentRegime } from '../services/api';

interface RegimeStatusCardProps {
  currentRegime: CurrentRegime;
}

const RegimeStatusCard: React.FC<RegimeStatusCardProps> = ({ currentRegime }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Current Market Regime</h2>
      
      <div className="bg-blue-50 border border-blue-100 rounded p-3 mb-4">
        <h3 className="font-medium text-blue-700">Regime {currentRegime.id}</h3>
        <p className="text-sm text-gray-700 font-medium mt-1">{currentRegime.name}</p>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-500">Confidence Level</span>
          <span className="text-sm font-bold text-gray-900">
            {(currentRegime.probability * 100).toFixed(1)}%
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${currentRegime.probability * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-3">
        <div>
          <span className="text-xs text-gray-500">Duration</span>
          <p className="font-medium">{currentRegime.duration}</p>
        </div>
        
        <div>
          <span className="text-xs text-gray-500">Stability</span>
          <p className="font-medium">
            {currentRegime.probability > 0.8 ? 'High' : 
             currentRegime.probability > 0.6 ? 'Medium' : 'Low'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegimeStatusCard;
import React from 'react';
import { RegimeMetrics } from '../services/api';

interface RegimeMetricsCardProps {
  metrics: RegimeMetrics;
}

const RegimeMetricsCard: React.FC<RegimeMetricsCardProps> = ({ metrics }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Metrics</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-3 rounded border border-gray-200">
          <div className="text-xs text-gray-500">Volatility</div>
          <div className="text-lg font-semibold mt-1">{metrics.volatility.toFixed(4)}</div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded border border-gray-200">
          <div className="text-xs text-gray-500">Spread</div>
          <div className="text-lg font-semibold mt-1">{metrics.spread.toFixed(4)}</div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded border border-gray-200">
          <div className="text-xs text-gray-500">Depth</div>
          <div className="text-lg font-semibold mt-1">{metrics.depth.toFixed(1)}</div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded border border-gray-200">
          <div className="text-xs text-gray-500">Volume</div>
          <div className="text-lg font-semibold mt-1">{metrics.volume.toFixed(1)}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="bg-gray-50 p-3 rounded border border-gray-200">
          <div className="text-xs text-gray-500 mb-1">Directional Bias</div>
          <div className="flex items-center">
            {getDirectionIcon(metrics.direction_bias)}
            <span className="text-lg font-medium ml-2">{metrics.direction_bias}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to display direction icon
function getDirectionIcon(direction: string) {
  switch (direction.toLowerCase()) {
    case 'upward':
      return (
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      );
    case 'downward':
      return (
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      );
    case 'neutral':
    default:
      return (
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
        </svg>
      );
  }
}

export default RegimeMetricsCard;
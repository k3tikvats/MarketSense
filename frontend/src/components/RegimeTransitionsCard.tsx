import React from 'react';
import { Regime, RegimeTransition } from '../services/api';

interface RegimeTransitionsCardProps {
  transitions: RegimeTransition[];
  regimes: Regime[];
}

const RegimeTransitionsCard: React.FC<RegimeTransitionsCardProps> = ({ transitions, regimes }) => {
  // Helper function to get regime name by id
  const getRegimeName = (regimeId: number): string => {
    const regime = regimes.find(r => r.id === regimeId);
    return regime ? regime.name : `Regime ${regimeId}`;
  };

  return (
    <div className="overflow-hidden">
      {transitions.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {transitions.map((transition, index) => (
            <li key={index} className="py-3 flex flex-col md:flex-row md:items-center">
              <div className="flex items-center">
                <div className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                  Regime {transition.from}
                </div>
                <svg className="mx-2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <div className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                  Regime {transition.to}
                </div>
              </div>
              
              <div className="mt-2 md:mt-0 md:ml-auto flex items-center">
                <div className="bg-gray-100 px-2 py-1 rounded text-xs mr-3">
                  {transition.duration}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(transition.timestamp).toLocaleString()}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="py-4 text-center">
          <p className="text-gray-500 italic">No recent regime transitions</p>
        </div>
      )}
    </div>
  );
};

export default RegimeTransitionsCard;

import React from 'react';

interface LeaderboardProps {
  leaderboardData: { name: string; points: number }[];
  onNavigate: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboardData, onNavigate }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl animate-fade-in">
      <header className="flex justify-between items-center mb-6 pb-4 border-b">
        <h1 className="text-3xl font-bold text-blue-800">🏆 Leaderboard</h1>
        <button
          onClick={onNavigate}
          className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
        >
          Back to Dashboard
        </button>
      </header>

      <div className="space-y-3">
        {leaderboardData.map((user, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 rounded-lg shadow-sm transition-all duration-300 ${
              user.name === 'You'
                ? 'bg-green-200 border-2 border-green-400 scale-105'
                : 'bg-white'
            }`}
          >
            <div className="flex items-center space-x-4">
              <span className="text-lg font-bold w-8 text-center text-gray-500">{index + 1}</span>
              <span className={`font-semibold ${user.name === 'You' ? 'text-green-800' : 'text-gray-700'}`}>
                {user.name}
              </span>
            </div>
            <div className="font-bold text-yellow-600">
              {user.points} <span className="text-sm">pts</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;

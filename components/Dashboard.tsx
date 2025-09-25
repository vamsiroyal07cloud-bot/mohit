
import React from 'react';
import { User, View } from '../types';
import { MISSIONS } from '../constants';

interface DashboardProps {
  user: User;
  onStartMission: (missionId: string) => void;
  onNavigate: (view: View) => void;
}

const Header: React.FC<{ user: User; onNavigate: (view: View) => void }> = ({ user, onNavigate }) => (
  <header className="flex flex-wrap justify-between items-center mb-8 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-md">
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-green-800">Welcome, {user.name}!</h1>
      <p className="text-gray-600">Let's learn how to protect our planet.</p>
    </div>
    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
      <div className="text-center">
        <span className="text-2xl font-bold text-yellow-500">{user.ecoPoints}</span>
        <p className="text-sm text-gray-500">Eco-Points</p>
      </div>
      <button 
        onClick={() => onNavigate(View.LEADERBOARD)}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200"
      >
        Leaderboard 🏆
      </button>
    </div>
  </header>
);

const MissionCard: React.FC<{ mission: typeof MISSIONS[0]; onStartMission: (id: string) => void }> = ({ mission, onStartMission }) => {
  const isDisabled = mission.disabled;
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-xl'}`}>
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <span className="text-4xl">{mission.icon}</span>
          <div>
            <h3 className="text-xl font-bold text-green-700">{mission.title}</h3>
            <p className="text-gray-500 mt-1">{mission.description}</p>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={() => !isDisabled && onStartMission(mission.id)}
            disabled={isDisabled}
            className="w-full px-4 py-2 font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isDisabled ? 'Coming Soon' : 'Start Mission'}
          </button>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ user, onStartMission, onNavigate }) => {
  return (
    <div>
      <Header user={user} onNavigate={onNavigate} />
      <section>
        <h2 className="text-2xl font-bold text-green-800 mb-6">Available Missions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {MISSIONS.map(mission => (
            <MissionCard key={mission.id} mission={mission} onStartMission={onStartMission} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

import React, { useState, useCallback } from 'react';
import Dashboard from './components/Dashboard';
import MissionView from './components/MissionView';
import Leaderboard from './components/Leaderboard';
import { User, View } from './types';
import { LEADERBOARD_DATA } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [user, setUser] = useState<User>({
    uid: '123',
    name: 'Eco-Learner',
    ecoPoints: 0,
    completedMissions: [],
  });
  const [activeMissionId, setActiveMissionId] = useState<string | null>(null);

  const startMission = useCallback((missionId: string) => {
    setActiveMissionId(missionId);
    setCurrentView(View.MISSION);
  }, []);

  const completeMission = useCallback((missionId: string) => {
    if (!user.completedMissions.includes(missionId)) {
      setUser(prevUser => ({
        ...prevUser,
        ecoPoints: prevUser.ecoPoints + 25,
        completedMissions: [...prevUser.completedMissions, missionId],
      }));
    }
    setActiveMissionId(null);
    setCurrentView(View.DASHBOARD);
  }, [user.completedMissions]);

  const navigateTo = (view: View) => {
    setCurrentView(view);
  };
  
  const renderView = () => {
    switch (currentView) {
      case View.MISSION:
        return activeMissionId ? (
          <MissionView 
            missionId={activeMissionId} 
            onMissionComplete={completeMission}
            onExit={() => navigateTo(View.DASHBOARD)}
          />
        ) : <Dashboard user={user} onStartMission={startMission} onNavigate={navigateTo} />;
      case View.LEADERBOARD:
        const leaderboardWithUser = LEADERBOARD_DATA.map(item => item.name === 'You' ? {...item, points: user.ecoPoints} : item)
                                                    .sort((a, b) => b.points - a.points);
        return <Leaderboard leaderboardData={leaderboardWithUser} onNavigate={() => navigateTo(View.DASHBOARD)} />;
      case View.DASHBOARD:
      default:
        return <Dashboard user={user} onStartMission={startMission} onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 text-gray-800 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-7xl mx-auto">
        <div key={currentView} className="animate-fade-in-up">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
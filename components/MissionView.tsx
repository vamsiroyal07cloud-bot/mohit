import React, { useState } from 'react';
import VideoStage from './VideoStage';
import QuizStage from './QuizStage';
import GameStage from './GameStage';
import { MissionStage } from '../types';
import { MISSIONS } from '../constants';

interface MissionViewProps {
  missionId: string;
  onMissionComplete: (missionId: string) => void;
  onExit: () => void;
}

const MissionView: React.FC<MissionViewProps> = ({ missionId, onMissionComplete, onExit }) => {
  const [stage, setStage] = useState<MissionStage>(MissionStage.VIDEO);
  const mission = MISSIONS.find(m => m.id === missionId);

  if (!mission) {
    return (
      <div className="text-center">
        <p>Mission not found.</p>
        <button onClick={onExit} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Back to Dashboard</button>
      </div>
    );
  }

  const renderStage = () => {
    switch (stage) {
      case MissionStage.VIDEO:
        return <VideoStage onComplete={() => setStage(MissionStage.QUIZ)} videoUrl={mission.videoUrl} />;
      case MissionStage.QUIZ:
        return <QuizStage onComplete={() => setStage(MissionStage.GAME)} />;
      case MissionStage.GAME:
        return <GameStage onComplete={() => onMissionComplete(missionId)} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl animate-fade-in">
       <header className="flex justify-between items-center mb-6 border-b pb-4">
        <div className="flex items-center gap-4">
            <span className="text-4xl">{mission.icon}</span>
            <div>
                <h1 className="text-3xl font-bold text-green-800">{mission.title}</h1>
                <p className="text-gray-600">Complete all stages to earn Eco-Points!</p>
            </div>
        </div>
        <button 
            onClick={onExit}
            className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
        >
            Exit Mission
        </button>
      </header>
      {renderStage()}
    </div>
  );
};

export default MissionView;
import React, { useState } from 'react';
import { MissionStage } from '../types';
import { MISSIONS } from '../constants';
import VideoStage from './VideoStage';
import QuizStage from './QuizStage';
import GameStage from './GameStage';

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
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-red-600">Mission Not Found!</h2>
        <button onClick={onExit} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleVideoComplete = () => {
    setStage(MissionStage.QUIZ);
  };

  const handleQuizComplete = () => {
    setStage(MissionStage.GAME);
  };
  
  const handleGameComplete = () => {
    onMissionComplete(missionId);
  };

  const renderStage = () => {
    switch (stage) {
      case MissionStage.VIDEO:
        return <VideoStage onComplete={handleVideoComplete} videoUrl={mission.videoUrl} />;
      case MissionStage.QUIZ:
        return <QuizStage onComplete={handleQuizComplete} />;
      case MissionStage.GAME:
        return <GameStage onComplete={handleGameComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg animate-fade-in">
      <header className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-green-800">
          <span className="mr-3">{mission.icon}</span>
          {mission.title}
        </h1>
        <button
          onClick={onExit}
          className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
        >
          Exit Mission
        </button>
      </header>
      
      <div>
        {renderStage()}
      </div>
    </div>
  );
};

export default MissionView;

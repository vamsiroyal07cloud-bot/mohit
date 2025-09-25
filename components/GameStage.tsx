import React, { useState } from 'react';
import PlanetPatrolGame from './PlanetPatrolGame';

interface GameStageProps {
  onComplete: () => void;
}

const GameStage: React.FC<GameStageProps> = ({ onComplete }) => {
  const [gameStarted, setGameStarted] = useState(false);

  const handleGameComplete = (score: number) => {
    console.log(`Game finished with score: ${score}`);
    onComplete();
  };

  if (!gameStarted) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md animate-fade-in">
        <h2 className="text-2xl font-bold text-green-700 mb-2">Stage 3: Planet Patrol!</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Time to put your knowledge into action. Drag the items to the correct bin (Compost or Trash) as fast as you can!</p>
        <ul className="text-left max-w-md mx-auto list-disc list-inside mb-6 space-y-1 text-gray-700">
            <li><span className="font-bold text-green-600">Compost:</span> Fruit peels, vegetable scraps, eggshells, coffee grounds.</li>
            <li><span className="font-bold text-gray-600">Trash:</span> Plastics, batteries, styrofoam, anything not compostable.</li>
        </ul>
        <button
          onClick={() => setGameStarted(true)}
          className="px-8 py-3 bg-blue-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
        >
          Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
        <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">Stage 3: Planet Patrol!</h2>
        <PlanetPatrolGame onGameComplete={handleGameComplete} />
    </div>
  );
};

export default GameStage;

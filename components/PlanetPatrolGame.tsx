import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameItem } from '../types';
import { GAME_ITEMS, TOTAL_GAME_ITEMS } from './gameData';

interface PlanetPatrolGameProps {
  onGameComplete: (score: number) => void;
}

const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const PlanetPatrolGame: React.FC<PlanetPatrolGameProps> = ({ onGameComplete }) => {
  const [items, setItems] = useState<GameItem[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<'playing' | 'finished'>('playing');
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const [draggedItem, setDraggedItem] = useState<{ item: GameItem; offset: { x: number; y: number } } | null>(null);

  const setupGame = useCallback(() => {
    const shuffledItems = shuffleArray(GAME_ITEMS).slice(0, TOTAL_GAME_ITEMS);
    if (gameAreaRef.current) {
      const { width, height } = gameAreaRef.current.getBoundingClientRect();
      const newItems = shuffledItems.map(item => ({
        ...item,
        x: Math.random() * (width - 80) + 20,
        y: Math.random() * (height - 200) + 20,
      }));
      setItems(newItems);
    }
  }, []);

  useEffect(() => {
    const timerId = setTimeout(setupGame, 100);
    return () => clearTimeout(timerId);
  }, [setupGame]);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === 'playing' && timeLeft <= 0) {
      setGameState('finished');
    }
  }, [timeLeft, gameState]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, item: GameItem) => {
    if (gameState !== 'playing' || draggedItem) return;
    const { clientX, clientY } = e;
    const rect = e.currentTarget.getBoundingClientRect();
    setDraggedItem({
      item,
      offset: { x: clientX - rect.left, y: clientY - rect.top },
    });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!draggedItem || !gameAreaRef.current) return;
    e.preventDefault();
    const { clientX, clientY } = e;
    const gameAreaRect = gameAreaRef.current.getBoundingClientRect();
    const newX = clientX - gameAreaRect.left - draggedItem.offset.x;
    const newY = clientY - gameAreaRect.top - draggedItem.offset.y;
    setItems(prevItems =>
      prevItems.map(i => (i.id === draggedItem.item.id ? { ...i, x: newX, y: newY } : i))
    );
  }, [draggedItem]);

  const handleMouseUp = useCallback((e: MouseEvent) => {
    if (!draggedItem || !gameAreaRef.current) return;

    const compostBin = gameAreaRef.current.querySelector('#compost-bin') as HTMLElement;
    const trashBin = gameAreaRef.current.querySelector('#trash-bin') as HTMLElement;

    if (compostBin && trashBin) {
      const { clientX, clientY } = e;
      const compostRect = compostBin.getBoundingClientRect();
      const trashRect = trashBin.getBoundingClientRect();
      const isOverCompost = clientX >= compostRect.left && clientX <= compostRect.right && clientY >= compostRect.top && clientY <= compostRect.bottom;
      const isOverTrash = clientX >= trashRect.left && clientX <= trashRect.right && clientY >= trashRect.top && clientY <= trashRect.bottom;

      let correctDrop = false;
      if (isOverCompost && draggedItem.item.type === 'compost') {
        correctDrop = true;
        setScore(s => s + 10);
      } else if (isOverTrash && draggedItem.item.type === 'trash') {
        correctDrop = true;
        setScore(s => s + 10);
      } else if (isOverCompost || isOverTrash) {
        setScore(s => Math.max(0, s - 5));
      }

      if (correctDrop) {
        setItems(prev => {
          const newItems = prev.filter(i => i.id !== draggedItem.item.id);
          if (newItems.length === 0) {
            setGameState('finished');
          }
          return newItems;
        });
      }
    }
    setDraggedItem(null);
  }, [draggedItem]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  if (gameState === 'finished') {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md animate-fade-in">
        <h2 className="text-2xl font-bold mb-4">Game Over! 🌍</h2>
        <p className="text-xl font-semibold mb-4 text-green-600">You scored {score} points!</p>
        <p className="text-gray-700 mb-6">Great job protecting the planet!</p>
        <button
          onClick={() => onGameComplete(score)}
          className="px-8 py-3 bg-green-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
        >
          Complete Mission
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-blue-100 rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4 text-gray-700">
        <div className="font-bold text-xl">Score: <span className="text-green-600">{score}</span></div>
        <div className="font-bold text-xl">Time: <span className="text-red-500">{timeLeft}s</span></div>
      </div>
      <div ref={gameAreaRef} className="relative w-full h-[60vh] bg-green-200/50 rounded-md border-2 border-dashed border-green-400 overflow-hidden touch-none">
        {items.map(item => (
          <div
            key={item.id}
            onMouseDown={e => handleMouseDown(e, item)}
            className="absolute text-4xl cursor-grab select-none"
            style={{
              left: `${item.x}px`,
              top: `${item.y}px`,
              zIndex: draggedItem?.item.id === item.id ? 10 : 1,
              cursor: draggedItem?.item.id === item.id ? 'grabbing' : 'grab',
            }}
          >
            {item.emoji}
          </div>
        ))}
        <div id="compost-bin" className="absolute bottom-4 left-4 w-32 h-32 bg-green-500/80 rounded-lg flex flex-col justify-center items-center text-white font-bold pointer-events-none">
          <span className="text-4xl">♻️</span>
          <span>Compost</span>
        </div>
        <div id="trash-bin" className="absolute bottom-4 right-4 w-32 h-32 bg-gray-500/80 rounded-lg flex flex-col justify-center items-center text-white font-bold pointer-events-none">
          <span className="text-4xl">🗑️</span>
          <span>Trash</span>
        </div>
      </div>
    </div>
  );
};

export default PlanetPatrolGame;

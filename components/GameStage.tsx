
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameItem } from '../types';

interface GameStageProps {
  onComplete: () => void;
}

const ITEMS_TO_SORT = 5;
const INITIAL_ITEMS: Omit<GameItem, 'id' | 'x' | 'y'>[] = [
    { emoji: '🍌', type: 'compost' },
    { emoji: '🍎', type: 'compost' },
    { emoji: '🔋', type: 'trash' },
    { emoji: '📱', type: 'trash' },
    { emoji: ' newspaper', type: 'compost' },
    { emoji: ' plastic bottle', type: 'trash' },
    { emoji: ' egg shells', type: 'compost' },
    { emoji: ' light bulb', type: 'trash' },
];

const GameStage: React.FC<GameStageProps> = ({ onComplete }) => {
    const [items, setItems] = useState<GameItem[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [draggedItem, setDraggedItem] = useState<number | null>(null);
    const gameAreaRef = useRef<HTMLDivElement>(null);

    const generateItem = useCallback(() => {
        if (!gameAreaRef.current) return;
        const gameAreaWidth = gameAreaRef.current.offsetWidth;
        const randomItem = INITIAL_ITEMS[Math.floor(Math.random() * INITIAL_ITEMS.length)];
        const newItem: GameItem = {
            ...randomItem,
            id: Date.now() + Math.random(),
            y: -50,
            x: Math.random() * (gameAreaWidth - 50),
        };
        setItems(prev => [...prev, newItem]);
    }, []);

    useEffect(() => {
        const gameLoop = setInterval(() => {
            setItems(prevItems =>
                prevItems
                    .map(item => ({ ...item, y: item.y + 2 }))
                    .filter(item => item.y < (gameAreaRef.current?.offsetHeight || 600))
            );
        }, 16);

        const itemGenerator = setInterval(() => {
            if (items.length < 3) {
                 generateItem();
            }
        }, 2000);

        return () => {
            clearInterval(gameLoop);
            clearInterval(itemGenerator);
        };
    }, [items.length, generateItem]);
    
    useEffect(() => {
        if (score >= ITEMS_TO_SORT) {
            setGameOver(true);
        }
    }, [score]);


    const handleDrop = (binType: 'compost' | 'trash') => {
        if (draggedItem === null) return;

        const item = items.find(i => i.id === draggedItem);
        if (item) {
            if (item.type === binType) {
                setScore(prev => prev + 1);
            }
            setItems(prev => prev.filter(i => i.id !== draggedItem));
        }
        setDraggedItem(null);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    if (gameOver) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-xl animate-fade-in">
                <h2 className="text-3xl font-bold text-green-600 mb-4">Mission Complete!</h2>
                <p className="text-xl text-yellow-500 font-semibold mb-6">+25 Eco-Points!</p>
                <p className="text-gray-700 mb-8">You've successfully sorted the scraps and helped clean up!</p>
                <button
                    onClick={onComplete}
                    className="px-10 py-4 bg-blue-500 text-white font-bold text-xl rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
                >
                    Claim Reward & Return to Dashboard
                </button>
            </div>
        );
    }
    
    return (
        <div className="text-center animate-fade-in">
            <h2 className="text-2xl font-bold text-green-700 mb-2">Stage 3: Sort the Scraps!</h2>
            <p className="text-gray-600 mb-4">Drag and drop the falling items into the correct bins. Sort {ITEMS_TO_SORT} items to win!</p>
            <p className="text-xl font-bold text-blue-600 mb-4">Score: {score} / {ITEMS_TO_SORT}</p>
            
            <div ref={gameAreaRef} className="relative w-full h-[500px] bg-green-200/50 border-4 border-dashed border-green-400 rounded-lg overflow-hidden">
                {items.map(item => (
                    <div
                        key={item.id}
                        draggable
                        onDragStart={() => setDraggedItem(item.id)}
                        className="absolute text-4xl cursor-pointer"
                        style={{ left: `${item.x}px`, top: `${item.y}px` }}
                    >
                        {item.emoji}
                    </div>
                ))}
                
                <div className="absolute bottom-0 left-0 right-0 h-32 flex justify-around items-end p-4">
                    <div
                        onDrop={() => handleDrop('compost')}
                        onDragOver={handleDragOver}
                        className="w-40 h-28 bg-yellow-700/80 rounded-t-lg flex flex-col justify-center items-center text-white font-bold shadow-inner"
                    >
                        <span className="text-3xl">🌿</span>
                        <span>Compost</span>
                    </div>
                    <div
                        onDrop={() => handleDrop('trash')}
                        onDragOver={handleDragOver}
                        className="w-40 h-28 bg-gray-600/80 rounded-t-lg flex flex-col justify-center items-center text-white font-bold shadow-inner"
                    >
                        <span className="text-3xl">🗑️</span>
                        <span>Trash</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameStage;

import React from 'react';

interface VideoStageProps {
  onComplete: () => void;
  videoUrl: string;
}

const VideoStage: React.FC<VideoStageProps> = ({ onComplete, videoUrl }) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Stage 1: Watch & Learn</h2>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Watch this video to understand the basics of this topic. Pay close attention to the facts presented!</p>
      
      <div className="aspect-w-16 aspect-h-9 max-w-3xl mx-auto bg-black rounded-lg shadow-2xl overflow-hidden mb-8">
        <iframe 
            width="100%" 
            height="100%" 
            src={videoUrl} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="w-full h-full"
        ></iframe>
      </div>
      
      <button 
        onClick={onComplete}
        className="px-8 py-3 bg-green-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
      >
        I've Watched the Video, Start Quiz!
      </button>
    </div>
  );
};

export default VideoStage;
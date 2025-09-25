
import React, { useState } from 'react';
import { SOIL_QUIZ_QUESTIONS } from '../constants';

interface QuizStageProps {
  onComplete: () => void;
}

const QuizStage: React.FC<QuizStageProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = SOIL_QUIZ_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];
  const passingScore = 7;

  const handleAnswer = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    if (option === currentQuestion.correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const getButtonClass = (option: string) => {
    const baseClasses = 'w-full text-left p-4 rounded-lg border-2 transition-all duration-300';
    if (!isAnswered) {
      return `${baseClasses} bg-white hover:bg-green-100 hover:border-green-300`;
    }

    const isCorrect = option === currentQuestion.correct;
    const isSelected = option === selectedOption;

    if (isCorrect) {
      return `${baseClasses} bg-green-200 border-green-500 animate-pop`;
    }
    if (isSelected && !isCorrect) {
      return `${baseClasses} bg-red-200 border-red-500 animate-shake`;
    }
    return `${baseClasses} bg-white opacity-60 border-gray-200`;
  };

  if (quizFinished) {
    const passed = score >= passingScore;
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md animate-fade-in-up">
        <h2 className="text-2xl font-bold mb-4">{passed ? 'Congratulations! 🎉' : 'Nice Try! 🤔'}</h2>
        <p className={`text-xl font-semibold mb-4 ${passed ? 'text-green-600' : 'text-red-600'}`}>
          You scored {score} out of {questions.length}.
        </p>
        {passed ? (
          <>
            <p className="text-gray-700 mb-6">You passed the quiz! Time for the final challenge.</p>
            <button
              onClick={onComplete}
              className="px-8 py-3 bg-blue-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
            >
              You Passed! Let's Play the Game!
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-700 mb-6">You need at least {passingScore} correct answers to pass. Please review the video and try again.</p>
            <button
              onClick={() => {
                setCurrentQuestionIndex(0);
                setScore(0);
                setSelectedOption(null);
                setIsAnswered(false);
                setQuizFinished(false);
              }}
              className="px-8 py-3 bg-yellow-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
            >
              Retry Quiz
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-700 mb-2">Stage 2: Quiz Challenge</h2>
      <div className="flex justify-between items-baseline mb-6">
        <p className="text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
        <p className="font-semibold text-green-600">Score: {score}</p>
      </div>
      
      <p className="text-lg font-semibold text-gray-800 mb-6 min-h-[56px]">{currentQuestion.question}</p>
      
      <div className="space-y-3">
        {currentQuestion.options.map(option => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            disabled={isAnswered}
            className={getButtonClass(option)}
          >
            {option}
          </button>
        ))}
      </div>
      
      {isAnswered && (
        <div className="mt-6 text-right animate-fade-in-up">
          <button 
            onClick={handleNext}
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-200"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizStage;
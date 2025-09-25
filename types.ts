export interface User {
  uid: string;
  name: string;
  ecoPoints: number;
  completedMissions: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: string;
}

export interface GameItem {
  id: number;
  emoji: string;
  type: 'compost' | 'trash';
  x: number;
  y: number;
}

export interface Mission {
    id: string;
    title: string;
    description: string;
    icon: string;
    disabled: boolean;
    videoUrl: string;
}

export enum View {
  DASHBOARD = 'DASHBOARD',
  MISSION = 'MISSION',
  LEADERBOARD = 'LEADERBOARD',
}

export enum MissionStage {
    VIDEO = 'VIDEO',
    QUIZ = 'QUIZ',
    GAME = 'GAME',
}
import { QuizQuestion, Mission } from './types';

export const SOIL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {"question":"What does the video say is a major cause of soil pollution?","options":["Planting too many trees","Trash from homes and factories","Heavy rain"],"correct":"Trash from homes and factories"},
  {"question":"When trash is buried in a landfill, what harmful greenhouse gas does it release?","options":["Oxygen","Methane","Helium"],"correct":"Methane"},
  {"question":"According to the video, what is the most important thing you can do to control waste?","options":["Bury it deep in the ground","Produce less of it","Mix it all together"],"correct":"Produce less of it"},
  {"question":"Which of the following is NOT a health problem caused by harmful chemicals from soil pollution?","options":["Cancers","Broken bones","Skin problems"],"correct":"Broken bones"},
  {"question":"What is a simple way the video suggests to reduce waste in your daily life?","options":["Use a plastic bottle instead of a cup","Use extra paper towels","Dispose of batteries properly"],"correct":"Dispose of batteries properly"},
  {"question":"In 'Trivia Time', how much topsoil does the planet lose each year because of land pollution?","options":["1 million tons","24 billion tons","100 tons"],"correct":"24 billion tons"},
  {"question":"What percentage of the world's forests has already been destroyed?","options":["10%","50%","80%"],"correct":"80%"},
  {"question":"What is NOT mentioned as a component of soil pollution?","options":["Poisonous chemicals","Clean water","Debris"],"correct":"Clean water"},
  {"question":"What happens when the level of toxic substances in the soil increases enough to cause damage?","options":["The soil becomes more fertile","The soil is said to be contaminated","Plants grow faster"],"correct":"The soil is said to be contaminated"},
  {"question":"What is a suggested alternative to using plastic bottles for drinking water?","options":["Drinking from a cup","Using a paper bag","Drinking directly from the tap"],"correct":"Drinking from a cup"}
];

export const MISSIONS: Mission[] = [
    { id: 'soil', title: 'Soil Pollution', description: 'Learn about the causes and effects of soil pollution.', icon: '🌱', disabled: false, videoUrl: 'https://jumpshare.com/embed/T80vtZf0fIz2K6PAg4VS' },
    { id: 'air', title: 'Air Pollution', description: 'Discover the sources of air pollution and how to combat it.', icon: '💨', disabled: false, videoUrl: 'https://jumpshare.com/embed/adEfJvfxNjQL82Yo33bQ' },
    { id: 'water', title: 'Water Pollution', description: 'Explore the impact of pollution on our water systems.', icon: '💧', disabled: false, videoUrl: 'https://jumpshare.com/embed/DK6jBvmS2SRpZ2ov6Oyv' },
    { id: 'noise', title: 'Noise Pollution', description: 'Understand the hidden dangers of noise pollution.', icon: '🔊', disabled: false, videoUrl: 'https://jumpshare.com/embed/nTUpqpgsnIuXGGd3Geag' },
];

export const LEADERBOARD_DATA = [
    { name: 'EcoWarrior', points: 1250 },
    { name: 'GreenGuardian', points: 1100 },
    { name: 'PlanetProtector', points: 950 },
    { name: 'NatureNinja', points: 800 },
    { name: 'You', points: 0 },
    { name: 'RecycleRanger', points: 600 },
    { name: 'EarthEnthusiast', points: 450 },
];
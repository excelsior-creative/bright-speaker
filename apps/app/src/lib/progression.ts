import type { UserProgress } from "./sessions";

export interface LevelDefinition {
  level: number;
  name: string;
  world: string;
  emoji: string;
  minXp: number;
  colorClass: string;
  reward: string;
  focus: string;
}

export interface LevelProgress {
  currentLevel: LevelDefinition;
  nextLevel: LevelDefinition | null;
  xpIntoLevel: number;
  xpForThisLevel: number;
  xpToNextLevel: number;
  percentToNextLevel: number;
}

export interface Milestone {
  label: string;
  remaining: number;
  emoji: string;
  description: string;
}

export interface QuestRecommendation {
  promptId: number;
  title: string;
  description: string;
  emoji: string;
  xp: number;
  world: string;
}

export const LEVELS: LevelDefinition[] = [
  {
    level: 1,
    name: "First Spark",
    world: "Campfire Cove",
    emoji: "🔥",
    minXp: 0,
    colorClass: "from-warm-coral to-warm-gold",
    reward: "Unlock your first speaking badge",
    focus: "Start strong and finish a 60-second practice",
  },
  {
    level: 2,
    name: "Warm-Up Wanderer",
    world: "Storybook Trail",
    emoji: "🗺️",
    minXp: 100,
    colorClass: "from-warm-gold to-warm-teal",
    reward: "New story quests feel easier",
    focus: "Use a beginning, middle, and ending",
  },
  {
    level: 3,
    name: "Clear Voice Climber",
    world: "Echo Mountain",
    emoji: "⛰️",
    minXp: 250,
    colorClass: "from-warm-teal to-sky-400",
    reward: "Unlock stronger pacing challenges",
    focus: "Speak clearly with steady pacing",
  },
  {
    level: 4,
    name: "Eye Contact Explorer",
    world: "Focus Forest",
    emoji: "🌲",
    minXp: 500,
    colorClass: "from-emerald-400 to-warm-teal",
    reward: "Unlock camera-confidence challenges",
    focus: "Look up while keeping your idea moving",
  },
  {
    level: 5,
    name: "Debate Adventurer",
    world: "Debate Arena",
    emoji: "🛡️",
    minXp: 1000,
    colorClass: "from-warm-coral to-purple-500",
    reward: "Unlock opinion and debate quests",
    focus: "Give reasons that convince your listener",
  },
  {
    level: 6,
    name: "Presentation Pro",
    world: "Showcase City",
    emoji: "🏙️",
    minXp: 2000,
    colorClass: "from-purple-500 to-warm-gold",
    reward: "Unlock longer showcase missions",
    focus: "Organize facts, examples, and a strong ending",
  },
  {
    level: 7,
    name: "Bright Speaker Legend",
    world: "Legend League",
    emoji: "🏆",
    minXp: 5000,
    colorClass: "from-warm-gold to-warm-coral",
    reward: "Legend status — keep your streak alive",
    focus: "Coach yourself like a confident speaker",
  },
];

const QUESTS: QuestRecommendation[] = [
  {
    promptId: 1,
    title: "First Spark Quest",
    description: "Tell a funny story and earn your first campfire spark.",
    emoji: "🔥",
    xp: 25,
    world: "Campfire Cove",
  },
  {
    promptId: 2,
    title: "Explorer Postcard",
    description: "Describe your favorite place with details people can picture.",
    emoji: "🌴",
    xp: 25,
    world: "Storybook Trail",
  },
  {
    promptId: 3,
    title: "Step-by-Step Snack Lab",
    description: "Guide someone through a sandwich mission in the right order.",
    emoji: "🥪",
    xp: 50,
    world: "Echo Mountain",
  },
  {
    promptId: 4,
    title: "Inventor Workshop",
    description: "Pitch an invention with a problem, solution, and wow moment.",
    emoji: "💡",
    xp: 50,
    world: "Focus Forest",
  },
  {
    promptId: 5,
    title: "Debate Arena",
    description: "Pick cats or dogs and defend your side with three reasons.",
    emoji: "🛡️",
    xp: 100,
    world: "Debate Arena",
  },
  {
    promptId: 6,
    title: "Showcase Report",
    description: "Share a book report like a presentation pro.",
    emoji: "📚",
    xp: 100,
    world: "Showcase City",
  },
];

export function getLevelDefinition(level: number): LevelDefinition {
  if (level <= LEVELS[0].level) return LEVELS[0];

  for (const definition of LEVELS) {
    if (definition.level === level) return definition;
  }

  return LEVELS[LEVELS.length - 1];
}

export function getLevelProgress(xp: number): LevelProgress {
  const safeXp = Math.max(0, xp);
  let currentLevel = LEVELS[0];

  for (const level of LEVELS) {
    if (safeXp >= level.minXp) currentLevel = level;
  }

  let nextLevel: LevelDefinition | null = null;
  for (const level of LEVELS) {
    if (level.minXp > currentLevel.minXp) {
      nextLevel = level;
      break;
    }
  }
  const xpIntoLevel = safeXp - currentLevel.minXp;

  if (!nextLevel) {
    return {
      currentLevel,
      nextLevel: null,
      xpIntoLevel,
      xpForThisLevel: 0,
      xpToNextLevel: 0,
      percentToNextLevel: 100,
    };
  }

  const xpForThisLevel = nextLevel.minXp - currentLevel.minXp;
  const xpToNextLevel = Math.max(0, nextLevel.minXp - safeXp);

  return {
    currentLevel,
    nextLevel,
    xpIntoLevel,
    xpForThisLevel,
    xpToNextLevel,
    percentToNextLevel: Math.min(100, Math.round((xpIntoLevel / xpForThisLevel) * 100)),
  };
}

export function getNextMilestone(progress: UserProgress): Milestone {
  if (progress.badges.indexOf("Streak 3") === -1 && progress.streak < 3) {
    return {
      label: "3-day streak",
      remaining: 3 - progress.streak,
      emoji: "🔥",
      description: "Practice on a few different days to light up your streak badge.",
    };
  }

  if (progress.badges.indexOf("10 Sessions") === -1 && progress.totalSessions < 10) {
    return {
      label: "10 Sessions badge",
      remaining: 10 - progress.totalSessions,
      emoji: "🏅",
      description: "Complete more speaking quests to fill your badge case.",
    };
  }

  const levelProgress = getLevelProgress(progress.xp);
  if (levelProgress.nextLevel) {
    return {
      label: `Level ${levelProgress.nextLevel.level}: ${levelProgress.nextLevel.name}`,
      remaining: levelProgress.xpToNextLevel,
      emoji: levelProgress.nextLevel.emoji,
      description: `Earn XP to reach ${levelProgress.nextLevel.world}.`,
    };
  }

  return {
    label: "Legend streak",
    remaining: 1,
    emoji: "🏆",
    description: "Keep practicing to stay sharp in Legend League.",
  };
}

export function getRecommendedQuest(progress: UserProgress): QuestRecommendation {
  if (progress.totalSessions === 0) return QUESTS[0];
  if (progress.level >= 5) return QUESTS[4];
  if (progress.level >= 4) return QUESTS[3];
  if (progress.level >= 3) return QUESTS[2];
  return QUESTS[Math.min(progress.level - 1, QUESTS.length - 1)];
}

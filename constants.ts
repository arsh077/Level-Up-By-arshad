import { ActivityLevel, Goal } from "./types";

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  [ActivityLevel.SEDENTARY]: 1.2,
  [ActivityLevel.LIGHT]: 1.375,
  [ActivityLevel.MODERATE]: 1.55,
  [ActivityLevel.VERY_ACTIVE]: 1.725,
  [ActivityLevel.EXTRA_ACTIVE]: 1.9,
};

export const GOAL_MODIFIERS: Record<Goal, number> = {
  [Goal.LOSE_WEIGHT]: -500,
  [Goal.MAINTAIN]: 0,
  [Goal.GAIN_MUSCLE]: 300,
};

export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  [ActivityLevel.SEDENTARY]: 'Sedentary (Office Job)',
  [ActivityLevel.LIGHT]: 'Lightly Active (1-2 days/week)',
  [ActivityLevel.MODERATE]: 'Moderately Active (3-5 days/week)',
  [ActivityLevel.VERY_ACTIVE]: 'Very Active (6-7 days/week)',
  [ActivityLevel.EXTRA_ACTIVE]: 'Extra Active (Physical Job)',
};

export const GOAL_LABELS: Record<Goal, string> = {
  [Goal.LOSE_WEIGHT]: 'Lose Weight',
  [Goal.MAINTAIN]: 'Maintain Weight',
  [Goal.GAIN_MUSCLE]: 'Gain Muscle',
};
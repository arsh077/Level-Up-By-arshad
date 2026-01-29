
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other'
}

export enum ActivityLevel {
  SEDENTARY = 'sedentary',
  LIGHT = 'light',
  MODERATE = 'moderate',
  VERY_ACTIVE = 'very_active',
  EXTRA_ACTIVE = 'extra_active'
}

export enum Goal {
  LOSE_WEIGHT = 'lose_weight',
  MAINTAIN = 'maintain',
  GAIN_MUSCLE = 'gain_muscle'
}

export interface MealItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  quantity: number;
  unit: string;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  meals: {
    breakfast: MealItem[];
    lunch: MealItem[];
    dinner: MealItem[];
    snacks: MealItem[];
  };
  water: number; // glasses
  steps: number;
  sleep: number; // hours
  mood: 'great' | 'fine' | 'low' | 'cravings' | null;
  notes: string;
}

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  height: number;
  weight: number;
  targetWeight: number;
  targetDate: string;
  activity: ActivityLevel;
  dietType: string[];
  region: string;
  spiceLevel: number;
  cookingStyle: string[];
  shortGoal: string;
  
  // Calculated Stats
  bmr: number;
  tdee: number;
  targetCalories: number;
  macroTargets: {
    protein: number;
    carbs: number;
    fats: number;
  };
  
  onboardingComplete: boolean;
  createdAt: string;
}

export const MOCK_USER: UserProfile = {
  id: 'guest',
  name: 'Guest',
  age: 25,
  gender: Gender.MALE,
  height: 175,
  weight: 80,
  targetWeight: 75,
  targetDate: '2024-12-31',
  activity: ActivityLevel.MODERATE,
  dietType: [],
  region: 'North',
  spiceLevel: 2,
  cookingStyle: [],
  shortGoal: '',
  bmr: 1800,
  tdee: 2200,
  targetCalories: 2000,
  macroTargets: { protein: 150, carbs: 200, fats: 60 },
  onboardingComplete: false,
  createdAt: new Date().toISOString()
};

// Newly added types
export type Page = 'home' | 'story' | 'calculator' | 'features' | 'waitlist' | 'admin';

export interface UserMetrics {
  gender: Gender;
  age: number;
  height: number;
  weight: number;
  activity: ActivityLevel;
  goal: Goal;
}

export interface CalculatorResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  macros: {
    protein: number;
    fats: number;
    carbs: number;
  };
}

export interface WaitlistEntry {
  name: string;
  email: string;
  phone?: string;
  goal: string;
  date: string;
}

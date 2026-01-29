
import { UserProfile, DailyLog, MOCK_USER, WaitlistEntry } from '../types';

const USER_KEY = 'levelup_user_profile';
const LOGS_KEY = 'levelup_daily_logs';
const WAITLIST_KEY = 'levelup_waitlist';

// --- USER PROFILE ---

export const getUserProfile = (): UserProfile | null => {
  try {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to parse user profile", error);
    return null;
  }
};

export const saveUserProfile = (profile: UserProfile): void => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error("Failed to save user profile", error);
  }
};

// --- DAILY LOGS ---

export const getDailyLogs = (): Record<string, DailyLog> => {
  try {
    const data = localStorage.getItem(LOGS_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Failed to parse daily logs", error);
    return {};
  }
};

export const getLogForDate = (date: string): DailyLog => {
  const logs = getDailyLogs();
  if (logs[date]) return logs[date];

  // Return empty structure if not found
  return {
    date,
    meals: { breakfast: [], lunch: [], dinner: [], snacks: [] },
    water: 0,
    steps: 0,
    sleep: 0,
    mood: null,
    notes: ''
  };
};

export const saveLogForDate = (date: string, data: DailyLog): void => {
  try {
    const logs = getDailyLogs();
    logs[date] = data;
    localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
  } catch (error) {
    console.error("Failed to save log", error);
  }
};

// --- WAITLIST ---

export const saveUser = async (entry: WaitlistEntry): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
        const currentList = getWaitlist();
        currentList.push(entry);
        localStorage.setItem(WAITLIST_KEY, JSON.stringify(currentList));
        return true;
    } catch (error) {
        console.error("Failed to save to waitlist", error);
        return false;
    }
};

export const getWaitlist = (): WaitlistEntry[] => {
    try {
        const data = localStorage.getItem(WAITLIST_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Failed to get waitlist", error);
        return [];
    }
};

export const clearWaitlist = (): void => {
    localStorage.removeItem(WAITLIST_KEY);
};

// --- HELPERS ---

export const calculateMacros = (profile: UserProfile) => {
  // Recalculate based on profile data
  // Mifflin-St Jeor
  let bmr = (10 * profile.weight) + (6.25 * profile.height) - (5 * profile.age);
  bmr += profile.gender === 'male' ? 5 : -161;

  const activityMultipliers: Record<string, number> = {
    'sedentary': 1.2,
    'light': 1.375,
    'moderate': 1.55,
    'very_active': 1.725,
    'extra_active': 1.9
  };

  const tdee = Math.round(bmr * (activityMultipliers[profile.activity] || 1.2));
  
  // Deficit/Surplus Logic
  let targetCalories = tdee;
  // Simple heuristic: Lose weight = -500, Gain = +300
  if (profile.targetWeight < profile.weight) targetCalories -= 500;
  else if (profile.targetWeight > profile.weight) targetCalories += 300;

  // Macro Split (High Protein focus)
  const protein = Math.round(profile.weight * 2.0); // 2g per kg
  const fats = Math.round((targetCalories * 0.25) / 9); // 25% fat
  const carbs = Math.round((targetCalories - (protein * 4) - (fats * 9)) / 4);

  return {
    bmr,
    tdee,
    targetCalories,
    macroTargets: { protein, fats, carbs }
  };
};

export const clearAllData = () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(LOGS_KEY);
    localStorage.removeItem(WAITLIST_KEY);
}

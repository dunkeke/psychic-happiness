// 任务类型
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  points: number;
  category: 'daily' | 'weekly' | 'special';
  createdAt: Date;
  completedAt?: Date;
  assignedTo?: 'me' | 'partner' | 'both';
}

// 纪念日类型
export interface Anniversary {
  id: string;
  title: string;
  date: Date;
  icon: string;
  isRecurring: boolean;
}

// 记账类型
export interface Expense {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
  paidBy: 'me' | 'partner';
}

export interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: Date;
  icon: string;
}

// 打卡类型
export interface CheckIn {
  id: string;
  date: Date;
  mood: 'happy' | 'loved' | 'excited' | 'calm' | 'tired';
  message?: string;
  checkedBy: 'me' | 'partner';
}

// 留言类型
export interface Message {
  id: string;
  content: string;
  author: 'me' | 'partner';
  createdAt: Date;
  likes: number;
  isLiked?: boolean;
}

// 愿望类型
export interface Wish {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: 'travel' | 'food' | 'experience' | 'gift' | 'other';
  createdAt: Date;
  completedAt?: Date;
}

// 奖励券类型
export interface RewardCoupon {
  id: string;
  title: string;
  description: string;
  cost: number;
  icon: string;
  used: boolean;
  usedAt?: Date;
  category: 'service' | 'privilege' | 'experience';
}

// 成就类型
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  requirement: number;
  current: number;
}

// 用户状态
export interface UserState {
  points: number;
  totalPointsEarned: number;
  streak: number;
  lastCheckIn?: Date;
  level: number;
  title: string;
}

// 心情类型
export type Mood = 'happy' | 'loved' | 'excited' | 'calm' | 'tired';

export const MoodConfig: Record<Mood, { emoji: string; label: string; color: string }> = {
  happy: { emoji: '😊', label: '开心', color: '#FFD93D' },
  loved: { emoji: '🥰', label: '被爱', color: '#FF6B9D' },
  excited: { emoji: '🤩', label: '兴奋', color: '#FF8C42' },
  calm: { emoji: '😌', label: '平静', color: '#6BCB77' },
  tired: { emoji: '😴', label: '疲惫', color: '#9B9B9B' },
};

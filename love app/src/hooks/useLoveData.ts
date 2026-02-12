import { useState, useCallback } from 'react';
import type {
  Task, Anniversary, Expense, SavingsGoal, CheckIn,
  Message, Wish, RewardCoupon, Achievement, UserState, Mood
} from '@/types';

// 生成唯一ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// 初始数据
const initialTasks: Task[] = [
  { id: generateId(), title: '早安吻', description: '给彼此一个温暖的早安吻', completed: false, points: 5, category: 'daily', createdAt: new Date(), assignedTo: 'both' },
  { id: generateId(), title: '一起做饭', description: '一起准备今天的晚餐', completed: false, points: 15, category: 'daily', createdAt: new Date(), assignedTo: 'both' },
  { id: generateId(), title: '说晚安', description: '睡前互道晚安', completed: false, points: 5, category: 'daily', createdAt: new Date(), assignedTo: 'both' },
];

const initialAnniversaries: Anniversary[] = [
  { id: generateId(), title: '在一起', date: new Date('2024-01-01'), icon: '💕', isRecurring: true },
  { id: generateId(), title: '第一次约会', date: new Date('2023-12-25'), icon: '🌹', isRecurring: false },
];

const initialSavingsGoals: SavingsGoal[] = [
  { id: generateId(), title: '旅行基金', targetAmount: 10000, currentAmount: 3500, icon: '✈️' },
  { id: generateId(), title: '新房首付', targetAmount: 500000, currentAmount: 120000, icon: '🏠' },
];

const initialMessages: Message[] = [
  { id: generateId(), content: '今天也是爱你的一天！💕', author: 'partner', createdAt: new Date(Date.now() - 3600000), likes: 3 },
  { id: generateId(), content: '晚上想吃什么？我给你做~', author: 'me', createdAt: new Date(Date.now() - 7200000), likes: 5 },
];

const initialWishes: Wish[] = [
  { id: generateId(), title: '去日本看樱花', description: '春天一起去京都看樱花', completed: false, category: 'travel', createdAt: new Date() },
  { id: generateId(), title: '学做蛋糕', description: '一起学做提拉米苏', completed: true, category: 'experience', createdAt: new Date(), completedAt: new Date() },
];

const initialCoupons: RewardCoupon[] = [
  { id: generateId(), title: '按摩券', description: '享受一次30分钟的专业按摩', cost: 50, icon: '💆', used: false, category: 'service' },
  { id: generateId(), title: '免洗碗券', description: '今天不用洗碗，交给对方', cost: 30, icon: '🍽️', used: false, category: 'privilege' },
  { id: generateId(), title: '电影之夜', description: '选择一部喜欢的电影，对方陪同观看', cost: 40, icon: '🎬', used: false, category: 'experience' },
  { id: generateId(), title: '早餐券', description: '对方为你准备爱心早餐', cost: 35, icon: '🥐', used: false, category: 'service' },
  { id: generateId(), title: '撒娇券', description: '可以任意撒娇，对方必须配合', cost: 20, icon: '🥺', used: false, category: 'privilege' },
  { id: generateId(), title: '约会券', description: '安排一次浪漫约会', cost: 60, icon: '💑', used: false, category: 'experience' },
];

const initialAchievements: Achievement[] = [
  { id: generateId(), title: '甜蜜新手', description: '完成第一个任务', icon: '🌱', unlocked: true, unlockedAt: new Date(), requirement: 1, current: 1 },
  { id: generateId(), title: '任务达人', description: '累计完成10个任务', icon: '⭐', unlocked: false, requirement: 10, current: 0 },
  { id: generateId(), title: '打卡狂魔', description: '连续打卡7天', icon: '🔥', unlocked: false, requirement: 7, current: 0 },
  { id: generateId(), title: '储蓄小能手', description: '储蓄目标达成50%', icon: '💰', unlocked: false, requirement: 50, current: 0 },
  { id: generateId(), title: '情话高手', description: '发送10条留言', icon: '💌', unlocked: false, requirement: 10, current: 2 },
  { id: generateId(), title: '愿望实现家', description: '完成5个愿望', icon: '✨', unlocked: false, requirement: 5, current: 1 },
];

export function useLoveData() {
  // 用户状态
  const [userState, setUserState] = useState<UserState>({
    points: 100,
    totalPointsEarned: 100,
    streak: 3,
    level: 1,
    title: '甜蜜新手',
  });

  // 各模块数据
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [anniversaries, setAnniversaries] = useState<Anniversary[]>(initialAnniversaries);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>(initialSavingsGoals);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [coupons, setCoupons] = useState<RewardCoupon[]>(initialCoupons);

  // 计算等级和称号
  const calculateLevel = useCallback((totalPoints: number): { level: number; title: string } => {
    if (totalPoints >= 1000) return { level: 5, title: '爱情大师' };
    if (totalPoints >= 500) return { level: 4, title: '甜蜜伴侣' };
    if (totalPoints >= 200) return { level: 3, title: '恋爱达人' };
    if (totalPoints >= 100) return { level: 2, title: '热恋情侣' };
    return { level: 1, title: '甜蜜新手' };
  }, []);

  // 添加积分
  const addPoints = useCallback((points: number) => {
    setUserState(prev => {
      const newTotal = prev.totalPointsEarned + points;
      const { level, title } = calculateLevel(newTotal);
      return {
        ...prev,
        points: prev.points + points,
        totalPointsEarned: newTotal,
        level,
        title,
      };
    });
  }, [calculateLevel]);

  // 消费积分
  const spendPoints = useCallback((points: number) => {
    setUserState(prev => ({
      ...prev,
      points: Math.max(0, prev.points - points),
    }));
  }, []);

  // 任务操作
  const completeTask = useCallback((taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId && !task.completed) {
        addPoints(task.points);
        return { ...task, completed: true, completedAt: new Date() };
      }
      return task;
    }));
  }, [addPoints]);

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt'>) => {
    setTasks(prev => [...prev, { ...task, id: generateId(), createdAt: new Date() }]);
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  }, []);

  // 纪念日操作
  const addAnniversary = useCallback((anniversary: Omit<Anniversary, 'id'>) => {
    setAnniversaries(prev => [...prev, { ...anniversary, id: generateId() }]);
  }, []);

  const deleteAnniversary = useCallback((id: string) => {
    setAnniversaries(prev => prev.filter(a => a.id !== id));
  }, []);

  // 记账操作
  const addExpense = useCallback((expense: Omit<Expense, 'id'>) => {
    setExpenses(prev => [...prev, { ...expense, id: generateId() }]);
    if (expense.type === 'income') {
      setSavingsGoals(prev => prev.map(goal => ({
        ...goal,
        currentAmount: goal.currentAmount + expense.amount,
      })));
    }
  }, []);

  // 打卡操作
  const checkIn = useCallback((mood: Mood, message?: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const alreadyChecked = checkIns.some(ci => {
      const ciDate = new Date(ci.date);
      ciDate.setHours(0, 0, 0, 0);
      return ciDate.getTime() === today.getTime() && ci.checkedBy === 'me';
    });

    if (!alreadyChecked) {
      setCheckIns(prev => [...prev, {
        id: generateId(),
        date: new Date(),
        mood,
        message,
        checkedBy: 'me',
      }]);
      addPoints(10);
      setUserState(prev => ({ ...prev, streak: prev.streak + 1 }));
    }
  }, [checkIns, addPoints]);

  // 留言操作
  const addMessage = useCallback((content: string) => {
    setMessages(prev => [...prev, {
      id: generateId(),
      content,
      author: 'me',
      createdAt: new Date(),
      likes: 0,
    }]);
    addPoints(5);
  }, [addPoints]);

  const likeMessage = useCallback((messageId: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        return { ...msg, likes: msg.likes + 1, isLiked: true };
      }
      return msg;
    }));
  }, []);

  // 愿望操作
  const addWish = useCallback((wish: Omit<Wish, 'id' | 'createdAt'>) => {
    setWishes(prev => [...prev, { ...wish, id: generateId(), createdAt: new Date() }]);
  }, []);

  const completeWish = useCallback((wishId: string) => {
    setWishes(prev => prev.map(wish => {
      if (wish.id === wishId && !wish.completed) {
        addPoints(20);
        return { ...wish, completed: true, completedAt: new Date() };
      }
      return wish;
    }));
  }, [addPoints]);

  const deleteWish = useCallback((wishId: string) => {
    setWishes(prev => prev.filter(w => w.id !== wishId));
  }, []);

  // 兑换券操作
  const useCoupon = useCallback((couponId: string) => {
    const coupon = coupons.find(c => c.id === couponId);
    if (coupon && !coupon.used && userState.points >= coupon.cost) {
      spendPoints(coupon.cost);
      setCoupons(prev => prev.map(c => 
        c.id === couponId ? { ...c, used: true, usedAt: new Date() } : c
      ));
      return true;
    }
    return false;
  }, [coupons, userState.points, spendPoints]);

  // 计算统计数据
  const stats = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.completed).length,
    totalWishes: wishes.length,
    completedWishes: wishes.filter(w => w.completed).length,
    totalSavings: savingsGoals.reduce((acc, goal) => acc + goal.currentAmount, 0),
    totalTarget: savingsGoals.reduce((acc, goal) => acc + goal.targetAmount, 0),
    todayCheckIn: checkIns.some(ci => {
      const today = new Date();
      const ciDate = new Date(ci.date);
      return ciDate.toDateString() === today.toDateString() && ci.checkedBy === 'me';
    }),
  };

  // 成就数据（静态）
  const achievements = initialAchievements;

  return {
    userState,
    tasks,
    anniversaries,
    expenses,
    savingsGoals,
    checkIns,
    messages,
    wishes,
    coupons,
    achievements,
    stats,
    completeTask,
    addTask,
    deleteTask,
    addAnniversary,
    deleteAnniversary,
    addExpense,
    checkIn,
    addMessage,
    likeMessage,
    addWish,
    completeWish,
    deleteWish,
    useCoupon,
    addPoints,
    spendPoints,
  };
}

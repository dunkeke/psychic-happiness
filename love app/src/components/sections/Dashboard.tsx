import { CheckCircle2, Heart, PiggyBank, Calendar } from 'lucide-react';

interface DashboardProps {
  stats: {
    totalTasks: number;
    completedTasks: number;
    totalWishes: number;
    completedWishes: number;
    totalSavings: number;
    totalTarget: number;
    todayCheckIn: boolean;
  };
}

export function Dashboard({ stats }: DashboardProps) {
  const taskProgress = stats.totalTasks > 0 ? (stats.completedTasks / stats.totalTasks) * 100 : 0;
  const wishProgress = stats.totalWishes > 0 ? (stats.completedWishes / stats.totalWishes) * 100 : 0;
  const savingsProgress = stats.totalTarget > 0 ? (stats.totalSavings / stats.totalTarget) * 100 : 0;

  const cards = [
    {
      title: '今日任务',
      icon: CheckCircle2,
      value: `${stats.completedTasks}/${stats.totalTasks}`,
      progress: taskProgress,
      color: 'from-emerald-400 to-teal-500',
      bgColor: 'bg-emerald-50',
    },
    {
      title: '愿望进度',
      icon: Heart,
      value: `${stats.completedWishes}/${stats.totalWishes}`,
      progress: wishProgress,
      color: 'from-rose-400 to-pink-500',
      bgColor: 'bg-rose-50',
    },
    {
      title: '储蓄目标',
      icon: PiggyBank,
      value: `¥${(stats.totalSavings / 10000).toFixed(1)}万`,
      progress: savingsProgress,
      color: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-50',
    },
    {
      title: '今日打卡',
      icon: Calendar,
      value: stats.todayCheckIn ? '已打卡' : '未打卡',
      progress: stats.todayCheckIn ? 100 : 0,
      color: 'from-violet-400 to-purple-500',
      bgColor: 'bg-violet-50',
    },
  ];

  return (
    <section className="py-6 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">欢迎来到你们的爱情空间 💕</h2>
        <p className="text-gray-500">记录每一个甜蜜瞬间，一起完成每一个愿望</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className={`${card.bgColor} rounded-2xl p-4 shadow-soft hover-lift cursor-pointer animate-slide-up`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800">{card.value}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{card.title}</p>
            <div className="h-2 bg-white/50 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${card.color} animate-progress`}
                style={{ width: `${card.progress}%`, animationDelay: '0.5s' }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

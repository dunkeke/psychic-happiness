import { useState } from 'react';
import { 
  Home, CheckSquare, Calendar, PiggyBank, 
  MessageCircle, Sparkles, Gift, Heart 
} from 'lucide-react';
import { useLoveData } from '@/hooks/useLoveData';
import { Header } from '@/components/sections/Header';
import { Dashboard } from '@/components/sections/Dashboard';
import { Tasks } from '@/components/sections/Tasks';
import { Anniversary } from '@/components/sections/Anniversary';
import { Savings } from '@/components/sections/Savings';
import { CheckIn } from '@/components/sections/CheckIn';
import { Messages } from '@/components/sections/Messages';
import { Wishes } from '@/components/sections/Wishes';
import { Rewards } from '@/components/sections/Rewards';
import './App.css';

type TabType = 'home' | 'tasks' | 'anniversary' | 'savings' | 'messages' | 'checkin' | 'wishes' | 'rewards';

const tabs: { key: TabType; label: string; icon: typeof Home }[] = [
  { key: 'home', label: '首页', icon: Home },
  { key: 'tasks', label: '任务', icon: CheckSquare },
  { key: 'anniversary', label: '纪念日', icon: Calendar },
  { key: 'savings', label: '储蓄', icon: PiggyBank },
  { key: 'messages', label: '留言', icon: MessageCircle },
  { key: 'checkin', label: '打卡', icon: Heart },
  { key: 'wishes', label: '愿望', icon: Sparkles },
  { key: 'rewards', label: '奖励', icon: Gift },
];

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const {
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
  } = useLoveData();

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <Dashboard stats={stats} />
            <Tasks 
              tasks={tasks.slice(0, 5)} 
              onComplete={completeTask} 
              onAdd={addTask} 
              onDelete={deleteTask} 
            />
            <CheckIn 
              checkIns={checkIns} 
              onCheckIn={checkIn} 
              todayCheckIn={stats.todayCheckIn} 
            />
          </>
        );
      case 'tasks':
        return (
          <Tasks 
            tasks={tasks} 
            onComplete={completeTask} 
            onAdd={addTask} 
            onDelete={deleteTask} 
          />
        );
      case 'anniversary':
        return (
          <Anniversary 
            anniversaries={anniversaries} 
            onAdd={addAnniversary} 
            onDelete={deleteAnniversary} 
          />
        );
      case 'savings':
        return (
          <Savings 
            expenses={expenses} 
            savingsGoals={savingsGoals} 
            onAddExpense={addExpense} 
          />
        );
      case 'messages':
        return (
          <Messages 
            messages={messages} 
            onAdd={addMessage} 
            onLike={likeMessage} 
          />
        );
      case 'checkin':
        return (
          <CheckIn 
            checkIns={checkIns} 
            onCheckIn={checkIn} 
            todayCheckIn={stats.todayCheckIn} 
          />
        );
      case 'wishes':
        return (
          <Wishes 
            wishes={wishes} 
            onAdd={addWish} 
            onComplete={completeWish} 
            onDelete={deleteWish} 
          />
        );
      case 'rewards':
        return (
          <Rewards 
            userState={userState}
            coupons={coupons}
            achievements={achievements}
            onUseCoupon={useCoupon}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <Header userState={userState} />
      
      <main className="max-w-6xl mx-auto px-4 pb-24">
        <div key={activeTab} className="animate-fade-in">
          {renderContent()}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-pink-100 safe-area-pb">
        <div className="max-w-6xl mx-auto px-2">
          <div className="flex justify-around py-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all hover-scale ${
                  activeTab === tab.key
                    ? 'text-rose-500'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-all ${
                  activeTab === tab.key
                    ? 'bg-rose-100'
                    : ''
                }`}>
                  <tab.icon className={`w-5 h-5 ${
                    activeTab === tab.key ? 'fill-rose-100' : ''
                  }`} />
                </div>
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default App;

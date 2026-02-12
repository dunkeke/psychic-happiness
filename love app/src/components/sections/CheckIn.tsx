import { useState } from 'react';
import { Calendar, Heart, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { CheckIn as CheckInType, Mood } from '@/types';

interface CheckInProps {
  checkIns: CheckInType[];
  onCheckIn: (mood: Mood, message?: string) => void;
  todayCheckIn: boolean;
}

const moods: Mood[] = ['happy', 'loved', 'excited', 'calm', 'tired'];

const moodConfig: Record<Mood, { emoji: string; label: string; color: string }> = {
  happy: { emoji: '😊', label: '开心', color: '#FFD93D' },
  loved: { emoji: '🥰', label: '被爱', color: '#FF6B9D' },
  excited: { emoji: '🤩', label: '兴奋', color: '#FF8C42' },
  calm: { emoji: '😌', label: '平静', color: '#6BCB77' },
  tired: { emoji: '😴', label: '疲惫', color: '#9B9B9B' },
};

export function CheckIn({ checkIns, onCheckIn, todayCheckIn }: CheckInProps) {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleCheckIn = () => {
    if (selectedMood) {
      onCheckIn(selectedMood, message);
      setSelectedMood(null);
      setMessage('');
      setShowForm(false);
    }
  };

  // 获取最近7天的打卡记录
  const getRecentCheckIns = () => {
    const days: { date: Date; checkIn?: CheckInType }[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const checkIn = checkIns.find(ci => {
        const ciDate = new Date(ci.date);
        ciDate.setHours(0, 0, 0, 0);
        return ciDate.getTime() === date.getTime();
      });
      
      days.push({ date, checkIn });
    }
    return days;
  };

  const recentDays = getRecentCheckIns();
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <section className="py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-violet-500" />
            每日打卡
          </h3>
          <p className="text-sm text-gray-500 mt-1">记录每天的心情</p>
        </div>
        {!todayCheckIn && !showForm && (
          <div className="relative">
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              今日打卡
            </Button>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </div>
        )}
      </div>

      {/* Weekly Calendar */}
      <div className="bg-white rounded-2xl p-4 shadow-soft mb-4">
        <div className="grid grid-cols-7 gap-2">
          {recentDays.map((day, index) => {
            const isToday = index === 6;
            const hasCheckIn = !!day.checkIn;
            
            return (
              <div
                key={index}
                className={`flex flex-col items-center p-2 rounded-xl animate-slide-up ${
                  isToday ? 'bg-violet-50 ring-2 ring-violet-200' : ''
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="text-xs text-gray-500 mb-1">{weekDays[day.date.getDay()]}</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  hasCheckIn
                    ? 'bg-gradient-to-br from-violet-400 to-purple-500'
                    : 'bg-gray-100'
                }`}>
                  {hasCheckIn ? (
                    <span>{day.checkIn ? moodConfig[day.checkIn.mood].emoji : ''}</span>
                  ) : (
                    <span className="text-gray-300 text-sm">{day.date.getDate()}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Check-in Form */}
      {showForm && !todayCheckIn && (
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-5 mb-4 animate-slide-up">
          <h4 className="font-medium text-gray-700 mb-3">今天心情怎么样？</h4>
          <div className="flex justify-center gap-3 mb-4">
            {moods.map((mood) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={`w-12 h-12 rounded-full text-2xl flex items-center justify-center transition-all hover-scale ${
                  selectedMood === mood
                    ? 'ring-2 ring-violet-500 ring-offset-2 bg-white'
                    : 'bg-white/50 hover:bg-white'
                }`}
              >
                {moodConfig[mood].emoji}
              </button>
            ))}
          </div>
          
          {selectedMood && (
            <div className="animate-fade-in">
              <p className="text-center text-sm text-violet-600 mb-3">
                {moodConfig[selectedMood].label} · +10 积分
              </p>
              <Textarea
                placeholder="写点什么吧...（可选）"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mb-3 bg-white/80 border-0 resize-none"
                rows={2}
              />
              <Button
                onClick={handleCheckIn}
                className="w-full bg-gradient-to-r from-violet-500 to-purple-500"
              >
                <Send className="w-4 h-4 mr-1" />
                确认打卡
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Today's Check-in Display */}
      {todayCheckIn && (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 text-center animate-fade-in">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Heart className="w-8 h-8 text-emerald-500 fill-emerald-500" />
          </div>
          <h4 className="font-bold text-emerald-700 mb-1">今日已打卡</h4>
          <p className="text-sm text-emerald-600">+10 积分已到账</p>
        </div>
      )}
    </section>
  );
}

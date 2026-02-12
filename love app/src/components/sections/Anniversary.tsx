import { useState } from 'react';
import { Plus, Calendar, Heart, Clock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import type { Anniversary as AnniversaryType } from '@/types';

interface AnniversaryProps {
  anniversaries: AnniversaryType[];
  onAdd: (anniversary: Omit<AnniversaryType, 'id'>) => void;
  onDelete: (id: string) => void;
}

export function Anniversary({ anniversaries, onAdd, onDelete }: AnniversaryProps) {
  const [newAnniversary, setNewAnniversary] = useState({
    title: '',
    date: '',
    icon: '💕',
    isRecurring: true,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAdd = () => {
    if (newAnniversary.title && newAnniversary.date) {
      onAdd({
        ...newAnniversary,
        date: new Date(newAnniversary.date),
      });
      setNewAnniversary({ title: '', date: '', icon: '💕', isRecurring: true });
      setIsDialogOpen(false);
    }
  };

  // 计算距离下一个纪念日的天数
  const getDaysUntil = (date: Date, isRecurring: boolean) => {
    const now = new Date();
    const target = new Date(date);
    
    if (isRecurring) {
      target.setFullYear(now.getFullYear());
      if (target < now) {
        target.setFullYear(now.getFullYear() + 1);
      }
    }
    
    const diff = target.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  // 计算已经在一起的天数
  const getDaysTogether = (date: Date) => {
    const now = new Date();
    const start = new Date(date);
    const diff = now.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const iconOptions = ['💕', '🌹', '💍', '🎂', '🎉', '✈️', '🏠', '💌', '🎁', '🍰'];

  return (
    <section className="py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-rose-500" />
            纪念日
          </h3>
          <p className="text-sm text-gray-500 mt-1">记录每一个重要时刻</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50">
              <Plus className="w-4 h-4 mr-1" />
              添加
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>添加纪念日</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input
                placeholder="纪念日名称"
                value={newAnniversary.title}
                onChange={(e) => setNewAnniversary({ ...newAnniversary, title: e.target.value })}
              />
              <Input
                type="date"
                value={newAnniversary.date}
                onChange={(e) => setNewAnniversary({ ...newAnniversary, date: e.target.value })}
              />
              <div>
                <label className="text-sm text-gray-500 mb-2 block">选择图标</label>
                <div className="flex flex-wrap gap-2">
                  {iconOptions.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => setNewAnniversary({ ...newAnniversary, icon })}
                      className={`w-10 h-10 rounded-lg text-xl transition-all ${
                        newAnniversary.icon === icon
                          ? 'bg-rose-100 ring-2 ring-rose-500'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">每年重复</span>
                <Switch
                  checked={newAnniversary.isRecurring}
                  onCheckedChange={(checked) => setNewAnniversary({ ...newAnniversary, isRecurring: checked })}
                />
              </div>
              <Button onClick={handleAdd} className="w-full bg-gradient-to-r from-rose-500 to-pink-500">
                添加纪念日
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {anniversaries.map((item, index) => {
          const daysUntil = getDaysUntil(item.date, item.isRecurring);
          const daysTogether = getDaysTogether(item.date);
          const isPast = daysUntil < 0;

          return (
            <div
              key={item.id}
              className="relative bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-5 overflow-hidden hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-white rounded-xl shadow-soft flex items-center justify-center text-3xl">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{item.title}</h4>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {new Date(item.date).toLocaleDateString('zh-CN')}
                  </p>
                  
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                      <span className="text-sm font-medium text-rose-600">
                        {daysTogether} 天
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-medium text-amber-600">
                        {isPast ? '已过去' : '还有'} {Math.abs(daysUntil)} 天
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress bar for recurring events */}
              {item.isRecurring && (
                <div className="mt-4">
                  <div className="h-1.5 bg-white/50 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-rose-400 to-pink-500 animate-progress"
                      style={{ width: `${((365 - daysUntil) / 365) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

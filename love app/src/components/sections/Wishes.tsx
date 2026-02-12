import { useState } from 'react';
import { Plus, Sparkles, Check, Plane, UtensilsCrossed, Gift, Star, Trash2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { Wish } from '@/types';

interface WishesProps {
  wishes: Wish[];
  onAdd: (wish: Omit<Wish, 'id' | 'createdAt'>) => void;
  onComplete: (wishId: string) => void;
  onDelete: (wishId: string) => void;
}

const categories = [
  { key: 'travel', label: '旅行', icon: Plane, color: 'bg-blue-100 text-blue-600' },
  { key: 'food', label: '美食', icon: UtensilsCrossed, color: 'bg-orange-100 text-orange-600' },
  { key: 'experience', label: '体验', icon: Sparkles, color: 'bg-purple-100 text-purple-600' },
  { key: 'gift', label: '礼物', icon: Gift, color: 'bg-rose-100 text-rose-600' },
  { key: 'other', label: '其他', icon: Star, color: 'bg-gray-100 text-gray-600' },
] as const;

export function Wishes({ wishes, onAdd, onComplete, onDelete }: WishesProps) {
  const [newWish, setNewWish] = useState({
    title: '',
    description: '',
    category: 'travel' as 'travel' | 'food' | 'experience' | 'gift' | 'other',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleAdd = () => {
    if (newWish.title.trim()) {
      onAdd({
        title: newWish.title,
        description: newWish.description,
        category: newWish.category,
        completed: false,
      });
      setNewWish({ title: '', description: '', category: 'travel' });
      setIsDialogOpen(false);
    }
  };

  const filteredWishes = selectedCategory
    ? wishes.filter(w => w.category === selectedCategory)
    : wishes;

  return (
    <section className="py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            愿望清单
          </h3>
          <p className="text-sm text-gray-500 mt-1">想和你一起做的事</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500">
              <Plus className="w-4 h-4 mr-1" />
              添加愿望
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>添加新愿望</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input
                placeholder="愿望名称"
                value={newWish.title}
                onChange={(e) => setNewWish({ ...newWish, title: e.target.value })}
              />
              <Input
                placeholder="描述（可选）"
                value={newWish.description}
                onChange={(e) => setNewWish({ ...newWish, description: e.target.value })}
              />
              <div>
                <label className="text-sm text-gray-500 mb-2 block">分类</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setNewWish({ ...newWish, category: cat.key })}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${
                        newWish.category === cat.key
                          ? cat.color + ' ring-2 ring-offset-1'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <cat.icon className="w-4 h-4" />
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
              <Button onClick={handleAdd} className="w-full bg-gradient-to-r from-amber-500 to-orange-500">
                添加愿望
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all hover-scale ${
            selectedCategory === null
              ? 'bg-amber-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          全部
        </button>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all hover-scale ${
              selectedCategory === cat.key
                ? cat.color
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <cat.icon className="w-3.5 h-3.5" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Wishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredWishes.map((wish, index) => {
          const category = categories.find(c => c.key === wish.category);
          return (
            <div
              key={wish.id}
              className={`group relative bg-white rounded-xl p-4 shadow-soft hover:shadow-lg transition-all hover-lift animate-slide-up ${
                wish.completed ? 'opacity-60' : ''
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category?.color}`}>
                  {category && <category.icon className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-medium text-gray-800 truncate ${wish.completed ? 'line-through' : ''}`}>
                      {wish.title}
                    </h4>
                    {wish.completed && (
                      <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-full">
                        已完成
                      </span>
                    )}
                  </div>
                  {wish.description && (
                    <p className={`text-sm text-gray-500 mt-0.5 ${wish.completed ? 'line-through' : ''}`}>
                      {wish.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 mt-3">
                {!wish.completed && (
                  <button
                    onClick={() => onComplete(wish.id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-100 text-emerald-600 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors hover-scale"
                  >
                    <Check className="w-4 h-4" />
                    完成 (+20)
                  </button>
                )}
                <button
                  onClick={() => onDelete(wish.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredWishes.length === 0 && (
        <div className="text-center py-12 text-gray-400 animate-fade-in">
          <MapPin className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>还没有愿望，添加一个吧~</p>
        </div>
      )}
    </section>
  );
}

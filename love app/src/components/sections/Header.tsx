import { Heart, Sparkles, Trophy, Flame } from 'lucide-react';
import type { UserState } from '@/types';

interface HeaderProps {
  userState: UserState;
}

export function Header({ userState }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass border-b border-pink-100 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 hover-scale">
            <div className="relative">
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-heartbeat" />
              <Sparkles className="w-4 h-4 text-amber-400 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">LoveHub</h1>
              <p className="text-xs text-rose-400">情侣互动空间</p>
            </div>
          </div>

          {/* User Stats */}
          <div className="flex items-center gap-3">
            {/* Level Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full hover-scale">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-700">Lv.{userState.level}</span>
              <span className="text-xs text-amber-600">{userState.title}</span>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-100 to-red-100 rounded-full hover-scale">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-700">{userState.streak}天</span>
            </div>

            {/* Points */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full hover-scale">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span className="text-sm font-bold text-rose-600">{userState.points}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

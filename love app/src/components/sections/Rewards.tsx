import { useState } from 'react';
import { Gift, ShoppingCart, Check, Sparkles, Star, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { RewardCoupon, Achievement, UserState } from '@/types';

interface RewardsProps {
  userState: UserState;
  coupons: RewardCoupon[];
  achievements: Achievement[];
  onUseCoupon: (couponId: string) => boolean;
}

export function Rewards({ userState, coupons, achievements, onUseCoupon }: RewardsProps) {
  const [activeTab, setActiveTab] = useState<'shop' | 'inventory' | 'achievements'>('shop');
  const [selectedCoupon, setSelectedCoupon] = useState<RewardCoupon | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUseCoupon = () => {
    if (selectedCoupon) {
      const success = onUseCoupon(selectedCoupon.id);
      if (success) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setSelectedCoupon(null);
        }, 1500);
      }
    }
  };

  const availableCoupons = coupons.filter(c => !c.used);
  const usedCoupons = coupons.filter(c => c.used);

  return (
    <section className="py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Gift className="w-5 h-5 text-purple-500" />
            奖励中心
          </h3>
          <p className="text-sm text-gray-500 mt-1">用积分兑换甜蜜奖励</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full">
          <Sparkles className="w-4 h-4 text-rose-500" />
          <span className="font-bold text-rose-600">{userState.points} 积分</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {[
          { key: 'shop', label: '兑换商店', icon: ShoppingCart },
          { key: 'inventory', label: '我的券包', icon: Gift },
          { key: 'achievements', label: '成就', icon: Trophy },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all hover-scale ${
              activeTab === tab.key
                ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Shop */}
      {activeTab === 'shop' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 animate-fade-in">
          {availableCoupons.map((coupon, index) => (
            <div
              key={coupon.id}
              onClick={() => setSelectedCoupon(coupon)}
              className={`bg-white rounded-xl p-4 shadow-soft cursor-pointer transition-all hover-lift ${
                userState.points >= coupon.cost
                  ? 'hover:shadow-love'
                  : 'opacity-60 cursor-not-allowed'
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="text-3xl mb-2">{coupon.icon}</div>
              <h4 className="font-medium text-gray-800 text-sm">{coupon.title}</h4>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{coupon.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className={`text-sm font-bold ${
                  userState.points >= coupon.cost ? 'text-rose-500' : 'text-gray-400'
                }`}>
                  {coupon.cost} 积分
                </span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  userState.points >= coupon.cost
                    ? 'bg-rose-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  <ShoppingCart className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Inventory */}
      {activeTab === 'inventory' && (
        <div className="space-y-3 animate-fade-in">
          {usedCoupons.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Gift className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>还没有兑换过奖励券</p>
            </div>
          ) : (
            usedCoupons.map((coupon, index) => (
              <div
                key={coupon.id}
                className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-soft animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="text-3xl">{coupon.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-800">{coupon.title}</h4>
                    <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-full">
                      已兑换
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{coupon.description}</p>
                  {coupon.usedAt && (
                    <p className="text-xs text-gray-400 mt-1">
                      兑换于 {new Date(coupon.usedAt).toLocaleDateString('zh-CN')}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Achievements */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-in">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className={`relative rounded-xl p-4 animate-slide-up ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-amber-50 to-orange-50'
                  : 'bg-gray-50'
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                  achievement.unlocked ? 'bg-white shadow-soft' : 'bg-gray-200'
                }`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-medium ${achievement.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                      {achievement.title}
                    </h4>
                    {achievement.unlocked && (
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{achievement.description}</p>
                </div>
              </div>
              
              {!achievement.unlocked && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>进度</span>
                    <span>{achievement.current}/{achievement.requirement}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gray-400 to-gray-500 animate-progress"
                      style={{ width: `${(achievement.current / achievement.requirement) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              
              {achievement.unlocked && achievement.unlockedAt && (
                <p className="text-xs text-amber-600 mt-2">
                  解锁于 {new Date(achievement.unlockedAt).toLocaleDateString('zh-CN')}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Purchase Dialog */}
      <Dialog open={!!selectedCoupon} onOpenChange={() => setSelectedCoupon(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>确认兑换</DialogTitle>
          </DialogHeader>
          {selectedCoupon && (
            <div className="pt-4">
              <div className="text-center mb-6">
                <div className="text-6xl mb-3">{selectedCoupon.icon}</div>
                <h4 className="text-xl font-bold text-gray-800">{selectedCoupon.title}</h4>
                <p className="text-gray-500 mt-1">{selectedCoupon.description}</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">需要积分</span>
                  <span className="font-bold text-rose-500">{selectedCoupon.cost}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-600">当前积分</span>
                  <span className="font-bold text-gray-800">{userState.points}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setSelectedCoupon(null)}
                  className="flex-1"
                >
                  取消
                </Button>
                <Button
                  onClick={handleUseCoupon}
                  disabled={userState.points < selectedCoupon.cost}
                  className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500"
                >
                  {showSuccess ? (
                    <span className="flex items-center gap-1 animate-bounce">
                      <Check className="w-4 h-4" />
                      兑换成功
                    </span>
                  ) : (
                    '确认兑换'
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

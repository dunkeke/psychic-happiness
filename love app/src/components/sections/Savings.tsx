import { useState } from 'react';
import { Plus, PiggyBank, TrendingUp, TrendingDown, Wallet, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Expense, SavingsGoal } from '@/types';

interface SavingsProps {
  expenses: Expense[];
  savingsGoals: SavingsGoal[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

export function Savings({ expenses, savingsGoals, onAddExpense }: SavingsProps) {
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    type: 'expense' as 'income' | 'expense',
    category: '其他',
    paidBy: 'me' as 'me' | 'partner',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAdd = () => {
    if (newExpense.title && newExpense.amount) {
      onAddExpense({
        title: newExpense.title,
        amount: Number(newExpense.amount),
        type: newExpense.type,
        category: newExpense.category,
        paidBy: newExpense.paidBy,
        date: new Date(),
      });
      setNewExpense({ title: '', amount: '', type: 'expense', category: '其他', paidBy: 'me' });
      setIsDialogOpen(false);
    }
  };

  const totalIncome = expenses.filter(e => e.type === 'income').reduce((acc, e) => acc + e.amount, 0);
  const totalExpense = expenses.filter(e => e.type === 'expense').reduce((acc, e) => acc + e.amount, 0);
  const balance = totalIncome - totalExpense;

  const categories = ['餐饮', '购物', '娱乐', '交通', '旅行', '储蓄', '其他'];

  return (
    <section className="py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-amber-500" />
            共同储蓄
          </h3>
          <p className="text-sm text-gray-500 mt-1">一起为未来努力</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="border-amber-200 text-amber-600 hover:bg-amber-50">
              <Plus className="w-4 h-4 mr-1" />
              记账
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>记一笔</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Tabs defaultValue="expense" onValueChange={(v) => setNewExpense({ ...newExpense, type: v as 'income' | 'expense' })}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="expense">支出</TabsTrigger>
                  <TabsTrigger value="income">收入/储蓄</TabsTrigger>
                </TabsList>
              </Tabs>
              <Input
                placeholder="用途说明"
                value={newExpense.title}
                onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
              />
              <Input
                type="number"
                placeholder="金额"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">分类</label>
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">付款人</label>
                  <select
                    value={newExpense.paidBy}
                    onChange={(e) => setNewExpense({ ...newExpense, paidBy: e.target.value as 'me' | 'partner' })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value="me">我</option>
                    <option value="partner">男朋友</option>
                  </select>
                </div>
              </div>
              <Button onClick={handleAdd} className="w-full bg-gradient-to-r from-amber-500 to-orange-500">
                确认
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-emerald-50 rounded-xl p-3 animate-slide-up">
          <div className="flex items-center gap-1 text-emerald-600 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs">收入</span>
          </div>
          <p className="text-lg font-bold text-emerald-700">¥{totalIncome.toLocaleString()}</p>
        </div>
        <div className="bg-rose-50 rounded-xl p-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-1 text-rose-600 mb-1">
            <TrendingDown className="w-4 h-4" />
            <span className="text-xs">支出</span>
          </div>
          <p className="text-lg font-bold text-rose-700">¥{totalExpense.toLocaleString()}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-1 text-blue-600 mb-1">
            <Wallet className="w-4 h-4" />
            <span className="text-xs">结余</span>
          </div>
          <p className="text-lg font-bold text-blue-700">¥{balance.toLocaleString()}</p>
        </div>
      </div>

      {/* Savings Goals */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-700 flex items-center gap-2">
          <Target className="w-4 h-4 text-amber-500" />
          储蓄目标
        </h4>
        {savingsGoals.map((goal, index) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          return (
            <div
              key={goal.id}
              className="bg-white rounded-xl p-4 shadow-soft animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{goal.icon}</span>
                  <div>
                    <h5 className="font-medium text-gray-800">{goal.title}</h5>
                    <p className="text-xs text-gray-500">
                      目标: ¥{goal.targetAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-amber-600">
                    ¥{goal.currentAmount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">{progress.toFixed(1)}%</p>
                </div>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 animate-progress"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Transactions */}
      {expenses.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium text-gray-700 mb-3">最近记录</h4>
          <div className="space-y-2">
            {expenses.slice(-5).reverse().map((expense, index) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    expense.type === 'income' ? 'bg-emerald-100' : 'bg-rose-100'
                  }`}>
                    {expense.type === 'income' ? (
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-rose-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{expense.title}</p>
                    <p className="text-xs text-gray-500">{expense.category} · {expense.paidBy === 'me' ? '我' : '男朋友'}</p>
                  </div>
                </div>
                <span className={`font-medium ${
                  expense.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {expense.type === 'income' ? '+' : '-'}¥{expense.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

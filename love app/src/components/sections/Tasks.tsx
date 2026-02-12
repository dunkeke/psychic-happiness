import { useState } from 'react';
import { Plus, Check, Trash2, Star, User, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import type { Task } from '@/types';

interface TasksProps {
  tasks: Task[];
  onComplete: (taskId: string) => void;
  onAdd: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onDelete: (taskId: string) => void;
}

export function Tasks({ tasks, onComplete, onAdd, onDelete }: TasksProps) {
  const [newTask, setNewTask] = useState<{ 
    title: string; 
    description: string; 
    points: number; 
    category: 'daily' | 'weekly' | 'special'; 
    assignedTo: 'me' | 'partner' | 'both';
    completed: boolean;
  }>({ 
    title: '', 
    description: '', 
    points: 10, 
    category: 'daily', 
    assignedTo: 'both',
    completed: false
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAdd = () => {
    if (newTask.title.trim()) {
      onAdd(newTask);
      setNewTask({ title: '', description: '', points: 10, category: 'daily', assignedTo: 'both', completed: false });
      setIsDialogOpen(false);
    }
  };

  const categoryLabels = {
    daily: { label: '每日', color: 'bg-blue-100 text-blue-600' },
    weekly: { label: '每周', color: 'bg-purple-100 text-purple-600' },
    special: { label: '特别', color: 'bg-rose-100 text-rose-600' },
  };

  const assignedToIcons = {
    me: <User className="w-3 h-3" />,
    partner: <User className="w-3 h-3" />,
    both: <Users className="w-3 h-3" />,
  };

  return (
    <section className="py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500" />
            甜蜜任务
          </h3>
          <p className="text-sm text-gray-500 mt-1">完成任务获得爱心积分</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
              <Plus className="w-4 h-4 mr-1" />
              新建任务
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>添加新任务</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input
                placeholder="任务名称"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
              <Input
                placeholder="任务描述（可选）"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">积分奖励</label>
                  <select
                    value={newTask.points}
                    onChange={(e) => setNewTask({ ...newTask, points: Number(e.target.value) })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value={5}>5 积分</option>
                    <option value={10}>10 积分</option>
                    <option value={15}>15 积分</option>
                    <option value={20}>20 积分</option>
                    <option value={50}>50 积分</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-1 block">分类</label>
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value as 'daily' | 'weekly' | 'special' })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value="daily">每日任务</option>
                    <option value="weekly">每周任务</option>
                    <option value="special">特别任务</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">分配给</label>
                <select
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value as 'me' | 'partner' | 'both' })}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                >
                  <option value="me">我自己</option>
                  <option value="partner">男朋友</option>
                  <option value="both">一起完成</option>
                </select>
              </div>
              <Button onClick={handleAdd} className="w-full bg-gradient-to-r from-rose-500 to-pink-500">
                添加任务
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className={`group flex items-center gap-3 p-4 bg-white rounded-xl shadow-soft hover:shadow-love transition-all animate-slide-up ${
              task.completed ? 'opacity-60' : ''
            }`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <button
              onClick={() => onComplete(task.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors hover-scale ${
                task.completed
                  ? 'bg-emerald-500 border-emerald-500'
                  : 'border-gray-300 hover:border-rose-400'
              }`}
            >
              {task.completed && <Check className="w-4 h-4 text-white" />}
            </button>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                  {task.title}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${categoryLabels[task.category].color}`}>
                  {categoryLabels[task.category].label}
                </span>
              </div>
              {task.description && (
                <p className="text-sm text-gray-500 mt-0.5">{task.description}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-sm text-rose-500 font-medium">
                <Star className="w-3 h-3" />
                +{task.points}
              </span>
              <span className="text-gray-400">{assignedToIcons[task.assignedTo || 'both']}</span>
              <button
                onClick={() => onDelete(task.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="text-center py-12 text-gray-400 animate-fade-in">
            <Star className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>还没有任务，添加一个吧~</p>
          </div>
        )}
      </div>
    </section>
  );
}

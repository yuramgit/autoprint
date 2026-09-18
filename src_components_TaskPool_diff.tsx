--- src/components/TaskPool.tsx (原始)


+++ src/components/TaskPool.tsx (修改后)
import { useState } from 'react';
import { mockTasks } from '../mockData';
import { Task } from '../types';

type FilterType = 'all' | 1 | 2 | 3;

export default function TaskPool() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const filteredTasks = mockTasks.filter(t => {
    if (filter !== 'all' && t.type !== filter) return false;
    if (searchQuery && !t.text.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !t.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const type1Count = mockTasks.filter(t => t.type === 1).length;
  const type2Count = mockTasks.filter(t => t.type === 2).length;
  const type3Count = mockTasks.filter(t => t.type === 3).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Пул заданий</h1>
        <p className="text-gray-400 mt-1">Все карточки, собранные с банка заданий ФИПИ</p>
      </div>

      {/* Type Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TypeCard
          type={1}
          label="Тип 1 — Соответствие"
          count={type1Count}
          description="6 высказываний → говорящие A–G"
          active={filter === 1}
          onClick={() => setFilter(filter === 1 ? 'all' : 1)}
        />
        <TypeCard
          type={2}
          label="Тип 2 — Диалог"
          count={type2Count}
          description="Вопросы по прослушанному диалогу"
          active={filter === 2}
          onClick={() => setFilter(filter === 2 ? 'all' : 2)}
        />
        <TypeCard
          type={3}
          label="Тип 3 — Интервью"
          count={type3Count}
          description="Задания 3–9 с общим аудио"
          active={filter === 3}
          onClick={() => setFilter(filter === 3 ? 'all' : 3)}
        />
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Поиск по тексту или ID..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          Все ({mockTasks.length})
        </button>
      </div>

      {/* Task List */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Тип</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">ID</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Текст задания</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Аудио</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Ответ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {filteredTasks.slice(0, 30).map(task => (
                <tr
                  key={task.id}
                  className="hover:bg-gray-800/30 cursor-pointer transition-colors"
                  onClick={() => setSelectedTask(task)}
                >
                  <td className="px-4 py-3">
                    <TypeBadge type={task.type} />
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-gray-400 font-mono">{task.id.slice(0, 12)}</code>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-300 truncate max-w-md">
                      {task.text.split('\n')[0]}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    {task.audioUrl ? (
                      <span className="text-green-400 text-sm">🔊 Есть</span>
                    ) : (
                      <span className="text-gray-600 text-sm">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-400">{task.answerKey}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredTasks.length > 30 && (
          <div className="px-4 py-3 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-500">
              Показано 30 из {filteredTasks.length} заданий
            </p>
          </div>
        )}
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
}

function TypeCard({ type, label, count, description, active, onClick }: {
  type: number; label: string; count: number; description: string; active: boolean; onClick: () => void;
}) {
  const colors: Record<number, string> = {
    1: 'border-blue-500/50 bg-blue-600/10',
    2: 'border-emerald-500/50 bg-emerald-600/10',
    3: 'border-violet-500/50 bg-violet-600/10',
  };

  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border transition-all duration-200 text-left ${
        active ? colors[type] + ' ring-1 ring-offset-0' : 'border-gray-800 bg-gray-900 hover:border-gray-700'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white">{label}</span>
        <span className="text-2xl font-bold text-white">{count}</span>
      </div>
      <p className="text-xs text-gray-400 mt-1">{description}</p>
    </button>
  );
}

function TypeBadge({ type }: { type: number }) {
  const colors: Record<number, string> = {
    1: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
    2: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30',
    3: 'bg-violet-600/20 text-violet-400 border-violet-500/30',
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${colors[type]}`}>
      Тип {type}
    </span>
  );
}

function TaskDetailModal({ task, onClose }: { task: Task; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-900 rounded-xl border border-gray-700 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TypeBadge type={task.type} />
            <code className="text-sm text-gray-400 font-mono">{task.id}</code>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
            ✕
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Текст задания</h3>
            <div className="bg-gray-800 rounded-lg p-4 text-sm text-gray-300 whitespace-pre-wrap">
              {task.text}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Аудио</h3>
              <p className="text-sm text-green-400 truncate">{task.audioUrl || 'Нет'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Ответ</h3>
              <p className="text-sm text-white font-mono">{task.answerKey}</p>
            </div>
          </div>
          {task.group && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Группа аудио</h3>
              <code className="text-xs text-violet-400 font-mono">{task.group}</code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

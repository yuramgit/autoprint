--- src/components/VariantLog.tsx (原始)


+++ src/components/VariantLog.tsx (修改后)
import { useState } from 'react';
import { mockLog, mockVariants } from '../mockData';

export default function VariantLog() {
  const [activeTab, setActiveTab] = useState<'log' | 'variants'>('log');
  const [typeFilter, setTypeFilter] = useState<'all' | 1 | 2 | 3>('all');

  const filteredLog = mockLog.filter(e => typeFilter === 'all' || e.type === typeFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Журнал заданий</h1>
        <p className="text-gray-400 mt-1">История использованных заданий и сгенерированных вариантов</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('log')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'log' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          📝 Лог заданий ({mockLog.length})
        </button>
        <button
          onClick={() => setActiveTab('variants')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'variants' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          📦 Варианты ({mockVariants.length})
        </button>
      </div>

      {activeTab === 'log' ? (
        <div className="space-y-4">
          {/* Type Filter */}
          <div className="flex gap-2">
            <FilterButton label="Все" active={typeFilter === 'all'} onClick={() => setTypeFilter('all')} />
            <FilterButton label="Тип 1" active={typeFilter === 1} onClick={() => setTypeFilter(1)} />
            <FilterButton label="Тип 2" active={typeFilter === 2} onClick={() => setTypeFilter(2)} />
            <FilterButton label="Тип 3" active={typeFilter === 3} onClick={() => setTypeFilter(3)} />
          </div>

          {/* Log Table */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Task ID</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Тип</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Дата</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Ключ ответа</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {filteredLog.map((entry, idx) => (
                    <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-3">
                        <code className="text-xs text-gray-300 font-mono">{entry.taskId}</code>
                      </td>
                      <td className="px-4 py-3">
                        <TypeBadge type={entry.type} />
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-400">{entry.date}</span>
                      </td>
                      <td className="px-4 py-3">
                        <code className="text-sm text-amber-400 font-mono">{entry.key}</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <div className="flex items-center gap-6 text-sm">
              <div>
                <span className="text-gray-500">Всего записей: </span>
                <span className="text-white font-medium">{filteredLog.length}</span>
              </div>
              <div>
                <span className="text-gray-500">Тип 1: </span>
                <span className="text-blue-400 font-medium">{filteredLog.filter(e => e.type === 1).length}</span>
              </div>
              <div>
                <span className="text-gray-500">Тип 2: </span>
                <span className="text-emerald-400 font-medium">{filteredLog.filter(e => e.type === 2).length}</span>
              </div>
              <div>
                <span className="text-gray-500">Тип 3: </span>
                <span className="text-violet-400 font-medium">{filteredLog.filter(e => e.type === 3).length}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {mockVariants.slice().reverse().map(variant => (
            <VariantCard key={variant.number} variant={variant} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
        active ? 'bg-gray-700 text-white' : 'bg-gray-800/50 text-gray-500 hover:text-gray-300'
      }`}
    >
      {label}
    </button>
  );
}

function TypeBadge({ type }: { type: number }) {
  const colors: Record<number, string> = {
    1: 'bg-blue-600/20 text-blue-400',
    2: 'bg-emerald-600/20 text-emerald-400',
    3: 'bg-violet-600/20 text-violet-400',
  };
  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded ${colors[type]}`}>
      Тип {type}
    </span>
  );
}

function VariantCard({ variant }: { variant: typeof mockVariants[0] }) {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
            <span className="text-blue-400 font-bold text-lg">{variant.number}</span>
          </div>
          <div>
            <h3 className="text-white font-semibold">Вариант №{variant.number}</h3>
            <p className="text-sm text-gray-400">{variant.date}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {variant.docxGenerated ? (
            <span className="px-2.5 py-1 text-xs bg-green-600/20 text-green-400 rounded-lg border border-green-500/30">
              DOCX ✓
            </span>
          ) : (
            <span className="px-2.5 py-1 text-xs bg-yellow-600/20 text-yellow-400 rounded-lg border border-yellow-500/30">
              DOCX ✗
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Task 1 */}
        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
          <p className="text-xs text-blue-400 font-medium mb-1">Задание 1</p>
          <p className="text-xs text-gray-400 truncate">
            {variant.task1?.id || '—'}
          </p>
          <p className="text-xs text-gray-500 mt-1 truncate">
            {variant.task1?.header?.slice(0, 50) || '—'}
          </p>
        </div>

        {/* Task 2 */}
        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
          <p className="text-xs text-emerald-400 font-medium mb-1">Задание 2</p>
          <p className="text-xs text-gray-400 truncate">
            {variant.task2?.id || '—'}
          </p>
          <p className="text-xs text-gray-500 mt-1 truncate">
            {variant.task2?.header?.slice(0, 50) || '—'}
          </p>
        </div>

        {/* Tasks 3-9 */}
        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
          <p className="text-xs text-violet-400 font-medium mb-1">Задания 3–9</p>
          <p className="text-xs text-gray-400">
            {variant.tasks3.length} заданий (группа)
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Аудио: 1 файл
          </p>
        </div>
      </div>

      {/* Audio Files */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-xs text-gray-500">Аудиофайлы:</span>
        {variant.audioFiles.map((f, i) => (
          <span key={i} className="px-2 py-0.5 text-xs bg-gray-800 text-gray-400 rounded font-mono">
            🔊 {f}
          </span>
        ))}
      </div>
    </div>
  );
}

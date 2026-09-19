--- src/components/Dashboard.tsx (原始)


+++ src/components/Dashboard.tsx (修改后)
import { Page } from '../App';
import { mockStats, mockVariants, mockTasks } from '../mockData';

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const stats = mockStats;
  const latestVariant = mockVariants[mockVariants.length - 1];
  const type1Remaining = stats.poolType1 - stats.type1Used;
  const type2Remaining = stats.poolType2 - stats.type2Used;
  const type3Remaining = stats.poolType3Groups - Math.floor(stats.type3Used / 7);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Панель управления</h1>
        <p className="text-gray-400 mt-1">Генератор КИМ ЕГЭ по английскому языку — Раздел 1 «Аудирование»</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Вариантов создано"
          value={stats.totalVariants}
          icon="📦"
          color="blue"
          subtitle="всего сгенерировано"
        />
        <StatCard
          title="Заданий использовано"
          value={stats.totalTasksUsed}
          icon="✅"
          color="green"
          subtitle="в журнале"
        />
        <StatCard
          title="Заданий в пуле"
          value={stats.poolType1 + stats.poolType2 + stats.poolType3Groups * 7}
          icon="📚"
          color="purple"
          subtitle="доступно на FIPI"
        />
        <StatCard
          title="Текущий вариант"
          value={`№${latestVariant.number}`}
          icon="🎯"
          color="amber"
          subtitle={latestVariant.date.split(' ')[0]}
        />
      </div>

      {/* Pool Status */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Состояние пула заданий</h2>
        <div className="space-y-4">
          <PoolBar
            label="Тип 1 — Соответствие высказываний"
            total={stats.poolType1}
            used={stats.type1Used}
            remaining={type1Remaining}
            color="bg-blue-500"
          />
          <PoolBar
            label="Тип 2 — Диалог (вопросы)"
            total={stats.poolType2}
            used={stats.type2Used}
            remaining={type2Remaining}
            color="bg-emerald-500"
          />
          <PoolBar
            label="Тип 3 — Интервью (группы 3–9)"
            total={stats.poolType3Groups}
            used={Math.floor(stats.type3Used / 7)}
            remaining={type3Remaining}
            color="bg-violet-500"
          />
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Variants */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Последние варианты</h2>
            <button
              onClick={() => onNavigate('log')}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Все →
            </button>
          </div>
          <div className="space-y-3">
            {mockVariants.slice(-3).reverse().map(v => (
              <div key={v.number} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold text-sm">
                    {v.number}
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">Вариант №{v.number}</p>
                    <p className="text-xs text-gray-400">{v.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {v.docxGenerated ? (
                    <span className="px-2 py-1 text-xs bg-green-600/20 text-green-400 rounded-full">DOCX ✓</span>
                  ) : (
                    <span className="px-2 py-1 text-xs bg-yellow-600/20 text-yellow-400 rounded-full">без DOCX</span>
                  )}
                  <span className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-full">
                    {v.audioFiles.length} аудио
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Быстрые действия</h2>
          <div className="space-y-3">
            <ActionButton
              icon="🚀"
              title="Сгенерировать вариант"
              description="Случайный выбор из пула + аудио + DOCX"
              onClick={() => onNavigate('generator')}
              primary
            />
            <ActionButton
              icon="📋"
              title="Просмотр пула заданий"
              description="Все доступные карточки с FIPI"
              onClick={() => onNavigate('tasks')}
            />
            <ActionButton
              icon="📝"
              title="Журнал заданий"
              description="История использованных ID"
              onClick={() => onNavigate('log')}
            />
            <ActionButton
              icon="🔧"
              title="Настройки генератора"
              description="Параметры фильтрации и вывода"
              onClick={() => onNavigate('settings')}
            />
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Информация о системе</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoBlock title="Источник" value="ege.fipi.ru" subtitle="Банк заданий ФИПИ" />
          <InfoBlock title="Фильтр" value="Тема 1.2" subtitle="Аудирование" />
          <InfoBlock title="Версия" value="v5.1" subtitle="Этап 1.5 — полный раздел 1" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color, subtitle }: {
  title: string; value: string | number; icon: string; color: string; subtitle: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: 'from-blue-600/20 to-blue-600/5 border-blue-500/30',
    green: 'from-green-600/20 to-green-600/5 border-green-500/30',
    purple: 'from-purple-600/20 to-purple-600/5 border-purple-500/30',
    amber: 'from-amber-600/20 to-amber-600/5 border-amber-500/30',
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-5`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}

function PoolBar({ label, total, used, remaining, color }: {
  label: string; total: number; used: number; remaining: number; color: string;
}) {
  const percentage = total > 0 ? (used / total) * 100 : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-300">{label}</span>
        <span className="text-sm text-gray-400">
          {used}/{total} использовано · <span className="text-green-400">{remaining} осталось</span>
        </span>
      </div>
      <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function ActionButton({ icon, title, description, onClick, primary }: {
  icon: string; title: string; description: string; onClick: () => void; primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all duration-200 text-left ${
        primary
          ? 'bg-blue-600 hover:bg-blue-500 text-white'
          : 'bg-gray-800/50 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-700/50'
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="font-medium text-sm">{title}</p>
        <p className={`text-xs ${primary ? 'text-blue-100' : 'text-gray-500'}`}>{description}</p>
      </div>
    </button>
  );
}

function InfoBlock({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
      <p className="text-xs text-gray-500 uppercase tracking-wide">{title}</p>
      <p className="text-lg font-semibold text-white mt-1">{value}</p>
      <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
    </div>
  );
}

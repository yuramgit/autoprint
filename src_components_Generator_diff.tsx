--- src/components/Generator.tsx (原始)


+++ src/components/Generator.tsx (修改后)
import { useState, useEffect, useCallback } from 'react';

type GenStep = 'idle' | 'connecting' | 'filtering' | 'collecting' | 'selecting' | 'downloading' | 'filling' | 'done' | 'error';

interface LogLine {
  time: string;
  text: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export default function Generator() {
  const [step, setStep] = useState<GenStep>('idle');
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [progress, setProgress] = useState(0);
  const [selectedTasks, setSelectedTasks] = useState<{
    task1: string;
    task2: string;
    tasks3: string[];
  } | null>(null);

  const addLog = useCallback((text: string, type: LogLine['type'] = 'info') => {
    const now = new Date().toLocaleTimeString('ru-RU');
    setLogs(prev => [...prev, { time: now, text, type }]);
  }, []);

  const simulateGeneration = useCallback(async () => {
    setLogs([]);
    setProgress(0);
    setSelectedTasks(null);

    // Step 1: Connecting
    setStep('connecting');
    addLog('Запуск генератора КИМ ЕГЭ — Этап 1.5', 'info');
    addLog('Подключение к ege.fipi.ru...', 'info');
    await delay(800);
    setProgress(10);
    addLog('[OK] Соединение установлено', 'success');

    // Step 2: Filtering
    setStep('filtering');
    addLog('Применение фильтра «1.2 Аудирование»...', 'info');
    await delay(600);
    setProgress(20);
    addLog('[OK] Фильтр применён через JS', 'success');

    // Step 3: Collecting
    setStep('collecting');
    addLog('Сбор карточек из банка заданий...', 'info');
    for (let page = 1; page <= 5; page++) {
      await delay(400);
      const cards = Math.floor(Math.random() * 5) + 3;
      setProgress(20 + (page / 5) * 30);
      addLog(`  стр. ${page}: карточек суммарно ${cards * page}`, 'info');
    }
    addLog(`  Собрано карточек: 47`, 'success');

    // Step 4: Selecting
    setStep('selecting');
    addLog('Классификация и фильтрация пула...', 'info');
    await delay(500);
    setProgress(55);

    const t1id = generateHexId();
    const t2id = generateHexId();
    const t3ids = Array.from({ length: 7 }, () => generateHexId());

    addLog(`  Пул тип 1: 8 | тип 2: 6 | полных групп тип 3: 4`, 'info');
    await delay(300);
    addLog(`  Выбрано: тип1=${t1id}, тип2=${t2id}`, 'success');
    addLog(`  Группа тип3: [${t3ids.join(', ')}]`, 'success');
    setSelectedTasks({ task1: t1id, task2: t2id, tasks3: t3ids });
    setProgress(65);

    // Step 5: Downloading audio
    setStep('downloading');
    addLog('Скачивание аудиофайлов...', 'info');
    await delay(500);
    setProgress(70);
    addLog('  [OK] audio_task1.mp3 (1247 KB)', 'success');
    await delay(400);
    setProgress(78);
    addLog('  [OK] audio_task2.mp3 (983 KB)', 'success');
    await delay(400);
    setProgress(85);
    addLog('  [OK] audio_tasks3-9.mp3 (2156 KB)', 'success');

    // Step 6: Filling template
    setStep('filling');
    addLog('Заполнение шаблона DOCX...', 'info');
    await delay(600);
    setProgress(90);
    addLog('  Слот «6 высказываний» → OK', 'success');
    await delay(300);
    addLog('  Слот «диалог» → OK', 'success');
    await delay(300);
    addLog('  Слот «интервью» → OK', 'success');
    setProgress(95);
    addLog('[OK] DOCX сохранён: KIM_Variant_6.docx', 'success');

    // Step 7: Logging
    addLog('[LOG] Занесено заданий: 9', 'info');
    await delay(300);
    setProgress(100);
    setStep('done');
    addLog('Готово: вариант №6 — материалы в ~/Downloads/Variant_6/', 'success');
  }, [addLog]);

  const reset = () => {
    setStep('idle');
    setLogs([]);
    setProgress(0);
    setSelectedTasks(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Генератор варианта</h1>
        <p className="text-gray-400 mt-1">Автоматическая генерация полного раздела «Аудирование»</p>
      </div>

      {/* Control Panel */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <StepIndicator step={step} />
            <div>
              <p className="text-white font-medium">{getStepLabel(step)}</p>
              <p className="text-xs text-gray-400">{getStepDescription(step)}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {step === 'idle' || step === 'done' || step === 'error' ? (
              <button
                onClick={simulateGeneration}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <span>🚀</span> Сгенерировать
              </button>
            ) : (
              <button
                onClick={reset}
                className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-medium transition-colors"
              >
                Сбросить
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              step === 'error' ? 'bg-red-500' : step === 'done' ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1 text-right">{progress}%</p>
      </div>

      {/* Selected Tasks */}
      {selectedTasks && (
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Выбранные задания</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-xs text-blue-400 font-medium mb-1">Тип 1 — Соответствие</p>
              <code className="text-sm text-white font-mono break-all">{selectedTasks.task1}</code>
            </div>
            <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-4">
              <p className="text-xs text-emerald-400 font-medium mb-1">Тип 2 — Диалог</p>
              <code className="text-sm text-white font-mono break-all">{selectedTasks.task2}</code>
            </div>
            <div className="bg-violet-600/10 border border-violet-500/30 rounded-lg p-4">
              <p className="text-xs text-violet-400 font-medium mb-1">Тип 3 — Интервью (7 заданий)</p>
              <div className="space-y-0.5">
                {selectedTasks.tasks3.map((id, i) => (
                  <code key={i} className="text-xs text-gray-300 font-mono block">{id}</code>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Log Console */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <span className="text-sm text-gray-400 ml-2">Консоль генератора</span>
          </div>
          <span className="text-xs text-gray-600">{logs.length} строк</span>
        </div>
        <div className="p-4 max-h-96 overflow-y-auto font-mono text-sm space-y-1">
          {logs.length === 0 ? (
            <p className="text-gray-600 italic">Нажмите «Сгенерировать» для запуска процесса...</p>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-gray-600 shrink-0">[{log.time}]</span>
                <span className={getLogColor(log.type)}>{log.text}</span>
              </div>
            ))
          )}
          {step !== 'idle' && step !== 'done' && step !== 'error' && (
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-gray-500">Обработка...</span>
            </div>
          )}
        </div>
      </div>

      {/* Workflow Diagram */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Схема процесса</h2>
        <WorkflowDiagram currentStep={step} />
      </div>
    </div>
  );
}

function StepIndicator({ step }: { step: GenStep }) {
  const colors: Record<string, string> = {
    idle: 'bg-gray-700',
    connecting: 'bg-blue-500 animate-pulse',
    filtering: 'bg-blue-500 animate-pulse',
    collecting: 'bg-blue-500 animate-pulse',
    selecting: 'bg-amber-500 animate-pulse',
    downloading: 'bg-purple-500 animate-pulse',
    filling: 'bg-purple-500 animate-pulse',
    done: 'bg-green-500',
    error: 'bg-red-500',
  };
  return <div className={`w-4 h-4 rounded-full ${colors[step]}`} />;
}

function getStepLabel(step: GenStep): string {
  const labels: Record<string, string> = {
    idle: 'Ожидание запуска',
    connecting: 'Подключение к FIPI',
    filtering: 'Применение фильтра',
    collecting: 'Сбор карточек',
    selecting: 'Выбор заданий',
    downloading: 'Скачивание аудио',
    filling: 'Заполнение шаблона',
    done: 'Генерация завершена',
    error: 'Ошибка',
  };
  return labels[step] || step;
}

function getStepDescription(step: GenStep): string {
  const descs: Record<string, string> = {
    idle: 'Готов к генерации нового варианта',
    connecting: 'Установка соединения с ege.fipi.ru',
    filtering: 'Выбор темы 1.2 «Аудирование»',
    collecting: 'Обход страниц и извлечение карточек',
    selecting: 'Классификация и случайный выбор',
    downloading: 'Загрузка MP3-файлов',
    filling: 'Хирургическое заполнение DOCX',
    done: 'Все задания и аудио готовы',
    error: 'Произошла ошибка при генерации',
  };
  return descs[step] || '';
}

function getLogColor(type: LogLine['type']): string {
  switch (type) {
    case 'success': return 'text-green-400';
    case 'warning': return 'text-amber-400';
    case 'error': return 'text-red-400';
    default: return 'text-gray-300';
  }
}

function WorkflowDiagram({ currentStep }: { currentStep: GenStep }) {
  const steps = [
    { id: 'connecting', label: 'Подключение', icon: '🌐' },
    { id: 'filtering', label: 'Фильтрация', icon: '🔍' },
    { id: 'collecting', label: 'Сбор', icon: '📥' },
    { id: 'selecting', label: 'Выбор', icon: '🎯' },
    { id: 'downloading', label: 'Аудио', icon: '🔊' },
    { id: 'filling', label: 'DOCX', icon: '📄' },
  ];

  const stepOrder = ['connecting', 'filtering', 'collecting', 'selecting', 'downloading', 'filling'];
  const currentIdx = stepOrder.indexOf(currentStep);

  return (
    <div className="flex items-center justify-between">
      {steps.map((s, i) => {
        const isActive = stepOrder[i] === currentStep;
        const isDone = currentIdx > i || currentStep === 'done';
        return (
          <div key={s.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                isDone ? 'bg-green-600/20 border-2 border-green-500' :
                isActive ? 'bg-blue-600/20 border-2 border-blue-500 animate-pulse' :
                'bg-gray-800 border-2 border-gray-700'
              }`}>
                {isDone ? '✓' : s.icon}
              </div>
              <span className={`text-xs mt-2 ${
                isDone ? 'text-green-400' : isActive ? 'text-blue-400' : 'text-gray-600'
              }`}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 h-0.5 mx-1 ${isDone ? 'bg-green-500' : 'bg-gray-700'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateHexId(): string {
  const chars = '0123456789ABCDEF';
  let result = '';
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

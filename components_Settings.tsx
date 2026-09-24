--- src/components/Settings.tsx (原始)


+++ src/components/Settings.tsx (修改后)
import { useState } from 'react';

interface SettingsState {
  fipiUrl: string;
  themeFilter: string;
  maxPages: number;
  downloadDir: string;
  printMode: string;
  headless: boolean;
  logDuplicates: boolean;
  autoOpen: boolean;
  templatePath: string;
}

const defaultSettings: SettingsState = {
  fipiUrl: 'https://ege.fipi.ru/bank/index.php?proj=4B53A6CB75B0B5E1427E596EB4931A2A',
  themeFilter: '1.2',
  maxPages: 25,
  downloadDir: '~/Downloads/',
  printMode: 'open',
  headless: false,
  logDuplicates: true,
  autoOpen: true,
  templatePath: './template.docx',
};

export default function Settings() {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Настройки</h1>
        <p className="text-gray-400 mt-1">Параметры генератора и подключения к FIPI</p>
      </div>

      {/* Connection Settings */}
      <SettingsSection title="🌐 Подключение к FIPI" description="Параметры доступа к банку заданий">
        <div className="space-y-4">
          <InputField
            label="URL банка заданий"
            value={settings.fipiUrl}
            onChange={v => setSettings(s => ({ ...s, fipiUrl: v }))}
            placeholder="https://ege.fipi.ru/..."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Фильтр темы"
              value={settings.themeFilter}
              onChange={v => setSettings(s => ({ ...s, themeFilter: v }))}
              placeholder="1.2"
            />
            <NumberField
              label="Максимум страниц"
              value={settings.maxPages}
              onChange={v => setSettings(s => ({ ...s, maxPages: v }))}
              min={1}
              max={100}
            />
          </div>
          <ToggleField
            label="Headless режим"
            description="Запуск браузера без графического интерфейса"
            checked={settings.headless}
            onChange={v => setSettings(s => ({ ...s, headless: v }))}
          />
        </div>
      </SettingsSection>

      {/* Output Settings */}
      <SettingsSection title="📁 Вывод файлов" description="Куда и как сохранять результаты">
        <div className="space-y-4">
          <InputField
            label="Директория загрузки"
            value={settings.downloadDir}
            onChange={v => setSettings(s => ({ ...s, downloadDir: v }))}
            placeholder="~/Downloads/"
          />
          <InputField
            label="Путь к шаблону DOCX"
            value={settings.templatePath}
            onChange={v => setSettings(s => ({ ...s, templatePath: v }))}
            placeholder="./template.docx"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Режим после генерации"
              value={settings.printMode}
              onChange={v => setSettings(s => ({ ...s, printMode: v }))}
              options={[
                { value: 'open', label: 'Открыть файл' },
                { value: 'print', label: 'Отправить на печать' },
                { value: 'none', label: 'Ничего не делать' },
              ]}
            />
          </div>
          <ToggleField
            label="Автооткрытие DOCX"
            description="Автоматически открывать сгенерированный файл"
            checked={settings.autoOpen}
            onChange={v => setSettings(s => ({ ...s, autoOpen: v }))}
          />
        </div>
      </SettingsSection>

      {/* Logging Settings */}
      <SettingsSection title="📝 Логирование" description="Настройки журнала использованных заданий">
        <div className="space-y-4">
          <ToggleField
            label="Логировать дубликаты"
            description="Записывать в лог даже повторные задания"
            checked={settings.logDuplicates}
            onChange={v => setSettings(s => ({ ...s, logDuplicates: v }))}
          />
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
            <p className="text-sm text-gray-400 mb-2">Файл лога:</p>
            <code className="text-sm text-amber-400 font-mono">./used_tasks.log</code>
            <p className="text-xs text-gray-500 mt-2">
              Формат: task_id;date;key — по одной записи на задание
            </p>
          </div>
        </div>
      </SettingsSection>

      {/* Task Classification Info */}
      <SettingsSection title="🏷️ Классификация заданий" description="Как определяются типы заданий">
        <div className="space-y-3">
          <ClassificationRule
            type={1}
            label="Тип 1 — Соответствие высказываний"
            markers={['«6 высказываний»', '«Установите соответствие между высказываниями»']}
          />
          <ClassificationRule
            type={2}
            label="Тип 2 — Диалог"
            markers={['«Вы услышите диалог»']}
          />
          <ClassificationRule
            type={3}
            label="Тип 3 — Интервью (задания 3–9)"
            markers={['«Вы услышите интервью»', '«В заданиях 3–9»', '«В заданиях 3-9»']}
          />
        </div>
      </SettingsSection>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4">
        <button
          onClick={handleSave}
          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
            saved
              ? 'bg-green-600 text-white'
              : 'bg-blue-600 hover:bg-blue-500 text-white'
          }`}
        >
          {saved ? '✓ Сохранено' : 'Сохранить настройки'}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-medium transition-colors"
        >
          Сбросить
        </button>
      </div>
    </div>
  );
}

function SettingsSection({ title, description, children }: {
  title: string; description: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      {children}
    </div>
  );
}

function InputField({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
      />
    </div>
  );
}

function NumberField({ label, value, onChange, min, max }: {
  label: string; value: number; onChange: (v: number) => void; min?: number; max?: number;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={e => onChange(parseInt(e.target.value) || 0)}
        min={min}
        max={max}
        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

function ToggleField({ label, description, checked, onChange }: {
  label: string; description: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm text-white">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? 'bg-blue-600' : 'bg-gray-700'
        }`}
      >
        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`} />
      </button>
    </div>
  );
}

function ClassificationRule({ type, label, markers }: {
  type: number; label: string; markers: string[];
}) {
  const colors: Record<number, string> = {
    1: 'border-blue-500/30 bg-blue-600/5',
    2: 'border-emerald-500/30 bg-emerald-600/5',
    3: 'border-violet-500/30 bg-violet-600/5',
  };

  return (
    <div className={`p-3 rounded-lg border ${colors[type]}`}>
      <p className="text-sm text-white font-medium mb-1">{label}</p>
      <div className="flex flex-wrap gap-1">
        {markers.map((m, i) => (
          <code key={i} className="text-xs px-2 py-0.5 bg-gray-800 rounded text-gray-400">{m}</code>
        ))}
      </div>
    </div>
  );
}

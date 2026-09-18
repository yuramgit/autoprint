--- src/mockData.ts (原始)


+++ src/mockData.ts (修改后)
import { Task, Variant, LogEntry, GenerationStats } from './types';

const taskTexts1 = [
  {
    header: "You will hear 6 statements. Match the statements to the speakers (A–G). There is one extra speaker.",
    statements: [
      "1. I always try to plan my day in advance.",
      "2. I prefer spontaneous decisions over careful planning.",
      "3. My daily routine hasn't changed much over the years.",
      "4. I used to be disorganised but now I'm much better.",
      "5. Technology helps me manage my time effectively.",
      "6. I find it hard to stick to any routine."
    ]
  },
  {
    header: "You will hear 6 statements. Match the speakers to the statements (A–G). One statement is extra.",
    statements: [
      "1. The speaker enjoys working from home.",
      "2. The speaker prefers working in an office environment.",
      "3. The speaker has recently changed their job.",
      "4. The speaker is considering starting their own business.",
      "5. The speaker values work-life balance above all.",
      "6. The speaker commutes long distances every day."
    ]
  },
  {
    header: "Listen to 6 statements and match them to the speakers. Use letters A–G; one letter is extra.",
    statements: [
      "1. The speaker is passionate about environmental issues.",
      "2. The speaker volunteers at a local shelter.",
      "3. The speaker believes education should be free for everyone.",
      "4. The speaker is concerned about social media influence.",
      "5. The speaker supports traditional family values.",
      "6. The speaker thinks technology isolates people."
    ]
  }
];

const taskTexts2 = [
  {
    header: "You will hear a dialogue. Listen to the dialogue and choose the correct answer.",
    statements: [
      "A. They are discussing plans for the weekend.",
      "B. They are talking about a recent holiday.",
      "C. They are arranging a meeting for a project.",
      "D. They are deciding where to eat dinner.",
      "E. They are discussing a book they both read.",
      "F. They are making plans for a birthday party."
    ]
  },
  {
    header: "You will hear a dialogue between two friends. Decide whether the following statements are true, false, or not stated.",
    statements: [
      "A. Sarah has just moved to a new city.",
      "B. Tom is studying medicine at university.",
      "C. They met at a conference last year.",
      "D. Sarah is looking for a part-time job.",
      "E. Tom recommends a particular restaurant.",
      "F. They plan to meet again next week."
    ]
  }
];

const taskTexts3 = [
  {
    header: "You will hear an interview. In questions 3–9, choose the correct answer (1, 2, or 3).",
    statements: [
      "3. The speaker started learning English because...",
      "4. The most difficult part of learning was...",
      "5. The speaker's advice for beginners is to...",
      "6. When asked about mistakes, the speaker said...",
      "7. The speaker believes the best way to improve is...",
      "8. According to the speaker, technology in education...",
      "9. In the future, the speaker plans to..."
    ]
  },
  {
    header: "You will hear an interview with a travel blogger. Choose the correct answer for questions 3–9.",
    statements: [
      "3. The blogger's first trip abroad was to...",
      "4. The most memorable experience was...",
      "5. When asked about budget travel, the blogger...",
      "6. The blogger recommends visiting...",
      "7. The biggest challenge of travel blogging is...",
      "8. According to the blogger, solo travel teaches you...",
      "9. The blogger's next destination will be..."
    ]
  }
];

function generateId(): string {
  const chars = '0123456789ABCDEF';
  let result = '';
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateTasks(): Task[] {
  const tasks: Task[] = [];

  // Type 1 tasks
  for (let i = 0; i < 8; i++) {
    const template = taskTexts1[i % taskTexts1.length];
    tasks.push({
      id: generateId(),
      type: 1,
      audioUrl: `https://ege.fipi.ru/osband/${generateId()}/audio_task1_${i}.mp3`,
      text: template.header + '\n' + template.statements.join('\n'),
      header: template.header,
      statements: template.statements,
      answerKey: ['1-Б', '2-А', '3-В', '4-Г', '5-Д', '6-Е'][Math.floor(Math.random() * 6)],
      page: Math.floor(i / 3) + 1,
    });
  }

  // Type 2 tasks
  for (let i = 0; i < 6; i++) {
    const template = taskTexts2[i % taskTexts2.length];
    tasks.push({
      id: generateId(),
      type: 2,
      audioUrl: `https://ege.fipi.ru/osband/${generateId()}/audio_task2_${i}.mp3`,
      text: template.header + '\n' + template.statements.join('\n'),
      header: template.header,
      statements: template.statements,
      answerKey: ['1', '2', '3', '4', '5', '6'][Math.floor(Math.random() * 6)],
      page: Math.floor(i / 3) + 1,
    });
  }

  // Type 3 tasks (groups of 7)
  for (let g = 0; g < 4; g++) {
    const template = taskTexts3[g % taskTexts3.length];
    const groupBase = generateId();
    for (let n = 3; n <= 9; n++) {
      tasks.push({
        id: generateId(),
        type: 3,
        audioUrl: `https://ege.fipi.ru/img/${groupBase}/audio_group${g}.mp3`,
        text: `${n}. ${template.statements[n - 3].replace(/^\d+\.\s*/, '')}`,
        header: template.header,
        statements: [template.statements[n - 3]],
        answerKey: ['1', '2', '3'][Math.floor(Math.random() * 3)],
        page: Math.floor(g / 2) + 1,
        group: groupBase,
      });
    }
  }

  return tasks;
}

export const mockTasks: Task[] = generateTasks();

export const mockVariants: Variant[] = [
  {
    number: 1,
    date: '2025-01-15 14:30:00',
    task1: mockTasks[0],
    task2: mockTasks[8],
    tasks3: mockTasks.slice(14, 21),
    audioFiles: ['audio_task1.mp3', 'audio_task2.mp3', 'audio_tasks3-9.mp3'],
    docxGenerated: true,
  },
  {
    number: 2,
    date: '2025-01-18 09:15:00',
    task1: mockTasks[1],
    task2: mockTasks[9],
    tasks3: mockTasks.slice(21, 28),
    audioFiles: ['audio_task1.mp3', 'audio_task2.mp3', 'audio_tasks3-9.mp3'],
    docxGenerated: true,
  },
  {
    number: 3,
    date: '2025-01-22 16:45:00',
    task1: mockTasks[2],
    task2: mockTasks[10],
    tasks3: mockTasks.slice(35, 42),
    audioFiles: ['audio_task1.mp3', 'audio_task2.mp3', 'audio_tasks3-9.mp3'],
    docxGenerated: false,
  },
  {
    number: 4,
    date: '2025-02-01 11:00:00',
    task1: mockTasks[3],
    task2: mockTasks[11],
    tasks3: mockTasks.slice(14, 21),
    audioFiles: ['audio_task1.mp3', 'audio_task2.mp3', 'audio_tasks3-9.mp3'],
    docxGenerated: true,
  },
  {
    number: 5,
    date: '2025-02-10 13:20:00',
    task1: mockTasks[4],
    task2: mockTasks[12],
    tasks3: mockTasks.slice(28, 35),
    audioFiles: ['audio_task1.mp3', 'audio_task2.mp3', 'audio_tasks3-9.mp3'],
    docxGenerated: true,
  },
];

export const mockLog: LogEntry[] = mockVariants.flatMap(v => [
  { taskId: v.task1?.id || '', date: v.date, key: v.task1?.answerKey || '', type: 1 as const },
  { taskId: v.task2?.id || '', date: v.date, key: v.task2?.answerKey || '', type: 2 as const },
  ...v.tasks3.map(t => ({ taskId: t.id, date: v.date, key: t.answerKey, type: 3 as const })),
]).filter(e => e.taskId);

export const mockStats: GenerationStats = {
  totalVariants: mockVariants.length,
  totalTasksUsed: mockLog.length,
  type1Used: mockLog.filter(e => e.type === 1).length,
  type2Used: mockLog.filter(e => e.type === 2).length,
  type3Used: mockLog.filter(e => e.type === 3).length,
  poolType1: mockTasks.filter(t => t.type === 1).length,
  poolType2: mockTasks.filter(t => t.type === 2).length,
  poolType3Groups: Math.floor(mockTasks.filter(t => t.type === 3).length / 7),
};

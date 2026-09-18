--- src/types.ts (原始)


+++ src/types.ts (修改后)
export interface Task {
  id: string;
  type: 1 | 2 | 3;
  audioUrl: string;
  text: string;
  header: string;
  statements: string[];
  answerKey: string;
  dateUsed?: string;
  page?: number;
  group?: string;
}

export interface Variant {
  number: number;
  date: string;
  task1: Task | null;
  task2: Task | null;
  tasks3: Task[];
  audioFiles: string[];
  docxGenerated: boolean;
}

export interface LogEntry {
  taskId: string;
  date: string;
  key: string;
  type: 1 | 2 | 3;
}

export interface GenerationStats {
  totalVariants: number;
  totalTasksUsed: number;
  type1Used: number;
  type2Used: number;
  type3Used: number;
  poolType1: number;
  poolType2: number;
  poolType3Groups: number;
}

export type CourseId =
  | "information-assurance"
  | "research-methods"
  | "information-retrieval"
  | "artificial-intelligence"
  | "network-devices";

export interface ExamCourse {
  id: CourseId;
  title: string;
  /** An absolute ISO timestamp. All exam times are stored as 08:00 in Ethiopia (UTC+3). */
  examAt: string;
}

export interface NoteSection {
  title: string;
  body: string;
}

export interface SummarySection {
  title: string;
  points: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
}

export interface CourseStudyContent {
  shortNotes: NoteSection[];
  summary: SummarySection[];
  quizzes: QuizQuestion[];
}

export type StudyTab = "exam" | "notes" | "summary" | "quizzes";

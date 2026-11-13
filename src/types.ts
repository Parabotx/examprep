export type CourseId =
  | "information-assurance"
  | "research-methods"
  | "information-retrieval"
  | "artificial-intelligence"
  | "network-devices";

export interface ExamCourse {
  id: CourseId;
  title: string;
  /** An absolute ISO timestamp. All exam times are stored at 08:00 Ethiopia time (UTC+3). */
  examAt: string;
}

export interface StudyTopic {
  title: string;
  overview: string;
  keyPoints: string[];
  example?: string;
  examFocus?: string;
}

export interface SummaryTopic {
  title: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface InteractiveScenario {
  id: string;
  title: string;
  situation: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  takeaway: string;
}

export interface ChapterLearningContent {
  id: "chapter1" | "chapter2";
  title: string;
  subtitle: string;
  studyNotes: StudyTopic[];
  shortNotes: StudyTopic[];
  summary: SummaryTopic[];
  interactive: InteractiveScenario[];
  quizzes: QuizQuestion[];
}

export interface CourseStudyContent {
  shortNotes: StudyTopic[];
  summary: SummaryTopic[];
  quizzes: QuizQuestion[];
}

export type StudyTab =
  | "study-notes"
  | "short-notes"
  | "summary"
  | "interactive"
  | "quizzes"
  | "exam";

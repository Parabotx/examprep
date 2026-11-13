import type { CourseId, CourseStudyContent } from "../types";

/**
 * Add course materials here as they are provided.
 * The interface reads this data automatically; no layout changes are needed
 * when notes, summaries, or quiz questions are added.
 */
const emptyCourseContent: CourseStudyContent = {
  shortNotes: [],
  summary: [],
  quizzes: [],
};

export const studyContent: Record<CourseId, CourseStudyContent> = {
  "information-assurance": { ...emptyCourseContent },
  "research-methods": { ...emptyCourseContent },
  "information-retrieval": { ...emptyCourseContent },
  "artificial-intelligence": { ...emptyCourseContent },
  "network-devices": { ...emptyCourseContent },
};

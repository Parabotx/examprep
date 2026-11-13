import type { ExamCourse } from "../types";

/**
 * Exam dates were supplied in the Ethiopian calendar (Hidar 7–11, 2019 E.C.).
 * They correspond to 16–20 November 2026. 08:00 Ethiopia time is 05:00 UTC.
 *
 * Keeping absolute timestamps makes the countdown reliable across browser
 * time zones while the interface always formats the schedule for Addis Ababa.
 */
export const courses: ExamCourse[] = [
  {
    id: "information-assurance",
    title: "Information Assurance and Security",
    examAt: "2026-11-16T05:00:00.000Z",
  },
  {
    id: "research-methods",
    title: "Basic Research Method in IT",
    examAt: "2026-11-17T05:00:00.000Z",
  },
  {
    id: "information-retrieval",
    title: "Information Storage and Retrieval",
    examAt: "2026-11-18T05:00:00.000Z",
  },
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    examAt: "2026-11-19T05:00:00.000Z",
  },
  {
    id: "network-devices",
    title: "Network Device and Configuration",
    examAt: "2026-11-20T05:00:00.000Z",
  },
];

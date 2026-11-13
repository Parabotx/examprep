import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock3,
  FileText,
  GraduationCap,
  Layers3,
  Sparkles,
} from "lucide-react";
import { courses } from "./data/courses";
import { studyContent } from "./data/studyContent";
import type { CourseId, ExamCourse, QuizQuestion, StudyTab } from "./types";

const ETHIOPIA_TIME_ZONE = "Africa/Addis_Ababa";

const tabItems: { id: StudyTab; label: string; icon: typeof BookOpen }[] = [
  { id: "exam", label: "Exam", icon: Clock3 },
  { id: "notes", label: "Short notes", icon: FileText },
  { id: "summary", label: "Summary", icon: Layers3 },
  { id: "quizzes", label: "Quizzes", icon: Brain },
];

function formatCountdown(examAt: string, now: number) {
  const distance = new Date(examAt).getTime() - now;

  if (distance <= 0) return null;

  const totalSeconds = Math.floor(distance / 1000);
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;

  return [
    { value: days, label: "days", short: "d" },
    { value: hours, label: "hours", short: "h" },
    { value: minutes, label: "minutes", short: "m" },
    { value: seconds, label: "seconds", short: "s" },
  ];
}

function Countdown({
  examAt,
  now,
  compact = false,
}: {
  examAt: string;
  now: number;
  compact?: boolean;
}) {
  const parts = formatCountdown(examAt, now);

  if (!parts) {
    return <span className="exam-started">Exam time</span>;
  }

  if (compact) {
    return (
      <span className="compact-countdown" aria-label={parts.map((part) => `${part.value} ${part.label}`).join(", ")}>
        {parts.map((part) => (
          <span key={part.short}>
            {String(part.value).padStart(2, "0")}
            <small>{part.short}</small>
          </span>
        ))}
      </span>
    );
  }

  return (
    <div className="countdown-display" aria-label={parts.map((part) => `${part.value} ${part.label}`).join(", ")}>
      {parts.map((part) => (
        <div className="countdown-unit" key={part.short}>
          <strong>{String(part.value).padStart(2, "0")}</strong>
          <span>{part.label}</span>
        </div>
      ))}
    </div>
  );
}

function formatExamDate(examAt: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: ETHIOPIA_TIME_ZONE,
  }).format(new Date(examAt));
}

function formatEthiopiaClock(now: number) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: ETHIOPIA_TIME_ZONE,
  }).format(new Date(now));
}

function EmptyState({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="content-status">
        <span className="status-dot" />
        Ready for your materials
      </span>
    </div>
  );
}


function QuizSession({ questions }: { questions: QuizQuestion[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const question = questions[currentIndex];

  const chooseAnswer = (optionIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIndex);
    if (optionIndex === question.answerIndex) {
      setScore((currentScore) => currentScore + 1);
    }
  };

  const advance = () => {
    if (currentIndex === questions.length - 1) {
      setIsComplete(true);
      return;
    }
    setCurrentIndex((index) => index + 1);
    setSelectedAnswer(null);
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <div className="quiz-result-card">
        <div className="quiz-result-icon"><CheckCircle2 size={25} /></div>
        <span className="eyebrow">SESSION COMPLETE</span>
        <h2>{score} <span>/ {questions.length}</span></h2>
        <p>{score === questions.length ? "Perfect score. Excellent work." : "Every attempt is progress. Review and give it another go."}</p>
        <button className="quiz-primary-button" onClick={restart}>Try again <ArrowUpRight size={15} /></button>
      </div>
    );
  }

  return (
    <div className="quiz-panel">
      <div className="quiz-meta">
        <span>QUESTION {currentIndex + 1} OF {questions.length}</span>
        <span>{score} CORRECT</span>
      </div>
      <div className="quiz-progress">
        <span style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
      </div>
      <h2 className="quiz-question">{question.question}</h2>
      <div className="quiz-options">
        {question.options.map((option, optionIndex) => {
          const isCorrect = optionIndex === question.answerIndex;
          const isSelected = selectedAnswer === optionIndex;
          const stateClass = selectedAnswer === null
            ? ""
            : isCorrect
              ? " correct"
              : isSelected
                ? " incorrect"
                : "";
          return (
            <button
              className={`quiz-option${stateClass}`}
              key={option}
              onClick={() => chooseAnswer(optionIndex)}
              disabled={selectedAnswer !== null}
              aria-pressed={isSelected}
            >
              <span className="option-letter">{String.fromCharCode(65 + optionIndex)}</span>
              <span>{option}</span>
              {selectedAnswer !== null && isCorrect && <CheckCircle2 className="option-result" size={17} />}
            </button>
          );
        })}
      </div>
      {selectedAnswer !== null && (
        <div className={`quiz-feedback ${selectedAnswer === question.answerIndex ? "positive" : "negative"}`}>
          <strong>{selectedAnswer === question.answerIndex ? "That’s correct." : "Not quite."}</strong>
          <p>{question.explanation ?? "Keep going. You’ll have another chance to practise this topic."}</p>
        </div>
      )}
      <div className="quiz-footer">
        <span>{currentIndex + 1} of {questions.length}</span>
        <button className="quiz-primary-button" onClick={advance} disabled={selectedAnswer === null}>
          {currentIndex === questions.length - 1 ? "See results" : "Next question"}
          <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  );
}

function CourseResources({ courseId, tab }: { courseId: CourseId; tab: StudyTab }) {
  const content = studyContent[courseId];

  if (tab === "notes") {
    if (content.shortNotes.length === 0) {
      return (
        <EmptyState
          icon={<FileText size={21} />}
          title="Your short notes will live here"
          description="Concise, exam-focused notes will be organized here as you share the course resources."
        />
      );
    }

    return (
      <div className="resource-stack">
        {content.shortNotes.map((section) => (
          <article className="resource-card" key={section.title}>
            <h3>{section.title}</h3>
            <p>{section.body}</p>
          </article>
        ))}
      </div>
    );
  }

  if (tab === "summary") {
    if (content.summary.length === 0) {
      return (
        <EmptyState
          icon={<Layers3 size={21} />}
          title="A clear summary, coming together"
          description="The essential ideas from your materials will be collected here for quick revision."
        />
      );
    }

    return (
      <div className="resource-stack">
        {content.summary.map((section) => (
          <article className="resource-card" key={section.title}>
            <h3>{section.title}</h3>
            <ul className="summary-points">
              {section.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </article>
        ))}
      </div>
    );
  }

  if (tab === "quizzes") {
    if (content.quizzes.length === 0) {
      return (
        <EmptyState
          icon={<Brain size={21} />}
          title="Practice will be interactive"
          description="Course questions, answer feedback, and explanations will appear here when we add your study materials."
        />
      );
    }

    return <QuizSession key={courseId} questions={content.quizzes} />;
  }

  return null;
}

function ExamOverview({ course, now }: { course: ExamCourse; now: number }) {
  const hasStarted = new Date(course.examAt).getTime() <= now;

  return (
    <div className="exam-overview">
      <div className="exam-countdown-panel">
        <div className="panel-topline">
          <span className="eyebrow">{hasStarted ? "EXAM TIME" : "COUNTING DOWN TO YOUR EXAM"}</span>
          <span className="timezone-label"><Clock3 size={13} /> ETHIOPIA TIME</span>
        </div>
        <Countdown examAt={course.examAt} now={now} />
        <div className="exam-date-line">
          <span>{formatExamDate(course.examAt)}</span>
          <strong>8:00 AM</strong>
        </div>
      </div>
      <div className="exam-note-card">
        <div className="note-card-icon"><Sparkles size={18} /></div>
        <div>
          <h3>Your preparation space</h3>
          <p>Short notes, focused summaries, and practice quizzes for this course will be added here as we work through your resources.</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [now, setNow] = useState(() => Date.now());
  const [selectedCourseId, setSelectedCourseId] = useState<CourseId | null>(null);
  const [activeTab, setActiveTab] = useState<StudyTab>("exam");

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const nextCourse = useMemo(
    () => courses.find((course) => new Date(course.examAt).getTime() > now),
    [now],
  );

  const selectedCourse = selectedCourseId
    ? courses.find((course) => course.id === selectedCourseId) ?? null
    : null;

  const openCourse = (courseId: CourseId) => {
    setSelectedCourseId(courseId);
    setActiveTab("exam");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    setSelectedCourseId(null);
    setActiveTab("exam");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <button className="brand" onClick={goHome} aria-label="ExamPrep home">
          <span className="brand-mark"><GraduationCap size={20} strokeWidth={2.2} /></span>
          <span className="brand-name">exam<span>prep</span></span>
        </button>
        <div className="header-time">
          <span className="live-indicator" />
          <span>ADDIS ABABA</span>
          <strong>{formatEthiopiaClock(now)}</strong>
        </div>
      </header>

      <main className="page-content">
        {selectedCourse ? (
          <section className="workspace">
            <button className="back-link" onClick={goHome}>
              <ArrowLeft size={16} /> All courses
            </button>

            <div className="workspace-heading">
              <div className="workspace-icon"><BookOpen size={22} /></div>
              <div>
                <span className="eyebrow">YOUR STUDY SPACE</span>
                <h1>{selectedCourse.title}</h1>
              </div>
            </div>

            <nav className="study-tabs" aria-label="Course study sections">
              {tabItems.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    className={`study-tab ${activeTab === tab.id ? "active" : ""}`}
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    aria-current={activeTab === tab.id ? "page" : undefined}
                  >
                    <Icon size={16} strokeWidth={1.9} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="tab-content">
              {activeTab === "exam" ? (
                <ExamOverview course={selectedCourse} now={now} />
              ) : (
                <CourseResources courseId={selectedCourse.id} tab={activeTab} />
              )}
            </div>
          </section>
        ) : (
          <section className="landing">
            <div className="welcome-row">
              <div className="welcome-copy">
                <span className="eyebrow"><span className="eyebrow-line" /> YOUR EXAM DESK</span>
                <h1>A little more focus.<br /><span>A lot more confidence.</span></h1>
                <p>Everything you need for this exam week, gathered in one calm, clear space.</p>
              </div>

              <div className="next-exam-card">
                <div className="next-card-top">
                  <span className="eyebrow">UP NEXT</span>
                  <span className="next-card-icon"><ArrowUpRight size={17} /></span>
                </div>
                {nextCourse ? (
                  <>
                    <h2>{nextCourse.title}</h2>
                    <div className="next-divider" />
                    <Countdown examAt={nextCourse.examAt} now={now} />
                    <div className="next-card-footer">
                      <span><Clock3 size={14} /> Next exam · 8:00 AM EAT</span>
                      <button onClick={() => openCourse(nextCourse.id)} aria-label={`Open ${nextCourse.title}`}>
                        Prepare <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="all-done">
                    <CheckCircle2 size={25} />
                    <h2>Exam week complete.</h2>
                    <p>Well done on making it through.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="courses-heading">
              <div>
                <span className="eyebrow">YOUR LINEUP</span>
                <h2>Five courses. One clear plan.</h2>
              </div>
              <span className="course-count">05 COURSES</span>
            </div>

            <div className="course-grid">
              {courses.map((course) => (
                <button
                  className="course-card"
                  key={course.id}
                  onClick={() => openCourse(course.id)}
                  aria-label={`Open ${course.title}. ${formatCountdown(course.examAt, now)?.map((part) => `${part.value} ${part.label}`).join(", ") ?? "Exam time"} remaining`}
                >
                  <div className="course-card-main">
                    <h3>{course.title}</h3>
                  </div>
                  <div className="course-card-bottom">
                    <Countdown examAt={course.examAt} now={now} compact />
                    <span className="course-open"><ArrowUpRight size={17} /></span>
                  </div>
                </button>
              ))}
            </div>

            <footer className="landing-footer">
              <div className="footer-mark"><GraduationCap size={16} /> <span>exam<span>prep</span></span></div>
              <span>One step at a time.</span>
              <span>All times shown in Ethiopia time · UTC+3</span>
            </footer>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  GraduationCap,
  Layers3,
  LockKeyhole,
  Play,
  Palette,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { courses } from "./data/courses";
import { chapter1, chapter2 } from "./data/iasContent";
import { chapter1QuizBank, chapter2QuizBank } from "./data/iasQuizBank";
import type {
  ChapterLearningContent,
  CourseId,
  ExamCourse,
  QuizQuestion,
  StudyTab,
} from "./types";

const ETHIOPIA_TIME_ZONE = "Africa/Addis_Ababa";
type StudyScope = "chapter1" | "chapter2" | "combined";
type AssessmentMode = "quiz" | "exam";
type SessionState = {
  mode: AssessmentMode;
  scope: StudyScope;
  questions: QuizQuestion[];
  count: number;
  focusTopics?: string[];
};

type TopicPerformance = {
  topic: string;
  missed: number;
  total: number;
};

const SAVED_STUDY_STATE_KEY = "examprep:study-state";
const SAVED_READING_TONE_KEY = "examprep:reading-tone";

type SavedStudyState = {
  selectedCourseId: CourseId | null;
  selectedChapter: StudyScope | null;
  activeTab: StudyTab;
  quizScope: StudyScope;
  examScope: StudyScope;
};

function readSavedStudyState(): SavedStudyState | null {
  try {
    const raw = window.localStorage.getItem(SAVED_STUDY_STATE_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as Partial<SavedStudyState>;
    const validScopes: StudyScope[] = ["chapter1", "chapter2", "combined"];
    const validTabs: StudyTab[] = ["study-notes", "short-notes", "summary", "interactive", "quizzes", "exam"];
    const validCourseIds: CourseId[] = [
      "information-assurance",
      "research-methods",
      "information-retrieval",
      "artificial-intelligence",
      "network-devices",
    ];
    return {
      selectedCourseId: value.selectedCourseId && validCourseIds.includes(value.selectedCourseId)
        ? value.selectedCourseId
        : null,
      selectedChapter: value.selectedChapter && validScopes.includes(value.selectedChapter)
        ? value.selectedChapter
        : null,
      activeTab: value.activeTab && validTabs.includes(value.activeTab) ? value.activeTab : "study-notes",
      quizScope: value.quizScope && validScopes.includes(value.quizScope) ? value.quizScope : "combined",
      examScope: value.examScope && validScopes.includes(value.examScope) ? value.examScope : "combined",
    };
  } catch {
    return null;
  }
}

function readSavedReadingTone(): number {
  try {
    const value = Number(window.localStorage.getItem(SAVED_READING_TONE_KEY));
    return Number.isInteger(value) && value >= 0 && value < 4 ? value : 0;
  } catch {
    return 0;
  }
}

const readingTones = [
  { id: "paper", label: "Warm paper", swatch: "#faf7ef" },
  { id: "mist", label: "Cool mist", swatch: "#f0f5f8" },
  { id: "lilac", label: "Soft lilac", swatch: "#f4f1fb" },
  { id: "sage", label: "Quiet sage", swatch: "#f0f5ef" },
] as const;

const questionCounts = [15, 30, 50, 100] as const;
const chapterOptions: { id: StudyScope; eyebrow: string; title: string; description: string; icon: typeof BookOpen }[] = [
  {
    id: "chapter1",
    eyebrow: "CHAPTER 01",
    title: "Introduction",
    description: "Security foundations, criteria, attacks and the network-security model.",
    icon: ShieldCheck,
  },
  {
    id: "combined",
    eyebrow: "FULL REVISION",
    title: "Combined study",
    description: "Study, practise or take an assessment across both chapters.",
    icon: Layers3,
  },
  {
    id: "chapter2",
    eyebrow: "CHAPTER 02",
    title: "Computer Threat",
    description: "Malicious code, attack classes, program flaws and security controls.",
    icon: LockKeyhole,
  },
];

const studyTabs: { id: StudyTab; label: string; icon: typeof BookOpen }[] = [
  { id: "study-notes", label: "Study notes", icon: BookOpen },
  { id: "short-notes", label: "Short notes", icon: FileText },
  { id: "summary", label: "Summary", icon: Layers3 },
  { id: "interactive", label: "Interactive study", icon: Brain },
  { id: "quizzes", label: "Quizzes", icon: Target },
];

function formatCountdown(examAt: string, now: number) {
  const distance = new Date(examAt).getTime() - now;
  if (distance <= 0) return null;

  const totalSeconds = Math.floor(distance / 1000);
  return [
    { value: Math.floor(totalSeconds / 86_400), label: "days", short: "d" },
    { value: Math.floor((totalSeconds % 86_400) / 3_600), label: "hours", short: "h" },
    { value: Math.floor((totalSeconds % 3_600) / 60), label: "minutes", short: "m" },
    { value: totalSeconds % 60, label: "seconds", short: "s" },
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
  if (!parts) return <span className="exam-started">Exam time passed</span>;

  if (compact) {
    return (
      <span className="compact-countdown" aria-label={parts.map((part) => `${part.value} ${part.label}`).join(", ")}>
        {parts.map((part) => (
          <span key={part.short}>
            {String(part.value).padStart(2, "0")}<small>{part.short}</small>
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

function formatEthiopiaClock(now: number) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: ETHIOPIA_TIME_ZONE,
  }).format(new Date(now));
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

function chaptersFor(scope: StudyScope): ChapterLearningContent[] {
  if (scope === "chapter1") return [chapter1];
  if (scope === "chapter2") return [chapter2];
  return [chapter1, chapter2];
}

function quizBankFor(scope: StudyScope): QuizQuestion[] {
  if (scope === "chapter1") return chapter1QuizBank;
  if (scope === "chapter2") return chapter2QuizBank;
  return [...chapter1QuizBank, ...chapter2QuizBank];
}

function shuffleArray<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function randomQuestions(bank: QuizQuestion[], count: number): QuizQuestion[] {
  return shuffleArray(bank)
    .slice(0, Math.min(count, bank.length))
    .map((question) => {
      const correctAnswer = question.options[question.answerIndex];
      const pairedOptions = shuffleArray(question.options.map((option, index) => ({
        option,
        explanation: question.optionExplanations[index],
      })));
      const options = pairedOptions.map((item) => item.option);
      return {
        ...question,
        options,
        optionExplanations: pairedOptions.map((item) => item.explanation),
        answerIndex: options.indexOf(correctAnswer),
      };
    });
}

const keyTermPattern = /(confidentiality|integrity|availability|authentication|authorization|non-repudiation|least privilege|threat|vulnerability|reconnaissance|denial of service|passive attack|active attack|buffer overflow|incomplete mediation|TOCTTOU|race condition|logic bomb|ransomware|malicious code|man-in-the-middle|traffic analysis|encryption|firewall|intrusion detection system|modularity|encapsulation|data hiding|separation of duties|virus|worm|Trojan horse|spyware|smurf attack|SYN flood|port redirection|packet sniffing|ping sweep|port scan)/gi;
const keyTermLookup = new Set([
  "confidentiality", "integrity", "availability", "authentication", "authorization",
  "non-repudiation", "least privilege", "threat", "vulnerability", "reconnaissance",
  "denial of service", "passive attack", "active attack", "buffer overflow",
  "incomplete mediation", "tocttou", "race condition", "logic bomb", "ransomware",
  "malicious code", "man-in-the-middle", "traffic analysis", "encryption", "firewall",
  "intrusion detection system", "modularity", "encapsulation", "data hiding",
  "separation of duties", "virus", "worm", "trojan horse", "spyware", "smurf attack",
  "syn flood", "port redirection", "packet sniffing", "ping sweep", "port scan",
]);

function HighlightedText({ text }: { text: string }) {
  return (
    <>
      {text.split(keyTermPattern).map((part, index) =>
        keyTermLookup.has(part.toLowerCase())
          ? <mark className="study-inline-highlight" key={index}><strong><u>{part}</u></strong></mark>
          : <span key={index}>{part}</span>
      )}
    </>
  );
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
    <div className="ias-empty-state">
      <div className="ias-empty-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="ias-content-ready"><span /> Chapter materials are ready to build on</span>
    </div>
  );
}

function CourseHeader({
  course,
  now,
  onBack,
}: {
  course: ExamCourse;
  now: number;
  onBack: () => void;
}) {
  return (
    <>
      <button className="back-link" onClick={onBack}>
        <ArrowLeft size={16} /> All courses
      </button>
      <div className="course-intro-strip">
        <div className="course-intro-icon"><GraduationCap size={22} /></div>
        <div className="course-intro-copy">
          <span className="eyebrow">YOUR COURSE SPACE</span>
          <h1>{course.title}</h1>
        </div>
        <div className="course-intro-exam">
          <span>NEXT EXAM</span>
          <strong>8:00 AM</strong>
          <small>{formatExamDate(course.examAt)}</small>
          <Countdown examAt={course.examAt} now={now} compact />
        </div>
      </div>
    </>
  );
}

function ChapterPicker({ onChoose }: { onChoose: (scope: StudyScope) => void }) {
  return (
    <section className="chapter-picker">
      <div className="section-heading">
        <span className="eyebrow"><span className="eyebrow-line" /> CHOOSE YOUR LEARNING PATH</span>
        <h2>Where shall we begin?</h2>
        <p>Explore either chapter on its own, or bring everything together for full revision.</p>
      </div>

      <div className="chapter-choice-grid">
        {chapterOptions.map((option) => {
          const Icon = option.icon;
          const isCombined = option.id === "combined";
          return (
            <button
              key={option.id}
              className={`chapter-choice-card ${isCombined ? "combined-choice" : ""}`}
              onClick={() => onChoose(option.id)}
            >
              <div className="chapter-choice-top">
                <span className="chapter-choice-icon"><Icon size={21} /></span>
                <span className="chapter-choice-arrow"><ArrowUpRight size={17} /></span>
              </div>
              <span className="chapter-choice-eyebrow">{option.eyebrow}</span>
              <h3>{option.title}</h3>
              <p>{option.description}</p>
              <span className="chapter-choice-action">
                {isCombined ? "Explore both chapters" : "Open chapter"}
                <ArrowRight size={14} />
              </span>
            </button>
          );
        })}
      </div>

      <div className="chapter-picker-foot">
        <ShieldCheck size={16} />
        <span>All chapter materials follow your uploaded lecture slides.</span>
      </div>
    </section>
  );
}

function TopicGroup({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <section className="topic-group">
      <div className="topic-group-heading">
        <span className="eyebrow">{subtitle}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function StudyNotesView({ chapters }: { chapters: ChapterLearningContent[] }) {
  return (
    <div className="learning-column">
      {chapters.map((chapter) => (
        <TopicGroup key={chapter.id} title={chapter.title} subtitle={chapter.subtitle}>
          <div className="study-topic-list">
            {chapter.studyNotes.map((topic, index) => (
              <details className="study-topic-card" key={topic.title} open={index === 0}>
                <summary>
                  <span className="topic-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="topic-title-wrap">
                    <strong>{topic.title}</strong>
                    <small><HighlightedText text={topic.overview} /></small>
                  </span>
                  <ChevronDown size={18} className="topic-chevron" />
                </summary>
                <div className="topic-details">
                  <p className="topic-overview"><HighlightedText text={topic.overview} /></p>
                  <ul>
                    {topic.keyPoints.map((point) => <li key={point}><HighlightedText text={point} /></li>)}
                  </ul>
                  {topic.example && (
                    <div className="topic-example">
                      <span>EXAMPLE</span>
                      <p className="handwritten-example"><HighlightedText text={topic.example} /></p>
                    </div>
                  )}
                  {topic.examFocus && (
                    <div className="topic-exam-focus">
                      <Sparkles size={15} />
                      <p className="handwritten-focus"><strong>Exam focus:</strong> <HighlightedText text={topic.examFocus} /></p>
                    </div>
                  )}
                </div>
              </details>
            ))}
          </div>
        </TopicGroup>
      ))}
      <div className="source-coverage-note">
        <CheckCircle2 size={16} />
        <span>Detailed notes are organized to follow the topics in the uploaded lecture slides, including the diagrams and tables.</span>
      </div>
    </div>
  );
}

function ShortNotesView({ chapters }: { chapters: ChapterLearningContent[] }) {
  return (
    <div className="learning-column short-note-groups">
      {chapters.map((chapter) => (
        <TopicGroup key={chapter.id} title={chapter.title} subtitle="FAST REVISION">
          <div className="short-note-grid">
            {chapter.shortNotes.map((topic, index) => (
              <article className="short-note-card" key={topic.title}>
                <div className="short-note-number">{String(index + 1).padStart(2, "0")}</div>
                <h3>{topic.title}</h3>
                <p><HighlightedText text={topic.overview} /></p>
                {topic.keyPoints.length > 0 && (
                  <ul>{topic.keyPoints.map((point) => <li key={point}><HighlightedText text={point} /></li>)}</ul>
                )}
              </article>
            ))}
          </div>
        </TopicGroup>
      ))}
    </div>
  );
}

function SummaryView({ chapters }: { chapters: ChapterLearningContent[] }) {
  return (
    <div className="learning-column">
      {chapters.map((chapter) => (
        <TopicGroup key={chapter.id} title={chapter.title} subtitle="TOPIC MAP">
          <div className="summary-list">
            {chapter.summary.map((topic, index) => (
              <article className="summary-row" key={topic.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><strong>{topic.title}</strong><p><HighlightedText text={topic.description} /></p></div>
              </article>
            ))}
          </div>
        </TopicGroup>
      ))}
      <div className="summary-footer-note">
        <Sparkles size={16} />
        <span>Use this view to check the chapter structure, then open Study notes for full explanations.</span>
      </div>
    </div>
  );
}

function InteractiveStudyView({ chapters }: { chapters: ChapterLearningContent[] }) {
  const scenarios = chapters.flatMap((chapter) =>
    chapter.interactive.map((scenario) => ({
      ...scenario,
      chapterLabel: chapter.id === "chapter1" ? "CHAPTER 01" : "CHAPTER 02",
    })),
  );
  const [activeScenarioId, setActiveScenarioId] = useState(scenarios[0]?.id ?? "");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const activeScenario = scenarios.find((scenario) => scenario.id === activeScenarioId) ?? scenarios[0];

  useEffect(() => {
    setActiveScenarioId(scenarios[0]?.id ?? "");
    setSelectedOption(null);
  }, [chapters]);

  if (!activeScenario) {
    return <EmptyState icon={<Brain size={22} />} title="Interactive study is being prepared" description="Scenario-based learning will appear here." />;
  }

  return (
    <div className="interactive-layout">
      <aside className="scenario-sidebar">
        <div className="scenario-sidebar-heading">
          <span className="eyebrow">PRACTICE LAB</span>
          <strong>{scenarios.length} scenarios</strong>
        </div>
        {scenarios.map((scenario, index) => (
          <button
            key={scenario.id}
            className={`scenario-nav-item ${scenario.id === activeScenario.id ? "active" : ""}`}
            onClick={() => {
              setActiveScenarioId(scenario.id);
              setSelectedOption(null);
            }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><small>{scenario.chapterLabel}</small><strong>{scenario.title}</strong></div>
          </button>
        ))}
      </aside>

      <section className="scenario-workbench">
        <div className="scenario-workbench-top">
          <span className="eyebrow"><span className="live-indicator" /> INTERACTIVE SCENARIO</span>
          <span className="scenario-source-label">{activeScenario.chapterLabel}</span>
        </div>
        <h2>{activeScenario.title}</h2>
        <div className="scenario-situation">
          <span>THE SITUATION</span>
          <p>{activeScenario.situation}</p>
        </div>
        <div className="scenario-question">
          <span>YOUR DECISION</span>
          <h3>{activeScenario.question}</h3>
        </div>
        <div className="scenario-options">
          {activeScenario.options.map((option, index) => {
            const isCorrect = index === activeScenario.answerIndex;
            const isSelected = selectedOption === index;
            const stateClass = selectedOption === null ? "" : isCorrect ? " correct" : isSelected ? " incorrect" : "";
            return (
              <button
                key={option}
                className={`scenario-option${stateClass}`}
                onClick={() => setSelectedOption(index)}
                disabled={selectedOption !== null}
                aria-pressed={isSelected}
              >
                <span>{String.fromCharCode(65 + index)}</span>
                <strong>{option}</strong>
                {selectedOption !== null && isCorrect && <CheckCircle2 size={17} />}
              </button>
            );
          })}
        </div>
        {selectedOption !== null && (
          <div className={`scenario-feedback ${selectedOption === activeScenario.answerIndex ? "correct" : "incorrect"}`}>
            <strong>{selectedOption === activeScenario.answerIndex ? "Good decision." : "Let's understand why."}</strong>
            <p>{activeScenario.explanation}</p>
            <div><Sparkles size={15} /><span>{activeScenario.takeaway}</span></div>
          </div>
        )}
        <div className="scenario-actions">
          <span>{selectedOption === null ? "Choose the best answer to reveal the explanation." : "Concept explored · You can try another scenario."}</span>
          <button
            className="text-action-button"
            onClick={() => {
              const currentIndex = scenarios.findIndex((scenario) => scenario.id === activeScenario.id);
              const next = scenarios[(currentIndex + 1) % scenarios.length];
              setActiveScenarioId(next.id);
              setSelectedOption(null);
            }}
          >
            Next scenario <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </div>
  );
}

function QuestionCountPicker({
  count,
  onChange,
  available,
}: {
  count: number;
  onChange: (value: number) => void;
  available: number;
}) {
  return (
    <div className="question-count-block">
      <span className="setup-label">NUMBER OF QUESTIONS</span>
      <div className="count-choice-row">
        {questionCounts.map((choice) => (
          <button
            key={choice}
            className={`count-choice ${count === choice ? "active" : ""}`}
            onClick={() => onChange(choice)}
          >
            <strong>{choice}</strong>
            <small>questions</small>
          </button>
        ))}
      </div>
      <span className="question-pool-caption">{available} questions in this question bank. Each new attempt draws a fresh randomized set.</span>
    </div>
  );
}

function OptionExplanationList({
  question,
  selectedIndex,
}: {
  question: QuizQuestion;
  selectedIndex: number;
}) {
  return (
    <div className="option-explanation-list">
      <span className="option-explanation-kicker">WHY EACH OPTION FITS OR DOESN'T</span>
      {question.options.map((option, index) => {
        const isCorrect = index === question.answerIndex;
        const isSelected = index === selectedIndex;
        const status = isCorrect ? "correct" : isSelected ? "chosen" : "not-answer";
        const statusLabel = isCorrect ? "Correct answer" : isSelected ? "Your selection" : "Not the answer";
        return (
          <article className={`option-explanation-item ${status}`} key={`${question.id}-option-${index}`}>
            <div className="option-explanation-top">
              <span className="option-explanation-letter">{String.fromCharCode(65 + index)}</span>
              <strong><HighlightedText text={option} /></strong>
              <small>{statusLabel}</small>
            </div>
            <p><HighlightedText text={question.optionExplanations[index] || "This choice does not match the defining condition in the question."} /></p>
          </article>
        );
      })}
    </div>
  );
}

function AssessmentSession({
  session,
  onRetake,
  onExit,
  onPracticeTopics,
}: {
  session: SessionState;
  onRetake: () => void;
  onExit: () => void;
  onPracticeTopics: (topics: string[]) => void;
}) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const currentQuestion = session.questions[questionIndex];
  const currentAnswer = answers[questionIndex] ?? -1;
  const score = answers.reduce(
    (total, answer, index) => total + (answer === session.questions[index]?.answerIndex ? 1 : 0),
    0,
  );
  const percentage = Math.round((score / session.questions.length) * 100);
  const topicPerformance = useMemo(() => {
    const performance = new Map<string, TopicPerformance>();
    session.questions.forEach((question, index) => {
      const topic = question.topic || "General review";
      const entry = performance.get(topic) ?? { topic, missed: 0, total: 0 };
      entry.total += 1;
      if (answers[index] !== question.answerIndex) entry.missed += 1;
      performance.set(topic, entry);
    });
    return [...performance.values()]
      .filter((entry) => entry.missed > 0)
      .sort((a, b) => (b.missed / b.total) - (a.missed / a.total) || b.missed - a.missed);
  }, [answers, session.questions]);

  const selectAnswer = (optionIndex: number) => {
    if (currentAnswer !== -1) return;
    setAnswers((previous) => {
      const next = [...previous];
      next[questionIndex] = optionIndex;
      return next;
    });
  };

  const goNext = () => {
    if (questionIndex === session.questions.length - 1) {
      setFinished(true);
    } else {
      setQuestionIndex((index) => index + 1);
    }
  };

  if (finished) {
    return (
      <div className="assessment-result">
        <div className="assessment-result-top">
          <div className="assessment-result-icon"><Trophy size={25} /></div>
          <span className="eyebrow">{session.mode === "exam" ? "EXAM COMPLETED" : "QUIZ COMPLETED"}</span>
          <h2>{score}<span> / {session.questions.length}</span></h2>
          <p className="assessment-percent">{percentage}% correct</p>
          <p className="assessment-result-message">
            {percentage >= 85 ? "Excellent work. Your understanding is looking strong." : percentage >= 60 ? "Good progress. Review the explanations for the topics you missed." : "Keep practising. Use the explanations below to strengthen each topic."}
          </p>
          <div className="assessment-result-actions">
            <button className="primary-action-button" onClick={onRetake}><RotateCcw size={15} /> New randomized attempt</button>
            <button className="secondary-action-button" onClick={onExit}>Back to course</button>
          </div>
        </div>
        {topicPerformance.length > 0 ? (
          <section className="weak-topic-diagnosis">
            <div className="weak-topic-heading">
              <div>
                <span className="eyebrow">YOUR PERSONAL REVISION PLAN</span>
                <h3>Let's strengthen the parts you missed.</h3>
                <p>We grouped your incorrect answers by lecture topic. Choose one area or practise all your weak topics together.</p>
              </div>
              <button
                className="primary-action-button"
                onClick={() => onPracticeTopics(topicPerformance.map((item) => item.topic))}
              >
                <Target size={15} /> Practice weak topics
              </button>
            </div>
            <div className="weak-topic-list">
              {topicPerformance.map((item) => (
                <article className="weak-topic-item" key={item.topic}>
                  <div className="weak-topic-copy">
                    <strong>{item.topic}</strong>
                    <span>{item.missed} missed out of {item.total} questions in this topic</span>
                  </div>
                  <div className="weak-topic-meter" aria-label={`${item.missed} of ${item.total} missed`}>
                    <span style={{ width: `${(item.missed / item.total) * 100}%` }} />
                  </div>
                  <button
                    className="weak-topic-action"
                    onClick={() => onPracticeTopics([item.topic])}
                  >
                    Focus here <ArrowRight size={13} />
                  </button>
                </article>
              ))}
            </div>
          </section>
        ) : (
          <div className="all-topics-mastered">
            <CheckCircle2 size={18} />
            <span>You answered every question correctly. Excellent work.</span>
          </div>
        )}
        <div className="answer-review-heading">
          <div><span className="eyebrow">ANSWER REVIEW</span><h3>Learn from every question</h3></div>
          <span>{score} correct · {session.questions.length - score} to review</span>
        </div>
        <div className="answer-review-list">
          {session.questions.map((question, index) => {
            const isCorrect = answers[index] === question.answerIndex;
            return (
              <article className={`answer-review-card ${isCorrect ? "correct" : "incorrect"}`} key={question.id}>
                <div className="answer-review-status">{isCorrect ? <CheckCircle2 size={16} /> : <span>!</span>}</div>
                <div>
                  <small>QUESTION {index + 1} · {question.topic}</small>
                  <h4>{question.question}</h4>
                  <p><strong>Your answer:</strong> {answers[index] >= 0 ? question.options[answers[index]] : "Not answered"}</p>
                  {!isCorrect && <p><strong>Correct answer:</strong> {question.options[question.answerIndex]}</p>}
                  <p className="answer-explanation"><HighlightedText text={question.explanation} /></p>
                  <details className="answer-review-options">
                    <summary>Review why every option fits or does not fit</summary>
                    <OptionExplanationList question={question} selectedIndex={answers[index] ?? -1} />
                  </details>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className="assessment-session"
      onKeyDown={(event) => {
        const target = event.target as HTMLElement;
        if (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
        if (/^[1-4]$/.test(event.key)) {
          event.preventDefault();
          selectAnswer(Number(event.key) - 1);
        }
      }}
    >
      <div className="assessment-session-top">
        <div>
          <span className="eyebrow">{session.mode === "exam" ? "ASSESSMENT MODE" : "PRACTICE MODE"}</span>
          <h2>{session.mode === "exam" ? "Chapter exam" : "Question practice"}</h2>
          <p>Choose an answer to reveal the correct response, a clear explanation and why the other choices do not fit. Your final score appears at the end.</p>
        </div>
        <button className="quiet-icon-button" onClick={onExit} aria-label="Exit assessment"><ArrowLeft size={18} /></button>
      </div>
      <div className="assessment-progress-row">
        <span>QUESTION {questionIndex + 1} <small>OF {session.questions.length}</small></span>
        <span>{answers.filter((answer) => answer >= 0).length} ANSWERED</span>
      </div>
      <div className="assessment-progress-track" role="progressbar" aria-label="Assessment progress" aria-valuemin={1} aria-valuemax={session.questions.length} aria-valuenow={questionIndex + 1}><span style={{ width: `${((questionIndex + 1) / session.questions.length) * 100}%` }} /></div>
      <div className="assessment-question-card">
        <h3>{currentQuestion.question}</h3>
        <div className="assessment-options" role="group" aria-label="Answer choices">
          {currentQuestion.options.map((option, optionIndex) => {
            const isSelected = currentAnswer === optionIndex;
            const isCorrect = optionIndex === currentQuestion.answerIndex;
            const stateClass = currentAnswer === -1
              ? ""
              : isCorrect
                ? " correct"
                : isSelected
                  ? " incorrect"
                  : " revealed";
            return (
              <button
                key={option}
                className={`assessment-option${stateClass}`}
                onClick={() => selectAnswer(optionIndex)}
                disabled={currentAnswer !== -1}
                aria-pressed={isSelected}
              >
                <span>{String.fromCharCode(65 + optionIndex)}</span>
                <strong>{option}</strong>
                {currentAnswer !== -1 && isCorrect && <CheckCircle2 size={17} />}
                {currentAnswer !== -1 && isSelected && !isCorrect && <span className="assessment-option-cross">×</span>}
              </button>
            );
          })}
        </div>
        <p className="assessment-keyboard-hint">KEYBOARD TIP · Press 1, 2, 3 or 4 to choose an answer.</p>
        {currentAnswer !== -1 && (
          <div role="status" aria-live="polite" className={`instant-feedback ${currentAnswer === currentQuestion.answerIndex ? "correct" : "incorrect"}`}>
            <div className="instant-feedback-summary">
              <div><span>YOUR ANSWER</span><strong><HighlightedText text={currentQuestion.options[currentAnswer]} /></strong></div>
              <div><span>CORRECT ANSWER</span><strong><HighlightedText text={currentQuestion.options[currentQuestion.answerIndex]} /></strong></div>
            </div>
            <div className="instant-feedback-core">
              <span className="option-explanation-kicker">WHY THE CORRECT ANSWER FITS</span>
              <p><HighlightedText text={currentQuestion.explanation} /></p>
            </div>
            <OptionExplanationList question={currentQuestion} selectedIndex={currentAnswer} />
          </div>
        )}
      </div>
      <div className="assessment-session-footer">
        <button className="secondary-action-button" onClick={onExit}>Exit</button>
        <button className="primary-action-button" onClick={goNext} disabled={currentAnswer === -1}>
          {questionIndex === session.questions.length - 1 ? "Finish and see results" : "Next question"}
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

function AssessmentSetup({
  mode,
  currentScope,
  allowScopeChoice,
  onScopeChange,
  count,
  onCountChange,
  onStart,
}: {
  mode: AssessmentMode;
  currentScope: StudyScope;
  allowScopeChoice: boolean;
  onScopeChange: (scope: StudyScope) => void;
  count: number;
  onCountChange: (count: number) => void;
  onStart: () => void;
}) {
  const bankLength = quizBankFor(currentScope).length;
  const isExam = mode === "exam";

  return (
    <div className="assessment-setup">
      <div className="assessment-setup-hero">
        <div className="assessment-setup-icon">{isExam ? <GraduationCap size={23} /> : <Target size={23} />}</div>
        <div>
          <span className="eyebrow">{isExam ? "TEST YOUR UNDERSTANDING" : "BUILD YOUR CONFIDENCE"}</span>
          <h2>{isExam ? "Take an exam" : "Create a practice quiz"}</h2>
          <p>Choose your question count. Each answer is checked immediately, with a full explanation before you continue. Your score and topic review appear at the end.</p>
        </div>
      </div>

      {allowScopeChoice && (
        <div className="scope-picker-block">
          <span className="setup-label">{isExam ? "CHOOSE EXAM SCOPE" : "CHOOSE QUIZ SCOPE"}</span>
          <div className="scope-choice-row">
            {([
              ["chapter1", "Chapter 1"],
              ["chapter2", "Chapter 2"],
              ["combined", "Both chapters"],
            ] as [StudyScope, string][]).map(([scope, label]) => (
              <button
                key={scope}
                className={`scope-choice ${currentScope === scope ? "active" : ""}`}
                onClick={() => onScopeChange(scope)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      <QuestionCountPicker count={count} onChange={onCountChange} available={bankLength} />

      <div className="assessment-setup-bottom">
        <div className="assessment-mode-note">
          <ShieldCheck size={17} />
          <span>{isExam ? "No timer has been imposed because the lecture files do not specify an exam duration." : "Immediate feedback is shown after each answer."}</span>
        </div>
        <button className="primary-action-button start-assessment-button" onClick={onStart}>
          <Play size={15} fill="currentColor" /> {isExam ? "Start exam" : "Start quiz"} <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  );
}

function ChapterWorkspace({
  scope,
  activeTab,
  setActiveTab,
  onBackToChapters,
  quizScope,
  setQuizScope,
  quizCount,
  setQuizCount,
  examScope,
  setExamScope,
  examCount,
  setExamCount,
  session,
  setSession,
}: {
  scope: StudyScope;
  activeTab: StudyTab;
  setActiveTab: (tab: StudyTab) => void;
  onBackToChapters: () => void;
  quizScope: StudyScope;
  setQuizScope: (scope: StudyScope) => void;
  quizCount: number;
  setQuizCount: (count: number) => void;
  examScope: StudyScope;
  setExamScope: (scope: StudyScope) => void;
  examCount: number;
  setExamCount: (count: number) => void;
  session: SessionState | null;
  setSession: (session: SessionState | null) => void;
}) {
  const chapterGroups = useMemo(() => chaptersFor(scope), [scope]);
  const [readingToneIndex, setReadingToneIndex] = useState(readSavedReadingTone);
  const isCombined = scope === "combined";
  const activeReadingTone = readingTones[readingToneIndex];

  useEffect(() => {
    try {
      window.localStorage.setItem(SAVED_READING_TONE_KEY, String(readingToneIndex));
    } catch {
      // The reading experience still works when browser storage is unavailable.
    }
  }, [readingToneIndex]);

  const chapterName = scope === "chapter1" ? "Chapter 1 · Introduction" : scope === "chapter2" ? "Chapter 2 · Computer Threat" : "Combined study";

  const begin = (
    mode: AssessmentMode,
    selectedScope: StudyScope,
    count: number,
    focusTopics?: string[],
  ) => {
    const completeBank = quizBankFor(selectedScope);
    const bank = focusTopics?.length
      ? completeBank.filter((question) => focusTopics.includes(question.topic))
      : completeBank;
    const questions = randomQuestions(bank, count);
    setSession({
      mode,
      scope: selectedScope,
      questions,
      count: questions.length,
      focusTopics,
    });
  };

  const retake = () => {
    if (!session) return;
    begin(session.mode, session.scope, session.count, session.focusTopics);
  };

  const practiceWeakTopics = (topics: string[]) => {
    if (!session) return;
    const topicBank = quizBankFor(session.scope).filter((question) => topics.includes(question.topic));
    if (topicBank.length === 0) return;
    const targetCount = Math.min(session.count, topicBank.length);
    begin("quiz", session.scope, targetCount, topics);
    setActiveTab("quizzes");
  };

  return (
    <section className="chapter-workspace">
      <div className="workspace-breadcrumb">
        <button className="back-link" onClick={onBackToChapters}><ArrowLeft size={15} /> Chapters</button>
        <span>{chapterName}</span>
      </div>

      <div className="workspace-title-row">
        <div className="workspace-title-icon"><BookOpen size={22} /></div>
        <div className="workspace-title-copy">
          <span className="eyebrow">{isCombined ? "COMPLETE REVISION SPACE" : scope === "chapter1" ? "CHAPTER 01" : "CHAPTER 02"}</span>
          <h1>{isCombined ? "Study both chapters" : scope === "chapter1" ? chapter1.title : chapter2.title}</h1>
          <p>{isCombined ? "Everything from Introduction and Computer Threat, in one connected learning space." : scope === "chapter1" ? "Build a clear foundation in information assurance and security." : "Understand malicious code, attack methods and security controls."}</p>
        </div>
        <button
          className="workspace-exam-button"
          onClick={() => {
            setSession(null);
            setActiveTab("exam");
            if (scope !== "combined") setExamScope(scope);
            else setExamScope("combined");
          }}
        >
          <GraduationCap size={16} /> Take exam
        </button>
      </div>

      <nav className="ias-study-tabs" aria-label="Study sections">
        {studyTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`ias-study-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => {
                setSession(null);
                setActiveTab(tab.id);
              }}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <div className={`ias-tab-content reading-surface tone-${activeReadingTone.id}`}>
        <div className="reading-style-toolbar">
          <div>
            <span className="eyebrow"><Palette size={13} /> READING CANVAS</span>
            <small>{activeReadingTone.label} · choose a softer page background</small>
          </div>
          <div className="reading-tone-choices" aria-label="Reading background">
            {readingTones.map((tone, index) => (
              <button
                key={tone.id}
                className={`reading-tone-choice ${index === readingToneIndex ? "active" : ""}`}
                onClick={() => setReadingToneIndex(index)}
                title={tone.label}
                aria-label={`Use ${tone.label} reading background`}
                aria-pressed={index === readingToneIndex}
              >
                <span style={{ background: tone.swatch }} />
                <small>{tone.label}</small>
              </button>
            ))}
          </div>
        </div>
        {activeTab === "study-notes" && <StudyNotesView chapters={chapterGroups} />}
        {activeTab === "short-notes" && <ShortNotesView chapters={chapterGroups} />}
        {activeTab === "summary" && <SummaryView chapters={chapterGroups} />}
        {activeTab === "interactive" && <InteractiveStudyView chapters={chapterGroups} />}
        {activeTab === "quizzes" && (
          session ? (
            <AssessmentSession key={session.questions.map((question) => question.id).join("|")} session={session} onRetake={retake} onExit={() => setSession(null)} onPracticeTopics={practiceWeakTopics} />
          ) : (
            <AssessmentSetup
              mode="quiz"
              currentScope={isCombined ? quizScope : scope}
              allowScopeChoice={isCombined}
              onScopeChange={setQuizScope}
              count={quizCount}
              onCountChange={setQuizCount}
              onStart={() => begin("quiz", isCombined ? quizScope : scope, quizCount)}
            />
          )
        )}
        {activeTab === "exam" && (
          session ? (
            <AssessmentSession key={session.questions.map((question) => question.id).join("|")} session={session} onRetake={retake} onExit={() => setSession(null)} onPracticeTopics={practiceWeakTopics} />
          ) : (
            <AssessmentSetup
              mode="exam"
              currentScope={isCombined ? examScope : scope}
              allowScopeChoice={isCombined}
              onScopeChange={setExamScope}
              count={examCount}
              onCountChange={setExamCount}
              onStart={() => begin("exam", isCombined ? examScope : scope, examCount)}
            />
          )
        )}
      </div>
    </section>
  );
}

function App() {
  const [now, setNow] = useState(() => Date.now());
  const [restoredState] = useState(readSavedStudyState);
  const [selectedCourseId, setSelectedCourseId] = useState<CourseId | null>(() => restoredState?.selectedCourseId ?? null);
  const [selectedChapter, setSelectedChapter] = useState<StudyScope | null>(() => restoredState?.selectedChapter ?? null);
  const [activeTab, setActiveTab] = useState<StudyTab>(() => restoredState?.activeTab ?? "study-notes");
  const [quizScope, setQuizScope] = useState<StudyScope>(() => restoredState?.quizScope ?? "combined");
  const [examScope, setExamScope] = useState<StudyScope>(() => restoredState?.examScope ?? "combined");
  const [quizCount, setQuizCount] = useState(15);
  const [examCount, setExamCount] = useState(15);
  const [session, setSession] = useState<SessionState | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(SAVED_STUDY_STATE_KEY, JSON.stringify({
        selectedCourseId,
        selectedChapter,
        activeTab,
        quizScope,
        examScope,
      }));
    } catch {
      // Navigation remains fully usable when browser storage is unavailable.
    }
  }, [selectedCourseId, selectedChapter, activeTab, quizScope, examScope]);

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
    setSelectedChapter(null);
    setSession(null);
    setActiveTab("study-notes");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    setSelectedCourseId(null);
    setSelectedChapter(null);
    setSession(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openChapter = (scope: StudyScope) => {
    setSelectedChapter(scope);
    setSession(null);
    setActiveTab("study-notes");
    if (scope === "combined") {
      setQuizScope("combined");
      setExamScope("combined");
    } else {
      setQuizScope(scope);
      setExamScope(scope);
    }
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
        {!selectedCourse ? (
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
                      <button onClick={() => openCourse(nextCourse.id)}>Prepare <ArrowUpRight size={14} /></button>
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
              <div><span className="eyebrow">YOUR LINEUP</span><h2>Five courses. One clear plan.</h2></div>
              <span className="course-count">05 COURSES</span>
            </div>

            <div className="course-grid">
              {courses.map((course) => {
                const remaining = formatCountdown(course.examAt, now);
                const countdownLabel = remaining
                  ? `${remaining.map((part) => `${part.value} ${part.label}`).join(", ")} remaining`
                  : "Exam time has passed";
                return (
                  <button
                    className="course-card"
                    key={course.id}
                    onClick={() => openCourse(course.id)}
                    aria-label={`Open ${course.title}. ${countdownLabel}`}
                  >
                    <div className="course-card-main"><h3>{course.title}</h3></div>
                    <div className="course-card-bottom">
                      <Countdown examAt={course.examAt} now={now} compact />
                      <span className="course-open"><ArrowUpRight size={17} /></span>
                    </div>
                  </button>
                );
              })}
            </div>
            <footer className="landing-footer">
              <div className="footer-mark"><GraduationCap size={16} /> <span>exam<span>prep</span></span></div>
              <span>One step at a time.</span>
              <span>All times shown in Ethiopia time · UTC+3</span>
            </footer>
          </section>
        ) : (
          <section className="course-page">
            <CourseHeader course={selectedCourse} now={now} onBack={goHome} />
            {selectedCourse.id === "information-assurance" ? (
              selectedChapter ? (
                <ChapterWorkspace
                  scope={selectedChapter}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  onBackToChapters={() => {
                    setSelectedChapter(null);
                    setSession(null);
                  }}
                  quizScope={quizScope}
                  setQuizScope={setQuizScope}
                  quizCount={quizCount}
                  setQuizCount={setQuizCount}
                  examScope={examScope}
                  setExamScope={setExamScope}
                  examCount={examCount}
                  setExamCount={setExamCount}
                  session={session}
                  setSession={setSession}
                />
              ) : (
                <ChapterPicker onChoose={openChapter} />
              )
            ) : (
              <div className="course-coming-soon">
                <EmptyState
                  icon={<BookOpen size={22} />}
                  title="This course space is ready"
                  description="The chapter structure is ready. Once you share the lecture resources, we can build its detailed notes, short notes, summaries, interactive activities and question bank."
                />
                <button className="secondary-action-button" onClick={goHome}><ArrowLeft size={15} /> Back to all courses</button>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;

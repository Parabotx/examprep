# ExamPrep

A focused study space for the five-course exam week. Built with React, TypeScript and Vite.

## Run locally

```bash
npm install
npm run dev
```

Create and verify a production build:

```bash
npm run build
npm run preview
```

## Current foundation

- Five course cards with live countdowns fixed to 08:00 in Ethiopia (Africa/Addis_Ababa, UTC+3).
- Information Assurance & Security opens into Chapter 1, Combined Study and Chapter 2.
- Each learning path provides Study Notes, Short Notes, Summary, Interactive Study and Quizzes, with a separate exam mode.
- Chapter 1 and Chapter 2 content is kept in `src/data/iasContent.ts`.
- Randomized multiple-choice questions are kept in `src/data/iasQuizBank.ts`. Each chapter has more than 100 questions; practice and exam sessions support 15, 30, 50 or 100 questions.
- A fresh attempt shuffles the question selection, order and answer choices.
- Quiz mode provides immediate feedback. Exam mode reveals the result and explanations after the last answer.

## Adding course material

- Add or revise detailed notes, short notes, summaries and interactive cases in `src/data/iasContent.ts`.
- Add question seeds in `src/data/iasQuizBank.ts`. Each seed creates a recall question and a scenario question.
- Other courses are prepared as placeholders until their lecture resources are supplied.

## Source scope

The Information Assurance & Security Chapter 1 and Chapter 2 material was prepared from the lecture PDFs supplied for this project. Where the lecture presents an unanswered multiple-choice question without marking the correct answer, the study notes preserve that uncertainty rather than inventing an instructor answer.

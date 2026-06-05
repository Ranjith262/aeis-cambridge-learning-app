# 🎓 AEIS Cambridge Learning App

A fully functional quiz/learning web application for children (ages 6–8) preparing for the **AEIS (Admissions Exercise for International Students)** exam to enter Singapore Primary 2/3.

Covers **English** (Cambridge Primary 1) and **Mathematics** (Singapore MOE Primary 1 syllabus).

## ✨ Features

- **680 questions** — 505 English + 175 Mathematics
- **13 English categories** + **10 Maths categories**
- **Instant feedback** — Click = immediate visual response, no submit button
- **Smart explanation engine** — 17 rule-based patterns + embedded Math explanations
- **Fisher-Yates shuffle** — Questions and options randomised every session
- **Animated SVG score ring** — Colour-coded by percentage
- **Dark Space glassmorphism theme** — Animated gradient + floating stars
- **Framer Motion animations** — Celebrations on correct, shake on wrong
- **Mobile-first responsive**

## 🧪 Tests & Quality

| Suite | Tests |
|---|---|
| shuffle.test.js | 14 |
| explanations.test.js | 17 |
| data.test.js | 22 |
| components.test.jsx | 22 |
| **Total** | **75 ✅** |

```bash
npm test        # run all tests
npm run lint    # ESLint check
npm run build   # production build
```

## 🚀 Local Development

```bash
git clone https://github.com/Ranjith262/aeis-cambridge-learning-app.git
cd aeis-cambridge-learning-app
npm install --legacy-peer-deps
npm run dev
```

## 🔗 Deploy to Vercel (One-time Setup)

### Step 1 — Import repo in Vercel dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import **Ranjith262/aeis-cambridge-learning-app**
3. Install command: `npm install --legacy-peer-deps`
4. Click **Deploy**

### Step 2 — Get your IDs

```bash
npm install -g vercel
vercel link   # link to your project
cat .vercel/project.json
# {"projectId":"prj_xxx","orgId":"team_xxx"}
```

### Step 3 — Add GitHub Secrets

Go to **GitHub repo → Settings → Secrets → Actions → New repository secret**:

| Secret | Value |
|---|---|
| `VERCEL_TOKEN` | From [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | `orgId` from `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | `projectId` from `.vercel/project.json` |

Every push to `main` will then auto-deploy. ✅

## 📁 Structure

```
src/
├── App.jsx                     # Page router
├── components/
│   ├── AnimatedBackground.jsx
│   ├── QuestionCard.jsx
│   └── ScoreModal.jsx
├── data/
│   ├── questions.js            # 505 English questions
│   └── mathQuestions.js        # 175 Math questions
├── pages/
│   ├── HomePage.jsx
│   └── QuizPage.jsx
├── utils/
│   ├── explanations.js         # Rule engine + praise
│   └── shuffle.js              # Fisher-Yates
└── __tests__/                  # 75 unit tests
```

---
Made with 💜 for young learners preparing for AEIS

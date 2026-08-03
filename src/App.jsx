import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import SoftBackground from './components/SoftBackground'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'
import TeachPage from './pages/TeachPage'
import MockExamPage from './pages/MockExamPage'
import ReviewGardenPage from './pages/ReviewGardenPage'
import ParentPage from './pages/ParentPage'
import PlayPage from './pages/PlayPage'
import PlaceValueWorld from './pages/PlaceValueWorld'
import BondsWorld from './pages/BondsWorld'
import AdditionWorld from './pages/AdditionWorld'
import SubtractionWorld from './pages/SubtractionWorld'
import MoneyWorld from './pages/MoneyWorld'
import TimeWorld from './pages/TimeWorld'

export default function App() {
  const [page, setPage] = useState('home')
  const [categoryId, setCategoryId] = useState('all')
  const [subject, setSubject] = useState('math')
  const [teachTopic, setTeachTopic] = useState('numbersTo100')

  const goHome = () => {
    setPage('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const startQuiz = (catId, subj = 'math') => {
    setCategoryId(catId)
    setSubject(subj)
    setPage('quiz')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const startTeach = (topicId) => {
    setTeachTopic(topicId || 'numbersTo100')
    setPage('teach')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden overscroll-none">
      <SoftBackground />
      <AnimatePresence mode="wait">
        {page === 'home' && (
          <HomePage
            key="home"
            onStartQuiz={startQuiz}
            onTeach={startTeach}
            onMock={() => setPage('mock')}
            onReview={() => setPage('review')}
            onParent={() => setPage('parent')}
            onPlay={() => setPage('play')}
            onPlaceValue={() => setPage('placeValue')}
            onBonds={() => setPage('bonds')}
            onAddition={() => setPage('addition')}
            onSubtraction={() => setPage('subtraction')}
            onMoney={() => setPage('money')}
            onTime={() => setPage('time')}
            onOpenWorld={(w) => setPage(w)}
          />
        )}
        {page === 'quiz' && (
          <QuizPage
            key="quiz"
            categoryId={categoryId}
            subject={subject}
            onGoHome={goHome}
            onTeach={() => startTeach(categoryId === 'all' ? 'numbersTo100' : categoryId)}
          />
        )}
        {page === 'teach' && (
          <TeachPage
            key="teach"
            topicId={teachTopic}
            onBack={goHome}
            onDone={() => startQuiz(teachTopic, 'math')}
          />
        )}
        {page === 'mock' && <MockExamPage key="mock" onGoHome={goHome} />}
        {page === 'review' && (
          <ReviewGardenPage
            key="review"
            onGoHome={goHome}
            onReviewTopic={(tid) => startQuiz(tid, 'math')}
          />
        )}
        {page === 'parent' && <ParentPage key="parent" onGoHome={goHome} />}
        {page === 'play' && <PlayPage key="play" onGoHome={goHome} />}
        {page === 'placeValue' && <PlaceValueWorld key="pv" onGoHome={goHome} />}
        {page === 'bonds' && <BondsWorld key="bonds" onGoHome={goHome} />}
        {page === 'addition' && <AdditionWorld key="add" onGoHome={goHome} />}
        {page === 'subtraction' && <SubtractionWorld key="sub" onGoHome={goHome} />}
        {page === 'money' && <MoneyWorld key="money" onGoHome={goHome} />}
        {page === 'time' && <TimeWorld key="time" onGoHome={goHome} />}
      </AnimatePresence>
    </div>
  )
}

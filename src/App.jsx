import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import SoftBackground from './components/SoftBackground'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState('math')

  const startQuiz = (categoryId, subject) => {
    setSelectedCategory(categoryId)
    setSelectedSubject(subject || 'math')
    setCurrentPage('quiz')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goHome = () => {
    setCurrentPage('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen relative">
      <SoftBackground />
      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <HomePage key="home" onStartQuiz={startQuiz} />
        ) : (
          <QuizPage
            key="quiz"
            categoryId={selectedCategory}
            subject={selectedSubject}
            onGoHome={goHome}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

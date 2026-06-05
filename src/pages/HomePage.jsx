import { useState } from 'react'
import { motion } from 'framer-motion'
import { categories, getTotalQuestionCount } from '../data/questions'
import { mathCategories, getTotalMathQuestionCount } from '../data/mathQuestions'

export default function HomePage({ onStartQuiz }) {
  const [activeSubject, setActiveSubject] = useState('english')

  const isEnglish = activeSubject === 'english'
  const currentCategories = isEnglish ? categories : mathCategories
  const currentTotal = isEnglish ? getTotalQuestionCount() : getTotalMathQuestionCount()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="relative z-10 min-h-screen px-4 md:px-8 lg:px-16 py-8"
    >
      {/* Hero Section */}
      <div className="text-center mb-8">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="text-6xl mb-4"
        >
          🎓
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          AEIS Practice
        </h1>
        <p className="text-purple-200 text-lg mb-6">
          Cambridge Primary 1 · Singapore MOE Aligned
        </p>

        {/* Stats bar */}
        <div className="flex justify-center gap-6 mb-8">
          <div className="glass rounded-2xl px-5 py-3 text-center">
            <div className="text-2xl font-bold text-white">{currentTotal}+</div>
            <div className="text-purple-300 text-xs">Questions</div>
          </div>
          <div className="glass rounded-2xl px-5 py-3 text-center">
            <div className="text-2xl font-bold text-white">{currentCategories.length}</div>
            <div className="text-purple-300 text-xs">Topics</div>
          </div>
          <div className="glass rounded-2xl px-5 py-3 text-center">
            <div className="text-2xl font-bold text-white">P1</div>
            <div className="text-purple-300 text-xs">Level</div>
          </div>
        </div>

        {/* Subject Tabs */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => setActiveSubject('english')}
            className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${
              isEnglish
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'glass text-white/60 hover:text-white'
            }`}
          >
            📖 English
          </button>
          <button
            onClick={() => setActiveSubject('math')}
            className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${
              !isEnglish
                ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg'
                : 'glass text-white/60 hover:text-white'
            }`}
          >
            🧮 Maths
          </button>
        </div>

        {/* Start All Button */}
        <button
          onClick={() => onStartQuiz('all', activeSubject)}
          className={`px-8 py-4 rounded-full font-bold text-white text-base shadow-xl hover:scale-105 transition-transform ${
            isEnglish
              ? 'bg-gradient-to-r from-orange-400 to-pink-500'
              : 'bg-gradient-to-r from-green-400 to-teal-500'
          }`}
        >
          🚀 Start All {currentTotal} Questions
        </button>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {currentCategories.map((cat, idx) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx, duration: 0.3 }}
            onClick={() => onStartQuiz(cat.id, activeSubject)}
            className="category-card glass rounded-2xl p-5 text-left group"
          >
            {/* Icon */}
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl mb-3`}>
              {cat.icon}
            </div>
            {/* Info */}
            <h3 className="text-white font-bold text-base mb-1">{cat.name}</h3>
            <p className="text-purple-300 text-sm mb-3">{cat.count} questions</p>
            {/* CTA */}
            <div className="flex items-center gap-1 text-purple-300 text-sm group-hover:text-white transition-colors">
              <span>Start Practice</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-purple-300/60 text-sm">
        Made with 💜 for young learners preparing for AEIS
      </div>
    </motion.div>
  )
}

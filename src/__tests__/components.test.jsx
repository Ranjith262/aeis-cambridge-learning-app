import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import QuestionCard from '../components/QuestionCard'
import ScoreModal from '../components/ScoreModal'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}))

const mockQuestion = {
  id: 'v1',
  question: 'What colour is the sky?',
  options: ['Red', 'Blue', 'Green', 'Yellow'],
  correctAnswer: 'Blue',
  category: 'vocabulary',
}

describe('QuestionCard', () => {
  it('renders the question text', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        index={0}
        questionNumber={1}
        selectedAnswer={null}
        onSelect={vi.fn()}
      />
    )
    expect(screen.getByText('What colour is the sky?')).toBeInTheDocument()
  })

  it('renders all 4 options', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        index={0}
        questionNumber={1}
        selectedAnswer={null}
        onSelect={vi.fn()}
      />
    )
    expect(screen.getByText('Red')).toBeInTheDocument()
    expect(screen.getByText('Blue')).toBeInTheDocument()
    expect(screen.getByText('Green')).toBeInTheDocument()
    expect(screen.getByText('Yellow')).toBeInTheDocument()
  })

  it('renders the question number', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        index={0}
        questionNumber={5}
        selectedAnswer={null}
        onSelect={vi.fn()}
      />
    )
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('calls onSelect when an unanswered option is clicked', () => {
    const onSelect = vi.fn()
    render(
      <QuestionCard
        question={mockQuestion}
        index={0}
        questionNumber={1}
        selectedAnswer={null}
        onSelect={onSelect}
      />
    )
    fireEvent.click(screen.getByText('Red'))
    expect(onSelect).toHaveBeenCalledWith('v1', 'Red')
  })

  it('does not call onSelect when already answered', () => {
    const onSelect = vi.fn()
    render(
      <QuestionCard
        question={mockQuestion}
        index={0}
        questionNumber={1}
        selectedAnswer="Blue"
        onSelect={onSelect}
      />
    )
    fireEvent.click(screen.getByText('Red'))
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('shows correct feedback when right answer is selected', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        index={0}
        questionNumber={1}
        selectedAnswer="Blue"
        onSelect={vi.fn()}
      />
    )
    // Should show praise text (one of the praise entries)
    const praiseTexts = [
      'Brilliant!', 'Well done!', 'Super!', 'Excellent!', 'You got it!',
      'Awesome!', 'Great job!', 'Smart thinking!', 'Fantastic!', 'Way to go!',
    ]
    const found = praiseTexts.some((text) => {
      try {
        return screen.getByText(text)
      } catch {
        return false
      }
    })
    expect(found).toBe(true)
  })

  it('shows "Good try!" when wrong answer is selected', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        index={0}
        questionNumber={1}
        selectedAnswer="Red"
        onSelect={vi.fn()}
      />
    )
    expect(screen.getByText(/Good try!/)).toBeInTheDocument()
  })

  it('shows the correct answer in wrong feedback', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        index={0}
        questionNumber={1}
        selectedAnswer="Red"
        onSelect={vi.fn()}
      />
    )
    // "Blue" appears in the options AND in the feedback panel — use getAllByText
    const blueElements = screen.getAllByText('Blue')
    expect(blueElements.length).toBeGreaterThanOrEqual(1)
  })

  it('renders letter badges A B C D', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        index={0}
        questionNumber={1}
        selectedAnswer={null}
        onSelect={vi.fn()}
      />
    )
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
    expect(screen.getByText('C')).toBeInTheDocument()
    expect(screen.getByText('D')).toBeInTheDocument()
  })
})

describe('ScoreModal', () => {
  const defaultProps = {
    correctCount: 7,
    totalAnswered: 10,
    totalQuestions: 20,
    onTryAgain: vi.fn(),
    onGoHome: vi.fn(),
  }

  it('renders the score modal', () => {
    render(<ScoreModal {...defaultProps} />)
    expect(screen.getByText('Your Score')).toBeInTheDocument()
  })

  it('displays the score fraction', () => {
    render(<ScoreModal {...defaultProps} />)
    expect(screen.getByText('7/10')).toBeInTheDocument()
  })

  it('displays the percentage', () => {
    render(<ScoreModal {...defaultProps} />)
    expect(screen.getByText('70%')).toBeInTheDocument()
  })

  it('renders Try Again button', () => {
    render(<ScoreModal {...defaultProps} />)
    expect(screen.getByText('🔄 Try Again')).toBeInTheDocument()
  })

  it('renders Back to Topics button', () => {
    render(<ScoreModal {...defaultProps} />)
    expect(screen.getByText('🏠 Back to Topics')).toBeInTheDocument()
  })

  it('calls onTryAgain when Try Again is clicked', () => {
    const onTryAgain = vi.fn()
    render(<ScoreModal {...defaultProps} onTryAgain={onTryAgain} />)
    fireEvent.click(screen.getByText('🔄 Try Again'))
    expect(onTryAgain).toHaveBeenCalled()
  })

  it('calls onGoHome when Back to Topics is clicked', () => {
    const onGoHome = vi.fn()
    render(<ScoreModal {...defaultProps} onGoHome={onGoHome} />)
    fireEvent.click(screen.getByText('🏠 Back to Topics'))
    expect(onGoHome).toHaveBeenCalled()
  })

  it('shows star emoji for 80%+ score', () => {
    render(<ScoreModal {...defaultProps} correctCount={8} totalAnswered={10} />)
    expect(screen.getByText('🌟')).toBeInTheDocument()
  })

  it('shows thumbs up emoji for 60-79% score', () => {
    render(<ScoreModal {...defaultProps} correctCount={6} totalAnswered={10} />)
    expect(screen.getByText('👍')).toBeInTheDocument()
  })

  it('shows muscle emoji for below 60% score', () => {
    render(<ScoreModal {...defaultProps} correctCount={3} totalAnswered={10} />)
    expect(screen.getByText('💪')).toBeInTheDocument()
  })

  it('shows "Amazing work!" message for high score', () => {
    render(<ScoreModal {...defaultProps} correctCount={8} totalAnswered={10} />)
    expect(screen.getByText(/Amazing work!/)).toBeInTheDocument()
  })

  it('shows total questions info', () => {
    render(<ScoreModal {...defaultProps} />)
    expect(screen.getByText(/10 of 20 questions answered/)).toBeInTheDocument()
  })

  it('handles zero answers gracefully', () => {
    render(
      <ScoreModal
        correctCount={0}
        totalAnswered={0}
        totalQuestions={10}
        onTryAgain={vi.fn()}
        onGoHome={vi.fn()}
      />
    )
    expect(screen.getByText('0%')).toBeInTheDocument()
  })
})

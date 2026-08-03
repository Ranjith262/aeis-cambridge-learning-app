import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import QuestionCard from '../components/QuestionCard'
import ScoreModal from '../components/ScoreModal'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => {
      const { initial, animate, exit, transition, whileTap, ...rest } = props
      return <div {...rest}>{children}</div>
    },
    button: ({ children, ...props }) => {
      const { initial, animate, exit, transition, whileTap, ...rest } = props
      return <button {...rest}>{children}</button>
    },
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
  explanation: 'The sky looks blue in daytime.',
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

  it('shows explanation after answering', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        index={0}
        questionNumber={1}
        selectedAnswer="Blue"
        onSelect={vi.fn()}
      />
    )
    expect(screen.getByText(/The sky looks blue/)).toBeInTheDocument()
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

  it('renders the score title', () => {
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

  it('renders Try again button', () => {
    render(<ScoreModal {...defaultProps} />)
    expect(screen.getByText('Try again')).toBeInTheDocument()
  })

  it('renders Back to Kingdom button', () => {
    render(<ScoreModal {...defaultProps} />)
    expect(screen.getByText('Back to Kingdom')).toBeInTheDocument()
  })

  it('calls onTryAgain when Try again is clicked', () => {
    const onTryAgain = vi.fn()
    render(<ScoreModal {...defaultProps} onTryAgain={onTryAgain} />)
    fireEvent.click(screen.getByText('Try again'))
    expect(onTryAgain).toHaveBeenCalled()
  })

  it('calls onGoHome when Back to Kingdom is clicked', () => {
    const onGoHome = vi.fn()
    render(<ScoreModal {...defaultProps} onGoHome={onGoHome} />)
    fireEvent.click(screen.getByText('Back to Kingdom'))
    expect(onGoHome).toHaveBeenCalled()
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

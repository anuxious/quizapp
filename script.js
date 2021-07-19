const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false }
    ]
  },
  {
    question: 'What is the value of pi',
    answers: [
      { text: '3.14 approx', correct: true },
      { text: '22/7', correct: true },
      { text: '1.5', correct: false },
      { text: 'other', correct: false }
    ]
  },
  {
    question: 'What is 4',
    answers: [
      { text: '2*2', correct: true },
      { text: '2**2', correct: true },
      { text: '2+2', correct: true },
      { text: '2**3', correct: false }
    ]
  },
  {
    question: 'What is 4 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true }
    ]
  },
  {
    question: 'Who won the EURO2021?',
    answers: [
      { text: 'England', correct: false },
      { text: 'Italy', correct: true }
    ]
  },
  {
    question: 'Which one is an unit of temperature',
    answers: [
      { text: 'Kelvin', correct: true },
      { text: 'Ampere', correct: false },
      { text: 'Celsius', correct: true },
      { text: 'Fahrenheit', correct: true }
    ]
  },
  {
    question: 'Who is the Prime Minister of India',
    answers: [
      { text: 'Narendra Modi', correct: true },
      { text: 'Dr. Manhoman Singh', correct: false },
      { text: 'Pranav Mukherjee', correct: false },
      { text: 'Ram Nath Kovind', correct: false }
    ]
  }
]
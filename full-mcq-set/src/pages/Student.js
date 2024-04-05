import React, { useState } from "react";
import "./../styles/Student.css";

const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "London", "Rome"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
  },
  {
    id: 3,
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Jupiter", "Saturn", "Venus"],
    correctAnswer: "Mars",
  },
];

function App() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerSelect = (questionId, selectedAnswer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedAnswer,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all questions have been answered
    const answeredQuestions = Object.keys(answers);
    if (answeredQuestions.length !== questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    // If all questions are answered, set submitted to true
    setSubmitted(true);
  };

  const evaluateAnswers = () => {
    let score = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="App">
      <h1>MCQ Questions Paper</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question.id}>
            <h3>{question.question}</h3>
            {question.options.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`${question.id}-${index}`}
                  name={`question-${question.id}`}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={() => handleAnswerSelect(question.id, option)}
                />
                <label htmlFor={`${question.id}-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {submitted && (
        <div>
          <h2>Submitted!</h2>
          <p>
            Your score: {evaluateAnswers()} / {questions.length}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AssignmentsPage = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate(); 
    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f4f4f4',
            margin: '0',
            padding: '20px',
        },
        title: {
            color: '#333',
            textAlign: 'center',
        },
        questionContainer: {
            backgroundColor: '#fff',
            padding: '15px',
            borderRadius: '5px',
            marginBottom: '15px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        },
        questionText: {
            color: '#555',
        },
        input: {
            marginTop: '10px',
            marginRight: '10px',
            padding: '5px',
        },
        list: {
            listStyleType: 'none',
            paddingLeft: '0',
        },
        listItem: {
            marginBottom: '10px',
        },
        button: {
            display: 'block',
            margin: '20px auto',
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        correctAnswer: {
            color: 'green',
        },
        incorrectAnswer: {
            color: 'red',
        },
        score: {
            textAlign: 'center',
            fontSize: '20px',
            marginTop: '20px',
        },
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const lesson_id = localStorage.getItem('lesson_id'); // Retrieve lesson_id from localStorage
                const response = await fetch(`https://leader-acadmy.hwnix.com/api/questions/lesson/${lesson_id}`);
                const data = await response.json();
                setQuestions(data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    const handleOptionChange = (questionId, selectedOption) => {
        setAnswers({
            ...answers,
            [questionId]: selectedOption,
        });
    };

    const handleSubmit = () => {
        let correctAnswers = 0;
        questions.forEach((question) => {
            if (answers[question.id] && answers[question.id] === question.correct_answer) {
                correctAnswers += 1;
            }
        });
        setScore(correctAnswers);
        setSubmitted(true);
    };
    const handleBack = () => {
        navigate('/Video'); // Navigate to the landing page
    };
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Assignments</h1>
            {questions.map((question) => (
                <div key={question.id} style={styles.questionContainer}>
                    <h3 style={styles.questionText}>{question.question_text}</h3>
                    {question.answer_type === 'multiple_choice' && question.options && (
                        <ul style={styles.list}>
                            {JSON.parse(question.options).map((option, index) => (
                                <li key={index} style={styles.listItem}>
                                    <input
                                        type="radio"
                                        name={`question_${question.id}`}
                                        value={option}
                                        onChange={() => handleOptionChange(question.id, option)}
                                        style={styles.input}
                                        disabled={submitted}
                                    />
                                    {option}
                                </li>
                            ))}
                        </ul>
                    )}
                    {question.answer_type === 'open_ended' && (
                        <input
                            type="text"
                            placeholder="Your answer"
                            onChange={(e) => handleOptionChange(question.id, e.target.value)}
                            style={styles.input}
                            disabled={submitted}
                        />
                    )}
                    {submitted && (
                        <p style={answers[question.id] === question.correct_answer ? styles.correctAnswer : styles.incorrectAnswer}>
                            {answers[question.id] === question.correct_answer ? 'Correct' : `Incorrect. Correct answer: ${question.correct_answer}`}
                        </p>
                    )}
                </div>
            ))}
            <button onClick={handleSubmit} style={styles.button} disabled={submitted}>
                Submit
            </button>
            <button onClick={handleBack} style={styles.button}>
                Back
            </button>
            {submitted && (
                <div style={styles.score}>
                    <p>Your score: {score} out of {questions.length}</p>
                </div>
            )}
        </div>
    );
};

export default AssignmentsPage;

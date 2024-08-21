import React, { useState } from 'react';
import axios from 'axios';

const AddQuestion = () => {
    // const [lesson_id, setlesson_id] = useState();
    const [questionText, setQuestionText] = useState('');
    const [answerType, setAnswerType] = useState('multiple_choice'); // Fixed answer type as "multiple_choice"
    const [options, setOptions] = useState(["", "", "", ""]);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // State to hold success message
    const IDlesson = localStorage.getItem('IDlesson');

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        const optionsString = JSON.stringify(options);

        const data = {
            lesson_id: IDlesson,
            question_text: questionText,
            answer_type: answerType,
            options: optionsString,
            correct_answer: correctAnswer
        };

        console.log('Data being sent:', data);

        try {
            const response = await axios.post('https://leader-acadmy.hwnix.com/api/questions', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Question added:', response.data);
            setSuccessMessage('Question added successfully!'); // Set success message

            // Reset form after submission
            setQuestionText('');
            setOptions(["", "", "", ""]);
            setCorrectAnswer('');
        } catch (error) {
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Request data:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
            <h2>Add New Question</h2>
            <form onSubmit={handleSubmit}>

             

                <div style={{ marginBottom: '15px' }}>
                    <label>Question Text:</label>
                    <input 
                        type="text" 
                        value={questionText} 
                        onChange={(e) => setQuestionText(e.target.value)} 
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
                        required 
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Answer Type:</label>
                    <input 
                        type="text" 
                        value={answerType} 
                        onChange={(e) => setAnswerType(e.target.value)} 
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
                        disabled 
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Options:</label>
                    {options.map((option, index) => (
                        <input 
                            key={index} 
                            type="text" 
                            value={option} 
                            onChange={(e) => handleOptionChange(index, e.target.value)} 
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
                            placeholder={`Option ${index + 1}`} 
                            required 
                        />
                    ))}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Correct Answer:</label>
                    <select 
                        value={correctAnswer} 
                        onChange={(e) => setCorrectAnswer(e.target.value)} 
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
                        required 
                    >
                        <option value="" disabled>Select correct answer</option>
                        {options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <button 
                    type="submit" 
                    style={{ padding: '10px 20px', backgroundColor: '#4285F4', color: '#fff', border: 'none', cursor: 'pointer' }}
                >
                    Add Question
                </button>
            </form>

            {successMessage && (
                <div style={{ marginTop: '20px', color: 'green' }}>
                    {successMessage}
                </div>
            )}
        </div>
    );
};

export default AddQuestion;

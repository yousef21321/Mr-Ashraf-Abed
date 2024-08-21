import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LessonTable.css';

const LessonTable = () => {
    const [lessons, setLessons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://leader-acadmy.hwnix.com/api/getlesson/assistant')
            .then(response => response.json())
            .then(data => {
                setLessons(data.lessons);
            })
            .catch(error => {
                console.error('Error fetching the lessons:', error);
            });
    }, []);

    const handleNavigate = (id) => {
        localStorage.setItem('IDlesson', id);
        navigate('/AddQuestion');
    };

    return (
        <div className="table-container">
            <h1>Lessons</h1>
            <table className="lesson-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {lessons.map(lesson => (
                        <tr key={lesson.id}>
                            <td>{lesson.title}</td>
                            <td>{lesson.description_assistant}</td>
                            <td>
                                <button 
                                    className="navigate-button" 
                                    onClick={() => handleNavigate(lesson.id)}
                                >
                                    Go to Add Question
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LessonTable;

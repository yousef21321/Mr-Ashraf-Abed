import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ScoresTable = () => {
    const [scores, setScores] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await axios.get('https://leader-acadmy.hwnix.com/api/scores');
                setScores(response.data.scores);
            } catch (error) {
                setError('Failed to fetch scores.');
                console.error('Error fetching scores:', error);
            }
        };

        fetchScores();
    }, []);

    const styles = {
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
        },
        th: {
            backgroundColor: '#f4f4f4',
            padding: '10px',
            textAlign: 'left',
            borderBottom: '2px solid #ddd',
        },
        td: {
            padding: '10px',
            borderBottom: '1px solid #ddd',
        },
        error: {
            color: 'red',
            textAlign: 'center',
            marginTop: '20px',
        },
    };

    if (error) {
        return <div style={styles.error}>{error}</div>;
    }

    return (
        <div>
            <h1>Scores Table</h1>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Score</th>
                        <th style={styles.th}>User Name</th>
                        <th style={styles.th}>Lesson Title</th>
                        <th style={styles.th}>Lesson Description</th>
                        <th style={styles.th}>Phone Number</th>

                    </tr>
                </thead>
                <tbody>
                    {scores.map((score) => (
                        <tr key={score.id}>
                            <td style={styles.td}>{score.score}</td>
                            <td style={styles.td}>{score.user.name}</td>
                            <td style={styles.td}>{score.lesson.title}</td>
                            <td style={styles.td}>{score.lesson.description_assistant}</td>
                            <td style={styles.td}>{score.user.phone}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScoresTable;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const MessagesTable = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get('https://leader-acadmy.hwnix.com/api/getmessages')
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const downloadFullPagePDF = () => {
        html2canvas(document.body).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageHeight = pdf.internal.pageSize.height;
            const pageWidth = pdf.internal.pageSize.width;
            const imgHeight = (canvas.height * pageWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('full_page.pdf');
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ backgroundColor: 'black', color: 'white', padding: '20px', borderRadius: '10px' }}
        >
            <h2>Messages</h2>
            <motion.table
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}
            >
                <thead>
                    <tr>
                        <th style={{ padding: '10px', borderBottom: '1px solid white' }}>Message</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid white' }}>User Name</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid white' }}>User Phone</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid white' }}>Educational Level</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map((msg, index) => (
                        <motion.tr
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.3 }}
                        >
                            <td style={{ padding: '10px', borderBottom: '1px solid white' }}>{msg.message}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid white' }}>{msg.user_name}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid white' }}>{msg.user_phone}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid white' }}>{msg.educational_level}</td>
                        </motion.tr>
                    ))}
                </tbody>
            </motion.table>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={downloadFullPagePDF}
                style={{
                    padding: '10px 20px',
                    backgroundColor: 'blue',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginBottom: '20px'
                }}
            >
                Download Full Page PDF
            </motion.button>
        </motion.div>
    );
};

export default MessagesTable;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // استيراد useNavigate من react-router-dom
import './PdfList.css'; // استيراد ملف CSS

const PdfList = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // إنشاء كائن useNavigate

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const lessonId = localStorage.getItem('lesson_id') || 1; // استخدام default إذا لم يتم العثور على lesson_id
        const response = await axios.get(`https://leader-acadmy.hwnix.com/api/pdfs/lesson/${lessonId}`);
        setPdfs(response.data.pdfs);
      } catch (error) {
        setError('فشل في جلب ملفات PDF.');
      } finally {
        setLoading(false);
      }
    };

    fetchPdfs();
  }, []);

  const handleBackToLecture = () => {
    navigate('/ProfileCard'); // الانتقال إلى /landing-page
  };

  if (loading) {
    return <div className="pdf-list-container">جارٍ التحميل...</div>;
  }

  if (error) {
    return <div className="pdf-list-container">{error}</div>;
  }

  return (
    <div className="pdf-list-container">
      <h1>قائمة ملفات PDF</h1>
      <ul>
        {pdfs.map((pdf) => (
          <li key={pdf.id}>
            <h2>{pdf.title}</h2>
            <p>{pdf.description}</p>
            <a href={pdf.FullSrc} target="_blank" rel="noopener noreferrer">عرض ملف PDF</a>
          </li>
        ))}
      </ul>
      <button className="back-button" onClick={handleBackToLecture}>الرجوع للمحاضرة</button>
    </div>
  );
};

export default PdfList;

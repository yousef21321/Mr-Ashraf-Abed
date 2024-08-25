import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Words.css';

const Words = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [correctTranslation, setCorrectTranslation] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isArabic, setIsArabic] = useState(true); // Determine if the current word is Arabic

  const wordPairs = [
    { english: 'hello', arabic: 'مرحبا' },
    { english: 'world', arabic: 'العالم' },
    { english: 'cat', arabic: 'قطة' },
    { english: 'car', arabic: 'سيارة' },
    // Add more words here
  ];

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordPairs.length);
    const selectedPair = wordPairs[randomIndex];
    const showArabic = Math.random() > 0.5; // Randomly decide to show Arabic or English

    setIsArabic(showArabic);
    setCurrentWord(showArabic ? selectedPair.arabic : selectedPair.english);
    setCorrectTranslation(showArabic ? selectedPair.english : selectedPair.arabic);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (translation.toLowerCase() === correctTranslation.toLowerCase()) {
      setFeedback('Correct!');
    } else {
      setFeedback(`Incorrect! The correct translation is "${correctTranslation}".`);
    }
    setTranslation('');
    getRandomWord();
  };

  return (
    <motion.div
      className="words-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Word Translation Practice
      </motion.h2>

      <form onSubmit={handleSubmit} className="translation-section">
        <motion.div
          className="word-display"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {isArabic ? 'ترجم هذه الكلمة:' : 'Translate this word:'} <strong>{currentWord}</strong>
        </motion.div>
        <motion.input
          type="text"
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          placeholder={isArabic ? 'Translate to English...' : 'ترجم إلى العربية...'}
          className="input-translation"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.button
          type="submit"
          className="submit-button"
          whileHover={{ scale: 1.1 }}
        >
          Submit
        </motion.button>
      </form>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="feedback"
      >
        {feedback}
      </motion.p>
    </motion.div>
  );
};

export default Words;

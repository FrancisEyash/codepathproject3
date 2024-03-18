import React, { useState } from 'react'
import '../index.css'

const initialCardData = [
  { question: 'Where is the Eiffel Tower located?', answer: 'France', image: 'src/assets/kiarash-mansouri-KaGWg7sqJV0-unsplash.jpg', difficulty: "easy"},
  { question: 'In which country can you find the Great Barrier Reef?', answer: 'Australia', image:'src/assets/amber-weir-ul0hbKwlRf4-unsplash.jpg', difficulty:"hard"},
  { question: 'Which country is home to the Amazon Rainforest?', answer: 'Brazil', image:'src/assets/matheus-camara-da-silva-6MA7HufwJkI-unsplash.jpg', difficulty:"medium"},
  { question: 'In which country is the Sahara Desert mainly found?', answer: 'Algeria', image:'src/assets/engin-akyurt-aZWWcLceqrQ-unsplash.jpg', difficulty: "medium"},
  { question: 'Which country has the city of Venice with its famous canals?', answer: 'Italy', image:'src/assets/michele-bitetto-jf5SQVEKSFw-unsplash.jpg', difficulty:"easy"},
];

const MainCard = () => {
  // State for the component
  const [cardData, setCardData] = useState(initialCardData);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [masteredCards, setMasteredCards] = useState([]);

  // Shuffle the cards
  const shuffleCards = () => {
    let shuffledData = [...cardData].sort(() => 0.5 - Math.random());
    setCardData(shuffledData);
  };

  // Handle the user's guess submission
  const handleSubmitGuess = () => {
    const isCorrect = userGuess.trim().toLowerCase() === cardData[currentCardIndex].answer.toLowerCase();
    if (isCorrect) {
      setCurrentStreak(currentStreak + 1);
      setLongestStreak(Math.max(longestStreak, currentStreak + 1));
    } else {
      setCurrentStreak(0);
    }
    setFeedback(isCorrect);
    setShowAnswer(true);
  };

  // Move to the next card
  const handleNextClick = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cardData.length);
    resetCard();
  };

  // Move to the previous card
  const handlePrevClick = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + cardData.length) % cardData.length);
    resetCard();
  };

  // Mark a card as mastered
  const handleMasteredCard = () => {
    const mastered = cardData.splice(currentCardIndex, 1)[0];
    setMasteredCards([...masteredCards, mastered]);
    setCardData(cardData);
    resetCard();
  };

  // Reset the card state
  const resetCard = () => {
    setShowAnswer(false);
    setFeedback(null);
    setUserGuess('');
  };

  // Get card style based on difficulty
  const getCardStyle = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return { backgroundColor: 'rgba(0, 128, 0, 0.7)' };
      case 'medium':
        return { backgroundColor: 'rgba(255, 255, 0, 0.7)' };
      case 'hard':
        return { backgroundColor: 'rgba(255, 0, 0, 0.7)' };
      default:
        return {}; // Default style if no difficulty is provided
    }
  };

  // Component UI
  return (
    <div className='Main-card'>
      <h2>The World Geography Guru!</h2>
      <h4>How well are you familiar with the world's geography? Let's test it out!</h4>
      <h3>Number of cards: {cardData.length}</h3>

      {!showAnswer && (
        <>
          <input
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            placeholder="Enter your guess"
          />
          <button onClick={handleSubmitGuess}>Submit</button>
        </>
      )}

      {feedback !== null && (
        <div className={`Feedback ${feedback ? 'Correct' : 'Incorrect'}`}>
          {feedback ? 'Correct!' : 'Incorrect!'}
          <button onClick={resetCard}>Try another</button>
        </div>
      )}

      <div className='FlashCard' style={getCardStyle(cardData[currentCardIndex].difficulty)}>
        {!showAnswer ? (
          <p>{cardData[currentCardIndex].question}</p>
        ) : (
          <div className='Answer'>
            <p>{cardData[currentCardIndex].answer}</p>
            <img src={cardData[currentCardIndex].image} alt="Geographical location" style={{ marginTop: '10px' }} />
            <button onClick={handleMasteredCard}>Mark as Mastered</button>
          </div>
        )}
      </div>

      <div className='Buttons'>
        <button onClick={handlePrevClick}>Prev</button>
        <button onClick={handleNextClick}>Next</button>
        <button onClick={shuffleCards}>Shuffle</button>
      </div>

      <div className='StreakInfo'>
        <p>Current Streak: {currentStreak}</p>
        <p>Longest Streak: {longestStreak}</p>
      </div>
    </div>
  );
};

export default MainCard;

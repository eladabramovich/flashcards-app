import { useContext, useState } from 'react';
import { FlashcardsContext } from '../../context/flashcards-context';

import Container from '../../components/UI/Container/Container';
import FlashCardQuestion from '../../components/FlashCard/FlashCardQuestion/FlashCardQuestion';
import FlashCardAnswers from '../../components/FlashCard/FlashCardAnswers/FlashCardAnswers';

import styles from './QuizPage.module.css';

const QuizPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { cardsState, cardsDispatch } = useContext(FlashcardsContext);
  let content = null;

  const clickHandler = (
    event: React.MouseEvent<HTMLDivElement>,
    id: string,
    styleClass: string
  ) => {
    const target = event.target as HTMLDivElement;
    target.classList.add(styleClass);

    if (cardsState.items[0].correctAnswer === id) {
      setTimeout(() => {
        cardsDispatch({ type: 'NEXT_CARD' });
        window.scrollTo(0, 0);
      }, 500);
    }
  };

  const startQuiz = () => {
    if (cardsState.items.length === 0) {
      cardsDispatch({ type: 'LOAD' });
    }
    cardsDispatch({ type: 'SHUFFLE' });
    setIsPlaying(true);
  };

  const resetQuiz = () => {
    cardsDispatch({ type: 'RESET' });
    cardsDispatch({ type: 'SHUFFLE' });
  };

  if (isPlaying && cardsState.items.length >= 1) {
    const currentCard = cardsState.items[0];
    content = (
      <div key={currentCard.id}>
        <FlashCardQuestion
          question={currentCard.question}
          summary={currentCard.summary}
        />
        <FlashCardAnswers
          answers={currentCard.answers}
          correctAnswerId={currentCard.correctAnswer}
          onClicked={clickHandler}
        />
      </div>
    );
  } else if (isPlaying && cardsState.items.length <= 0) {
    content = (
      <div className={`${styles.btnCont} ${styles.resetView}`}>
        <button className={styles.quizBtn} onClick={() => resetQuiz()}>
          Reset Quiz
        </button>
      </div>
    );
  } else {
    content = (
      <div className={styles.instructions}>
        <h1>Instructions</h1>
        <h3>Quiz yourself:</h3>
        <p>
          To start, click the button at the end of these insturctions. After
          that you will be presented with a question and four possible answers
          to choose from. If you are unsure what is the right answer you can
          hover over/touch the question card to reveal a short summary. When you
          have an answer in mind, click on the answer card to check, and if you
          are correct you will be moved to the next flashcard question.
        </p>
        <h3>Manage cards:</h3>
        <p>
          To add or remove flashcards from the deck, click on "Manage cards"
          link there you will see a short form that allows you to create new
          flashcards and a list of exising cards.
          <br />
          <br />
          To save or load a deck locally please use a chromium based browser
          such as Google chrome.
        </p>
        <div className={styles.btnCont}>
          {cardsState.error && (
            <p className={styles.error}>{cardsState.error.message}</p>
          )}
          <button
            className={styles.quizBtn}
            disabled={cardsState.error ? true : false}
            onClick={() => startQuiz()}
          >
            Start quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className={styles.quizPage}>
      <Container>{content}</Container>
    </main>
  );
};

export default QuizPage;

import { useContext, useEffect } from 'react';
import { FlashcardsContext } from '../../context/flashcards-context';

import Container from '../../components/UI/Container/Container';
import FlashCardQuestion from '../../components/FlashCard/FlashCardQuestion/FlashCardQuestion';
import FlashCardAnswers from '../../components/FlashCard/FlashCardAnswers/FlashCardAnswers';

import musicCards from '../../data/music-theory-flashcards.json';

import { Flashcard } from '../../types/flashcards-types';
import styles from './QuizPage.module.css';

const QuizPage = () => {
  const { cardsState, cardsDispatch } = useContext(FlashcardsContext);

  useEffect(() => {
    if (cardsState.items.length === 0) {
      cardsDispatch({ type: 'LOAD', payload: musicCards as Flashcard[] });
    }
  }, [cardsState, cardsDispatch]);

  const clickHandler = (id: string) => {
    if (cardsState.items[0].correctAnswer === id) {
      cardsDispatch({ type: 'NEXT_CARD' });
    } else {
      alert('no');
    }
  };

  return (
    <main className={styles.quizPage}>
      {cardsState.items.map((item) => {
        if (cardsState.items[0].id === item.id) {
          return (
            <Container key={item.id}>
              <FlashCardQuestion
                question={item.question}
                summary={item.summary}
              />
              <FlashCardAnswers
                answers={item.answers}
                onClicked={clickHandler}
              />
            </Container>
          );
        } else {
          return null;
        }
      })}
    </main>
  );
};

export default QuizPage;

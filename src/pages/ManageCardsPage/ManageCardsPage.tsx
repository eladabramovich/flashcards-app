import { useContext, useEffect } from 'react';
import { FlashcardsContext } from '../../context/flashcards-context';

import Container from '../../components/UI/Container/Container';

import AddFlashCardForm from '../../components/FlashCard/AddFlashCardForm/AddFlashCardForm';
import ManageFlashCardList from '../../components/FlashCard/ManageFlashCardList/ManageFlashCardList';

import styles from './ManageCardsPage.module.css';

const ManageCardsPage = () => {
  const { cardsState, cardsDispatch } = useContext(FlashcardsContext);

  useEffect(() => {
    if (cardsState.usedItems.length > 0) {
      cardsDispatch({ type: 'RESET' });
    }
  }, [cardsState, cardsDispatch]);

  const sortedCards = cardsState.items.sort((a, b) =>
    a.question.localeCompare(b.question)
  );
  return (
    <main>
      <Container>
        <h1 className={styles.title}>Manage Flashcards</h1>
        <AddFlashCardForm />
        <ManageFlashCardList cards={sortedCards} />
      </Container>
    </main>
  );
};

export default ManageCardsPage;

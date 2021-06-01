import { useContext } from 'react';
import { FlashcardsContext } from '../../context/flashcards-context';

import Container from '../../components/UI/Container/Container';

import AddFlashCardForm from '../../components/FlashCard/AddFlashCardForm/AddFlashCardForm';
import ManageFlashCardList from '../../components/FlashCard/ManageFlashCardList/ManageFlashCardList';

import styles from './ManageCardsPage.module.css';

const ManageCardsPage = () => {
  const { cardsState } = useContext(FlashcardsContext);
  return (
    <main>
      <Container>
        <h1 className={styles.title}>Manage Flashcards</h1>
        <AddFlashCardForm />
        <ManageFlashCardList cards={cardsState.items} />
      </Container>
    </main>
  );
};

export default ManageCardsPage;

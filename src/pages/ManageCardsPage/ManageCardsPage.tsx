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

  const loadCardsHandler = async () => {
    try {
      //@ts-ignore
      let [fileHandle] = await window.showOpenFilePicker();
      const file = await fileHandle.getFile();
      const contents = await file.text();

      cardsDispatch({ type: 'DELETE_ALL' });
      cardsDispatch({ type: 'LOAD_DECK', payload: JSON.parse(contents) });
    } catch (err) {
      //@ts-ignore
      console.log(err.name, err.message);
      console.dir(err);
    }
  };

  const deleteCard = (id: string) => {
    cardsDispatch({ type: 'DELETE', payload: id });
    cardsDispatch({ type: 'LOAD' });
  };
  return (
    <main>
      <Container>
        <h1 className={styles.title}>Manage Flashcards</h1>
        <div className={styles.buttonBar}>
          <button className="loadCards" onClick={loadCardsHandler}>
            Load Cards
          </button>
        </div>
        <AddFlashCardForm />
        <ManageFlashCardList cards={sortedCards} onClicked={deleteCard} />
      </Container>
    </main>
  );
};

export default ManageCardsPage;

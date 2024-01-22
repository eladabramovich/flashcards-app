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

  const loadDeckHandler = async (): Promise<void> => {
    if (typeof window.showOpenFilePicker !== 'function') {
      alert('Browser not supported.');
      return;
    }

    try {
      let [fileHandle] = await window.showOpenFilePicker();
      const file = await fileHandle.getFile();
      const contents = await file.text();

      cardsDispatch({ type: 'LOAD_DECK', payload: JSON.parse(contents) });
    } catch (err) {
      const error = err as { code: number; message: string };
      if (error.code !== 20) {
        alert('Could not load deck file');
      }
    }
  };

  const saveDeckHandler = async (): Promise<void> => {
    if (typeof window.showSaveFilePicker !== 'function') {
      alert('Browser not supported.');
      return;
    }

    try {
      const fileHandle = (await getNewFileHandle()) as FileSystemFileHandle;
      if (fileHandle === null) {
        return;
      }

      const cards = localStorage.getItem('flashcards');
      if (!cards) {
        throw new Error('Error, Could not save file');
      }

      await writeDeckFile(fileHandle, cards);
      alert('File saved!');
    } catch (err) {
      alert('Something went wrong, please try again');
    }
  };

  const getNewFileHandle = async (): Promise<FileSystemFileHandle | null> => {
    try {
      const options: SaveFilePickerOptions = {
        types: [
          {
            description: 'JSON Files',
            accept: {
              'text/json': ['.json'],
            },
          },
        ],
      };
      const handle = await window.showSaveFilePicker(options);

      return handle;
    } catch (err) {
      const error = err as { code: number; message: string };
      if (error.code !== 20) {
        throw err;
      } else {
        return null;
      }
    }
  };

  const writeDeckFile = async (
    fileHandle: FileSystemFileHandle,
    contents: string
  ): Promise<void> => {
    try {
      const writeable = await fileHandle.createWritable();
      await writeable.write(contents);
      await writeable.close();
    } catch (err) {
      console.error(err);
      const error = err as { code: number; message: string };
      if (error.code !== 20) {
        throw err;
      }
    }
  };

  const deleteCard = (id: string): void => {
    cardsDispatch({ type: 'DELETE', payload: id });
    cardsDispatch({ type: 'LOAD' });
  };
  return (
    <main>
      <Container>
        <h1 className={styles.title}>Manage Flashcards</h1>
        <div className={styles.buttonBar}>
          <button className={styles.actionBtn} onClick={loadDeckHandler}>
            Load Deck
          </button>
          <button className={styles.actionBtn} onClick={saveDeckHandler}>
            Save Deck
          </button>
        </div>
        <AddFlashCardForm />
        <ManageFlashCardList cards={sortedCards} onClicked={deleteCard} />
      </Container>
    </main>
  );
};

export default ManageCardsPage;

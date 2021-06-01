import styles from './ManageFlashCardList.module.css';

import { Flashcard } from '../../../types/flashcards-types';

type Props = {
  cards: Flashcard[];
  onClicked: (id: string) => void;
};

const ManageFlashCardList = ({ cards, onClicked }: Props) => {
  return (
    <div className={styles.manageFlashCardList}>
      {cards.map((card) => (
        <div key={card.id} className={styles.item}>
          <h3 className={styles.question}>{card.question}</h3>
          <button
            className={styles.deleteBtn}
            onClick={() => onClicked(card.id)}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageFlashCardList;

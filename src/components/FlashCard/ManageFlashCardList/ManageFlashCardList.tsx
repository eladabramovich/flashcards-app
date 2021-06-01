import styles from './ManageFlashCardList.module.css';

import { Flashcard } from '../../../types/flashcards-types';

type Props = {
  cards: Flashcard[];
};

const ManageFlashCardList = ({ cards }: Props) => {
  return (
    <div className={styles.manageFlashCardList}>
      {cards.map((card) => (
        <div key={card.id} className={styles.item}>
          <h3 className={styles.question}>{card.question}</h3>
          <button className={styles.deleteBtn}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default ManageFlashCardList;

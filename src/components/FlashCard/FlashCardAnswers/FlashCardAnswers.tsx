import FlashCardAnswersItem from '../FlashCardAnswersItem/FlashCardAnswersItem';

import styles from './FlashCardAnswers.module.css';

const FlashCardAnswers = () => {
  return (
    <div className={styles.flashCardAnswers}>
      <FlashCardAnswersItem />
      <FlashCardAnswersItem />
      <FlashCardAnswersItem />
      <FlashCardAnswersItem />
    </div>
  );
};

export default FlashCardAnswers;

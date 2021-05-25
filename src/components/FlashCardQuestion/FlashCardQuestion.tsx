import { useRef, useEffect } from 'react';

import styles from './FlashCardQuestion.module.css';

const FlashCardQuestion = () => {
  const flipCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const flipCard = flipCardRef.current!;
    flipCard.addEventListener('touchstart', () => {
      flipCard.classList.toggle(styles.flipped);
    });
  }, [flipCardRef]);

  return (
    <div className={styles.flashCardView}>
      <div className={styles.filpCard} ref={flipCardRef}>
        <div className={styles.filpCardFront}>What is an Octave?</div>
        <div className={styles.filpCardBack}>
          Octave is a container of 8 notes
        </div>
      </div>
    </div>
  );
};

export default FlashCardQuestion;

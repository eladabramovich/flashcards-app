import { useRef, useEffect } from 'react';

import styles from './FlashCardQuestion.module.css';

type Props = {
  question: string;
  summary: string;
};

const FlashCardQuestion = ({ question, summary }: Props) => {
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
        <div className={styles.filpCardFront}>
          <p>{question}</p>
        </div>
        <div className={styles.filpCardBack}>
          <p>{summary}</p>
        </div>
      </div>
    </div>
  );
};

export default FlashCardQuestion;

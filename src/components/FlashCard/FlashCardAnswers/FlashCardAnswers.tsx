import FlashCardAnswersItem from '../FlashCardAnswersItem/FlashCardAnswersItem';

import styles from './FlashCardAnswers.module.css';

type Props = {
  answers: [
    { id: 'a'; text: string },
    { id: 'b'; text: string },
    { id: 'c'; text: string },
    { id: 'd'; text: string }
  ];
  correctAnswerId: string;
  onClicked: (
    e: React.MouseEvent<HTMLDivElement>,
    id: string,
    styleClass: string
  ) => void;
};
const FlashCardAnswers = ({ answers, correctAnswerId, onClicked }: Props) => {
  return (
    <div className={styles.flashCardAnswers}>
      {answers.map((answer) => (
        <FlashCardAnswersItem
          key={answer.id}
          id={answer.id}
          correctAnswerId={correctAnswerId}
          onClicked={onClicked}
        >
          {answer.text}
        </FlashCardAnswersItem>
      ))}
    </div>
  );
};

export default FlashCardAnswers;

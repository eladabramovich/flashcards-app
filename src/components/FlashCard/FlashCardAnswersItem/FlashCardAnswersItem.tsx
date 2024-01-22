import { PropsWithChildren } from 'react';
import styles from './FlashCardAnswersItem.module.css';

type Props = {
  id: string;
  correctAnswerId: string;
  onClicked: (
    e: React.MouseEvent<HTMLDivElement>,
    id: string,
    styleClass: string
  ) => void;
};
const FlashCardAnswersItem = ({
  id,
  correctAnswerId,
  children,
  onClicked,
}: PropsWithChildren<Props>) => {
  const itemStyle =
    id === correctAnswerId
      ? `${styles.item} ${styles.correct}`
      : `${styles.item} ${styles.wrong}`;
  return (
    <div className={itemStyle} onClick={(e) => onClicked(e, id, styles.chosen)}>
      {children}
    </div>
  );
};

export default FlashCardAnswersItem;

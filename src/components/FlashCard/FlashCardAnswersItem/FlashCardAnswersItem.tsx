import styles from './FlashCardAnswersItem.module.css';

type Props = {
  id: string;
  children: Object;
  onClicked: (id: string) => void;
};
const FlashCardAnswersItem = ({ id, children, onClicked }: Props) => {
  return (
    <div className={styles.item} onClick={() => onClicked(id)}>
      {children}
    </div>
  );
};

export default FlashCardAnswersItem;

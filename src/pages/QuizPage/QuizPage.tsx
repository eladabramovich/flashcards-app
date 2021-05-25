import Container from '../../components/UI/Container/Container';
import FlashCardQuestion from '../../components/FlashCardQuestion/FlashCardQuestion';

import styles from './QuizPage.module.css';

const QuizPage = () => {
  return (
    <main className={styles.quizPage}>
      <Container>
        <FlashCardQuestion />
      </Container>
    </main>
  );
};

export default QuizPage;

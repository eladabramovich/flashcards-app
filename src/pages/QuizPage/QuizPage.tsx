import Container from '../../components/UI/Container/Container';
import FlashCardQuestion from '../../components/FlashCard/FlashCardQuestion/FlashCardQuestion';
import FlashCardAnswers from '../../components/FlashCard/FlashCardAnswers/FlashCardAnswers';

import styles from './QuizPage.module.css';

const QuizPage = () => {
  return (
    <main className={styles.quizPage}>
      <Container>
        <FlashCardQuestion />
        <FlashCardAnswers />
      </Container>
    </main>
  );
};

export default QuizPage;

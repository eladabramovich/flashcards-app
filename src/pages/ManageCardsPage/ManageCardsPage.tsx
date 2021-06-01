import Container from '../../components/UI/Container/Container';
import AddFlashCardForm from '../../components/FlashCard/AddFlashCardForm/AddFlashCardForm';

import styles from './ManageCardsPage.module.css';

const ManageCardsPage = () => {
  return (
    <main>
      <Container>
        <AddFlashCardForm />
      </Container>
    </main>
  );
};

export default ManageCardsPage;

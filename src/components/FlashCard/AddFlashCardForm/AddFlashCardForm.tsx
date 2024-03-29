import React, { useState, useContext, useRef } from 'react';
import { v4 as uuid } from 'uuid';

import { FlashcardsContext } from '../../../context/flashcards-context';

import { Flashcard } from '../../../types/flashcards-types';

import styles from './AddFlashCardForm.module.css';

interface AnswersValues {
  a: string;
  b: string;
  c: string;
  d: string;
  [key: string]: any;
}

const AddFlashCardForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { cardsDispatch } = useContext(FlashcardsContext);
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState<AnswersValues>({
    a: '',
    b: '',
    c: '',
    d: '',
  });
  const [summary, setSummary] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const checkErrors = (): string => {
    setErrorMessage('');
    for (let key in answers) {
      if (answers[key] === '') {
        return 'Please fill all the fields';
      }
    }
    if (!question || !summary) {
      return 'Please fill all the fields';
    }
    if (!correctAnswer) {
      return 'Please choose the corrct answer';
    }
    return '';
  };

  const cleanInputs = () => {
    const formEl = formRef.current as HTMLFormElement;
    const textInputs = formEl.querySelectorAll('input[type=text]');
    textInputs.forEach((input) => {
      let textInput = input as HTMLInputElement;
      textInput.value = '';
      textInput.focus();
      textInput.blur();
    });
    const textareaEl = formEl.querySelector('textarea') as HTMLTextAreaElement;
    textareaEl.value = '';
    textareaEl.focus();
    textareaEl.blur();
    const radioInputs = formEl.querySelectorAll('input[type=radio]');
    radioInputs.forEach((input) => {
      let radioInput = input as HTMLInputElement;
      radioInput.checked = false;
      radioInput.value = '';
    });
  };

  const onSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = checkErrors();
    if (error !== '') {
      setErrorMessage(error);
      return;
    }
    const newFlashCard: Flashcard = {
      id: uuid(),
      question: question,
      answers: [
        { id: 'a', text: answers.a },
        { id: 'b', text: answers.b },
        { id: 'c', text: answers.c },
        { id: 'd', text: answers.d },
      ],
      summary: summary,
      correctAnswer: correctAnswer as unknown as Flashcard['correctAnswer'],
    };
    cardsDispatch({ type: 'ADD', payload: newFlashCard });
    cardsDispatch({ type: 'LOAD' });
    cleanInputs();
  };
  return (
    <form
      onSubmit={(e: React.MouseEvent<HTMLFormElement>) => onSubmit(e)}
      id={styles.addCardForm}
      ref={formRef}
      noValidate
    >
      <div className={styles.formGroup}>
        <input
          type="text"
          id="question"
          autoComplete="off"
          onBlur={(e) => setQuestion(e.target.value)}
        />
        <label htmlFor="question">Question:</label>
      </div>
      <h4 className={styles.sectionTitle}>Answers:</h4>
      <div className={styles.gridGroup}>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="answer-a"
            autoComplete="off"
            onBlur={(e) => setAnswers((cur) => ({ ...cur, a: e.target.value }))}
          />
          <label htmlFor="answer-a">A:</label>
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="answer-b"
            autoComplete="off"
            onBlur={(e) => setAnswers((cur) => ({ ...cur, b: e.target.value }))}
          />
          <label htmlFor="answer-b">B:</label>
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="answer-c"
            autoComplete="off"
            onBlur={(e) => setAnswers((cur) => ({ ...cur, c: e.target.value }))}
          />
          <label htmlFor="answer-c">C:</label>
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="answer-d"
            autoComplete="off"
            onBlur={(e) => setAnswers((cur) => ({ ...cur, d: e.target.value }))}
          />
          <label htmlFor="answer-d">D:</label>
        </div>
      </div>
      <div className={styles.formGroup}>
        <textarea
          id="summary"
          rows={5}
          onBlur={(e) => setSummary(e.target.value)}
        ></textarea>
        <label htmlFor="summary">Summary:</label>
      </div>
      <h4 className={styles.sectionTitle}>Correct answer:</h4>
      <div className={`${styles.formGroup} ${styles.radioGroup}`}>
        <input
          type="radio"
          id="correct-answer"
          value="a"
          name="correct_answer"
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
        <label htmlFor="correct-answer">A</label>
        <input
          type="radio"
          id="correct-answer"
          value="b"
          name="correct_answer"
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
        <label htmlFor="correct-answer">B</label>
        <input
          type="radio"
          id="correct-answer"
          value="c"
          name="correct_answer"
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
        <label htmlFor="correct-answer">C</label>
        <input
          type="radio"
          id="correct-answer"
          value="d"
          name="correct_answer"
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
        <label htmlFor="correct-answer">D</label>
      </div>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <div className={styles.btnCont}>
        <button type="submit" className={styles.submitBtn}>
          Save
        </button>
      </div>
    </form>
  );
};

export default AddFlashCardForm;

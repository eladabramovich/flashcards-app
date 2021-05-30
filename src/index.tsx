import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FlashCardsContextProvider from './context/flashcards-context';

ReactDOM.render(
  <FlashCardsContextProvider>
    <App />
  </FlashCardsContextProvider>,
  document.getElementById('root')
);

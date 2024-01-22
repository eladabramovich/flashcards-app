import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'normalize.css';
import './index.css';

import FlashCardsContextProvider from './context/flashcards-context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <FlashCardsContextProvider>
    <App />
  </FlashCardsContextProvider>
);

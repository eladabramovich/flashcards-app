import { createContext, useReducer, Dispatch } from 'react';
import { Flashcard } from '../types/flashcards-types';

type State = {
  items: Flashcard[];
  usedItems: Flashcard[];
  error: FlashCardError | null;
};

type Action = {
  type: string;
  payload?: any;
};

interface FlashCardError {
  type: string;
  message: string;
}

type CardsActions =
  | { type: 'LOAD'; payload?: Flashcard[] }
  | { type: 'LOAD_DECK'; payload?: Flashcard[] }
  | { type: 'ADD'; payload: Flashcard }
  | { type: 'DELETE'; payload: string }
  | { type: 'DELETE_ALL' }
  | { type: 'SHUFFLE' }
  | { type: 'NEXT_CARD' }
  | { type: 'RESET' };

const initialState = {
  items: [] as Flashcard[],
  usedItems: [] as Flashcard[],
  error: null,
};

export const FlashcardsContext = createContext<{
  cardsState: State;
  cardsDispatch: Dispatch<CardsActions>;
}>({
  cardsState: initialState,
  cardsDispatch: () => {},
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOAD':
      return loadCards(state, action);
    case 'LOAD_DECK':
      return loadDeckFile(state, action);
    case 'ADD':
      return addCard(state, action);
    case 'DELETE':
      return deleteCard(state, action);
    case 'SHUFFLE':
      return shuffleCards(state, action);
    case 'NEXT_CARD':
      return removeFromTop(state, action);
    case 'RESET':
      return resetItems(state, action);
    default:
      return state;
  }
};

const loadDeckFile = (state: State, action: Action) => {
  if (!validateDeckFile(action.payload)) {
    state.error = { type: 'LOAD_DECK', message: 'Deck file is corrupted' };
    return { ...state };
  }

  return loadCards(state, action);
};

const validateDeckFile = (deck: Flashcard[]) => {
  for (let card of deck) {
    if (
      !card.id ||
      !card.question ||
      !card.answers ||
      !card.correctAnswer ||
      !card.summary
    ) {
      return false;
    }
  }

  return true;
};

const loadCards = (state: State, action: Action): State => {
  const cards: Flashcard[] =
    action.payload! || JSON.parse(localStorage.getItem('flashcards')!);
  if (!cards || cards.length === 0) {
    state.error = { type: 'LOAD', message: 'Please add at least one card' };
  } else {
    state.error = null;
  }

  if (action.payload) {
    return {
      ...state,
      items: action.payload as Flashcard[],
    };
  } else {
    const cards: Flashcard[] =
      JSON.parse(localStorage.getItem('flashcards')!) || [];
    return {
      ...state,
      items: cards,
    };
  }
};

const addCard = (state: State, action: Action): State => {
  const updatedItems = [...state.items, action.payload] as Flashcard[];
  localStorage.setItem('flashcards', JSON.stringify(updatedItems));
  return { ...state, items: updatedItems };
};

const deleteCard = (state: State, action: Action): State => {
  const updatedItems = state.items.filter((item) => item.id !== action.payload);
  localStorage.setItem('flashcards', JSON.stringify(updatedItems));
  return { ...state, items: updatedItems };
};

const shuffleCards = (state: State, _: Action): State => {
  if (state.items.length === 0) return state;
  const updatedItems = [...state.items];
  for (let i = updatedItems.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let tempCard: Flashcard = {
      ...updatedItems[i],
      answers: [...updatedItems[i].answers],
    };
    updatedItems[i] = updatedItems[j];
    updatedItems[j] = tempCard;
  }
  return {
    ...state,
    items: updatedItems,
  };
};

const removeFromTop = (state: State, _: Action): State => {
  const updatedState = {
    items: [...state.items],
    usedItems: [...state.usedItems],
  };
  if (updatedState.items.length <= 0) return state;
  const removedCard = updatedState.items.shift()!;
  updatedState.usedItems.push(removedCard);
  return {
    ...state,
    items: updatedState.items,
    usedItems: updatedState.usedItems,
  };
};

const resetItems = (state: State, _: Action): State => {
  const updatedItems = [...state.usedItems];
  return {
    ...state,
    items: updatedItems,
    usedItems: [],
  };
};

type Props = {
  children: Object;
};

const FlashCardsContextProvider = ({ children }: Props) => {
  const [cardsState, cardsDispatch] = useReducer(reducer, initialState);

  return (
    <FlashcardsContext.Provider
      value={{
        cardsState,
        cardsDispatch,
      }}
    >
      {children}
    </FlashcardsContext.Provider>
  );
};

export default FlashCardsContextProvider;

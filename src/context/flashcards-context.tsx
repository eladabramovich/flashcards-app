import { createContext, useReducer, Dispatch } from 'react';
import { Flashcard } from '../types/flashcards-types';

type State = {
  items: Flashcard[];
  usedItems: Flashcard[];
};

type Action = {
  type: string;
  payload?: Flashcard[];
};

type CardsActions =
  | { type: 'LOAD'; payload: Flashcard[] }
  | { type: 'SHUFFLE' }
  | { type: 'NEXT_CARD' }
  | { type: 'RESET' };

const initialState = {
  items: [] as Flashcard[],
  usedItems: [] as Flashcard[],
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

const loadCards = (state: State, action: Action): State => {
  return {
    ...state,
    items: action.payload!,
  };
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
  console.log(updatedState);
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

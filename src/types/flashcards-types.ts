export interface Flashcard {
  id: string;
  question: string;
  answers: [
    { id: 'a'; text: string },
    { id: 'b'; text: string },
    { id: 'c'; text: string },
    { id: 'd'; text: string }
  ];
  correctAnswer: 'a' | 'b' | 'c' | 'd';
  summary: string;
}

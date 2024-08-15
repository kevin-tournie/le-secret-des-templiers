export type Answer = {
  id: number;
  value: string;
  indication: string;
  isCorrect: boolean;
};
export type Question = {
  id: number;
  question: string;
  answers: Answer[];
};

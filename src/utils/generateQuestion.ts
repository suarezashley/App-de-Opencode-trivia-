export type Question = {
  a: number;
  b: number;
  correct: number;
  options: number[];
};

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateQuestion(): Question {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const correct = a * b;

  const optionsSet = new Set<number>();
  optionsSet.add(correct);

  while (optionsSet.size < 4) {
    let delta = Math.floor(Math.random() * 7) - 3;
    if (delta === 0) delta = 1;

    let distractor = correct + delta;

    if (distractor < 0) {
      distractor = Math.abs(correct - (Math.floor(Math.random() * 3) + 1));
    }

    if (distractor === correct) {
      distractor = correct + (Math.random() < 0.5 ? 1 : 2);
    }

    optionsSet.add(distractor);
  }

  const options = shuffleArray(Array.from(optionsSet));

  return {
    a,
    b,
    correct,
    options,
  };
}
import type { Card } from './types';

// Helper to shuffle an array
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Define the structure for dice combinations
interface DiceCombo {
  name: string;
  description: string;
  points: number;
  diceNeeded: number[];  // Array of dice values (1-6)
  aiHint: string;
}

const diceComboCards: DiceCombo[] = [
  {
    name: "Easy Start",
    description: "Find dice showing 1, 2, and 3",
    points: 5,
    diceNeeded: [1, 2, 3],
    aiHint: "sequence 1-2-3"
  },
  {
    name: "Middle Ground",
    description: "Find dice showing 2, 3, and 4",
    points: 8,
    diceNeeded: [2, 3, 4],
    aiHint: "sequence 2-3-4"
  },
  {
    name: "High Roll",
    description: "Find dice showing 4, 5, and 6",
    points: 10,
    diceNeeded: [4, 5, 6],
    aiHint: "sequence 4-5-6"
  },
  {
    name: "Four of a Kind",
    description: "Find four dice showing 4",
    points: 12,
    diceNeeded: [4, 4, 4, 4],
    aiHint: "four fours"
  },
  {
    name: "Five High",
    description: "Find five dice showing 5",
    points: 15,
    diceNeeded: [5, 5, 5, 5, 5],
    aiHint: "five fives"
  },
  {
    name: "Perfect Six",
    description: "Find six dice showing 6",
    points: 20,
    diceNeeded: [6, 6, 6, 6, 6, 6],
    aiHint: "six sixes"
  }
];

// Extended Card type to include dice information
// No need for DiceCard interface since Card now includes dice values

export const generateDeck = (): Card[] => {
  const deck: Card[] = [];
  
  // Create cards from dice combinations
  diceComboCards.forEach((combo, index) => {
    // More copies of easier cards, fewer of harder ones
    const numCopies = Math.max(1, Math.floor(12 / (index + 1)));
    
    for (let i = 0; i < numCopies; i++) {
      deck.push({
        id: `card-${combo.name}-${i + 1}`.toLowerCase().replace(/\s+/g, '-'),
        name: combo.name,
        points: combo.points,

        aiHint: combo.aiHint,
        diceValues: combo.diceNeeded,
        description: combo.description
      });
    }
  });

  return shuffleArray(deck);
};

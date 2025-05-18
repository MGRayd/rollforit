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

interface DiceCombo {
  name: string;
  description: string;
  points: number;
  diceNeeded: number[];
  minDiceRequired: number;
  aiHint: string;
}

// A diverse set of card combinations inspired by Roll For It!
const diceComboCards: DiceCombo[] = [
  { name: "Easy Start", description: "Find dice showing 1, 2, and 3", points: 2, diceNeeded: [1, 2, 3], minDiceRequired: 3, aiHint: "sequence 1-2-3" },
  { name: "Middle Ground", description: "Find dice showing 2, 3, and 4", points: 2, diceNeeded: [2, 3, 4], minDiceRequired: 3, aiHint: "sequence 2-3-4" },
  { name: "High Roll", description: "Find dice showing 4, 5, and 6", points: 2, diceNeeded: [4, 5, 6], minDiceRequired: 3, aiHint: "sequence 4-5-6" },
  { name: "Even Roll", description: "Find dice showing 2, 4, and 6", points: 3, diceNeeded: [2, 4, 6], minDiceRequired: 3, aiHint: "evens" },
  { name: "Odd Roll", description: "Find dice showing 1, 3, and 5", points: 3, diceNeeded: [1, 3, 5], minDiceRequired: 3, aiHint: "odds" },
  { name: "Mixed Triplet", description: "Two 1s and one 2", points: 3, diceNeeded: [1, 1, 2], minDiceRequired: 3, aiHint: "pair and one" },
  { name: "Triplet Split", description: "Two 2s and one 5", points: 4, diceNeeded: [2, 2, 5], minDiceRequired: 3, aiHint: "pair plus odd" },
  { name: "Low Triplet", description: "Find three 2s", points: 4, diceNeeded: [2, 2, 2], minDiceRequired: 3, aiHint: "triplet" },
  { name: "High Triplet", description: "Find three 5s", points: 5, diceNeeded: [5, 5, 5], minDiceRequired: 3, aiHint: "triplet" },
  { name: "Asymmetric Quad", description: "Two 4s, one 2, and one 5", points: 6, diceNeeded: [4, 4, 2, 5], minDiceRequired: 4, aiHint: "quad variant" },
  { name: "Quad Mix", description: "Three 4s and one 1", points: 6, diceNeeded: [4, 4, 4, 1], minDiceRequired: 4, aiHint: "triplet plus odd" },
  { name: "Lucky Fours", description: "Find four 4s", points: 8, diceNeeded: [4, 4, 4, 4], minDiceRequired: 4, aiHint: "quad" },
  { name: "High Pair", description: "Two 6s and one 5", points: 4, diceNeeded: [6, 6, 5], minDiceRequired: 3, aiHint: "pair plus one" },
  { name: "Off Balance", description: "One 1, one 2, and one 4", points: 3, diceNeeded: [1, 2, 4], minDiceRequired: 3, aiHint: "non-sequential" },
  { name: "Climb Up", description: "Find dice showing 2, 3, and 5", points: 3, diceNeeded: [2, 3, 5], minDiceRequired: 3, aiHint: "mixed climb" },
  { name: "Center Trio", description: "Find dice showing 3, 4, and 5", points: 4, diceNeeded: [3, 4, 5], minDiceRequired: 3, aiHint: "mid trio" },
  { name: "Wild Mix", description: "Find dice 1, 2, 3 and one wildcard", points: 5, diceNeeded: [1, 2, 3, -1], minDiceRequired: 4, aiHint: "sequence plus wildcard" },
  { name: "Full House", description: "Three of one number and two of another", points: 10, diceNeeded: [2, 2, 2, 5, 5], minDiceRequired: 5, aiHint: "full house" },
  { name: "Power Combo", description: "Three 3s and two 5s", points: 10, diceNeeded: [3, 3, 3, 5, 5], minDiceRequired: 5, aiHint: "full house variant" },
  { name: "Full House Variant", description: "Three 6s and two 1s", points: 12, diceNeeded: [6, 6, 6, 1, 1], minDiceRequired: 5, aiHint: "full house alt" },
  { name: "Three Pairs", description: "Two 1s, two 3s, and two 5s", points: 15, diceNeeded: [1, 1, 3, 3, 5, 5], minDiceRequired: 6, aiHint: "three pairs" },
  { name: "Two Triplets", description: "Three 2s and three 4s", points: 15, diceNeeded: [2, 2, 2, 4, 4, 4], minDiceRequired: 6, aiHint: "two triplets" },
  { name: "Almost Straight", description: "Find 1, 2, 3, 5, and 6", points: 9, diceNeeded: [1, 2, 3, 5, 6], minDiceRequired: 5, aiHint: "almost straight" },
  { name: "Almost Even", description: "Two 2s, two 4s, and one 6", points: 12, diceNeeded: [2, 2, 4, 4, 6], minDiceRequired: 5, aiHint: "even variant" },
  { name: "Almost Odd", description: "Two 1s, two 3s, and one 5", points: 12, diceNeeded: [1, 1, 3, 3, 5], minDiceRequired: 5, aiHint: "odd variant" },
  { name: "Full Straight", description: "Find dice showing 1 through 6", points: 20, diceNeeded: [1, 2, 3, 4, 5, 6], minDiceRequired: 6, aiHint: "full straight" }
];

// Distribution mapping each combo to how many cards should appear, summing to exactly 40
const cardDistribution: { name: string; count: number }[] = [
  { name: "Easy Start", count: 3 },       // 3
  { name: "Middle Ground", count: 3 },    // 6
  { name: "High Roll", count: 3 },        // 9
  { name: "Even Roll", count: 2 },        // 11
  { name: "Odd Roll", count: 2 },         // 13
  { name: "Mixed Triplet", count: 2 },    // 15
  { name: "Triplet Split", count: 1 },    // 16
  { name: "Low Triplet", count: 1 },      // 17
  { name: "High Triplet", count: 1 },     // 18
  { name: "Asymmetric Quad", count: 1 },  // 19
  { name: "Quad Mix", count: 1 },         // 20
  { name: "Lucky Fours", count: 1 },      // 21
  { name: "High Pair", count: 1 },        // 22
  { name: "Off Balance", count: 1 },      // 23
  { name: "Climb Up", count: 1 },         // 24
  { name: "Center Trio", count: 1 },      // 25
  { name: "Wild Mix", count: 2 },         // 27
  { name: "Full House", count: 2 },       // 29
  { name: "Power Combo", count: 1 },      // 30
  { name: "Full House Variant", count: 1 },// 31
  { name: "Three Pairs", count: 1 },      // 32
  { name: "Two Triplets", count: 1 },     // 33
  { name: "Almost Straight", count: 2 },  // 35
  { name: "Almost Even", count: 2 },      // 37
  { name: "Almost Odd", count: 2 },       // 39
  { name: "Full Straight", count: 1 }     // 40
];

export const generateDeck = (): Card[] => {
  const deck: Card[] = [];

  cardDistribution.forEach(({ name, count }) => {
    const combo = diceComboCards.find(c => c.name === name);
    if (!combo) return;
    for (let i = 0; i < count; i++) {
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

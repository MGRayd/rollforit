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
  minDiceRequired: number; // Minimum number of dice to fulfill this combo
  aiHint: string;
}

const diceComboCards: DiceCombo[] = [
  {
    name: "Easy Start",
    description: "Find dice showing 1, 2, and 3",
    points: 2,
    diceNeeded: [1, 2, 3], // Specific dice required
 minDiceRequired: 3,
    aiHint: "sequence 1-2-3"
  },
  {
    name: "Middle Ground",
    description: "Find dice showing 2, 3, and 4",
    points: 2,
    diceNeeded: [2, 3, 4], // Specific dice required
 minDiceRequired: 3,
    aiHint: "sequence 2-3-4"
  },
  {
    name: "High Roll",
 description: "Find dice showing 4, 5, and 6",
    points: 2,
    diceNeeded: [4, 5, 6], // Specific dice required
 minDiceRequired: 3,
    aiHint: "sequence 4-5-6"
  },
  {
    name: "Pair of 1s",
    description: "Find two dice showing 1",
    points: 2,
    diceNeeded: [1, 1],
 minDiceRequired: 2,
 aiHint: "pair of ones"
  },
  {
    name: "Pair of 2s",
    description: "Find two dice showing 2",
    points: 2,
    diceNeeded: [2, 2],
 minDiceRequired: 2,
 aiHint: "pair of twos"
  },
  {
    name: "Pair of 3s",
    description: "Find two dice showing 3",
    points: 2,
    diceNeeded: [3, 3],
 minDiceRequired: 2,
 aiHint: "pair of threes"
  },
  {
    name: "Pair of 4s",
    description: "Find two dice showing 4",
    points: 2,
    diceNeeded: [4, 4],
 minDiceRequired: 2,
 aiHint: "pair of fours"
  },
  {
    name: "Pair of 5s",
    description: "Find two dice showing 5",
    points: 2,
    diceNeeded: [5, 5],
 minDiceRequired: 2,
 aiHint: "pair of fives"
  },
  {
    name: "Pair of 6s",
    description: "Find two dice showing 6",
    points: 2,
    diceNeeded: [6, 6],
 minDiceRequired: 2,
 aiHint: "pair of sixes"
  },
  {
    name: "Two Pairs (1s and 2s)",
    description: "Find two 1s and two 2s",
    points: 5,
    diceNeeded: [1, 1, 2, 2],
 minDiceRequired: 4,
 aiHint: "two pairs ones and twos"
  },
  {
    name: "Two Pairs (3s and 4s)",
    description: "Find two 3s and two 4s",
    points: 5,
    diceNeeded: [3, 3, 4, 4],
 minDiceRequired: 4,
 aiHint: "two pairs threes and fours"
  },
  {
    name: "Two Pairs (5s and 6s)",
    description: "Find two 5s and two 6s",
    points: 5,
    diceNeeded: [5, 5, 6, 6],
 minDiceRequired: 4,
 aiHint: "two pairs fives and sixes"
  },
  {
    name: "Two Pairs (1s and 3s)",
    description: "Find two 1s and two 3s",
    points: 5,
    diceNeeded: [1, 1, 3, 3],
 minDiceRequired: 4,
    aiHint: "two pairs"
  },
  {
    name: "Two Pairs (2s and 4s)",
    description: "Find two 2s and two 4s",
    points: 5,
    diceNeeded: [2, 2, 4, 4],
 minDiceRequired: 4,
 aiHint: "two pairs"
  },
  {
    name: "Two Pairs (3s and 5s)",
    description: "Find two 3s and two 5s",
    points: 5,
    diceNeeded: [3, 3, 5, 5],
 minDiceRequired: 4,
 aiHint: "two pairs"
  },
  {
    name: "Three 1s",
    description: "Find three dice showing a 1",
    points: 10,
    diceNeeded: [1, 1, 1],
 minDiceRequired: 3,
    aiHint: "three ones"
  },
  {
    name: "Three 2s",
    description: "Find three dice showing a 2",
    points: 2,
    diceNeeded: [2, 2, 2],
    minDiceRequired: 3,
    aiHint: "three twos"
  },
  {
    name: "Three 3s",
    description: "Find three dice showing a 3",
    points: 5,
    diceNeeded: [3, 3, 3],
    minDiceRequired: 3,
    aiHint: "three threes"
  },
  {
    name: "Three 4s",
    description: "Find three dice showing a 4",
    points: 5,
    diceNeeded: [4, 4, 4],
    minDiceRequired: 3,
    aiHint: "three fours"
  },
  {
    name: "Three 5s",
    description: "Find three dice showing a 5",
    points: 5,
    diceNeeded: [5, 5, 5],
    minDiceRequired: 3,
    aiHint: "three fives"
  },
  {
    name: "Three 6s",
    description: "Find three dice showing a 6",
    points: 10,
    diceNeeded: [6, 6, 6],
    minDiceRequired: 3,
    aiHint: "three sixes"
  },
  {
    name: "Four 1s",
    description: "Find four dice showing a 1",
    points: 15,
    diceNeeded: [1, 1, 1, 1],
    minDiceRequired: 4,
    aiHint: "four ones"
  },
  {
    name: "Four 2s",
    description: "Find four dice showing a 2",
    points: 5,
    diceNeeded: [2, 2, 2, 2],
    minDiceRequired: 4,
    aiHint: "four twos"
  },
  {
    name: "Four 3s",
    description: "Find four dice showing a 3",
    points: 10,
    diceNeeded: [3, 3, 3, 3],
    minDiceRequired: 4,
    aiHint: "four threes"
  },
  {
    name: "Four 4s",
    description: "Find four dice showing a 4",
    points: 5,
    diceNeeded: [4, 4, 4, 4],
    minDiceRequired: 4,
    aiHint: "four fours"
  },
  {
    name: "Four 5s",
    description: "Find four dice showing a 5",
    points: 10,
    diceNeeded: [5, 5, 5, 5],
    minDiceRequired: 4,
    aiHint: "four fives"
  },
  {
    name: "Four 6s",
    description: "Find four dice showing a 6",
    points: 10,
    diceNeeded: [6, 6, 6, 6],
    minDiceRequired: 4,
    aiHint: "four sixes"
  },
  {
    name: "Five 1s",
    description: "Find five dice showing a 1",
    points: 15,
    diceNeeded: [1, 1, 1, 1, 1],
    minDiceRequired: 5,
    aiHint: "five ones"
  },
  {
    name: "Five 2s",
    description: "Find five dice showing a 2",
    points: 15,
    diceNeeded: [2, 2, 2, 2, 2],
    minDiceRequired: 5,
    aiHint: "five twos"
  },
  {
    name: "Five 3s",
    description: "Find five dice showing a 3",
    points: 15,
    diceNeeded: [3, 3, 3, 3, 3],
    minDiceRequired: 5,
    aiHint: "five threes"
  },
  {
    name: "Five 4s",
    description: "Find five dice showing a 4",
    points: 15,
    diceNeeded: [4, 4, 4, 4, 4],
    minDiceRequired: 5,
    aiHint: "five fours"
  },
  {
    name: "Five 5s",
    description: "Find five dice showing a 5",
    points: 15,
    diceNeeded: [5, 5, 5, 5, 5],
    minDiceRequired: 5,
    aiHint: "five fives"
  },
  {
    name: "Five 6s",
    description: "Find five dice showing a 6",
    points: 15,
    diceNeeded: [6, 6, 6, 6, 6],
    minDiceRequired: 5,
    aiHint: "five sixes"
  },
  {
    name: "Three Pairs (1s, 2s, 3s)",
    description: "Find two 1s, two 2s, and two 3s",
    points: 15,
    diceNeeded: [1, 1, 2, 2, 3, 3],
    minDiceRequired: 6,
    aiHint: "three pairs ones twos threes"
  },
  {
    name: "Full House",
    description: "Find three of one number and two of another",
    points: 10,
    diceNeeded: [1, 1, 1, 2, 2],
    minDiceRequired: 5,
    aiHint: "full house"
  },
  {
    name: "Full House (Three 1s, Two 2s)",
    description: "Find three 1s and two 2s",
    points: 10,
    diceNeeded: [1, 1, 1, 2, 2],
    minDiceRequired: 5,
    aiHint: "full house three ones two twos"
  },
  {
    name: "Full House (Three 6s, Two 5s)",
    description: "Find three 6s and two 5s",
    points: 10,
    diceNeeded: [6, 6, 6, 5, 5],
    minDiceRequired: 5,
    aiHint: "full house three sixes two fives"
  },
  {
    name: "Straight (1 to 5)",
    description: "Find dice showing 1, 2, 3, 4, and 5",
    points: 10,
    diceNeeded: [1, 2, 3, 4, 5],
    minDiceRequired: 5,
    aiHint: "straight 1-5"
  },
  {
    name: "Straight (2 to 6)",
    description: "Find dice showing 2, 3, 4, 5, and 6",
    points: 15,
    diceNeeded: [2, 3, 4, 5, 6],
    minDiceRequired: 5,
    aiHint: "straight 2-6"
  }
];

export const generateDeck = (): Card[] => {
  // Create 40 cards by duplicating the combinations.
  // We'll duplicate simpler combos more often.
  const deck: Card[] = [];

  // Define how many times to duplicate each card type.
  // Adjust these numbers to get a total of 40 cards and control difficulty distribution.
  const cardDistribution = [
 { name: "Easy Start", count: 3 },
 { name: "Middle Ground", count: 3 },
 { name: "High Roll", count: 3 },
 { name: "Pair of 1s", count: 2 },
 { name: "Pair of 2s", count: 2 },
 { name: "Pair of 3s", count: 2 },
 { name: "Pair of 4s", count: 2 },
 { name: "Pair of 5s", count: 2 },
 { name: "Pair of 6s", count: 2 },
 { name: "Two Pairs (1s and 2s)", count: 2 },
 { name: "Two Pairs (3s and 4s)", count: 2 },
 { name: "Two Pairs (5s and 6s)", count: 2 },
 { name: "Two Pairs (1s and 3s)", count: 1 },
 { name: "Two Pairs (2s and 4s)", count: 1 },
 { name: "Two Pairs (3s and 5s)", count: 1 },
 { name: "Three 1s", count: 1 },
 { name: "Three 2s", count: 1 },
 { name: "Three 3s", count: 1 },
 { name: "Three 4s", count: 1 },
 { name: "Three 5s", count: 1 },
 { name: "Three 6s", count: 1 },
 { name: "Four 1s", count: 1 },
 { name: "Four 2s", count: 1 },
 { name: "Four 3s", count: 1 },
 { name: "Four 4s", count: 1 },
 { name: "Four 5s", count: 1 },
 { name: "Four 6s", count: 1 },
 { name: "Five 1s", count: 1 },
 { name: "Five 2s", count: 1 },
 { name: "Five 3s", count: 1 },
 { name: "Five 4s", count: 1 },
 { name: "Five 5s", count: 1 },
 { name: "Five 6s", count: 1 },
 { name: "Three Pairs (1s, 2s, 3s)", count: 1 },
 { name: "Full House (Three 1s, Two 2s)", count: 1 },
 { name: "Full House (Three 6s, Two 5s)", count: 1 },
 { name: "Straight (1 to 5)", count: 2 },
 { name: "Straight (2 to 6)", count: 1 },
 ];

  cardDistribution.forEach(({ name, count }) => {
    const combo = diceComboCards.find(card => card.name === name);
    if (combo) {
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
    }
  });
  
  // Ensure the deck size is exactly 40 by trimming or adding if necessary
  // (This might require more careful adjustment of cardDistribution counts)
  while (deck.length > 40) {
    deck.pop(); // Remove excess cards from the end
  }
  while (deck.length < 40) {
    // Add a default easy card if we are short
    const easyCard = diceComboCards.find(card => card.name === "Easy Start");
    if (easyCard) {
      deck.push({
        id: `card-${easyCard.name}-${deck.length + 1}`.toLowerCase().replace(/\s+/g, '-'),
        name: easyCard.name,
        points: easyCard.points,
        aiHint: easyCard.aiHint,
        diceValues: easyCard.diceNeeded,
        description: easyCard.description
      });
    } else {
      // As a fallback, duplicate the last added card if no Easy Start found
      deck.push({...deck[deck.length - 1]});
    }
  }

  // Shuffle the final deck
  return shuffleArray(deck);
};

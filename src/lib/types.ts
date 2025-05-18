
export interface Card {
  id: string;
  name: string;
  points: number;
  description: string;
  diceValues: number[];  // Array of dice values to display
  aiHint: string;
}

export interface Player {
  id: string;
  name: string;
  score: number;
  wonCards: Card[];
}

export interface GameState {
  players: Player[];
  deck: Card[];
  activeCards: (Card | null)[];
  gameStage: 'setup' | 'playing' | 'ended';
  winner: Player | null;
  // For modal control, which card is selected to be assigned
  selectedCardToAssign: Card | null; 
  // For modal control, which player is chosen to receive the card
  // assigningPlayerId: string | null; 
}

export type GameAction =
  | { type: 'SETUP_PLAYERS'; playerCount: number; playerNames: string[] }
  | { type: 'START_GAME'; initialDeck: Card[] }
  | { type: 'SELECT_CARD_FOR_ASSIGNMENT'; card: Card | null }
  | { type: 'ASSIGN_CARD'; playerId: string }
  | { type: 'CHECK_GAME_END_CONDITIONS' } // New action to explicitly check end conditions
  | { type: 'END_GAME'; winner: Player | null }
  | { type: 'RESET_GAME' };

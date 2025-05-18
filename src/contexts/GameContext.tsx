
"use client";

import type { ReactNode } from 'react';
import React, { createContext, useReducer, useEffect } from 'react';
import type { GameState, GameAction, Player, Card } from '@/lib/types';
import { generateDeck, shuffleArray } from '@/lib/cards';

const WINNING_SCORE = 40;

const initialState: GameState = {
  players: [],
  deck: [],
  activeCards: [null, null, null],
  gameStage: 'setup',
  winner: null,
  selectedCardToAssign: null,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SETUP_PLAYERS': {
      const newPlayers: Player[] = action.playerNames
        .slice(0, action.playerCount)
        .map((name, index) => ({
          id: `player-${index + 1}`,
          name: name || `Player ${index + 1}`,
          score: 0,
          wonCards: [],
        }));
      return { ...initialState, players: newPlayers, gameStage: 'setup' };
    }
    case 'START_GAME': {
      const shuffledDeck = shuffleArray(action.initialDeck);
      const initialActiveCards: (Card | null)[] = [null, null, null];
      const deckCopy = [...shuffledDeck];

      for (let i = 0; i < 3; i++) {
        if (deckCopy.length > 0) {
          initialActiveCards[i] = deckCopy.shift()!;
        }
      }
      
      return {
        ...state,
        deck: deckCopy,
        activeCards: initialActiveCards,
        gameStage: 'playing',
        winner: null,
        selectedCardToAssign: null,
      };
    }
    case 'SELECT_CARD_FOR_ASSIGNMENT': {
        return { ...state, selectedCardToAssign: action.card };
    }
    case 'ASSIGN_CARD': {
      if (!state.selectedCardToAssign) return state;

      const cardToAssign = state.selectedCardToAssign;
      let gameEnded = false;
      let newWinner: Player | null = null;

      const newPlayers = state.players.map(p => {
        if (p.id === action.playerId) {
          const updatedPlayer = {
            ...p,
            score: p.score + cardToAssign.points,
            wonCards: [...p.wonCards, cardToAssign],
          };
          if (updatedPlayer.score >= WINNING_SCORE) {
            gameEnded = true;
            newWinner = updatedPlayer;
          }
          return updatedPlayer;
        }
        return p;
      });

      const newActiveCards = [...state.activeCards];
      const cardIndex = newActiveCards.findIndex(c => c?.id === cardToAssign.id);
      
      let newDeck = [...state.deck];
      if (cardIndex !== -1) {
        if (newDeck.length > 0) {
          newActiveCards[cardIndex] = newDeck.shift()!;
        } else {
          newActiveCards[cardIndex] = null;
        }
      }
      
      // If game ended by score, set stage and winner
      if (gameEnded) {
        return {
          ...state,
          players: newPlayers,
          activeCards: newActiveCards,
          deck: newDeck,
          gameStage: 'ended',
          winner: newWinner,
          selectedCardToAssign: null,
        };
      }

      // If no one won by score yet, continue
      return {
        ...state,
        players: newPlayers,
        activeCards: newActiveCards,
        deck: newDeck,
        selectedCardToAssign: null,
      };
    }
    case 'CHECK_GAME_END_CONDITIONS': {
        // This case handles ending the game if all cards are gone and no one hit WINNING_SCORE
        const allCardsScored = state.deck.length === 0 && state.activeCards.every(card => card === null);
        if (allCardsScored && state.gameStage === 'playing') {
            // If all cards are scored and no one reached WINNING_SCORE yet
            if (state.players.every(p => p.score < WINNING_SCORE)) {
                let highestScore = -1;
                let currentWinner: Player | null = null;
                state.players.forEach(p => {
                    if (p.score > highestScore) {
                        highestScore = p.score;
                        currentWinner = p;
                    } else if (p.score === highestScore) {
                        // Handle ties if necessary, for now, first player with highest score wins or it's a draw
                        // For simplicity, let's say the first one encountered. Or could be null for a draw.
                        // currentWinner = null; // Or some tie-breaking logic
                    }
                });
                return { ...state, gameStage: 'ended', winner: currentWinner };
            }
        }
        return state; // No change if conditions not met
    }
    case 'END_GAME':
        return { ...state, gameStage: 'ended', winner: action.winner };
    case 'RESET_GAME':
      return { 
        ...initialState, 
        players: state.players.map(p => ({...p, name: p.name, score:0, wonCards:[]})), // Keep player names for quick restart? Or full reset.
        deck: generateDeck(), // Fresh deck
        gameStage: 'setup' 
      };
    default:
      return state;
  }
}

export const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Automatically check for game end conditions if deck or active cards change
  useEffect(() => {
    if (state.gameStage === 'playing') {
      dispatch({ type: 'CHECK_GAME_END_CONDITIONS' });
    }
  }, [state.deck, state.activeCards, state.gameStage]);


  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};


"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/hooks/useGame';
import CardItem from './CardItem';
import AssignCardDialog from './AssignCardDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Card as CardType } from '@/lib/types';
import { Users, Trophy, HelpCircle, SigmaSquare } from 'lucide-react';

const GameBoard = () => {
  const { state, dispatch } = useGame();
  const router = useRouter();

  useEffect(() => {
    if (state.gameStage === 'setup') {
      router.replace('/setup'); // Should not happen if routed correctly, but as a safeguard
    }
    if (state.gameStage === 'ended') {
      router.replace('/game-over');
    }
  }, [state.gameStage, router]);
  
  const handleCardSelect = (card: CardType) => {
    dispatch({ type: 'SELECT_CARD_FOR_ASSIGNMENT', card });
  };

  const isAssignDialogOpen = !!state.selectedCardToAssign;
  const closeAssignDialog = () => {
    dispatch({ type: 'SELECT_CARD_FOR_ASSIGNMENT', card: null });
  };


  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-8">
      {/* Player Scores */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Users className="mr-2 h-7 w-7 text-primary" /> Player Scores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {state.players.map(player => (
              <li key={player.id} className="bg-card p-4 rounded-lg shadow">
                <p className="text-xl font-semibold text-primary-foreground bg-primary p-2 rounded-t-md">{player.name}</p>
                <p className="text-3xl font-bold mt-2 text-center">{player.score} <span className="text-sm font-normal">pts</span></p>
                <p className="text-sm text-muted-foreground mt-1 text-center">{player.wonCards.length} cards won</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Active Cards */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
             <SigmaSquare className="mr-2 h-7 w-7 text-primary" /> Active Cards
          </CardTitle>
        </CardHeader>
        <CardContent>
          {state.activeCards.every(c => c === null) && state.deck.length === 0 ? (
             <div className="text-center py-10">
                <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-xl text-muted-foreground">No more cards to draw!</p>
                <p className="text-sm text-muted-foreground">The game might be ending soon.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {state.activeCards.map((card, index) => (
                <CardItem
                  key={card ? card.id : `placeholder-${index}`}
                  card={card}
                  onCardSelect={handleCardSelect}
                  isPlaceholder={!card}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deck Info */}
      <Card className="shadow-md">
        <CardContent className="p-4 text-center">
          <p className="text-lg text-muted-foreground">
            Cards remaining in deck: <span className="font-bold text-primary">{state.deck.length}</span>
          </p>
        </CardContent>
      </Card>
      
      <AssignCardDialog
        isOpen={isAssignDialogOpen}
        onOpenChange={(isOpen) => { if (!isOpen) closeAssignDialog(); }}
        card={state.selectedCardToAssign}
      />
    </div>
  );
};

export default GameBoard;


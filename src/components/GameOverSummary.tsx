
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/hooks/useGame';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import { Trophy, Award, ListChecks, PartyPopper } from 'lucide-react';

const GameOverSummary = () => {
  const { state, dispatch } = useGame();
  const router = useRouter();

  const handlePlayAgain = () => {
    dispatch({ type: 'RESET_GAME' });
    router.push('/setup');
  };

  if (state.gameStage !== 'ended') {
     // This should ideally not be reached if routing is correct
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <p>Loading game results...</p>
        </div>
    );
  }
  
  const sortedPlayers = [...state.players].sort((a, b) => b.score - a.score);

  return (
    <Card className="w-full max-w-2xl shadow-xl">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
            {state.winner ? <Trophy className="h-16 w-16 text-yellow-400" /> : <PartyPopper className="h-16 w-16 text-primary" />}
        </div>
        <CardTitle className="text-4xl font-bold">
          {state.winner ? `${state.winner.name} Wins!` : "Game Over!"}
        </CardTitle>
        <CardDescription className="text-xl">
          {state.winner ? `Congratulations on reaching ${state.winner.score} points!` : "Let's see the final scores."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center"><ListChecks className="mr-2 h-7 w-7" />Final Scores</h3>
        </div>
        <ScrollArea className="h-[400px] w-full p-1">
          <ul className="space-y-4">
            {sortedPlayers.map((player, index) => (
              <li key={player.id} 
                  className={`p-4 rounded-lg shadow-md border-2 ${player.id === state.winner?.id ? 'border-yellow-400 bg-yellow-50' : 'bg-card'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-2xl font-semibold ${player.id === state.winner?.id ? 'text-yellow-600' : 'text-primary'}`}>
                    {index + 1}. {player.name}
                  </span>
                  <span className={`text-2xl font-bold ${player.id === state.winner?.id ? 'text-yellow-600' : 'text-primary'}`}>
                    {player.score} PTS
                  </span>
                </div>
                {player.id === state.winner?.id && <Award className="inline-block h-6 w-6 text-yellow-500 mr-2 mb-1" />}
                <p className="text-sm text-muted-foreground mb-2">{player.wonCards.length} cards won</p>
                {player.wonCards.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mt-2">
                        {player.wonCards.map(card => (
                            <div key={card.id} title={`${card.name} - ${card.points}pts`} className="rounded overflow-hidden shadow-sm aspect-[3/4] relative border border-muted-foreground/20">
                                <Image 
                                    src={card.imageUrl} 
                                    alt={card.name} 
                                    fill
                                    sizes="50px"
                                    style={{ objectFit: 'cover' }}
                                    data-ai-hint={card.aiHint}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                                    {card.points} pts
                                ODE_OF_STRING_PART>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button onClick={handlePlayAgain} className="w-full text-lg py-3">Play Again</Button>
      </CardFooter>
    </Card>
  );
};

export default GameOverSummary;

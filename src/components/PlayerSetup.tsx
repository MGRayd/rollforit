
"use client";

import type { FormEvent } from 'react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/hooks/useGame';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { generateDeck } from '@/lib/cards';
import { PartyPopper } from 'lucide-react';

const PlayerSetup = () => {
  const [numPlayers, setNumPlayers] = useState<number>(2);
  const [playerNames, setPlayerNames] = useState<string[]>(['', '', '', '']);
  const { dispatch } = useGame();
  const router = useRouter();

  const handleNumPlayersChange = (value: string) => {
    setNumPlayers(parseInt(value, 10));
  };

  const handlePlayerNameChange = (index: number, name: string) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = name;
    setPlayerNames(newPlayerNames);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const finalPlayerNames = playerNames.slice(0, numPlayers).map((name, idx) => name || `Player ${idx + 1}`);
    dispatch({ type: 'SETUP_PLAYERS', playerCount: numPlayers, playerNames: finalPlayerNames });
    dispatch({ type: 'START_GAME', initialDeck: generateDeck() });
    router.push('/game');
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <PartyPopper className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-3xl font-bold">Game Setup</CardTitle>
        <CardDescription>Let's get ready to roll!</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="numPlayers" className="text-lg">Number of Players</Label>
            <Select value={numPlayers.toString()} onValueChange={handleNumPlayersChange}>
              <SelectTrigger id="numPlayers" className="w-full">
                <SelectValue placeholder="Select number of players" />
              </SelectTrigger>
              <SelectContent>
                {[2, 3, 4].map(num => (
                  <SelectItem key={num} value={num.toString()}>{num} Players</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {Array.from({ length: numPlayers }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Label htmlFor={`playerName-${index}`} className="text-lg">Player {index + 1} Name</Label>
              <Input
                id={`playerName-${index}`}
                type="text"
                value={playerNames[index]}
                onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                placeholder={`Enter Player ${index + 1}'s Name`}
                className="text-base"
              />
            </div>
          ))}
          <CardFooter className="p-0 pt-4">
            <Button type="submit" className="w-full text-lg py-3">Start Game</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default PlayerSetup;

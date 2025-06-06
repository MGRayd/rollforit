"use client";

import type { Player, Card } from '@/lib/types';
import { useGame } from '@/hooks/useGame';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React, { useState, useEffect } from 'react';

interface AssignCardDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  card: Card | null;
}

const AssignCardDialog = ({ isOpen, onOpenChange, card }: AssignCardDialogProps) => {
  const { state, dispatch } = useGame();
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>('');

  useEffect(() => {
    // Reset selection whenever dialog opens or closes
    if (!isOpen) {
      setSelectedPlayerId('');
    }
  }, [isOpen]);

  const handleAssign = () => {
    if (card && selectedPlayerId) {
      dispatch({ type: 'ASSIGN_CARD', playerId: selectedPlayerId });
      onOpenChange(false);
      dispatch({ type: 'SELECT_CARD_FOR_ASSIGNMENT', card: null });
    }
  };

  if (!card) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
          dispatch({ type: 'SELECT_CARD_FOR_ASSIGNMENT', card: null });
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Card: {card.name}</DialogTitle>
          <DialogDescription>
            Select the player who scored this card ({card.points} points).
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Select value={selectedPlayerId} onValueChange={setSelectedPlayerId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Name" />
            </SelectTrigger>
            <SelectContent>
              {state.players.map((player: Player) => (
                <SelectItem key={player.id} value={player.id}>
                  {player.name} (Score: {player.score})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              dispatch({ type: 'SELECT_CARD_FOR_ASSIGNMENT', card: null });
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={!selectedPlayerId}>
            Assign Card
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignCardDialog;

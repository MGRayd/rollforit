"use client";

import type { Card as CardType } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Gem } from 'lucide-react';
import Image from 'next/image';

interface CardItemProps {
  card: CardType | null;
  onCardSelect: (card: CardType) => void;
  isPlaceholder?: boolean;
}

const DiceFace = ({ value }: { value: number }) => {
  if (value < 1 || value > 6) return null; // skip invalid dice

  return (
    <div className="w-12 h-12 m-1 rounded-lg bg-neutral-800 flex items-center justify-center shadow-md">
      <Image
        src={`./images/dice/d${value}.png`}
        alt={`Dice showing ${value}`}
        width={40}
        height={40}
        className="w-10 h-10 p-1"
        onError={(e) => {
          console.error(`Failed to load ./images/dice/d${value}.png`);
          e.currentTarget.style.border = '2px solid red';
          e.currentTarget.style.opacity = '0.3';
        }}
      />
    </div>
  );
};

const CardItem = ({ card, onCardSelect, isPlaceholder = false }: CardItemProps) => {
  if (isPlaceholder || !card) {
    return (
      <Card className="w-full h-[280px] border-2 border-dashed bg-muted/50 flex items-center justify-center aspect-[3/4] shadow-inner">
        <CardContent className="p-4 text-center">
          <p className="text-muted-foreground">No Card</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="w-full cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-in-out transform hover:scale-105 aspect-[3/4] flex flex-col overflow-hidden shadow-md"
      onClick={() => onCardSelect(card)}
      aria-label={`Select card ${card.name} for ${card.points} points`}
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onCardSelect(card)}
    >
      <CardHeader className="p-3 bg-primary text-primary-foreground">
        <CardTitle className="text-base font-semibold truncate" title={card.name}>{card.name}</CardTitle>
        {card.description && (
          <CardDescription className="text-sm text-primary-foreground/80">
            {card.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col justify-between">
        <div className="flex flex-wrap justify-center items-center gap-2 border border-dashed border-gray-300 p-2" style={{ background: '#f0f0f0' }}>
          <div className="w-full text-center text-xs text-gray-500 mb-2">
            {JSON.stringify(card.diceValues)}
          </div>
          {Array.isArray(card.diceValues) && card.diceValues.length > 0 ? (
            card.diceValues.map((value: number, index: number) => (
              <DiceFace key={`${value}-${index}`} value={value} />
            ))
          ) : (
            <div className="text-red-500">No dice values array!</div>
          )}
        </div>
        <div className="mt-auto p-3 bg-primary flex items-center justify-center">
          <Gem className="w-5 h-5 mr-2 text-accent" />
          <span className="text-lg font-bold text-primary-foreground">{card.points} Points</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardItem;

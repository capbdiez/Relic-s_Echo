import React from 'react';
import { Card } from './Card';
import { Avatar } from './Avatar';

interface HeroCardProps {
  name: string;
  archetype: string;
  level: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  strength: number;
  agility: number;
  intelligence: number;
  className?: string;
}

export default function HeroCard({
  name,
  archetype,
  level,
  health,
  maxHealth,
  mana,
  maxMana,
  strength,
  agility,
  intelligence,
  className = '',
}: HeroCardProps) {
  const healthPercentage = (health / maxHealth) * 100;
  const manaPercentage = (mana / maxMana) * 100;

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-start space-x-4">
        <Avatar name={name} size="large" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
          <p className="text-sm text-gray-600 mb-2">{archetype}</p>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Level {level}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Health</span>
            <span>{health}/{maxHealth}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${healthPercentage}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Mana</span>
            <span>{mana}/{maxMana}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${manaPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
        <div className="text-center">
          <div className="font-semibold text-red-600">STR</div>
          <div>{strength}</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-green-600">AGI</div>
          <div>{agility}</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-blue-600">INT</div>
          <div>{intelligence}</div>
        </div>
      </div>
    </Card>
  );
}
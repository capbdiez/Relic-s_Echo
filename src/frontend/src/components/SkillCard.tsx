import React from 'react';
import { Card } from './Card';

interface SkillCardProps {
  name: string;
  description: string;
  icon?: string;
  cost: number;
  level: number;
  maxLevel: number;
  isLearned: boolean;
  requiredLevel: number;
  userLevel: number;
  canUpgrade: boolean;
  onLearn?: () => void;
  onUpgrade?: () => void;
  className?: string;
}

export default function SkillCard({
  name,
  description,
  icon,
  cost,
  level,
  maxLevel,
  isLearned,
  requiredLevel,
  userLevel,
  canUpgrade,
  onLearn,
  onUpgrade,
  className = '',
}: SkillCardProps) {
  const isAvailable = userLevel >= requiredLevel;
  const canLearn = !isLearned && isAvailable && cost <= (userLevel * 5); // Simple cost calculation

  const getSkillTypeColor = () => {
    if (!isLearned) return 'border-gray-300 bg-gray-50';
    if (level >= maxLevel) return 'border-purple-300 bg-purple-50';
    return 'border-green-300 bg-green-50';
  };

  return (
    <Card
      className={`p-4 ${getSkillTypeColor()} ${className} ${!isAvailable ? 'opacity-50' : ''}`}
      hover={isAvailable}
      onClick={() => {
        if (canLearn && onLearn) onLearn();
        if (canUpgrade && onUpgrade) onUpgrade();
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-gray-900 text-sm">{name}</h4>
        {isLearned && (
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
            Lvl {level}/{maxLevel}
          </span>
        )}
      </div>

      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{description}</p>

      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500">
          Required: Lvl {requiredLevel}
        </div>
        <div className="text-xs font-medium">
          Cost: {cost} points
        </div>
      </div>

      {!isAvailable && (
        <div className="mt-2 text-xs text-red-600 font-medium">
          Requires level {requiredLevel}
        </div>
      )}

      {isAvailable && !isLearned && !canUpgrade && (
        <button
          className="mt-2 w-full px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            if (onLearn) onLearn();
          }}
        >
          Learn Skill
        </button>
      )}

      {canUpgrade && (
        <button
          className="mt-2 w-full px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            if (onUpgrade) onUpgrade();
          }}
        >
          Upgrade Skill
        </button>
      )}

      {isLearned && level < maxLevel && canUpgrade && (
        <div className="mt-2 text-xs text-purple-600 font-medium">
          Click to upgrade
        </div>
      )}
    </Card>
  );
}
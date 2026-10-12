import React from 'react';

interface HealthBarProps {
  current: number;
  maximum: number;
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  className?: string;
}

export default function HealthBar({
  current,
  maximum,
  size = 'medium',
  showText = true,
  className = '',
}: HealthBarProps) {
  const percentage = Math.max(0, Math.min((current / maximum) * 100, 100));

  const sizeClasses = {
    small: 'h-2',
    medium: 'h-3',
    large: 'h-4',
  };

  const textSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  };

  const getHealthColor = () => {
    const ratio = current / maximum;
    if (ratio > 0.6) return 'bg-green-500';
    if (ratio > 0.3) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className={`w-full ${className}`}>
      {showText && (
        <div className={`flex justify-between mb-1 ${textSizeClasses[size]} text-gray-700`}>\n          <span>HP</span>\n          <span>{current}/{maximum}</span>\n        </div>\n      )}\n      <div className="w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`rounded-full transition-all duration-300 ${getHealthColor()} ${sizeClasses[size]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
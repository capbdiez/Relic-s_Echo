import React from 'react';

interface StatBarProps {
  label: string;
  value: number;
  maxValue: number;
  color?: 'blue' | 'red' | 'green' | 'yellow' | 'purple';
  size?: 'small' | 'medium' | 'large';
  showValue?: boolean;
  className?: string;
}

export default function StatBar({
  label,
  value,
  maxValue,
  color = 'blue',
  size = 'medium',
  showValue = true,
  className = '',
}: StatBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);

  const colorClasses = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
  };

  const sizeClasses = {
    small: 'h-2',
    medium: 'h-3',
    large: 'h-4',
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700">{label}</span>
        {showValue && (
          <span className="text-gray-600">
            {value}/{maxValue}
          </span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`rounded-full transition-all duration-300 ${colorClasses[color]} ${sizeClasses[size]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
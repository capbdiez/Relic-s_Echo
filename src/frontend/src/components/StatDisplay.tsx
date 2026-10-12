import React from 'react';

interface StatDisplayProps {
  label: string;
  value: number;
  icon?: React.ReactNode;
  color?: 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'gray';
  size?: 'small' | 'medium' | 'large';
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function StatDisplay({
  label,
  value,
  icon,
  color = 'blue',
  size = 'medium',
  prefix = '',
  suffix = '',
  className = '',
}: StatDisplayProps) {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-100',
    red: 'text-red-600 bg-red-100',
    green: 'text-green-600 bg-green-100',
    yellow: 'text-yellow-600 bg-yellow-100',
    purple: 'text-purple-600 bg-purple-100',
    gray: 'text-gray-600 bg-gray-100',
  };

  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-2 text-sm',
    large: 'px-4 py-3 text-base',
  };

  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      {icon && <span className="text-gray-500">{icon}</span>}
      <span className={`font-medium rounded ${sizeClasses[size]} ${colorClasses[color]}`}>\n        {prefix}{value}{suffix}\n      </span>\n      <span className="text-gray-600 text-sm">{label}</span>\n    </div>\n  );\n}
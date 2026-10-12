import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', hover = false, onClick }: CardProps) {
  const baseClasses = 'bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200';
  const hoverClasses = hover ? 'hover:shadow-lg hover:scale-105 cursor-pointer' : '';
  const clickClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${clickClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

Card.Header = function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

Card.Content = function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`px-6 py-4 ${className}`}>\n      {children}\n    </div>\n  );\n};

interface CardFooterProps {\n  children: React.ReactNode;\n  className?: string;\n}\n\nCard.Footer = function CardFooter({ children, className = '' }: CardFooterProps) {\n  return (\n    <div className={`px-6 py-4 border-t border-gray-200 ${className}`}>\n      {children}\n    </div>\n  );\n};
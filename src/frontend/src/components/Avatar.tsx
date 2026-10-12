import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  name: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
}

export default function Avatar({ src, alt, name, size = 'medium', className = '' }: AvatarProps) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    xlarge: 'w-24 h-24',
  };

  const textSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
    xlarge: 'text-xl',
  };

  const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;

  return (
    <div className={`relative inline-block rounded-full overflow-hidden ${sizeClasses[size]} ${className}`}>
      <img
        src={src || fallbackSrc}
        alt={alt || name}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = fallbackSrc;
        }}
      />
    </div>
  );
}
import React from 'react';
import { X } from 'lucide-react';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
  closable?: boolean;
  onClose?: () => void;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  closable = false,
  onClose
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full transition-colors';

  const variants: Record<BadgeVariant, string> = {
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    outline: 'border border-gray-300 text-gray-700 bg-transparent'
  };

  const sizes: Record<BadgeSize, string> = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-sm'
  };

  const classes = [
    baseStyles,
    variants[variant],
    sizes[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classes}>
      {children}
      {closable && (
        <button
          onClick={onClose}
          className="ml-1.5 hover:opacity-70 transition-opacity"
          aria-label="Remove badge"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
};

export default Badge;
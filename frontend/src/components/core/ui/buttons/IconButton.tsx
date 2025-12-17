// components/core/ui/buttons/IconButton.tsx - SIMPLIFIED FIX
import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
  children?: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'outline' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  children,
  variant = 'ghost',
  size = 'md',
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    xs: 'p-1 text-xs',
    sm: 'p-1.5 text-sm',
    md: 'p-2 text-base',
    lg: 'p-3 text-lg'
  };

  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
    outline: 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    success: 'bg-green-600 text-white hover:bg-green-700'
  };

  const renderIcon = () => {
    if (!Icon || loading) return null;
    
    if (typeof Icon === 'function') {
      return <Icon className="h-4 w-4" />;
    }
    
    return Icon;
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center
        rounded-lg font-medium
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
      ) : (
        <>
          {renderIcon()}
          {children && <span className={Icon ? 'ml-2' : ''}>{children}</span>}
        </>
      )}
    </button>
  );
};

export default IconButton;
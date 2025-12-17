import React from 'react';
import { Search, ShoppingCart, AlertCircle, Package, Frown } from 'lucide-react';
import Button from '../ui/buttons/Button';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: 'search' | 'cart' | 'error' | 'package' | 'sad';
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = 'search',
  action,
  secondaryAction,
  className = ''
}) => {
  const icons = {
    search: Search,
    cart: ShoppingCart,
    error: AlertCircle,
    package: Package,
    sad: Frown
  };

  const IconComponent = icons[icon];

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100">
          <IconComponent className="h-10 w-10 text-gray-400" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 max-w-md mb-8">
        {description}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        {action && (
          <Button
            variant="primary"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )}
        
        {secondaryAction && (
          <Button
            variant="outline"
            onClick={secondaryAction.onClick}
          >
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
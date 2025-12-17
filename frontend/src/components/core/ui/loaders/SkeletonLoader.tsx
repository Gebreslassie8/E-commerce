import React from 'react';

interface SkeletonLoaderProps {
  type?: 'product-card' | 'text' | 'image' | 'card' | 'list';
  className?: string;
  lines?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  type = 'text',
  className = '',
  lines = 1
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'product-card':
        return (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-200 rounded flex-1" />
                  <div className="h-8 bg-gray-200 rounded w-8" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'card':
        return (
          <div className="animate-pulse bg-white rounded-lg border border-gray-200 p-4">
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="animate-pulse bg-gray-200 rounded-lg h-full w-full" />
        );

      case 'list':
        return (
          <div className="space-y-3">
            {Array.from({ length: lines }).map((_, i) => (
              <div key={i} className="animate-pulse flex items-center space-x-3">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        );

      default: // text
        return (
          <div className="animate-pulse space-y-2">
            {Array.from({ length: lines }).map((_, i) => (
              <div
                key={i}
                className="h-4 bg-gray-200 rounded"
                style={{ width: i === lines - 1 ? '60%' : '100%' }}
              />
            ))}
          </div>
        );
    }
  };

  return <div className={className}>{renderSkeleton()}</div>;
};

export default SkeletonLoader;
import React, { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number;
}

interface PriceFilterProps {
  priceRanges: PriceRange[];
  selectedRange: string | null;
  onRangeChange: (rangeId: string | null) => void;
  currency?: string;
  layout?: 'vertical' | 'horizontal';
  className?: string;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  priceRanges,
  selectedRange,
  onRangeChange,
  currency = 'ETB',
  layout = 'vertical',
  className = ''
}) => {
  const [customRange, setCustomRange] = useState({ min: '', max: '' });
  const [showCustom, setShowCustom] = useState(false);

  const handleCustomApply = () => {
    const min = parseFloat(customRange.min) || 0;
    const max = parseFloat(customRange.max) || 100000;
    
    if (min <= max) {
      // Create a custom range ID
      const customId = `custom-${min}-${max}`;
      // In a real app, you would add this to priceRanges or handle it differently
      onRangeChange(customId);
      setShowCustom(false);
    }
  };

  if (layout === 'horizontal') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {priceRanges.map((range) => (
          <button
            key={range.id}
            onClick={() => onRangeChange(selectedRange === range.id ? null : range.id)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
              selectedRange === range.id
                ? 'border-primary-500 bg-primary-50 text-primary-600'
                : 'border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="space-y-2">
        {priceRanges.map((range) => (
          <button
            key={range.id}
            onClick={() => onRangeChange(selectedRange === range.id ? null : range.id)}
            className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-lg transition-all ${
              selectedRange === range.id
                ? 'bg-primary-50 text-primary-600 border border-primary-200'
                : 'text-gray-700 hover:bg-gray-50 border border-transparent'
            }`}
          >
            <span>{range.label}</span>
            {selectedRange === range.id && (
              <div className="h-2 w-2 bg-primary-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Custom Price Range */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={() => setShowCustom(!showCustom)}
          className="w-full flex items-center justify-between text-sm text-gray-700 hover:text-gray-900"
        >
          <span>Custom Range</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${showCustom ? 'rotate-180' : ''}`} />
        </button>

        {showCustom && (
          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-1">Min Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {currency}
                  </span>
                  <input
                    type="number"
                    value={customRange.min}
                    onChange={(e) => setCustomRange(prev => ({ ...prev, min: e.target.value }))}
                    placeholder="0"
                    className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-1">Max Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {currency}
                  </span>
                  <input
                    type="number"
                    value={customRange.max}
                    onChange={(e) => setCustomRange(prev => ({ ...prev, max: e.target.value }))}
                    placeholder="100000"
                    className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleCustomApply}
              className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
            >
              Apply Custom Range
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceFilter;
import React, { useState, useEffect } from 'react';
import { Search, X, Clock } from 'lucide-react';
import { useDebounce } from '../../../hooks/useDebounce';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  showRecentSearches?: boolean;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search products...',
  className = '',
  showRecentSearches = false,
  autoFocus = false
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedValue = useDebounce(inputValue, 300);

  // Recent searches from localStorage
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('recent-searches');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Update parent when debounced value changes
  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  // Save search to recent searches
  const saveToRecentSearches = (search: string) => {
    if (!search.trim()) return;

    const updated = [search, ...recentSearches.filter(s => s !== search)].slice(0, 5);
    setRecentSearches(updated);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('recent-searches', JSON.stringify(updated));
    }
  };

  const handleSearch = () => {
    saveToRecentSearches(inputValue.trim());
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setInputValue('');
    onChange('');
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const popularSearches = ['iPhone 15', 'Laptop', 'Headphones', 'Tablet', 'Smart Watch'];

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (inputValue || showRecentSearches) && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
          {inputValue && (
            <>
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm text-gray-600">
                  Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Enter</kbd> to search for "{inputValue}"
                </p>
              </div>
              <button
                onClick={handleSearch}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-2"
              >
                <Search className="h-4 w-4 text-gray-500" />
                <span>Search for "{inputValue}"</span>
              </button>
            </>
          )}

          {showRecentSearches && recentSearches.length > 0 && (
            <div className="border-t border-gray-100">
              <div className="px-4 py-2">
                <p className="text-xs font-medium text-gray-500 uppercase">Recent Searches</p>
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputValue(search);
                    onChange(search);
                    setShowSuggestions(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                >
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>{search}</span>
                </button>
              ))}
            </div>
          )}

          {!inputValue && (
            <div className="border-t border-gray-100">
              <div className="px-4 py-2">
                <p className="text-xs font-medium text-gray-500 uppercase">Popular Searches</p>
              </div>
              <div className="p-2">
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputValue(search);
                        onChange(search);
                        setShowSuggestions(false);
                      }}
                      className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
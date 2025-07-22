import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  placeholder?: string;
  debounceTime?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search updates...',
  debounceTime = 300,
}) => {
  const [localValue, setLocalValue] = useState(value);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Update local value when prop value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Handle input change with debounce
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
    
    // Clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    // Set a new timer
    debounceTimerRef.current = setTimeout(() => {
      onSearch(newValue);
    }, debounceTime);
  };

  // Clear search
  const handleClear = () => {
    setLocalValue('');
    onChange('');
    onSearch('');
  };

  return (
    <div className="relative rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white overflow-hidden border border-gray-200">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <FaSearch className="h-5 w-5 text-blue-500" aria-hidden="true" />
      </div>
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 pr-12 py-3 text-gray-700 bg-white border-0 focus:outline-none"
        placeholder={placeholder}
        style={{ fontSize: '1rem' }}
      />
      {localValue && (
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-400 hover:text-red-500 focus:outline-none transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
            aria-label="Clear search"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
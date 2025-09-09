import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortingControls = ({ 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange, 
  totalResults,
  currentPage,
  totalPages 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortOptions = [
    { 
      value: 'relevance', 
      label: 'Best Match', 
      description: 'AI-powered relevance based on your style',
      icon: 'Target'
    },
    { 
      value: 'popularity', 
      label: 'Most Popular', 
      description: 'Highest rated and most purchased',
      icon: 'TrendingUp'
    },
    { 
      value: 'price-low', 
      label: 'Price: Low to High', 
      description: 'Most affordable first',
      icon: 'ArrowUp'
    },
    { 
      value: 'price-high', 
      label: 'Price: High to Low', 
      description: 'Premium options first',
      icon: 'ArrowDown'
    },
    { 
      value: 'newest', 
      label: 'Newest First', 
      description: 'Latest arrivals and collections',
      icon: 'Clock'
    },
    { 
      value: 'rating', 
      label: 'Highest Rated', 
      description: 'Best customer reviews',
      icon: 'Star'
    },
    { 
      value: 'ar-optimized', 
      label: 'AR Ready', 
      description: 'Best AR experience first',
      icon: 'Cube'
    }
  ];

  const viewModes = [
    { value: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { value: 'list', icon: 'List', label: 'List View' },
    { value: 'masonry', icon: 'LayoutGrid', label: 'Masonry View' }
  ];

  const getCurrentSortOption = () => {
    return sortOptions?.find(option => option?.value === sortBy) || sortOptions?.[0];
  };

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsDropdownOpen(false);
  };

  const formatResultsText = () => {
    const start = (currentPage - 1) * 24 + 1;
    const end = Math.min(currentPage * 24, totalResults);
    return `${start}-${end} of ${totalResults?.toLocaleString()} results`;
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-xl shadow-spatial-sm border border-border p-4">
      {/* Results Info */}
      <div className="flex items-center space-x-4">
        <div className="text-sm text-muted-foreground">
          {formatResultsText()}
        </div>
        
        {/* Quick Stats */}
        <div className="hidden md:flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Cube" size={14} color="var(--color-accent)" />
            <span className="text-accent font-medium">
              {Math.floor(totalResults * 0.73)} AR Ready
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Truck" size={14} color="var(--color-success)" />
            <span className="text-success font-medium">
              {Math.floor(totalResults * 0.45)} Fast Ship
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Leaf" size={14} color="var(--color-warning)" />
            <span className="text-warning font-medium">
              {Math.floor(totalResults * 0.28)} Eco-Friendly
            </span>
          </div>
        </div>
      </div>
      {/* Controls */}
      <div className="flex items-center space-x-3">
        {/* Sort Dropdown */}
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 min-w-[160px] justify-between"
          >
            <div className="flex items-center space-x-2">
              <Icon 
                name={getCurrentSortOption()?.icon} 
                size={16} 
                color="currentColor" 
              />
              <span className="hidden sm:inline">{getCurrentSortOption()?.label}</span>
              <span className="sm:hidden">Sort</span>
            </div>
            <Icon 
              name={isDropdownOpen ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              color="currentColor" 
            />
          </Button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-border rounded-xl shadow-spatial-md z-50">
              <div className="p-2">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">
                  Sort Options
                </div>
                {sortOptions?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => handleSortSelect(option?.value)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg spatial-transition ${
                      sortBy === option?.value
                        ? 'bg-accent text-accent-foreground'
                        : 'text-primary hover:bg-muted'
                    }`}
                  >
                    <Icon 
                      name={option?.icon} 
                      size={18} 
                      color="currentColor" 
                    />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{option?.label}</div>
                      <div className={`text-xs ${
                        sortBy === option?.value 
                          ? 'text-accent-foreground/80' 
                          : 'text-muted-foreground'
                      }`}>
                        {option?.description}
                      </div>
                    </div>
                    {sortBy === option?.value && (
                      <Icon name="Check" size={16} color="currentColor" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-muted rounded-lg p-1">
          {viewModes?.map((mode) => (
            <Button
              key={mode?.value}
              variant={viewMode === mode?.value ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange(mode?.value)}
              className={`px-3 py-2 ${
                viewMode === mode?.value 
                  ? 'bg-white shadow-spatial-sm' 
                  : 'hover:bg-white/50'
              }`}
              title={mode?.label}
            >
              <Icon name={mode?.icon} size={16} color="currentColor" />
            </Button>
          ))}
        </div>

        {/* Additional Actions */}
        <div className="hidden lg:flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Bookmark"
            title="Save Search"
            className="text-muted-foreground hover:text-accent"
          />
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Share2"
            title="Share Results"
            className="text-muted-foreground hover:text-accent"
          />
        </div>
      </div>
      {/* Mobile Actions */}
      <div className="flex lg:hidden items-center space-x-2 w-full sm:w-auto">
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="Bookmark"
          iconPosition="left"
          className="flex-1 sm:flex-none"
        >
          Save Search
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="Share2"
          iconPosition="left"
          className="flex-1 sm:flex-none"
        >
          Share
        </Button>
      </div>
      {/* Dropdown Overlay */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default SortingControls;
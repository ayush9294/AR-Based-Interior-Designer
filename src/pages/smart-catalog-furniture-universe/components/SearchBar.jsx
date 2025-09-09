import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, onVisualSearch, searchQuery, setSearchQuery }) => {
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const fileInputRef = useRef(null);

  const searchSuggestions = [
    { text: 'Modern sectional sofa', category: 'Sofas', trending: true },
    { text: 'Dining table for 6', category: 'Tables', trending: false },
    { text: 'Scandinavian coffee table', category: 'Tables', trending: true },
    { text: 'Industrial bar stools', category: 'Seating', trending: false },
    { text: 'Minimalist bookshelf', category: 'Storage', trending: true },
    { text: 'Accent chairs', category: 'Seating', trending: false },
    { text: 'Floor lamps', category: 'Lighting', trending: true },
    { text: 'Ottoman storage', category: 'Storage', trending: false }
  ];

  const recentSearches = [
    'Mid-century modern sofa',
    'White dining chairs',
    'Wooden coffee table',
    'Floor lamp with shade'
  ];

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    
    if (value?.length > 0) {
      const filtered = searchSuggestions?.filter(suggestion =>
        suggestion?.text?.toLowerCase()?.includes(value?.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (query = searchQuery) => {
    if (query?.trim()) {
      onSearch(query?.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion?.text);
    handleSearch(suggestion?.text);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSearch();
    }
  };

  const handleVisualSearch = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      // Simulate visual search processing
      onVisualSearch(file);
      setIsVisualSearchOpen(false);
    }
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main Search Bar */}
      <div className="relative">
        <div className="relative flex items-center">
          <div className="relative flex-1">
            <Icon 
              name="Search" 
              size={20} 
              color="var(--color-muted-foreground)" 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
            />
            <Input
              type="text"
              placeholder="Search furniture, styles, or upload inspiration photo..."
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              onFocus={() => setShowSuggestions(searchQuery?.length > 0 || recentSearches?.length > 0)}
              className="pl-12 pr-32 h-14 text-lg bg-white border-2 border-border focus:border-accent rounded-xl shadow-spatial-sm"
            />
            
            {/* Search Actions */}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="Camera"
                onClick={() => setIsVisualSearchOpen(true)}
                className="text-muted-foreground hover:text-accent"
                title="Visual Search"
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="Mic"
                className="text-muted-foreground hover:text-accent"
                title="Voice Search"
              />
              <Button
                variant="default"
                size="sm"
                onClick={() => handleSearch()}
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-4"
              >
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Search Suggestions Dropdown */}
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-xl shadow-spatial-md z-50 max-h-96 overflow-y-auto">
            {/* Recent Searches */}
            {searchQuery?.length === 0 && recentSearches?.length > 0 && (
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-primary">Recent Searches</h3>
                  <Button
                    variant="ghost"
                    size="xs"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Clear
                  </Button>
                </div>
                <div className="space-y-2">
                  {recentSearches?.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick({ text: search })}
                      className="flex items-center space-x-3 w-full text-left p-2 rounded-lg hover:bg-muted spatial-transition"
                    >
                      <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
                      <span className="text-sm text-primary">{search}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Suggestions */}
            {suggestions?.length > 0 && (
              <div className="p-4">
                <h3 className="text-sm font-medium text-primary mb-3">Suggestions</h3>
                <div className="space-y-1">
                  {suggestions?.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex items-center justify-between w-full text-left p-2 rounded-lg hover:bg-muted spatial-transition"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name="Search" size={16} color="var(--color-muted-foreground)" />
                        <div>
                          <span className="text-sm text-primary">{suggestion?.text}</span>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-muted-foreground">
                              in {suggestion?.category}
                            </span>
                            {suggestion?.trending && (
                              <span className="px-2 py-0.5 bg-success/10 text-success text-xs rounded-full">
                                Trending
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Icon name="ArrowUpRight" size={16} color="var(--color-muted-foreground)" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Filters */}
            <div className="p-4 border-t border-border">
              <h3 className="text-sm font-medium text-primary mb-3">Quick Filters</h3>
              <div className="flex flex-wrap gap-2">
                {['New Arrivals', 'On Sale', 'AR Ready', 'Fast Shipping', 'Eco-Friendly']?.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => handleSuggestionClick({ text: filter })}
                    className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full hover:bg-accent hover:text-accent-foreground spatial-transition"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Visual Search Modal */}
      {isVisualSearchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-spatial-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Visual Search</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsVisualSearchOpen(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Camera" size={32} color="var(--color-accent)" />
              </div>
              <h4 className="font-medium text-primary mb-2">Upload an inspiration photo</h4>
              <p className="text-sm text-muted-foreground mb-6">
                We'll find similar furniture using AI-powered visual recognition
              </p>
              
              <div className="space-y-3">
                <Button
                  variant="default"
                  fullWidth
                  iconName="Upload"
                  iconPosition="left"
                  onClick={openFileDialog}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Choose Photo
                </Button>
                
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Camera"
                  iconPosition="left"
                  className="border-dashed"
                >
                  Take Photo
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                Supported formats: JPG, PNG, WebP (max 10MB)
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleVisualSearch}
        className="hidden"
      />
      {/* Search Overlay for Mobile */}
      <div className="absolute inset-0 pointer-events-none" onClick={() => setShowSuggestions(false)} />
    </div>
  );
};

export default SearchBar;
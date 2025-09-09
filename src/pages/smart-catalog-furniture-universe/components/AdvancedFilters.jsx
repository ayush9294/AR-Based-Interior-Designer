import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AdvancedFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceRange, setPriceRange] = useState([filters?.minPrice || 0, filters?.maxPrice || 5000]);

  const categories = [
    { id: 'sofas', name: 'Sofas & Sectionals', count: 234 },
    { id: 'chairs', name: 'Chairs & Seating', count: 189 },
    { id: 'tables', name: 'Tables', count: 156 },
    { id: 'storage', name: 'Storage & Organization', count: 98 },
    { id: 'lighting', name: 'Lighting', count: 145 },
    { id: 'decor', name: 'Decor & Accessories', count: 267 },
    { id: 'bedroom', name: 'Bedroom Furniture', count: 123 },
    { id: 'outdoor', name: 'Outdoor Furniture', count: 87 }
  ];

  const styles = [
    { id: 'modern', name: 'Modern', count: 345 },
    { id: 'scandinavian', name: 'Scandinavian', count: 234 },
    { id: 'industrial', name: 'Industrial', count: 156 },
    { id: 'bohemian', name: 'Bohemian', count: 123 },
    { id: 'mid-century', name: 'Mid-Century', count: 189 },
    { id: 'traditional', name: 'Traditional', count: 98 }
  ];

  const colors = [
    { id: 'white', name: 'White', hex: '#FFFFFF', count: 234 },
    { id: 'black', name: 'Black', hex: '#000000', count: 189 },
    { id: 'gray', name: 'Gray', hex: '#6B7280', count: 156 },
    { id: 'brown', name: 'Brown', hex: '#92400E', count: 123 },
    { id: 'blue', name: 'Blue', hex: '#1E40AF', count: 98 },
    { id: 'green', name: 'Green', hex: '#059669', count: 87 },
    { id: 'beige', name: 'Beige', hex: '#D2B48C', count: 76 },
    { id: 'navy', name: 'Navy', hex: '#1E3A8A', count: 65 }
  ];

  const materials = [
    { id: 'wood', name: 'Wood', count: 345 },
    { id: 'metal', name: 'Metal', count: 234 },
    { id: 'fabric', name: 'Fabric', count: 189 },
    { id: 'leather', name: 'Leather', count: 156 },
    { id: 'glass', name: 'Glass', count: 123 },
    { id: 'plastic', name: 'Plastic', count: 98 }
  ];

  const brands = [
    { id: 'west-elm', name: 'West Elm', count: 89 },
    { id: 'cb2', name: 'CB2', count: 76 },
    { id: 'ikea', name: 'IKEA', count: 234 },
    { id: 'pottery-barn', name: 'Pottery Barn', count: 65 },
    { id: 'crate-barrel', name: 'Crate & Barrel', count: 54 },
    { id: 'wayfair', name: 'Wayfair', count: 123 }
  ];

  const specialFeatures = [
    { id: 'ar-optimized', name: 'AR Optimized', description: 'High-quality 3D models', count: 456 },
    { id: 'fits-space', name: 'Fits My Space', description: 'Based on your room dimensions', count: 234 },
    { id: 'style-match', name: 'Style DNA Match', description: 'Matches your design preferences', count: 189 },
    { id: 'eco-friendly', name: 'Eco-Friendly', description: 'Sustainable materials', count: 123 },
    { id: 'fast-shipping', name: 'Fast Shipping', description: '2-day delivery available', count: 345 },
    { id: 'customizable', name: 'Customizable', description: 'Multiple material options', count: 267 }
  ];

  const handleFilterChange = (filterType, value, checked) => {
    const currentValues = filters?.[filterType] || [];
    let newValues;
    
    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues?.filter(v => v !== value);
    }
    
    onFiltersChange({
      ...filters,
      [filterType]: newValues
    });
  };

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value) || 0;
    setPriceRange(newRange);
    
    onFiltersChange({
      ...filters,
      minPrice: newRange?.[0],
      maxPrice: newRange?.[1]
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    Object.keys(filters)?.forEach(key => {
      if (Array.isArray(filters?.[key])) {
        count += filters?.[key]?.length;
      } else if (filters?.[key] && key !== 'minPrice' && key !== 'maxPrice') {
        count += 1;
      }
    });
    if (filters?.minPrice > 0 || filters?.maxPrice < 5000) count += 1;
    return count;
  };

  const FilterSection = ({ title, children, defaultExpanded = false }) => {
    const [sectionExpanded, setSectionExpanded] = useState(defaultExpanded);
    
    return (
      <div className="border-b border-border pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
        <button
          onClick={() => setSectionExpanded(!sectionExpanded)}
          className="flex items-center justify-between w-full text-left mb-3 hover:text-accent spatial-transition"
        >
          <h3 className="font-medium text-primary">{title}</h3>
          <Icon 
            name={sectionExpanded ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            color="currentColor" 
          />
        </button>
        {sectionExpanded && children}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-spatial-sm border border-border">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
          <h2 className="font-semibold text-primary">Filters</h2>
          {getActiveFilterCount() > 0 && (
            <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-primary"
            >
              Clear all
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden"
          >
            <Icon name={isExpanded ? "X" : "SlidersHorizontal"} size={16} />
          </Button>
        </div>
      </div>
      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <div className="p-4 space-y-6 max-h-96 lg:max-h-none overflow-y-auto">
          {/* Special Features */}
          <FilterSection title="Smart Features" defaultExpanded={true}>
            <div className="space-y-3">
              {specialFeatures?.map((feature) => (
                <div key={feature?.id} className="flex items-start space-x-3">
                  <Checkbox
                    checked={filters?.specialFeatures?.includes(feature?.id) || false}
                    onChange={(e) => handleFilterChange('specialFeatures', feature?.id, e?.target?.checked)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-primary cursor-pointer">
                        {feature?.name}
                      </label>
                      <span className="text-xs text-muted-foreground">
                        {feature?.count}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {feature?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Price Range */}
          <FilterSection title="Price Range">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange?.[0]}
                    onChange={(e) => handlePriceChange(0, e?.target?.value)}
                    className="text-sm"
                  />
                </div>
                <span className="text-muted-foreground">to</span>
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange?.[1]}
                    onChange={(e) => handlePriceChange(1, e?.target?.value)}
                    className="text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$0</span>
                <span>$5,000+</span>
              </div>
            </div>
          </FilterSection>

          {/* Categories */}
          <FilterSection title="Categories">
            <div className="space-y-2">
              {categories?.map((category) => (
                <div key={category?.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={filters?.categories?.includes(category?.id) || false}
                      onChange={(e) => handleFilterChange('categories', category?.id, e?.target?.checked)}
                    />
                    <label className="text-sm text-primary cursor-pointer">
                      {category?.name}
                    </label>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {category?.count}
                  </span>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Styles */}
          <FilterSection title="Design Styles">
            <div className="space-y-2">
              {styles?.map((style) => (
                <div key={style?.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={filters?.styles?.includes(style?.id) || false}
                      onChange={(e) => handleFilterChange('styles', style?.id, e?.target?.checked)}
                    />
                    <label className="text-sm text-primary cursor-pointer">
                      {style?.name}
                    </label>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {style?.count}
                  </span>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Colors */}
          <FilterSection title="Colors">
            <div className="grid grid-cols-4 gap-3">
              {colors?.map((color) => (
                <div key={color?.id} className="text-center">
                  <div
                    className={`w-8 h-8 rounded-full border-2 mx-auto mb-1 cursor-pointer spatial-transition hover:scale-110 ${
                      filters?.colors?.includes(color?.id) 
                        ? 'border-accent ring-2 ring-accent/30' :'border-border hover:border-accent/50'
                    }`}
                    style={{ backgroundColor: color?.hex }}
                    onClick={() => handleFilterChange('colors', color?.id, !filters?.colors?.includes(color?.id))}
                  />
                  <span className="text-xs text-muted-foreground">
                    {color?.name}
                  </span>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Materials */}
          <FilterSection title="Materials">
            <div className="space-y-2">
              {materials?.map((material) => (
                <div key={material?.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={filters?.materials?.includes(material?.id) || false}
                      onChange={(e) => handleFilterChange('materials', material?.id, e?.target?.checked)}
                    />
                    <label className="text-sm text-primary cursor-pointer">
                      {material?.name}
                    </label>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {material?.count}
                  </span>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Brands */}
          <FilterSection title="Brands">
            <div className="space-y-2">
              {brands?.map((brand) => (
                <div key={brand?.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={filters?.brands?.includes(brand?.id) || false}
                      onChange={(e) => handleFilterChange('brands', brand?.id, e?.target?.checked)}
                    />
                    <label className="text-sm text-primary cursor-pointer">
                      {brand?.name}
                    </label>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {brand?.count}
                  </span>
                </div>
              ))}
            </div>
          </FilterSection>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;
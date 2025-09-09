import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SpatialWishlist = ({ wishlistItems, onAddToCart, onRemoveFromWishlist, onViewInAR }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');

  const sortOptions = [
    { value: 'recent', label: 'Recently Added' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name A-Z' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Items', count: wishlistItems?.length },
    { value: 'on-sale', label: 'On Sale', count: wishlistItems?.filter(item => item?.onSale)?.length },
    { value: 'in-stock', label: 'In Stock', count: wishlistItems?.filter(item => item?.inStock)?.length },
    { value: 'ar-ready', label: 'AR Ready', count: wishlistItems?.filter(item => item?.arReady)?.length }
  ];

  const getSortedAndFilteredItems = () => {
    let filtered = wishlistItems;

    // Apply filters
    if (filterBy !== 'all') {
      filtered = filtered?.filter(item => {
        switch (filterBy) {
          case 'on-sale':
            return item?.onSale;
          case 'in-stock':
            return item?.inStock;
          case 'ar-ready':
            return item?.arReady;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a?.price - b?.price;
        case 'price-high':
          return b?.price - a?.price;
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'recent':
        default:
          return new Date(b.addedDate) - new Date(a.addedDate);
      }
    });

    return filtered;
  };

  const filteredItems = getSortedAndFilteredItems();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-xl border border-border shadow-spatial-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="Heart" size={20} color="var(--color-error)" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Spatial Wishlist</h2>
              <p className="text-sm text-muted-foreground">
                {wishlistItems?.length} saved items • {filteredItems?.length} showing
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              iconName="Grid3X3"
            />
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              iconName="List"
            />
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Filters */}
          <div className="flex items-center space-x-2 overflow-x-auto">
            {filterOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => setFilterBy(option?.value)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap spatial-transition ${
                  filterBy === option?.value
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-surface text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <span className="text-sm font-medium">{option?.label}</span>
                <span className="text-xs bg-current/20 px-1.5 py-0.5 rounded-full">
                  {option?.count}
                </span>
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <Icon name="ArrowUpDown" size={16} color="var(--color-muted-foreground)" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {sortOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Wishlist Items */}
      {filteredItems?.length === 0 ? (
        <div className="bg-card rounded-xl border border-border shadow-spatial-sm p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Heart" size={24} color="var(--color-muted-foreground)" strokeWidth={1.5} />
          </div>
          <h3 className="font-semibold text-lg mb-2">No items found</h3>
          <p className="text-muted-foreground mb-6">
            {filterBy === 'all' 
              ? "Start adding furniture to your wishlist to see them here" :"No items match your current filter"
            }
          </p>
          <Button
            variant="outline"
            iconName="Plus"
            iconPosition="left"
          >
            Browse Furniture
          </Button>
        </div>
      ) : (
        <div className={`grid gap-6 ${
          viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :'grid-cols-1'
        }`}>
          {filteredItems?.map((item) => (
            <div
              key={item?.id}
              className={`group bg-card rounded-xl border border-border shadow-spatial-sm overflow-hidden spatial-transition hover:shadow-spatial-md ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Item Image */}
              <div className={`relative overflow-hidden bg-muted ${
                viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'w-full h-48'
              }`}>
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover group-hover:scale-105 spatial-transition"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col space-y-1">
                  {item?.onSale && (
                    <div className="bg-error text-error-foreground px-2 py-1 rounded-md text-xs font-medium">
                      Sale
                    </div>
                  )}
                  {item?.arReady && (
                    <div className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center space-x-1">
                      <Icon name="Cube" size={10} color="currentColor" />
                      <span>AR</span>
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 spatial-transition">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => onRemoveFromWishlist(item?.id)}
                    iconName="X"
                    className="w-8 h-8 bg-background/80 backdrop-blur-sm"
                  />
                </div>

                {/* AR Preview Button */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 spatial-transition">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onViewInAR(item)}
                    iconName="Eye"
                    className="bg-background/80 backdrop-blur-sm"
                  >
                    AR View
                  </Button>
                </div>
              </div>

              {/* Item Details */}
              <div className="p-4 flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1 line-clamp-2">{item?.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{item?.category}</p>
                  </div>
                  <div className="text-right ml-3">
                    <div className="font-semibold text-sm">
                      ${item?.price?.toLocaleString()}
                    </div>
                    {item?.originalPrice && (
                      <div className="text-xs text-muted-foreground line-through">
                        ${item?.originalPrice?.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Spatial Info */}
                {item?.spatialInfo && (
                  <div className="mb-3 p-2 bg-surface rounded-lg">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Icon name="MapPin" size={12} color="currentColor" />
                      <span>Saved for {item?.spatialInfo?.room}</span>
                      <span>•</span>
                      <span>{item?.spatialInfo?.dimensions}</span>
                    </div>
                  </div>
                )}

                {/* Stock Status */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className={`w-2 h-2 rounded-full ${
                    item?.inStock ? 'bg-success' : 'bg-error'
                  }`} />
                  <span className={`text-xs font-medium ${
                    item?.inStock ? 'text-success' : 'text-error'
                  }`}>
                    {item?.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                  {item?.estimatedRestock && !item?.inStock && (
                    <>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        Back {item?.estimatedRestock}
                      </span>
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onAddToCart(item)}
                    disabled={!item?.inStock}
                    iconName="ShoppingCart"
                    iconPosition="left"
                    className="flex-1 bg-accent hover:bg-accent/90"
                  >
                    Add to Cart
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewInAR(item)}
                    iconName="Camera"
                    className="px-3"
                  />
                </div>

                {/* Added Date */}
                <div className="mt-2 text-xs text-muted-foreground">
                  Added {new Date(item.addedDate)?.toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Bulk Actions */}
      {filteredItems?.length > 0 && (
        <div className="bg-card rounded-xl border border-border shadow-spatial-sm p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {filteredItems?.length} items selected
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="ShoppingCart"
                iconPosition="left"
              >
                Add All to Cart
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Share"
                iconPosition="left"
              >
                Share Wishlist
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpatialWishlist;
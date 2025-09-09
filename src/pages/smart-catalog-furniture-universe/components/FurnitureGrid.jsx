import React, { useState, useEffect } from 'react';
import FurnitureCard from './FurnitureCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FurnitureGrid = ({ 
  furniture, 
  viewMode, 
  loading, 
  onTryAR, 
  onAddToCart, 
  onViewDetails,
  onLoadMore,
  hasMore 
}) => {
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    await onLoadMore();
    setLoadingMore(false);
  };

  const getGridClasses = () => {
    switch (viewMode) {
      case 'list':
        return 'grid grid-cols-1 gap-4';
      case 'masonry':
        return 'masonry-grid';
      case 'grid':
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';
    }
  };

  const LoadingSkeleton = () => (
    <div className="bg-white rounded-xl shadow-spatial-sm border border-border overflow-hidden">
      <div className="aspect-square bg-muted loading-shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded loading-shimmer" />
        <div className="h-4 bg-muted rounded w-3/4 loading-shimmer" />
        <div className="flex justify-between items-center">
          <div className="h-6 bg-muted rounded w-20 loading-shimmer" />
          <div className="h-4 bg-muted rounded w-16 loading-shimmer" />
        </div>
        <div className="flex space-x-2">
          <div className="h-9 bg-muted rounded flex-1 loading-shimmer" />
          <div className="h-9 bg-muted rounded flex-1 loading-shimmer" />
        </div>
      </div>
    </div>
  );

  if (loading && furniture?.length === 0) {
    return (
      <div className={getGridClasses()}>
        {[...Array(12)]?.map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (furniture?.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Search" size={48} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="text-xl font-semibold text-primary mb-2">No furniture found</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          We couldn't find any furniture matching your current filters. Try adjusting your search criteria or browse our popular categories.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Button
            variant="outline"
            iconName="RotateCcw"
            iconPosition="left"
          >
            Clear Filters
          </Button>
          <Button
            variant="default"
            iconName="Compass"
            iconPosition="left"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Browse Categories
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Grid Container */}
      <div className={getGridClasses()}>
        {furniture?.map((item, index) => (
          <div 
            key={item?.id} 
            className={viewMode === 'masonry' ? 'masonry-item' : ''}
            style={{
              animationDelay: `${index * 50}ms`
            }}
          >
            <FurnitureCard
              furniture={item}
              onTryAR={onTryAR}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          </div>
        ))}
        
        {/* Loading More Skeletons */}
        {loadingMore && (
          <>
            {[...Array(8)]?.map((_, index) => (
              <LoadingSkeleton key={`loading-${index}`} />
            ))}
          </>
        )}
      </div>
      {/* Load More Section */}
      {hasMore && (
        <div className="text-center py-8">
          <Button
            variant="outline"
            size="lg"
            loading={loadingMore}
            onClick={handleLoadMore}
            iconName="ChevronDown"
            iconPosition="left"
            className="px-8"
          >
            {loadingMore ? 'Loading more furniture...' : 'Load More Furniture'}
          </Button>
          
          <p className="text-sm text-muted-foreground mt-3">
            Showing {furniture?.length} of 2,847 total results
          </p>
        </div>
      )}
      {/* End of Results */}
      {!hasMore && furniture?.length > 0 && (
        <div className="text-center py-8 border-t border-border">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} color="var(--color-success)" />
          </div>
          <h3 className="font-semibold text-primary mb-2">You've seen it all!</h3>
          <p className="text-muted-foreground mb-4">
            You've browsed through all {furniture?.length} furniture pieces matching your criteria.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button
              variant="outline"
              iconName="RefreshCw"
              iconPosition="left"
            >
              Refine Search
            </Button>
            <Button
              variant="default"
              iconName="Sparkles"
              iconPosition="left"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Get AI Suggestions
            </Button>
          </div>
        </div>
      )}
      {/* Quick Actions Bar */}
      <div className="sticky bottom-4 left-1/2 transform -translate-x-1/2 z-40 w-fit">
        <div className="bg-white/95 backdrop-blur-md border border-border rounded-full shadow-spatial-lg px-4 py-2">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              iconName="ArrowUp"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-muted-foreground hover:text-primary"
              title="Back to top"
            />
            
            <div className="w-px h-6 bg-border" />
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Filter"
              className="text-muted-foreground hover:text-primary"
              title="Adjust filters"
            />
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Heart"
              className="text-muted-foreground hover:text-primary"
              title="View saved items"
            />
            
            <div className="w-px h-6 bg-border" />
            
            <Button
              variant="default"
              size="sm"
              iconName="Camera"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-4"
              title="Try AR Camera"
            >
              AR Camera
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FurnitureGrid;
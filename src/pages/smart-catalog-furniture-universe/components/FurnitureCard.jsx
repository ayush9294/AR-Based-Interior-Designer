import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FurnitureCard = ({ furniture, onTryAR, onAddToCart, onViewDetails }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading3D, setIsLoading3D] = useState(false);

  const handleTryAR = () => {
    setIsLoading3D(true);
    setTimeout(() => {
      setIsLoading3D(false);
      onTryAR(furniture);
    }, 1500);
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === furniture?.images?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? furniture?.images?.length - 1 : prev - 1
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(price);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-spatial-sm border border-border overflow-hidden spatial-transition hover:shadow-spatial-md confidence-scale group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden bg-surface">
        <Image
          src={furniture?.images?.[currentImageIndex]}
          alt={furniture?.name}
          className="w-full h-full object-cover spatial-transition group-hover:scale-105"
        />
        
        {/* Image Navigation */}
        {furniture?.images?.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-spatial-sm opacity-0 group-hover:opacity-100 spatial-transition"
            >
              <Icon name="ChevronLeft" size={16} color="var(--color-primary)" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-spatial-sm opacity-0 group-hover:opacity-100 spatial-transition"
            >
              <Icon name="ChevronRight" size={16} color="var(--color-primary)" />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {furniture?.images?.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {furniture?.images?.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full spatial-transition ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Quick Actions Overlay */}
        <div className={`absolute top-3 right-3 flex flex-col space-y-2 spatial-transition ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-spatial-sm hover:bg-white spatial-transition">
            <Icon name="Heart" size={18} color="var(--color-primary)" />
          </button>
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-spatial-sm hover:bg-white spatial-transition">
            <Icon name="Share2" size={18} color="var(--color-primary)" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {furniture?.isNew && (
            <span className="px-2 py-1 bg-success text-success-foreground text-xs font-medium rounded-full">
              New
            </span>
          )}
          {furniture?.discount && (
            <span className="px-2 py-1 bg-error text-error-foreground text-xs font-medium rounded-full">
              -{furniture?.discount}%
            </span>
          )}
          {furniture?.arOptimized && (
            <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full flex items-center space-x-1">
              <Icon name="Cube" size={12} color="currentColor" />
              <span>AR Ready</span>
            </span>
          )}
        </div>
      </div>
      {/* Content Section */}
      <div className="p-4">
        {/* Brand & Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-accent uppercase tracking-wider">
            {furniture?.brand}
          </span>
          <span className="text-xs text-muted-foreground">
            {furniture?.category}
          </span>
        </div>

        {/* Name & Description */}
        <h3 
          className="font-semibold text-primary mb-2 line-clamp-2 cursor-pointer hover:text-accent spatial-transition"
          onClick={() => onViewDetails(furniture)}
        >
          {furniture?.name}
        </h3>
        
        {/* Dimensions */}
        <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Ruler" size={14} color="currentColor" />
            <span>{furniture?.dimensions}</span>
          </div>
          {furniture?.roomCompatibility && (
            <div className="flex items-center space-x-1">
              <Icon name="CheckCircle" size={14} color="var(--color-success)" />
              <span className="text-success text-xs">Fits your space</span>
            </div>
          )}
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={14}
                color={i < Math.floor(furniture?.rating) ? "var(--color-warning)" : "var(--color-border)"}
                className={i < Math.floor(furniture?.rating) ? "fill-current" : ""}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-primary">{furniture?.rating}</span>
          <span className="text-sm text-muted-foreground">({furniture?.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {furniture?.originalPrice && furniture?.originalPrice > furniture?.price && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(furniture?.originalPrice)}
              </span>
            )}
            <span className="text-lg font-bold text-primary">
              {formatPrice(furniture?.price)}
            </span>
          </div>
          {furniture?.financing && (
            <span className="text-xs text-accent">
              or {formatPrice(furniture?.financing?.monthlyPayment)}/mo
            </span>
          )}
        </div>

        {/* Material Options */}
        {furniture?.materials && furniture?.materials?.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">Available in:</p>
            <div className="flex space-x-2">
              {furniture?.materials?.slice(0, 4)?.map((material, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full border-2 border-border"
                  style={{ backgroundColor: material?.color }}
                  title={material?.name}
                />
              ))}
              {furniture?.materials?.length > 4 && (
                <div className="w-6 h-6 rounded-full border-2 border-border bg-muted flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">+{furniture?.materials?.length - 4}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Cube"
            iconPosition="left"
            loading={isLoading3D}
            onClick={handleTryAR}
            className="flex-1"
          >
            {isLoading3D ? 'Loading 3D...' : 'Try in AR'}
          </Button>
          
          <Button
            variant="default"
            size="sm"
            fullWidth
            iconName="ShoppingCart"
            iconPosition="left"
            onClick={() => onAddToCart(furniture)}
            className="flex-1 bg-cta hover:bg-cta/90 text-cta-foreground"
          >
            Add to Cart
          </Button>
        </div>

        {/* Social Proof */}
        {furniture?.userPhotos && furniture?.userPhotos?.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {furniture?.userPhotos?.slice(0, 3)?.map((photo, index) => (
                    <Image
                      key={index}
                      src={photo?.userAvatar}
                      alt={`User ${index + 1}`}
                      className="w-6 h-6 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {furniture?.userPhotos?.length} customer photos
                </span>
              </div>
              <Button
                variant="ghost"
                size="xs"
                iconName="ExternalLink"
                iconPosition="right"
                className="text-accent hover:text-accent/80"
              >
                View all
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FurnitureCard;
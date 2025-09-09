import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CompleteTheLookSection = ({ selectedFurniture, onAddToCart, onTryARSet }) => {
  const [selectedSet, setSelectedSet] = useState(0);

  const furnitureSets = [
    {
      id: 'modern-living-set',
      name: 'Modern Living Room Complete Set',
      description: 'Curated by professional designers for perfect harmony',
      totalPrice: 2847,
      originalPrice: 3299,
      savings: 452,
      confidence: 96,
      items: [
        {
          id: 'sofa-1',
          name: 'Modular Sectional Sofa',
          price: 1299,
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
          isMain: true
        },
        {
          id: 'coffee-table-1',
          name: 'Glass Coffee Table',
          price: 449,
          image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400'
        },
        {
          id: 'accent-chair-1',
          name: 'Velvet Accent Chair',
          price: 599,
          image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400'
        },
        {
          id: 'side-table-1',
          name: 'Marble Side Table',
          price: 299,
          image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400'
        },
        {
          id: 'floor-lamp-1',
          name: 'Arc Floor Lamp',
          price: 201,
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
        }
      ],
      roomType: 'Living Room',
      style: 'Modern Minimalist',
      designerNote: `This set creates a sophisticated focal point with clean lines and neutral tones. The modular sofa provides flexibility while the glass coffee table maintains visual lightness.`
    },
    {
      id: 'scandinavian-cozy-set',
      name: 'Scandinavian Cozy Corner',
      description: 'Hygge-inspired comfort with natural materials',
      totalPrice: 1899,
      originalPrice: 2199,
      savings: 300,
      confidence: 92,
      items: [
        {
          id: 'sofa-2',
          name: 'Linen Loveseat',
          price: 899,
          image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
          isMain: true
        },
        {
          id: 'ottoman-1',
          name: 'Woven Storage Ottoman',
          price: 199,
          image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400'
        },
        {
          id: 'bookshelf-1',
          name: 'Oak Ladder Bookshelf',
          price: 399,
          image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400'
        },
        {
          id: 'throw-blanket-1',
          name: 'Chunky Knit Throw',
          price: 89,
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
        },
        {
          id: 'plant-stand-1',
          name: 'Wooden Plant Stand',
          price: 129,
          image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400'
        },
        {
          id: 'pendant-light-1',
          name: 'Rattan Pendant Light',
          price: 184,
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'
        }
      ],
      roomType: 'Living Room',
      style: 'Scandinavian',
      designerNote: `Natural textures and warm woods create an inviting atmosphere perfect for relaxation. The neutral palette allows for seasonal accent changes.`
    },
    {
      id: 'industrial-loft-set',
      name: 'Industrial Loft Collection',
      description: 'Urban edge with raw materials and bold statements',
      totalPrice: 3299,
      originalPrice: 3799,
      savings: 500,
      confidence: 89,
      items: [
        {
          id: 'sofa-3',
          name: 'Leather Chesterfield Sofa',
          price: 1599,
          image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
          isMain: true
        },
        {
          id: 'coffee-table-2',
          name: 'Industrial Metal Coffee Table',
          price: 599,
          image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400'
        },
        {
          id: 'bar-cart-1',
          name: 'Rolling Bar Cart',
          price: 349,
          image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400'
        },
        {
          id: 'floor-lamp-2',
          name: 'Tripod Floor Lamp',
          price: 299,
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
        },
        {
          id: 'wall-art-1',
          name: 'Abstract Metal Wall Art',
          price: 199,
          image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400'
        },
        {
          id: 'area-rug-1',
          name: 'Vintage Distressed Rug',
          price: 254,
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'
        }
      ],
      roomType: 'Living Room',
      style: 'Industrial',
      designerNote: `Bold materials and statement pieces create a sophisticated urban vibe. The rich leather and metal accents add character and durability.`
    }
  ];

  const currentSet = furnitureSets?.[selectedSet];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(price);
  };

  const handleAddSetToCart = () => {
    currentSet?.items?.forEach(item => {
      onAddToCart(item);
    });
  };

  const handleTrySetInAR = () => {
    onTryARSet(currentSet);
  };

  return (
    <div className="bg-white rounded-xl shadow-spatial-sm border border-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">Complete the Look</h2>
          <p className="text-sm text-muted-foreground">
            Professional designer curations that work perfectly together
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Sparkles" size={20} color="var(--color-accent)" />
          <span className="text-sm font-medium text-accent">AI Curated</span>
        </div>
      </div>
      {/* Set Navigation */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {furnitureSets?.map((set, index) => (
          <button
            key={set?.id}
            onClick={() => setSelectedSet(index)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium spatial-transition ${
              selectedSet === index
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent'
            }`}
          >
            {set?.style}
          </button>
        ))}
      </div>
      {/* Current Set Display */}
      <div className="space-y-6">
        {/* Set Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-primary">{currentSet?.name}</h3>
              <div className="flex items-center space-x-1 px-2 py-1 bg-success/10 text-success rounded-full">
                <Icon name="Target" size={14} color="currentColor" />
                <span className="text-xs font-medium">{currentSet?.confidence}% match</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{currentSet?.description}</p>
            
            {/* Designer Note */}
            <div className="bg-accent/5 rounded-lg p-4 border-l-4 border-accent">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="User" size={16} color="var(--color-accent)" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-primary mb-1">Designer's Note</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {currentSet?.designerNote}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="text-right lg:text-left lg:min-w-[200px]">
            <div className="flex items-center justify-end lg:justify-start space-x-2 mb-2">
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(currentSet?.originalPrice)}
              </span>
              <span className="text-2xl font-bold text-primary">
                {formatPrice(currentSet?.totalPrice)}
              </span>
            </div>
            <div className="flex items-center justify-end lg:justify-start space-x-2 mb-4">
              <Icon name="TrendingDown" size={16} color="var(--color-success)" />
              <span className="text-sm font-medium text-success">
                Save {formatPrice(currentSet?.savings)}
              </span>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col space-y-2">
              <Button
                variant="default"
                fullWidth
                iconName="ShoppingCart"
                iconPosition="left"
                onClick={handleAddSetToCart}
                className="bg-cta hover:bg-cta/90 text-cta-foreground"
              >
                Add Complete Set
              </Button>
              <Button
                variant="outline"
                fullWidth
                iconName="Cube"
                iconPosition="left"
                onClick={handleTrySetInAR}
              >
                Try Set in AR
              </Button>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {currentSet?.items?.map((item, index) => (
            <div
              key={item?.id}
              className={`relative bg-surface rounded-lg overflow-hidden spatial-transition hover:shadow-spatial-sm confidence-scale ${
                item?.isMain ? 'ring-2 ring-accent' : ''
              }`}
            >
              {/* Item Image */}
              <div className="aspect-square overflow-hidden">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Item Info */}
              <div className="p-3">
                <h4 className="font-medium text-primary text-sm mb-1 line-clamp-2">
                  {item?.name}
                </h4>
                <p className="text-sm font-semibold text-accent">
                  {formatPrice(item?.price)}
                </p>
              </div>

              {/* Main Item Badge */}
              {item?.isMain && (
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                    Main
                  </span>
                </div>
              )}

              {/* Quick Actions */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 spatial-transition">
                <div className="flex flex-col space-y-1">
                  <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-spatial-sm hover:bg-white spatial-transition">
                    <Icon name="Eye" size={14} color="var(--color-primary)" />
                  </button>
                  <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-spatial-sm hover:bg-white spatial-transition">
                    <Icon name="Heart" size={14} color="var(--color-primary)" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Set Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name="Truck" size={20} color="var(--color-success)" />
            </div>
            <div>
              <h4 className="font-medium text-primary text-sm">Free Delivery</h4>
              <p className="text-xs text-muted-foreground">On complete sets over $2,000</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
              <Icon name="Cube" size={20} color="var(--color-accent)" />
            </div>
            <div>
              <h4 className="font-medium text-primary text-sm">AR Preview</h4>
              <p className="text-xs text-muted-foreground">See the complete look in your space</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
              <Icon name="RotateCcw" size={20} color="var(--color-warning)" />
            </div>
            <div>
              <h4 className="font-medium text-primary text-sm">Easy Returns</h4>
              <p className="text-xs text-muted-foreground">30-day return policy on all items</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteTheLookSection;
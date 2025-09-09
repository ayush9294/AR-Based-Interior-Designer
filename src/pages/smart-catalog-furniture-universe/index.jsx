import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import StyleMatchingSystem from './components/StyleMatchingSystem';
import SearchBar from './components/SearchBar';
import AdvancedFilters from './components/AdvancedFilters';
import SortingControls from './components/SortingControls';
import FurnitureGrid from './components/FurnitureGrid';
import CompleteTheLookSection from './components/CompleteTheLookSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SmartCatalogFurnitureUniverse = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('modern-minimalist');
  const [filters, setFilters] = useState({
    categories: [],
    styles: [],
    colors: [],
    materials: [],
    brands: [],
    specialFeatures: ['ar-optimized'],
    minPrice: 0,
    maxPrice: 5000
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(false);
  const [furniture, setFurniture] = useState([]);
  const [totalResults, setTotalResults] = useState(2847);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Mock furniture data
  const mockFurniture = [
    {
      id: 'sofa-modern-sectional-001',
      name: 'Modular Sectional Sofa with Chaise',
      brand: 'West Elm',
      category: 'Sofas',
      price: 1299,
      originalPrice: 1599,
      discount: 19,
      rating: 4.8,
      reviewCount: 234,
      dimensions: `108"W × 68"D × 32"H`,
      images: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
        'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800'
      ],
      materials: [
        { name: 'Charcoal Gray', color: '#4A5568' },
        { name: 'Cream White', color: '#F7FAFC' },
        { name: 'Navy Blue', color: '#2D3748' },
        { name: 'Sage Green', color: '#68D391' }
      ],
      isNew: true,
      arOptimized: true,
      roomCompatibility: true,
      financing: { monthlyPayment: 108 },
      userPhotos: [
        { userAvatar: 'https://randomuser.me/api/portraits/women/32.jpg' },
        { userAvatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
        { userAvatar: 'https://randomuser.me/api/portraits/women/67.jpg' }
      ]
    },
    {
      id: 'chair-accent-velvet-002',
      name: 'Velvet Swivel Accent Chair',
      brand: 'CB2',
      category: 'Chairs',
      price: 599,
      originalPrice: null,
      discount: null,
      rating: 4.6,
      reviewCount: 156,
      dimensions: `32"W × 34"D × 31"H`,
      images: [
        'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'
      ],
      materials: [
        { name: 'Emerald Green', color: '#059669' },
        { name: 'Dusty Rose', color: '#F687B3' },
        { name: 'Navy Blue', color: '#2D3748' }
      ],
      isNew: false,
      arOptimized: true,
      roomCompatibility: true,
      financing: { monthlyPayment: 50 },
      userPhotos: [
        { userAvatar: 'https://randomuser.me/api/portraits/women/23.jpg' },
        { userAvatar: 'https://randomuser.me/api/portraits/men/34.jpg' }
      ]
    },
    {
      id: 'table-coffee-glass-003',
      name: 'Tempered Glass Coffee Table',
      brand: 'IKEA',
      category: 'Tables',
      price: 449,
      originalPrice: 529,
      discount: 15,
      rating: 4.4,
      reviewCount: 89,
      dimensions: `47"W × 24"D × 16"H`,
      images: [
        'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800',
        'https://images.unsplash.com/photo-1549497538-303791108f95?w=800'
      ],
      materials: [
        { name: 'Clear Glass', color: '#E2E8F0' },
        { name: 'Black Frame', color: '#1A202C' }
      ],
      isNew: false,
      arOptimized: true,
      roomCompatibility: false,
      financing: { monthlyPayment: 37 },
      userPhotos: [
        { userAvatar: 'https://randomuser.me/api/portraits/women/45.jpg' }
      ]
    },
    {
      id: 'storage-bookshelf-oak-004',
      name: 'Solid Oak Ladder Bookshelf',
      brand: 'Pottery Barn',
      category: 'Storage',
      price: 399,
      originalPrice: null,
      discount: null,
      rating: 4.9,
      reviewCount: 312,
      dimensions: `24"W × 16"D × 72"H`,
      images: [
        'https://images.unsplash.com/photo-1549497538-303791108f95?w=800',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'
      ],
      materials: [
        { name: 'Natural Oak', color: '#D2B48C' },
        { name: 'Walnut Stain', color: '#8B4513' }
      ],
      isNew: true,
      arOptimized: true,
      roomCompatibility: true,
      financing: { monthlyPayment: 33 },
      userPhotos: [
        { userAvatar: 'https://randomuser.me/api/portraits/men/56.jpg' },
        { userAvatar: 'https://randomuser.me/api/portraits/women/78.jpg' },
        { userAvatar: 'https://randomuser.me/api/portraits/men/23.jpg' }
      ]
    },
    {
      id: 'lighting-floor-arc-005',
      name: 'Modern Arc Floor Lamp',
      brand: 'Crate & Barrel',
      category: 'Lighting',
      price: 299,
      originalPrice: 399,
      discount: 25,
      rating: 4.7,
      reviewCount: 178,
      dimensions: `18"W × 12"D × 84"H`,
      images: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'
      ],
      materials: [
        { name: 'Brushed Steel', color: '#718096' },
        { name: 'Matte Black', color: '#1A202C' }
      ],
      isNew: false,
      arOptimized: true,
      roomCompatibility: true,
      financing: { monthlyPayment: 25 },
      userPhotos: [
        { userAvatar: 'https://randomuser.me/api/portraits/women/34.jpg' },
        { userAvatar: 'https://randomuser.me/api/portraits/men/67.jpg' }
      ]
    },
    {
      id: 'decor-mirror-round-006',
      name: 'Large Round Wall Mirror',
      brand: 'Wayfair',
      category: 'Decor',
      price: 189,
      originalPrice: null,
      discount: null,
      rating: 4.5,
      reviewCount: 267,
      dimensions: `36" Diameter × 2"D`,
      images: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'
      ],
      materials: [
        { name: 'Gold Frame', color: '#D69E2E' },
        { name: 'Silver Frame', color: '#718096' },
        { name: 'Black Frame', color: '#1A202C' }
      ],
      isNew: false,
      arOptimized: false,
      roomCompatibility: true,
      financing: null,
      userPhotos: [
        { userAvatar: 'https://randomuser.me/api/portraits/women/89.jpg' }
      ]
    }
  ];

  useEffect(() => {
    loadFurniture();
  }, [filters, sortBy, searchQuery, selectedStyle]);

  const loadFurniture = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let filteredFurniture = [...mockFurniture];
      
      // Apply search filter
      if (searchQuery) {
        filteredFurniture = filteredFurniture?.filter(item =>
          item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          item?.brand?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          item?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        );
      }
      
      // Apply category filter
      if (filters?.categories?.length > 0) {
        filteredFurniture = filteredFurniture?.filter(item =>
          filters?.categories?.some(cat => item?.category?.toLowerCase()?.includes(cat))
        );
      }
      
      // Apply special features filter
      if (filters?.specialFeatures?.includes('ar-optimized')) {
        filteredFurniture = filteredFurniture?.filter(item => item?.arOptimized);
      }
      
      // Apply price filter
      filteredFurniture = filteredFurniture?.filter(item =>
        item?.price >= filters?.minPrice && item?.price <= filters?.maxPrice
      );
      
      // Sort results
      switch (sortBy) {
        case 'price-low':
          filteredFurniture?.sort((a, b) => a?.price - b?.price);
          break;
        case 'price-high':
          filteredFurniture?.sort((a, b) => b?.price - a?.price);
          break;
        case 'rating':
          filteredFurniture?.sort((a, b) => b?.rating - a?.rating);
          break;
        case 'newest':
          filteredFurniture?.sort((a, b) => b?.isNew - a?.isNew);
          break;
        default:
          // Keep relevance order
          break;
      }
      
      setFurniture(filteredFurniture);
      setTotalResults(filteredFurniture?.length);
      setLoading(false);
    }, 800);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleVisualSearch = (file) => {
    // Simulate visual search processing
    console.log('Processing visual search for:', file?.name);
    setSearchQuery('Modern sectional sofa');
  };

  const handleStyleChange = (style) => {
    setSelectedStyle(style);
    setCurrentPage(1);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      styles: [],
      colors: [],
      materials: [],
      brands: [],
      specialFeatures: [],
      minPrice: 0,
      maxPrice: 5000
    });
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleTryAR = (furnitureItem) => {
    // Navigate to AR experience with selected furniture
    navigate('/ar-camera-portal-homepage', { 
      state: { selectedFurniture: furnitureItem } 
    });
  };

  const handleAddToCart = (furnitureItem) => {
    // Navigate to AR shopping cart
    navigate('/ar-shopping-experience-spatial-cart', { 
      state: { addedItem: furnitureItem } 
    });
  };

  const handleViewDetails = (furnitureItem) => {
    // In a real app, this would navigate to a detailed product page
    console.log('Viewing details for:', furnitureItem?.name);
  };

  const handleLoadMore = async () => {
    // Simulate loading more items
    return new Promise(resolve => {
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setHasMore(furniture.length < totalResults - 24);
        resolve();
      }, 1000);
    });
  };

  const handleTryARSet = (furnitureSet) => {
    navigate('/ar-camera-portal-homepage', { 
      state: { selectedSet: furnitureSet } 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Smart Catalog & Furniture Universe
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            Discover furniture that perfectly matches your style with AI-powered recommendations 
            and instant AR visualization. See it before you buy it.
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center space-x-2">
              <Icon name="Package" size={16} color="var(--color-accent)" />
              <span><strong className="text-accent">2,847</strong> furniture pieces</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Cube" size={16} color="var(--color-success)" />
              <span><strong className="text-success">2,078</strong> AR ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} color="var(--color-warning)" />
              <span><strong className="text-warning">156k+</strong> happy customers</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            onVisualSearch={handleVisualSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        {/* Style Matching System */}
        <div className="mb-8">
          <StyleMatchingSystem
            onStyleChange={handleStyleChange}
            selectedStyle={selectedStyle}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <AdvancedFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Sorting Controls */}
            <SortingControls
              sortBy={sortBy}
              onSortChange={handleSortChange}
              viewMode={viewMode}
              onViewModeChange={handleViewModeChange}
              totalResults={totalResults}
              currentPage={currentPage}
              totalPages={Math.ceil(totalResults / 24)}
            />

            {/* Furniture Grid */}
            <FurnitureGrid
              furniture={furniture}
              viewMode={viewMode}
              loading={loading}
              onTryAR={handleTryAR}
              onAddToCart={handleAddToCart}
              onViewDetails={handleViewDetails}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
            />

            {/* Complete the Look Section */}
            {furniture?.length > 0 && (
              <div className="mt-12">
                <CompleteTheLookSection
                  selectedFurniture={furniture?.[0]}
                  onAddToCart={handleAddToCart}
                  onTryARSet={handleTryARSet}
                />
              </div>
            )}
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Shield" size={24} color="var(--color-success)" />
              </div>
              <h3 className="font-semibold text-primary">30-Day Returns</h3>
              <p className="text-sm text-muted-foreground">
                Free returns on all furniture purchases
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Truck" size={24} color="var(--color-accent)" />
              </div>
              <h3 className="font-semibold text-primary">Free Delivery</h3>
              <p className="text-sm text-muted-foreground">
                On orders over $999 nationwide
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Headphones" size={24} color="var(--color-warning)" />
              </div>
              <h3 className="font-semibold text-primary">Expert Support</h3>
              <p className="text-sm text-muted-foreground">
                Design consultations available 24/7
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Sparkles" size={24} color="#8B5CF6" />
              </div>
              <h3 className="font-semibold text-primary">AR Guarantee</h3>
              <p className="text-sm text-muted-foreground">
                99.2% accuracy in AR measurements
              </p>
            </div>
          </div>
        </div>
      </main>
      {/* Floating AR Camera Button */}
      <Button
        className="ar-camera-btn"
        onClick={() => navigate('/ar-camera-portal-homepage')}
        title="Open AR Camera"
      >
        <Icon name="Camera" size={24} color="currentColor" />
      </Button>
    </div>
  );
};

export default SmartCatalogFurnitureUniverse;
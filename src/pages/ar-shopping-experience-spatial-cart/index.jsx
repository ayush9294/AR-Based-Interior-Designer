import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import ARCartViewer from './components/ARCartViewer';
import DeliveryPlanner from './components/DeliveryPlanner';
import CheckoutFlow from './components/CheckoutFlow';
import SpatialWishlist from './components/SpatialWishlist';
import OrderConfirmation from './components/OrderConfirmation';

const ARShoppingExperienceSpatialCart = () => {
  const [currentView, setCurrentView] = useState('cart'); // cart, wishlist, delivery, checkout, confirmation
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [isARActive, setIsARActive] = useState(false);

  // Mock cart data
  useEffect(() => {
    const mockCartItems = [
      {
        id: 1,
        name: "Modern Sectional Sofa",
        category: "Living Room",
        price: 2499,
        originalPrice: 2999,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
        room: "Living Room",
        coordinates: "X: 2.3m, Y: 1.8m, Z: 0.0m",
        arReady: true,
        inStock: true
      },
      {
        id: 2,
        name: "Glass Coffee Table",
        category: "Living Room",
        price: 899,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400",
        room: "Living Room",
        coordinates: "X: 2.5m, Y: 2.8m, Z: 0.0m",
        arReady: true,
        inStock: true
      },
      {
        id: 3,
        name: "Ergonomic Office Chair",
        category: "Office",
        price: 649,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400",
        room: "Home Office",
        coordinates: "X: 1.2m, Y: 1.5m, Z: 0.0m",
        arReady: true,
        inStock: true
      }
    ];

    const mockWishlistItems = [
      {
        id: 4,
        name: "Scandinavian Dining Table",
        category: "Dining Room",
        price: 1299,
        originalPrice: 1599,
        image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=400",
        onSale: true,
        inStock: true,
        arReady: true,
        addedDate: "2025-01-02",
        spatialInfo: {
          room: "Dining Room",
          dimensions: "180cm x 90cm"
        }
      },
      {
        id: 5,
        name: "Velvet Accent Chair",
        category: "Living Room",
        price: 799,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
        onSale: false,
        inStock: false,
        arReady: true,
        estimatedRestock: "Jan 15",
        addedDate: "2025-01-01",
        spatialInfo: {
          room: "Living Room",
          dimensions: "75cm x 80cm"
        }
      },
      {
        id: 6,
        name: "Industrial Bookshelf",
        category: "Office",
        price: 549,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        onSale: false,
        inStock: true,
        arReady: true,
        addedDate: "2024-12-28",
        spatialInfo: {
          room: "Home Office",
          dimensions: "120cm x 180cm"
        }
      }
    ];

    setCartItems(mockCartItems);
    setWishlistItems(mockWishlistItems);
  }, []);

  const handleRemoveFromCart = (itemId) => {
    setCartItems(prev => prev?.filter(item => item?.id !== itemId));
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems(prev => prev?.map(item => 
      item?.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleToggleARView = (isActive) => {
    setIsARActive(isActive);
  };

  const handleScheduleDelivery = (deliveryData) => {
    setDeliveryInfo(deliveryData);
    setCurrentView('checkout');
  };

  const handleCompleteOrder = (orderInfo) => {
    setOrderData(orderInfo);
    setCurrentView('confirmation');
    setCartItems([]); // Clear cart after successful order
  };

  const handleAddToCart = (item) => {
    const cartItem = {
      ...item,
      quantity: 1,
      room: item?.spatialInfo?.room || "Living Room",
      coordinates: "X: 0.0m, Y: 0.0m, Z: 0.0m"
    };
    setCartItems(prev => [...prev, cartItem]);
  };

  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems(prev => prev?.filter(item => item?.id !== itemId));
  };

  const handleViewInAR = (item) => {
    setIsARActive(true);
    // Simulate AR view functionality
    console.log('Viewing item in AR:', item);
  };

  const handleDownloadReceipt = () => {
    // Simulate receipt download
    console.log('Downloading receipt for order:', orderData?.orderNumber);
  };

  const handleTrackOrder = () => {
    // Simulate order tracking
    console.log('Tracking order:', orderData?.orderNumber);
  };

  const getCartTotal = () => {
    return cartItems?.reduce((total, item) => total + (item?.price * item?.quantity), 0);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'cart':
        return (
          <ARCartViewer
            cartItems={cartItems}
            onRemoveItem={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            onToggleARView={handleToggleARView}
          />
        );
      case 'wishlist':
        return (
          <SpatialWishlist
            wishlistItems={wishlistItems}
            onAddToCart={handleAddToCart}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onViewInAR={handleViewInAR}
          />
        );
      case 'delivery':
        return (
          <DeliveryPlanner
            cartItems={cartItems}
            onScheduleDelivery={handleScheduleDelivery}
          />
        );
      case 'checkout':
        return (
          <CheckoutFlow
            cartItems={cartItems}
            deliveryInfo={deliveryInfo}
            onCompleteOrder={handleCompleteOrder}
          />
        );
      case 'confirmation':
        return (
          <OrderConfirmation
            orderData={orderData}
            onDownloadReceipt={handleDownloadReceipt}
            onTrackOrder={handleTrackOrder}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
            <Link to="/ar-camera-portal-homepage" className="hover:text-accent spatial-transition">
              Home
            </Link>
            <Icon name="ChevronRight" size={16} color="currentColor" />
            <span>Shopping Experience</span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl font-bold mb-2">AR Shopping Experience</h1>
              <p className="text-muted-foreground">
                Visualize, customize, and purchase with confidence using spatial technology
              </p>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-1 bg-surface rounded-lg p-1">
              <Button
                variant={currentView === 'cart' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('cart')}
                iconName="ShoppingCart"
                iconPosition="left"
                className="relative"
              >
                Cart
                {cartItems?.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground rounded-full text-xs flex items-center justify-center">
                    {cartItems?.length}
                  </span>
                )}
              </Button>
              
              <Button
                variant={currentView === 'wishlist' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('wishlist')}
                iconName="Heart"
                iconPosition="left"
                className="relative"
              >
                Wishlist
                {wishlistItems?.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground rounded-full text-xs flex items-center justify-center">
                    {wishlistItems?.length}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Shopping Progress */}
        {currentView !== 'confirmation' && cartItems?.length > 0 && (
          <div className="mb-8 bg-card rounded-xl border border-border shadow-spatial-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Shopping Progress</h3>
              <div className="text-sm text-muted-foreground">
                ${getCartTotal()?.toLocaleString()} total
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {[
                { id: 'cart', name: 'Cart', icon: 'ShoppingCart' },
                { id: 'delivery', name: 'Delivery', icon: 'Truck' },
                { id: 'checkout', name: 'Checkout', icon: 'CreditCard' }
              ]?.map((step, index) => (
                <React.Fragment key={step?.id}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      currentView === step?.id
                        ? 'border-accent bg-accent text-accent-foreground'
                        : ['delivery', 'checkout']?.includes(currentView) && step?.id === 'cart'
                        ? 'border-success bg-success text-success-foreground'
                        : currentView === 'checkout'&& step?.id === 'delivery' ?'border-success bg-success text-success-foreground' :'border-border'
                    }`}>
                      <Icon name={step?.icon} size={16} color="currentColor" />
                    </div>
                    <span className={`text-sm font-medium ${
                      currentView === step?.id ? 'text-accent' : 'text-muted-foreground'
                    }`}>
                      {step?.name}
                    </span>
                  </div>
                  
                  {index < 2 && (
                    <div className={`flex-1 h-0.5 ${
                      ['delivery', 'checkout']?.includes(currentView) && step?.id === 'cart'
                        ? 'bg-success'
                        : currentView === 'checkout'&& step?.id === 'delivery' ?'bg-success' :'bg-border'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Primary Content */}
          <div className="lg:col-span-3">
            {renderCurrentView()}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-card rounded-xl border border-border shadow-spatial-sm p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Camera"
                  iconPosition="left"
                  className="justify-start"
                >
                  Scan New Room
                </Button>
                
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Search"
                  iconPosition="left"
                  className="justify-start"
                >
                  Browse Catalog
                </Button>
                
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Palette"
                  iconPosition="left"
                  className="justify-start"
                >
                  Design Studio
                </Button>
              </div>
            </div>

            {/* AR Confidence Guarantee */}
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl border border-accent/20 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={20} color="var(--color-accent)" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="font-semibold">AR Confidence Guarantee</h4>
                  <p className="text-sm text-muted-foreground">30-day promise</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Check" size={14} color="var(--color-success)" />
                  <span>Free returns if AR doesn't match</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Check" size={14} color="var(--color-success)" />
                  <span>White glove delivery service</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Check" size={14} color="var(--color-success)" />
                  <span>Professional AR-guided setup</span>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-card rounded-xl border border-border shadow-spatial-sm p-6">
              <h4 className="font-semibold mb-4">Need Help?</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <Icon name="MessageCircle" size={16} color="var(--color-muted-foreground)" />
                  <span>Live Chat Support</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Icon name="Phone" size={16} color="var(--color-muted-foreground)" />
                  <span>1-800-AR-SPACE</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Icon name="Mail" size={16} color="var(--color-muted-foreground)" />
                  <span>support@arspace.com</span>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="HelpCircle"
                iconPosition="left"
                className="mt-4"
              >
                AR Troubleshooting
              </Button>
            </div>
          </div>
        </div>

        {/* Floating AR Camera Button */}
        {!isARActive && (
          <button
            onClick={() => setIsARActive(true)}
            className="ar-camera-btn"
            aria-label="Start AR Camera"
          >
            <Icon name="Camera" size={24} color="white" strokeWidth={2} />
          </button>
        )}

        {/* Bottom Navigation for Mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border p-4 lg:hidden">
          <div className="flex items-center justify-around max-w-md mx-auto">
            <Button
              variant={currentView === 'cart' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentView('cart')}
              iconName="ShoppingCart"
              className="flex-col h-auto py-2 relative"
            >
              <span className="text-xs mt-1">Cart</span>
              {cartItems?.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground rounded-full text-xs flex items-center justify-center">
                  {cartItems?.length}
                </span>
              )}
            </Button>
            
            <Button
              variant={currentView === 'wishlist' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentView('wishlist')}
              iconName="Heart"
              className="flex-col h-auto py-2 relative"
            >
              <span className="text-xs mt-1">Wishlist</span>
              {wishlistItems?.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-error-foreground rounded-full text-xs flex items-center justify-center">
                  {wishlistItems?.length}
                </span>
              )}
            </Button>
            
            {cartItems?.length > 0 && currentView === 'cart' && (
              <Button
                variant="default"
                size="sm"
                onClick={() => setCurrentView('delivery')}
                iconName="ArrowRight"
                className="bg-accent hover:bg-accent/90 px-6"
              >
                Checkout
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ARShoppingExperienceSpatialCart;
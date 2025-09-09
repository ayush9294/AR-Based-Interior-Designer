import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const WishlistManager = ({ wishlistItems, onRemoveItem, onMoveToCart, onPriorityChange }) => {
  const [sortBy, setSortBy] = useState('priority');
  const [filterBy, setFilterBy] = useState('all');

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getAvailabilityStatus = (availability) => {
    switch (availability) {
      case 'in-stock':
        return { color: 'text-success', icon: 'CheckCircle', label: 'In Stock' };
      case 'low-stock':
        return { color: 'text-warning', icon: 'AlertTriangle', label: 'Low Stock' };
      case 'out-of-stock':
        return { color: 'text-error', icon: 'XCircle', label: 'Out of Stock' };
      case 'pre-order':
        return { color: 'text-accent', icon: 'Clock', label: 'Pre-Order' };
      default:
        return { color: 'text-muted-foreground', icon: 'HelpCircle', label: 'Unknown' };
    }
  };

  const sortedAndFilteredItems = wishlistItems?.filter(item => filterBy === 'all' || item?.room === filterBy)?.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
        case 'price':
          return a?.price - b?.price;
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'added':
          return new Date(b.dateAdded) - new Date(a.dateAdded);
        default:
          return 0;
      }
    });

  const totalValue = wishlistItems?.reduce((sum, item) => sum + item?.price, 0);
  const roomCounts = wishlistItems?.reduce((acc, item) => {
    acc[item.room] = (acc?.[item?.room] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="spatial-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cta to-accent rounded-lg flex items-center justify-center">
            <Icon name="Heart" size={20} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Wishlist Manager</h3>
            <p className="text-sm text-text-secondary">
              {wishlistItems?.length} items • ${totalValue?.toLocaleString()} total value
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="text-sm border border-border rounded-lg px-3 py-1 bg-background text-text-primary"
          >
            <option value="priority">Sort by Priority</option>
            <option value="price">Sort by Price</option>
            <option value="name">Sort by Name</option>
            <option value="added">Sort by Date Added</option>
          </select>
          
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e?.target?.value)}
            className="text-sm border border-border rounded-lg px-3 py-1 bg-background text-text-primary"
          >
            <option value="all">All Rooms</option>
            {Object.keys(roomCounts)?.map(room => (
              <option key={room} value={room}>
                {room?.charAt(0)?.toUpperCase() + room?.slice(1)} ({roomCounts?.[room]})
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Wishlist Items */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {sortedAndFilteredItems?.map((item) => {
          const availability = getAvailabilityStatus(item?.availability);
          
          return (
            <div key={item?.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 spatial-transition">
              {/* Item Image */}
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
                {item?.priceChange && (
                  <div className={`absolute top-1 right-1 w-3 h-3 rounded-full ${
                    item?.priceChange > 0 ? 'bg-error' : 'bg-success'
                  }`}></div>
                )}
              </div>
              {/* Item Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-text-primary truncate">{item?.name}</h4>
                    <p className="text-sm text-text-secondary">{item?.brand} • {item?.room}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold text-text-primary">${item?.price?.toLocaleString()}</div>
                    {item?.priceChange && (
                      <div className={`text-xs ${item?.priceChange > 0 ? 'text-error' : 'text-success'}`}>
                        {item?.priceChange > 0 ? '+' : ''}${Math.abs(item?.priceChange)}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* Priority Badge */}
                    <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item?.priority)}`}>
                      {item?.priority?.charAt(0)?.toUpperCase() + item?.priority?.slice(1)}
                    </div>
                    
                    {/* Availability Status */}
                    <div className={`flex items-center space-x-1 text-xs ${availability?.color}`}>
                      <Icon name={availability?.icon} size={12} />
                      <span>{availability?.label}</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <select
                      value={item?.priority}
                      onChange={(e) => onPriorityChange(item?.id, e?.target?.value)}
                      className="text-xs border border-border rounded px-2 py-1 bg-background"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ShoppingCart"
                      onClick={() => onMoveToCart(item?.id)}
                      disabled={item?.availability === 'out-of-stock'}
                    >
                      Add to Cart
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="X"
                      onClick={() => onRemoveItem(item?.id)}
                      className="text-text-secondary hover:text-error"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Wishlist Summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">{wishlistItems?.length}</div>
            <div className="text-xs text-text-secondary">Total Items</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-success">
              {wishlistItems?.filter(item => item?.availability === 'in-stock')?.length}
            </div>
            <div className="text-xs text-text-secondary">Available</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-error">
              {wishlistItems?.filter(item => item?.priority === 'high')?.length}
            </div>
            <div className="text-xs text-text-secondary">High Priority</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-accent">${totalValue?.toLocaleString()}</div>
            <div className="text-xs text-text-secondary">Total Value</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Price alerts enabled for {wishlistItems?.filter(item => item?.priceAlert)?.length} items
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Bell"
              iconPosition="left"
            >
              Manage Alerts
            </Button>
            
            <Button
              variant="default"
              size="sm"
              iconName="ShoppingCart"
              iconPosition="left"
              className="bg-cta hover:bg-cta/90 text-cta-foreground"
            >
              Add All Available
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistManager;
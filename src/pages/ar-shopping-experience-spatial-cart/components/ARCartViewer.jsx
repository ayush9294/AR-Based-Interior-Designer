import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ARCartViewer = ({ cartItems, onRemoveItem, onUpdateQuantity, onToggleARView }) => {
  const [isARActive, setIsARActive] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('living-room');
  const [viewMode, setViewMode] = useState('grid'); // grid, list, ar

  const rooms = [
    { id: 'living-room', name: 'Living Room', items: 3 },
    { id: 'bedroom', name: 'Bedroom', items: 2 },
    { id: 'dining-room', name: 'Dining Room', items: 1 }
  ];

  const handleARToggle = () => {
    setIsARActive(!isARActive);
    onToggleARView(!isARActive);
  };

  const getTotalValue = () => {
    return cartItems?.reduce((total, item) => total + (item?.price * item?.quantity), 0);
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-spatial-sm overflow-hidden">
      {/* AR Controls Header */}
      <div className="bg-gradient-to-r from-primary to-accent p-4 text-primary-foreground">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Icon name="ShoppingCart" size={20} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Spatial Cart</h3>
              <p className="text-sm opacity-90">{cartItems?.length} items • ${getTotalValue()?.toLocaleString()}</p>
            </div>
          </div>
          
          <Button
            variant={isARActive ? "secondary" : "outline"}
            size="sm"
            onClick={handleARToggle}
            iconName="Camera"
            iconPosition="left"
            className={isARActive ? "bg-white text-primary" : "border-white/30 text-white hover:bg-white/10"}
          >
            {isARActive ? 'Exit AR' : 'View in AR'}
          </Button>
        </div>

        {/* Room Selector */}
        <div className="flex items-center space-x-2 overflow-x-auto">
          {rooms?.map((room) => (
            <button
              key={room?.id}
              onClick={() => setSelectedRoom(room?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap spatial-transition ${
                selectedRoom === room?.id
                  ? 'bg-white/20 text-white' :'bg-white/10 text-white/80 hover:bg-white/15'
              }`}
            >
              <Icon name="Home" size={14} color="currentColor" />
              <span className="text-sm font-medium">{room?.name}</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{room?.items}</span>
            </button>
          ))}
        </div>
      </div>
      {/* View Mode Toggle */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              iconName="Grid3X3"
              className="px-3"
            />
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              iconName="List"
              className="px-3"
            />
            <Button
              variant={viewMode === 'ar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('ar')}
              iconName="Cube"
              className="px-3"
            />
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Eye" size={16} color="currentColor" />
            <span>Spatial Preview</span>
          </div>
        </div>
      </div>
      {/* AR View Mode */}
      {isARActive && viewMode === 'ar' && (
        <div className="relative h-80 bg-gradient-to-br from-surface to-muted">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Camera" size={32} color="var(--color-accent)" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">AR Room Preview</h4>
                <p className="text-muted-foreground mb-4">See how your furniture looks in your actual space</p>
                <Button
                  variant="default"
                  iconName="Play"
                  iconPosition="left"
                  className="bg-accent hover:bg-accent/90"
                >
                  Start AR Session
                </Button>
              </div>
            </div>
          </div>

          {/* AR Overlay Controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <Button variant="secondary" size="icon" iconName="RotateCcw" />
            <Button variant="secondary" size="icon" iconName="Move3D" />
            <Button variant="secondary" size="icon" iconName="Maximize2" />
          </div>

          {/* AR Status Bar */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">AR Active</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {cartItems?.length} items placed
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Cart Items Grid/List */}
      {viewMode !== 'ar' && (
        <div className="p-4">
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
            {cartItems?.map((item) => (
              <div
                key={item?.id}
                className={`group relative bg-surface rounded-lg border border-border p-4 spatial-transition hover:shadow-spatial-sm ${
                  viewMode === 'list' ? 'flex items-center space-x-4' : ''
                }`}
              >
                {/* Item Image */}
                <div className={`relative overflow-hidden rounded-lg bg-muted ${
                  viewMode === 'list' ? 'w-20 h-20 flex-shrink-0' : 'w-full h-32 mb-3'
                }`}>
                  <Image
                    src={item?.image}
                    alt={item?.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* AR Badge */}
                  <div className="absolute top-2 left-2">
                    <div className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center space-x-1">
                      <Icon name="Cube" size={12} color="currentColor" />
                      <span>AR</span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 spatial-transition">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => onRemoveItem(item?.id)}
                      iconName="Trash2"
                      className="w-8 h-8"
                    />
                  </div>
                </div>

                {/* Item Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-sm mb-1">{item?.name}</h4>
                      <p className="text-xs text-muted-foreground">{item?.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm">${item?.price?.toLocaleString()}</div>
                      {item?.originalPrice && (
                        <div className="text-xs text-muted-foreground line-through">
                          ${item?.originalPrice?.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onUpdateQuantity(item?.id, Math.max(1, item?.quantity - 1))}
                        iconName="Minus"
                        className="w-8 h-8"
                      />
                      <span className="w-8 text-center text-sm font-medium">{item?.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onUpdateQuantity(item?.id, item?.quantity + 1)}
                        iconName="Plus"
                        className="w-8 h-8"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Heart"
                        className="text-muted-foreground hover:text-error"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        className="text-muted-foreground hover:text-accent"
                      />
                    </div>
                  </div>

                  {/* Placement Info */}
                  <div className="mt-2 p-2 bg-muted/50 rounded-md">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Icon name="MapPin" size={12} color="currentColor" />
                      <span>Placed in {item?.room}</span>
                      <span>•</span>
                      <span>{item?.coordinates}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Cart Summary */}
      <div className="border-t border-border p-4 bg-surface/50">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal ({cartItems?.length} items)</span>
            <span className="font-medium">${getTotalValue()?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>AR Confidence Guarantee</span>
            <span className="text-success">Free</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Estimated Delivery</span>
            <span>$299</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARCartViewer;
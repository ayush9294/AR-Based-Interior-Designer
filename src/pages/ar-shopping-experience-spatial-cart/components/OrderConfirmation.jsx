import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrderConfirmation = ({ orderData, onDownloadReceipt, onTrackOrder }) => {
  const [showARRecording, setShowARRecording] = useState(false);
  const [deliveryProgress, setDeliveryProgress] = useState(0);

  useEffect(() => {
    // Simulate delivery progress
    const interval = setInterval(() => {
      setDeliveryProgress(prev => Math.min(prev + 1, 100));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const deliverySteps = [
    {
      id: 1,
      name: 'Order Confirmed',
      description: 'Your AR-guided order has been confirmed',
      completed: true,
      timestamp: orderData?.timestamp
    },
    {
      id: 2,
      name: 'Preparing Items',
      description: 'Items are being prepared for delivery',
      completed: deliveryProgress > 25,
      timestamp: null
    },
    {
      id: 3,
      name: 'Quality Check',
      description: 'AR placement verification in progress',
      completed: deliveryProgress > 50,
      timestamp: null
    },
    {
      id: 4,
      name: 'Out for Delivery',
      description: 'Your furniture is on the way',
      completed: deliveryProgress > 75,
      timestamp: null
    },
    {
      id: 5,
      name: 'AR-Guided Setup',
      description: 'Professional placement using AR coordinates',
      completed: deliveryProgress === 100,
      timestamp: null
    }
  ];

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-success to-success/80 rounded-xl p-8 text-success-foreground text-center">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} color="white" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-lg opacity-90 mb-4">
          Your AR-guided furniture delivery has been scheduled
        </p>
        <div className="bg-white/20 rounded-lg p-4 inline-block">
          <div className="font-semibold text-xl">Order #{orderData?.orderNumber}</div>
          <div className="text-sm opacity-90">
            Delivery: {orderData?.delivery?.date} at {orderData?.delivery?.time}
          </div>
        </div>
      </div>
      {/* Order Summary */}
      <div className="bg-card rounded-xl border border-border shadow-spatial-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Package" size={20} color="var(--color-primary)" strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Order Summary</h3>
            <p className="text-sm text-muted-foreground">
              {orderData?.items?.length} items • ${orderData?.total?.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {orderData?.items?.map((item) => (
            <div key={item?.id} className="flex items-center space-x-4 p-4 bg-surface rounded-lg">
              <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">{item?.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">{item?.category}</p>
                <div className="flex items-center space-x-2 text-xs">
                  <Icon name="MapPin" size={12} color="var(--color-muted-foreground)" />
                  <span className="text-muted-foreground">
                    Placed in {item?.room} at {item?.coordinates}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-semibold">${(item?.price * item?.quantity)?.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Qty: {item?.quantity}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${(orderData?.total - orderData?.delivery?.price - (orderData?.total * 0.08))?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${(orderData?.total * 0.08)?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>AR Delivery Service</span>
              <span>${orderData?.delivery?.price}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>${orderData?.total?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
      {/* AR Session Recording */}
      <div className="bg-card rounded-xl border border-border shadow-spatial-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Video" size={20} color="var(--color-accent)" strokeWidth={2} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">AR Placement Recording</h3>
              <p className="text-sm text-muted-foreground">
                Your exact furniture placement for delivery reference
              </p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowARRecording(!showARRecording)}
            iconName={showARRecording ? "EyeOff" : "Eye"}
            iconPosition="left"
          >
            {showARRecording ? 'Hide' : 'View'} Recording
          </Button>
        </div>

        {showARRecording && (
          <div className="relative h-64 bg-gradient-to-br from-surface to-muted rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                  <Icon name="Play" size={24} color="var(--color-accent)" strokeWidth={1.5} />
                </div>
                <div>
                  <h5 className="font-semibold mb-1">AR Session Recording</h5>
                  <p className="text-sm text-muted-foreground">
                    3D placement coordinates saved for delivery team
                  </p>
                </div>
              </div>
            </div>

            {/* Recording Controls */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Recording Saved</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Duration: 2:34
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-surface rounded-lg">
            <div className="font-semibold text-lg">12</div>
            <div className="text-sm text-muted-foreground">Placement Points</div>
          </div>
          <div className="text-center p-3 bg-surface rounded-lg">
            <div className="font-semibold text-lg">99.8%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </div>
          <div className="text-center p-3 bg-surface rounded-lg">
            <div className="font-semibold text-lg">3D</div>
            <div className="text-sm text-muted-foreground">Coordinates</div>
          </div>
        </div>
      </div>
      {/* Delivery Progress */}
      <div className="bg-card rounded-xl border border-border shadow-spatial-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="Truck" size={20} color="var(--color-warning)" strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Delivery Progress</h3>
            <p className="text-sm text-muted-foreground">
              Track your AR-guided delivery in real-time
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {deliverySteps?.map((step, index) => (
            <div key={step?.id} className="flex items-start space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${
                step?.completed
                  ? 'border-success bg-success text-success-foreground'
                  : 'border-border bg-background'
              }`}>
                {step?.completed ? (
                  <Icon name="Check" size={16} color="currentColor" />
                ) : (
                  <span className="text-sm font-medium">{step?.id}</span>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`font-semibold text-sm ${
                    step?.completed ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step?.name}
                  </h4>
                  {step?.timestamp && (
                    <span className="text-xs text-muted-foreground">
                      {new Date(step.timestamp)?.toLocaleTimeString()}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{step?.description}</p>
              </div>
              
              {index < deliverySteps?.length - 1 && (
                <div className={`w-0.5 h-8 ml-4 ${
                  step?.completed ? 'bg-success' : 'bg-border'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 p-4 bg-surface rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{deliveryProgress}%</span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div 
              className="bg-success h-2 rounded-full spatial-transition"
              style={{ width: `${deliveryProgress}%` }}
            />
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          variant="outline"
          onClick={onDownloadReceipt}
          iconName="Download"
          iconPosition="left"
          className="touch-optimized"
        >
          Download Receipt
        </Button>
        
        <Button
          variant="outline"
          onClick={onTrackOrder}
          iconName="MapPin"
          iconPosition="left"
          className="touch-optimized"
        >
          Track Delivery
        </Button>
        
        <Button
          variant="default"
          iconName="MessageCircle"
          iconPosition="left"
          className="bg-accent hover:bg-accent/90 touch-optimized"
        >
          Contact Support
        </Button>
      </div>
      {/* Support Information */}
      <div className="bg-surface/50 rounded-xl p-6 border border-border">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="Shield" size={20} color="var(--color-primary)" strokeWidth={2} />
          </div>
          <div>
            <h4 className="font-semibold mb-2">30-Day AR Confidence Guarantee</h4>
            <p className="text-sm text-muted-foreground mb-4">
              If your furniture doesn't look exactly as it did in AR, we'll make it right with free returns or exchanges.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={16} color="var(--color-muted-foreground)" />
                <span>1-800-AR-SPACE</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={16} color="var(--color-muted-foreground)" />
                <span>support@arspace.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
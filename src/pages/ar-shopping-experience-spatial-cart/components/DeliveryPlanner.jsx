import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DeliveryPlanner = ({ cartItems, onScheduleDelivery }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [deliveryType, setDeliveryType] = useState('standard');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [showARPreview, setShowARPreview] = useState(false);

  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      price: 299,
      duration: '5-7 business days',
      description: 'Professional delivery team with AR placement assistance',
      features: ['White glove service', 'AR-guided placement', 'Assembly included']
    },
    {
      id: 'express',
      name: 'Express Delivery',
      price: 499,
      duration: '2-3 business days',
      description: 'Priority delivery with same-day AR consultation',
      features: ['Priority scheduling', 'Same-day AR consultation', 'Premium assembly']
    },
    {
      id: 'premium',
      name: 'Premium AR Experience',
      price: 799,
      duration: '1-2 business days',
      description: 'Complete AR-guided setup with design consultation',
      features: ['Design consultation', 'AR room optimization', 'Styling service']
    }
  ];

  const timeSlots = [
    { id: 'morning', label: '8:00 AM - 12:00 PM', available: true },
    { id: 'afternoon', label: '12:00 PM - 5:00 PM', available: true },
    { id: 'evening', label: '5:00 PM - 8:00 PM', available: false }
  ];

  const handleScheduleDelivery = () => {
    const deliveryData = {
      date: selectedDate,
      time: selectedTime,
      type: deliveryType,
      instructions: specialInstructions,
      items: cartItems
    };
    onScheduleDelivery(deliveryData);
  };

  return (
    <div className="space-y-6">
      {/* Delivery Options */}
      <div className="bg-card rounded-xl border border-border shadow-spatial-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Truck" size={20} color="var(--color-accent)" strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Delivery Options</h3>
            <p className="text-sm text-muted-foreground">Choose your AR-enhanced delivery experience</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {deliveryOptions?.map((option) => (
            <div
              key={option?.id}
              className={`relative p-4 rounded-lg border-2 cursor-pointer spatial-transition ${
                deliveryType === option?.id
                  ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50'
              }`}
              onClick={() => setDeliveryType(option?.id)}
            >
              {/* Selection Indicator */}
              <div className="absolute top-3 right-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  deliveryType === option?.id
                    ? 'border-accent bg-accent' :'border-border'
                }`}>
                  {deliveryType === option?.id && (
                    <Icon name="Check" size={12} color="white" strokeWidth={3} />
                  )}
                </div>
              </div>

              <div className="mb-3">
                <h4 className="font-semibold mb-1">{option?.name}</h4>
                <div className="text-lg font-bold text-accent mb-1">${option?.price}</div>
                <div className="text-sm text-muted-foreground">{option?.duration}</div>
              </div>

              <p className="text-sm text-muted-foreground mb-3">{option?.description}</p>

              <div className="space-y-1">
                {option?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <Icon name="Check" size={14} color="var(--color-success)" strokeWidth={2} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Date & Time Selection */}
      <div className="bg-card rounded-xl border border-border shadow-spatial-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={20} color="var(--color-primary)" strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Schedule Delivery</h3>
            <p className="text-sm text-muted-foreground">Select your preferred date and time</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Selection */}
          <div>
            <Input
              label="Delivery Date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e?.target?.value)}
              min={new Date()?.toISOString()?.split('T')?.[0]}
              required
              className="mb-4"
            />

            {/* Calendar Preview */}
            <div className="bg-surface rounded-lg p-4">
              <div className="text-sm font-medium mb-3">Available Dates</div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S']?.map((day) => (
                  <div key={day} className="p-2 font-medium text-muted-foreground">{day}</div>
                ))}
                {Array.from({ length: 35 }, (_, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded cursor-pointer spatial-transition ${
                      i % 7 === 0 || i % 7 === 6
                        ? 'text-muted-foreground'
                        : 'hover:bg-accent/10 text-foreground'
                    }`}
                  >
                    {i + 1 <= 31 ? i + 1 : ''}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <div className="text-sm font-medium mb-3">Time Slots</div>
            <div className="space-y-2">
              {timeSlots?.map((slot) => (
                <button
                  key={slot?.id}
                  onClick={() => slot?.available && setSelectedTime(slot?.id)}
                  disabled={!slot?.available}
                  className={`w-full p-3 rounded-lg border text-left spatial-transition ${
                    selectedTime === slot?.id
                      ? 'border-accent bg-accent/5 text-accent'
                      : slot?.available
                      ? 'border-border hover:border-accent/50' :'border-border bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{slot?.label}</span>
                    {!slot?.available && (
                      <span className="text-xs bg-error/10 text-error px-2 py-1 rounded">
                        Unavailable
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* AR Preview Toggle */}
            <div className="mt-4 p-3 bg-accent/5 rounded-lg border border-accent/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">AR Delivery Preview</div>
                  <div className="text-xs text-muted-foreground">See delivery path in 3D</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowARPreview(!showARPreview)}
                  iconName="Eye"
                  className="border-accent/30"
                >
                  {showARPreview ? 'Hide' : 'Show'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* AR Delivery Preview */}
      {showARPreview && (
        <div className="bg-card rounded-xl border border-border shadow-spatial-sm overflow-hidden">
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Route" size={16} color="var(--color-accent)" strokeWidth={2} />
              </div>
              <div>
                <h4 className="font-semibold">3D Delivery Visualization</h4>
                <p className="text-sm text-muted-foreground">Preview delivery route and placement</p>
              </div>
            </div>
          </div>

          <div className="relative h-64 bg-gradient-to-br from-surface to-muted">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                  <Icon name="Truck" size={24} color="var(--color-accent)" strokeWidth={1.5} />
                </div>
                <div>
                  <h5 className="font-semibold mb-1">AR Route Preview</h5>
                  <p className="text-sm text-muted-foreground">Visualize delivery path to your door</p>
                </div>
              </div>
            </div>

            {/* 3D Controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <Button variant="secondary" size="icon" iconName="RotateCcw" className="w-8 h-8" />
              <Button variant="secondary" size="icon" iconName="ZoomIn" className="w-8 h-8" />
              <Button variant="secondary" size="icon" iconName="Move3D" className="w-8 h-8" />
            </div>

            {/* Delivery Stats */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border">
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="font-semibold">2.3 mi</div>
                    <div className="text-muted-foreground text-xs">Distance</div>
                  </div>
                  <div>
                    <div className="font-semibold">15 min</div>
                    <div className="text-muted-foreground text-xs">Duration</div>
                  </div>
                  <div>
                    <div className="font-semibold">3 steps</div>
                    <div className="text-muted-foreground text-xs">To door</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Special Instructions */}
      <div className="bg-card rounded-xl border border-border shadow-spatial-sm p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="MessageSquare" size={20} color="var(--color-warning)" strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Delivery Instructions</h3>
            <p className="text-sm text-muted-foreground">Special requirements or access information</p>
          </div>
        </div>

        <Input
          label="Special Instructions"
          type="text"
          placeholder="e.g., Ring doorbell twice, use side entrance, fragile items..."
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e?.target?.value)}
          description="Help our delivery team provide the best AR-guided service"
          className="mb-4"
        />

        {/* Quick Instruction Options */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            'Ring doorbell',
            'Call on arrival',
            'Side entrance',
            'Apartment building',
            'Fragile items',
            'Assembly required',
            'Pet friendly',
            'Contact first'
          ]?.map((instruction) => (
            <button
              key={instruction}
              onClick={() => setSpecialInstructions(prev => 
                prev ? `${prev}, ${instruction}` : instruction
              )}
              className="p-2 text-sm border border-border rounded-lg hover:border-accent/50 spatial-transition text-left"
            >
              {instruction}
            </button>
          ))}
        </div>
      </div>
      {/* Schedule Button */}
      <div className="flex justify-end">
        <Button
          variant="default"
          size="lg"
          onClick={handleScheduleDelivery}
          disabled={!selectedDate || !selectedTime}
          iconName="Calendar"
          iconPosition="left"
          className="bg-accent hover:bg-accent/90 text-accent-foreground px-8"
        >
          Schedule AR Delivery
        </Button>
      </div>
    </div>
  );
};

export default DeliveryPlanner;
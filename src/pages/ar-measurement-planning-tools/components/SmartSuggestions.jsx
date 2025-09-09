import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SmartSuggestions = ({ 
  roomType = 'living-room',
  measurements = [],
  onSuggestionApply,
  onSuggestionDismiss 
}) => {
  const [activeCategory, setActiveCategory] = useState('furniture');

  // Mock smart suggestions based on room measurements
  const suggestions = {
    furniture: [
      {
        id: 1,
        type: 'measurement',
        priority: 'high',
        title: 'Measure Sofa Wall Clearance',
        description: 'Your 12.5ft wall can fit a large sectional, but measure 36" clearance from the coffee table area.',
        action: 'Measure clearance',
        icon: 'Sofa',
        reasoning: 'Based on your wall length measurement',
        measurements_needed: ['linear'],
        estimated_time: '2 min'
      },
      {
        id: 2,
        type: 'recommendation',
        priority: 'medium',
        title: 'TV Viewing Distance',
        description: 'For your 156 sq ft room, measure 8-12 feet from seating to TV wall for optimal viewing.',
        action: 'Measure distance',
        icon: 'Tv',
        reasoning: 'Room size suggests 65-75" TV optimal',
        measurements_needed: ['linear'],
        estimated_time: '1 min'
      },
      {
        id: 3,
        type: 'warning',
        priority: 'high',
        title: 'Doorway Width Check',
        description: 'Your 32" bedroom door may be too narrow for king-size bed frames. Measure frame width.',
        action: 'Check dimensions',
        icon: 'AlertTriangle',
        reasoning: 'Standard king frames are 76-80" wide',
        measurements_needed: ['doorway'],
        estimated_time: '3 min'
      }
    ],
    delivery: [
      {
        id: 4,
        type: 'measurement',
        priority: 'high',
        title: 'Stairway Measurements Needed',
        description: 'Measure stair width, ceiling height, and turn radius for large furniture delivery.',
        action: 'Measure stairs',
        icon: 'TrendingUp',
        reasoning: 'Multi-level delivery path detected',
        measurements_needed: ['linear', 'height', 'angle'],
        estimated_time: '5 min'
      },
      {
        id: 5,
        type: 'recommendation',
        priority: 'medium',
        title: 'Delivery Path Planning',
        description: 'Your 36" front door allows most furniture. Consider measuring hallway turns.',
        action: 'Map delivery path',
        icon: 'Route',
        reasoning: 'Front door width is adequate',
        measurements_needed: ['linear', 'angle'],
        estimated_time: '4 min'
      }
    ],
    layout: [
      {
        id: 6,
        type: 'recommendation',
        priority: 'medium',
        title: 'Traffic Flow Analysis',
        description: 'Measure 36" walkways around furniture for comfortable movement in your space.',
        action: 'Measure walkways',
        icon: 'Navigation',
        reasoning: 'Standard accessibility guidelines',
        measurements_needed: ['linear'],
        estimated_time: '3 min'
      },
      {
        id: 7,
        type: 'insight',
        priority: 'low',
        title: 'Natural Light Optimization',
        description: 'Your east-facing window gets morning light. Consider measuring for light-blocking furniture.',
        action: 'Measure window area',
        icon: 'Sun',
        reasoning: 'Window orientation affects furniture placement',
        measurements_needed: ['area', 'height'],
        estimated_time: '2 min'
      }
    ]
  };

  const categories = [
    { id: 'furniture', label: 'Furniture Fit', icon: 'Sofa', count: suggestions?.furniture?.length },
    { id: 'delivery', label: 'Delivery Path', icon: 'Truck', count: suggestions?.delivery?.length },
    { id: 'layout', label: 'Layout Tips', icon: 'Layout', count: suggestions?.layout?.length }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error/10 border-error/20';
      case 'medium': return 'bg-warning/10 border-warning/20';
      case 'low': return 'bg-success/10 border-success/20';
      default: return 'bg-muted/10 border-border';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'measurement': return 'Ruler';
      case 'recommendation': return 'Lightbulb';
      case 'warning': return 'AlertTriangle';
      case 'insight': return 'Eye';
      default: return 'Info';
    }
  };

  const activeSuggestions = suggestions?.[activeCategory] || [];

  return (
    <div className="bg-card border border-border rounded-lg shadow-spatial-sm">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Lightbulb" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">Smart Suggestions</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered measurement recommendations
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setActiveCategory(category?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium spatial-transition flex-1 justify-center ${
                activeCategory === category?.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.label}</span>
              {category?.count > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeCategory === category?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted-foreground/20 text-muted-foreground'
                }`}>
                  {category?.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Suggestions List */}
      <div className="max-h-96 overflow-y-auto">
        {activeSuggestions?.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={24} color="var(--color-success)" />
            </div>
            <h4 className="font-medium text-card-foreground mb-2">All set!</h4>
            <p className="text-sm text-muted-foreground">
              No suggestions for this category right now
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {activeSuggestions?.map((suggestion) => (
              <div key={suggestion?.id} className="p-4 hover:bg-muted/30 spatial-transition">
                <div className="flex items-start space-x-3">
                  {/* Priority Indicator */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getPriorityBg(suggestion?.priority)}`}>
                    <Icon 
                      name={getTypeIcon(suggestion?.type)} 
                      size={16} 
                      color={`var(--color-${suggestion?.priority === 'high' ? 'error' : suggestion?.priority === 'medium' ? 'warning' : 'success'})`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-card-foreground mb-1">
                          {suggestion?.title}
                        </h4>
                        <div className="flex items-center space-x-2 text-xs">
                          <span className={`px-2 py-1 rounded-full ${getPriorityBg(suggestion?.priority)} ${getPriorityColor(suggestion?.priority)} font-medium`}>
                            {suggestion?.priority?.toUpperCase()}
                          </span>
                          <span className="text-muted-foreground">
                            {suggestion?.estimated_time}
                          </span>
                        </div>
                      </div>
                      
                      <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                        <Icon name={suggestion?.icon} size={16} color="var(--color-muted-foreground)" />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-3">
                      {suggestion?.description}
                    </p>

                    {/* Reasoning */}
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-3">
                      <Icon name="Info" size={12} />
                      <span>{suggestion?.reasoning}</span>
                    </div>

                    {/* Measurements Needed */}
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xs text-muted-foreground">Measurements needed:</span>
                      <div className="flex space-x-1">
                        {suggestion?.measurements_needed?.map((type) => (
                          <span
                            key={type}
                            className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => onSuggestionApply(suggestion)}
                        iconName="Play"
                        iconPosition="left"
                        className="confidence-scale"
                      >
                        {suggestion?.action}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onSuggestionDismiss(suggestion?.id)}
                        iconName="X"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Quick Stats */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <div className="font-semibold text-error">
              {suggestions?.furniture?.filter(s => s?.priority === 'high')?.length + 
               suggestions?.delivery?.filter(s => s?.priority === 'high')?.length + 
               suggestions?.layout?.filter(s => s?.priority === 'high')?.length}
            </div>
            <div className="text-muted-foreground">High Priority</div>
          </div>
          <div>
            <div className="font-semibold text-warning">
              {suggestions?.furniture?.filter(s => s?.priority === 'medium')?.length + 
               suggestions?.delivery?.filter(s => s?.priority === 'medium')?.length + 
               suggestions?.layout?.filter(s => s?.priority === 'medium')?.length}
            </div>
            <div className="text-muted-foreground">Medium Priority</div>
          </div>
          <div>
            <div className="font-semibold text-success">
              {suggestions?.furniture?.filter(s => s?.priority === 'low')?.length + 
               suggestions?.delivery?.filter(s => s?.priority === 'low')?.length + 
               suggestions?.layout?.filter(s => s?.priority === 'low')?.length}
            </div>
            <div className="text-muted-foreground">Low Priority</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartSuggestions;
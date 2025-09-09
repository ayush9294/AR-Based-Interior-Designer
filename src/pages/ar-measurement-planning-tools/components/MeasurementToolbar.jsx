import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MeasurementToolbar = ({ 
  activeTool, 
  onToolChange, 
  onClearMeasurements, 
  onSaveMeasurements,
  measurementCount = 0,
  isARActive = false 
}) => {
  const [showTooltip, setShowTooltip] = useState(null);

  const tools = [
    {
      id: 'ruler',
      name: 'Linear Measure',
      icon: 'Ruler',
      description: 'Measure distances and lengths',
      shortcut: 'L'
    },
    {
      id: 'area',
      name: 'Area Measure',
      icon: 'Square',
      description: 'Calculate room and surface areas',
      shortcut: 'A'
    },
    {
      id: 'height',
      name: 'Height Measure',
      icon: 'ArrowUpDown',
      description: 'Measure ceiling heights and vertical distances',
      shortcut: 'H'
    },
    {
      id: 'angle',
      name: 'Angle Measure',
      icon: 'Triangle',
      description: 'Measure angles and corners',
      shortcut: 'G'
    },
    {
      id: 'doorway',
      name: 'Doorway Scanner',
      icon: 'DoorOpen',
      description: 'Scan doorways for furniture delivery',
      shortcut: 'D'
    },
    {
      id: 'outlet',
      name: 'Outlet Detector',
      icon: 'Zap',
      description: 'Mark electrical outlets and switches',
      shortcut: 'E'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-spatial-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Ruler" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">Measurement Tools</h3>
            <p className="text-sm text-muted-foreground">
              {measurementCount} measurements taken
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {measurementCount > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                iconName="Save"
                iconPosition="left"
                onClick={onSaveMeasurements}
                className="confidence-scale"
              >
                Save
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                onClick={onClearMeasurements}
                className="text-error hover:text-error hover:bg-error/10"
              />
            </>
          )}
        </div>
      </div>
      {/* AR Status Indicator */}
      {isARActive && (
        <div className="mb-4 p-3 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-success">AR Camera Active</span>
            <span className="text-xs text-success/80">Point camera at surfaces to measure</span>
          </div>
        </div>
      )}
      {/* Tool Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {tools?.map((tool) => (
          <div
            key={tool?.id}
            className="relative"
            onMouseEnter={() => setShowTooltip(tool?.id)}
            onMouseLeave={() => setShowTooltip(null)}
          >
            <Button
              variant={activeTool === tool?.id ? "default" : "outline"}
              className={`w-full h-20 flex-col space-y-2 relative ${
                activeTool === tool?.id 
                  ? 'bg-primary text-primary-foreground shadow-spatial-sm' 
                  : 'hover:bg-muted'
              }`}
              onClick={() => onToolChange(tool?.id)}
            >
              <Icon 
                name={tool?.icon} 
                size={24} 
                color="currentColor"
                strokeWidth={activeTool === tool?.id ? 2.5 : 2}
              />
              <span className="text-xs font-medium text-center leading-tight">
                {tool?.name}
              </span>
              
              {/* Keyboard Shortcut */}
              <div className="absolute top-1 right-1 w-5 h-5 bg-background/80 rounded text-xs flex items-center justify-center text-muted-foreground">
                {tool?.shortcut}
              </div>
            </Button>

            {/* Tooltip */}
            {showTooltip === tool?.id && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-md shadow-modal whitespace-nowrap z-50">
                {tool?.description}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground spatial-transition">
              <Icon name="Settings" size={16} />
              <span>Units: ft/in</span>
            </button>
            <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground spatial-transition">
              <Icon name="Target" size={16} />
              <span>Precision: High</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="Smartphone" size={14} />
            <span>Tap & hold to measure</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementToolbar;
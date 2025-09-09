import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MeasurementHistory = ({ 
  measurements = [], 
  onMeasurementSelect, 
  onMeasurementDelete,
  onExportMeasurements,
  selectedMeasurement 
}) => {
  const [sortBy, setSortBy] = useState('date'); // 'date', 'type', 'room'
  const [filterType, setFilterType] = useState('all');

  // Mock measurement history data
  const mockMeasurements = measurements?.length > 0 ? measurements : [
    {
      id: 1,
      type: 'linear',
      value: 12.5,
      unit: 'ft',
      label: 'Living Room - North Wall',
      room: 'Living Room',
      timestamp: new Date('2025-01-04T10:30:00'),
      accuracy: 98.5,
      notes: 'Main wall for sofa placement'
    },
    {
      id: 2,
      type: 'area',
      value: 156.8,
      unit: 'sq ft',
      label: 'Living Room - Total Area',
      room: 'Living Room',
      timestamp: new Date('2025-01-04T10:35:00'),
      accuracy: 96.2,
      notes: 'Excluding kitchen island area'
    },
    {
      id: 3,
      type: 'height',
      value: 9.2,
      unit: 'ft',
      label: 'Living Room - Ceiling Height',
      room: 'Living Room',
      timestamp: new Date('2025-01-04T10:40:00'),
      accuracy: 99.1,
      notes: 'Standard ceiling height'
    },
    {
      id: 4,
      type: 'linear',
      value: 36,
      unit: 'in',
      label: 'Front Door - Width',
      room: 'Entryway',
      timestamp: new Date('2025-01-03T14:20:00'),
      accuracy: 99.8,
      notes: 'For furniture delivery planning'
    },
    {
      id: 5,
      type: 'doorway',
      value: 32,
      unit: 'in',
      label: 'Bedroom Door - Clear Width',
      room: 'Bedroom',
      timestamp: new Date('2025-01-03T16:45:00'),
      accuracy: 97.3,
      notes: 'Narrowest point for large furniture'
    },
    {
      id: 6,
      type: 'angle',
      value: 92,
      unit: '°',
      label: 'Kitchen Corner - Wall Angle',
      room: 'Kitchen',
      timestamp: new Date('2025-01-02T09:15:00'),
      accuracy: 94.7,
      notes: 'Slightly off square - affects cabinet fit'
    }
  ];

  const measurementTypes = [
    { value: 'all', label: 'All Types', icon: 'Layers' },
    { value: 'linear', label: 'Linear', icon: 'Ruler' },
    { value: 'area', label: 'Area', icon: 'Square' },
    { value: 'height', label: 'Height', icon: 'ArrowUpDown' },
    { value: 'angle', label: 'Angle', icon: 'Triangle' },
    { value: 'doorway', label: 'Doorway', icon: 'DoorOpen' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Date', icon: 'Calendar' },
    { value: 'type', label: 'Type', icon: 'Filter' },
    { value: 'room', label: 'Room', icon: 'Home' },
    { value: 'accuracy', label: 'Accuracy', icon: 'Target' }
  ];

  const filteredMeasurements = mockMeasurements?.filter(m => filterType === 'all' || m?.type === filterType)?.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.timestamp) - new Date(a.timestamp);
        case 'type':
          return a?.type?.localeCompare(b?.type);
        case 'room':
          return a?.room?.localeCompare(b?.room);
        case 'accuracy':
          return b?.accuracy - a?.accuracy;
        default:
          return 0;
      }
    });

  const getTypeIcon = (type) => {
    const typeMap = {
      linear: 'Ruler',
      area: 'Square',
      height: 'ArrowUpDown',
      angle: 'Triangle',
      doorway: 'DoorOpen',
      outlet: 'Zap'
    };
    return typeMap?.[type] || 'Ruler';
  };

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 98) return 'text-success';
    if (accuracy >= 95) return 'text-warning';
    return 'text-error';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return timestamp?.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-spatial-sm">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="History" size={20} color="var(--color-secondary)" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground">Measurement History</h3>
              <p className="text-sm text-muted-foreground">
                {filteredMeasurements?.length} measurements saved
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={onExportMeasurements}
            className="confidence-scale"
          >
            Export
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-muted-foreground">Filter:</span>
          </div>
          {measurementTypes?.map((type) => (
            <Button
              key={type?.value}
              variant={filterType === type?.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType(type?.value)}
              iconName={type?.icon}
              iconPosition="left"
              className="text-xs"
            >
              {type?.label}
            </Button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <Icon name="ArrowUpDown" size={16} color="var(--color-muted-foreground)" />
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <div className="flex space-x-1">
            {sortOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={sortBy === option?.value ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSortBy(option?.value)}
                iconName={option?.icon}
                iconPosition="left"
                className="text-xs"
              >
                {option?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Measurements List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredMeasurements?.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Ruler" size={24} color="var(--color-muted-foreground)" />
            </div>
            <h4 className="font-medium text-card-foreground mb-2">No measurements found</h4>
            <p className="text-sm text-muted-foreground">
              Start measuring your space to see history here
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredMeasurements?.map((measurement) => (
              <div
                key={measurement?.id}
                className={`p-4 hover:bg-muted/50 spatial-transition cursor-pointer ${
                  selectedMeasurement === measurement?.id ? 'bg-accent/10 border-l-4 border-l-accent' : ''
                }`}
                onClick={() => onMeasurementSelect(measurement?.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      selectedMeasurement === measurement?.id 
                        ? 'bg-accent text-accent-foreground' 
                        : 'bg-muted'
                    }`}>
                      <Icon 
                        name={getTypeIcon(measurement?.type)} 
                        size={16} 
                        color="currentColor" 
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-card-foreground truncate">
                          {measurement?.label}
                        </h4>
                        <span className="text-lg font-semibold text-primary">
                          {measurement?.value}{measurement?.unit}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center space-x-1">
                          <Icon name="Home" size={14} />
                          <span>{measurement?.room}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={14} />
                          <span>{formatTimestamp(measurement?.timestamp)}</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${getAccuracyColor(measurement?.accuracy)}`}>
                          <Icon name="Target" size={14} />
                          <span>{measurement?.accuracy}% accurate</span>
                        </div>
                      </div>
                      
                      {measurement?.notes && (
                        <p className="text-sm text-muted-foreground italic">
                          {measurement?.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 ml-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onMeasurementSelect(measurement?.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 spatial-transition"
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onMeasurementDelete(measurement?.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 spatial-transition text-error hover:text-error hover:bg-error/10"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Summary Stats */}
      {filteredMeasurements?.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-card-foreground">
                {filteredMeasurements?.length}
              </div>
              <div className="text-muted-foreground">Total</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-card-foreground">
                {Math.round(filteredMeasurements?.reduce((acc, m) => acc + m?.accuracy, 0) / filteredMeasurements?.length)}%
              </div>
              <div className="text-muted-foreground">Avg Accuracy</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-card-foreground">
                {new Set(filteredMeasurements.map(m => m.room))?.size}
              </div>
              <div className="text-muted-foreground">Rooms</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-card-foreground">
                {formatTimestamp(new Date(Math.max(...filteredMeasurements.map(m => m.timestamp))))}
              </div>
              <div className="text-muted-foreground">Last Updated</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeasurementHistory;
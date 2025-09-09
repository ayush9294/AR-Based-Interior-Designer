import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RoomPlannerCanvas = ({ 
  measurements = [], 
  onMeasurementSelect, 
  selectedMeasurement,
  roomData = null 
}) => {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [viewMode, setViewMode] = useState('2d'); // '2d' or '3d'
  const [showGrid, setShowGrid] = useState(true);
  const [scale, setScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  // Mock room data for demonstration
  const mockRoomData = roomData || {
    walls: [
      { id: 1, start: { x: 50, y: 50 }, end: { x: 350, y: 50 }, length: 12.5 },
      { id: 2, start: { x: 350, y: 50 }, end: { x: 350, y: 250 }, length: 8.3 },
      { id: 3, start: { x: 350, y: 250 }, end: { x: 50, y: 250 }, length: 12.5 },
      { id: 4, start: { x: 50, y: 250 }, end: { x: 50, y: 50 }, length: 8.3 }
    ],
    doors: [
      { id: 1, position: { x: 200, y: 50 }, width: 36, type: 'entry' }
    ],
    windows: [
      { id: 1, position: { x: 350, y: 150 }, width: 48, height: 36 }
    ],
    outlets: [
      { id: 1, position: { x: 100, y: 250 }, type: 'standard' },
      { id: 2, position: { x: 300, y: 250 }, type: 'standard' },
      { id: 3, position: { x: 350, y: 200 }, type: 'usb' }
    ]
  };

  const mockMeasurements = measurements?.length > 0 ? measurements : [
    { id: 1, type: 'linear', start: { x: 50, y: 50 }, end: { x: 350, y: 50 }, value: 12.5, unit: 'ft', label: 'North Wall' },
    { id: 2, type: 'linear', start: { x: 350, y: 50 }, end: { x: 350, y: 250 }, value: 8.3, unit: 'ft', label: 'East Wall' },
    { id: 3, type: 'area', bounds: { x: 50, y: 50, width: 300, height: 200 }, value: 103.75, unit: 'sq ft', label: 'Room Area' },
    { id: 4, type: 'height', position: { x: 200, y: 150 }, value: 9.2, unit: 'ft', label: 'Ceiling Height' }
  ];

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

    // Apply transformations
    ctx?.save();
    ctx?.translate(panOffset?.x, panOffset?.y);
    ctx?.scale(scale, scale);

    // Draw grid
    if (showGrid) {
      drawGrid(ctx, canvas?.width, canvas?.height);
    }

    // Draw room outline
    drawRoom(ctx, mockRoomData);

    // Draw measurements
    drawMeasurements(ctx, mockMeasurements);

    ctx?.restore();
  }, [scale, panOffset, showGrid, selectedMeasurement]);

  const drawGrid = (ctx, width, height) => {
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 0.5;
    
    const gridSize = 20;
    for (let x = 0; x <= width; x += gridSize) {
      ctx?.beginPath();
      ctx?.moveTo(x, 0);
      ctx?.lineTo(x, height);
      ctx?.stroke();
    }
    
    for (let y = 0; y <= height; y += gridSize) {
      ctx?.beginPath();
      ctx?.moveTo(0, y);
      ctx?.lineTo(width, y);
      ctx?.stroke();
    }
  };

  const drawRoom = (ctx, room) => {
    // Draw walls
    ctx.strokeStyle = '#1A202C';
    ctx.lineWidth = 3;
    ctx?.beginPath();
    
    room?.walls?.forEach((wall, index) => {
      if (index === 0) {
        ctx?.moveTo(wall?.start?.x, wall?.start?.y);
      }
      ctx?.lineTo(wall?.end?.x, wall?.end?.y);
    });
    
    ctx?.closePath();
    ctx?.stroke();

    // Fill room area
    ctx.fillStyle = 'rgba(66, 153, 225, 0.1)';
    ctx?.fill();

    // Draw doors
    ctx.strokeStyle = '#D69E2E';
    ctx.lineWidth = 4;
    room?.doors?.forEach(door => {
      ctx?.beginPath();
      ctx?.moveTo(door?.position?.x - door?.width/2, door?.position?.y);
      ctx?.lineTo(door?.position?.x + door?.width/2, door?.position?.y);
      ctx?.stroke();
    });

    // Draw windows
    ctx.strokeStyle = '#3182CE';
    ctx.lineWidth = 3;
    room?.windows?.forEach(window => {
      ctx?.beginPath();
      ctx?.rect(
        window?.position?.x - window?.width/2, 
        window?.position?.y - window?.height/2, 
        window?.width, 
        window?.height
      );
      ctx?.stroke();
    });

    // Draw outlets
    ctx.fillStyle = '#E53E3E';
    room?.outlets?.forEach(outlet => {
      ctx?.beginPath();
      ctx?.arc(outlet?.position?.x, outlet?.position?.y, 4, 0, 2 * Math.PI);
      ctx?.fill();
    });
  };

  const drawMeasurements = (ctx, measurements) => {
    measurements?.forEach(measurement => {
      const isSelected = selectedMeasurement === measurement?.id;
      
      ctx.strokeStyle = isSelected ? '#E53E3E' : '#38A169';
      ctx.fillStyle = isSelected ? '#E53E3E' : '#38A169';
      ctx.lineWidth = isSelected ? 2 : 1;

      if (measurement?.type === 'linear') {
        // Draw measurement line
        ctx?.beginPath();
        ctx?.moveTo(measurement?.start?.x, measurement?.start?.y);
        ctx?.lineTo(measurement?.end?.x, measurement?.end?.y);
        ctx?.stroke();

        // Draw end points
        ctx?.beginPath();
        ctx?.arc(measurement?.start?.x, measurement?.start?.y, 3, 0, 2 * Math.PI);
        ctx?.fill();
        
        ctx?.beginPath();
        ctx?.arc(measurement?.end?.x, measurement?.end?.y, 3, 0, 2 * Math.PI);
        ctx?.fill();

        // Draw label
        const midX = (measurement?.start?.x + measurement?.end?.x) / 2;
        const midY = (measurement?.start?.y + measurement?.end?.y) / 2;
        
        ctx.fillStyle = '#FFFFFF';
        ctx?.fillRect(midX - 25, midY - 10, 50, 20);
        ctx?.strokeRect(midX - 25, midY - 10, 50, 20);
        
        ctx.fillStyle = isSelected ? '#E53E3E' : '#38A169';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx?.fillText(`${measurement?.value}${measurement?.unit}`, midX, midY + 4);
      }

      if (measurement?.type === 'area') {
        // Draw area outline
        ctx.strokeStyle = isSelected ? '#E53E3E' : '#4299E1';
        ctx.fillStyle = isSelected ? 'rgba(229, 62, 62, 0.1)' : 'rgba(66, 153, 225, 0.1)';
        
        ctx?.beginPath();
        ctx?.rect(
          measurement?.bounds?.x, 
          measurement?.bounds?.y, 
          measurement?.bounds?.width, 
          measurement?.bounds?.height
        );
        ctx?.fill();
        ctx?.stroke();

        // Draw label
        const centerX = measurement?.bounds?.x + measurement?.bounds?.width / 2;
        const centerY = measurement?.bounds?.y + measurement?.bounds?.height / 2;
        
        ctx.fillStyle = '#FFFFFF';
        ctx?.fillRect(centerX - 35, centerY - 10, 70, 20);
        ctx?.strokeRect(centerX - 35, centerY - 10, 70, 20);
        
        ctx.fillStyle = isSelected ? '#E53E3E' : '#4299E1';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx?.fillText(`${measurement?.value} ${measurement?.unit}`, centerX, centerY + 4);
      }
    });
  };

  const handleCanvasClick = (event) => {
    const canvas = canvasRef?.current;
    const rect = canvas?.getBoundingClientRect();
    let x = (event?.clientX - rect?.left - panOffset?.x) / scale;
    let y = (event?.clientY - rect?.top - panOffset?.y) / scale;

    // Check if click is on a measurement
    mockMeasurements?.forEach(measurement => {
      if (measurement?.type === 'linear') {
        const distance = distanceToLine(
          { x, y }, 
          measurement?.start, 
          measurement?.end
        );
        if (distance < 10) {
          onMeasurementSelect(measurement?.id);
        }
      }
    });
  };

  const distanceToLine = (point, lineStart, lineEnd) => {
    const A = point?.x - lineStart?.x;
    const B = point?.y - lineStart?.y;
    const C = lineEnd?.x - lineStart?.x;
    const D = lineEnd?.y - lineStart?.y;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    if (lenSq !== 0) param = dot / lenSq;

    let xx, yy;
    if (param < 0) {
      xx = lineStart?.x;
      yy = lineStart?.y;
    } else if (param > 1) {
      xx = lineEnd?.x;
      yy = lineEnd?.y;
    } else {
      xx = lineStart?.x + param * C;
      yy = lineStart?.y + param * D;
    }

    const dx = point?.x - xx;
    const dy = point?.y - yy;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleZoom = (direction) => {
    const newScale = direction === 'in' ? scale * 1.2 : scale / 1.2;
    setScale(Math.max(0.5, Math.min(3, newScale)));
  };

  const resetView = () => {
    setScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-spatial-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Layout" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground">Room Planner</h3>
              <p className="text-sm text-muted-foreground">
                Interactive floor plan with measurements
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === '2d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('2d')}
            >
              2D
            </Button>
            <Button
              variant={viewMode === '3d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('3d')}
            >
              3D
            </Button>
          </div>
        </div>
      </div>
      {/* Canvas Container */}
      <div className="relative bg-background">
        <canvas
          ref={canvasRef}
          width={canvasSize?.width}
          height={canvasSize?.height}
          className="w-full h-96 cursor-crosshair"
          onClick={handleCanvasClick}
        />

        {/* Canvas Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleZoom('in')}
            className="bg-background/90 backdrop-blur-sm"
          >
            <Icon name="ZoomIn" size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleZoom('out')}
            className="bg-background/90 backdrop-blur-sm"
          >
            <Icon name="ZoomOut" size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={resetView}
            className="bg-background/90 backdrop-blur-sm"
          >
            <Icon name="Home" size={16} />
          </Button>
        </div>

        {/* View Options */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          <Button
            variant={showGrid ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowGrid(!showGrid)}
            className="bg-background/90 backdrop-blur-sm"
            iconName="Grid3X3"
            iconPosition="left"
          >
            Grid
          </Button>
          
          <div className="text-xs text-muted-foreground bg-background/90 backdrop-blur-sm px-2 py-1 rounded">
            Scale: {Math.round(scale * 100)}%
          </div>
        </div>
      </div>
      {/* Legend */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-1 bg-foreground"></div>
            <span className="text-muted-foreground">Walls</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-1 bg-warning"></div>
            <span className="text-muted-foreground">Doors</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-1 bg-accent"></div>
            <span className="text-muted-foreground">Windows</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-error rounded-full"></div>
            <span className="text-muted-foreground">Outlets</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPlannerCanvas;
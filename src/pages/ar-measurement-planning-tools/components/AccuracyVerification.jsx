import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccuracyVerification = ({ 
  measurements = [],
  onVerificationRequest,
  onRecalibrate,
  onProfessionalService 
}) => {
  const [selectedMeasurement, setSelectedMeasurement] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Mock accuracy data
  const accuracyData = {
    overall: 97.2,
    byType: {
      linear: 98.5,
      area: 96.2,
      height: 99.1,
      angle: 94.7,
      doorway: 97.3
    },
    confidence: 'high',
    lastCalibration: new Date('2025-01-04T08:00:00'),
    deviceInfo: {
      camera: 'iPhone 15 Pro - LiDAR Enhanced',
      sensors: ['Accelerometer', 'Gyroscope', 'LiDAR'],
      lighting: 'Good (850 lux)',
      stability: 'Excellent'
    },
    verificationMethods: [
      {
        id: 1,
        name: 'Cross-Reference Measurement',
        description: 'Measure the same distance from different angles',
        accuracy: '+/- 0.5 inches',
        time: '30 seconds',
        icon: 'RotateCcw'
      },
      {
        id: 2,
        name: 'Physical Tape Verification',
        description: 'Compare with traditional measuring tape',
        accuracy: '+/- 0.25 inches',
        time: '2 minutes',
        icon: 'Ruler'
      },
      {
        id: 3,
        name: 'Multi-Point Calibration',
        description: 'Use known reference objects for calibration',
        accuracy: '+/- 0.1 inches',
        time: '5 minutes',
        icon: 'Target'
      }
    ]
  };

  const mockMeasurements = measurements?.length > 0 ? measurements : [
    {
      id: 1,
      label: 'Living Room - North Wall',
      value: 12.5,
      unit: 'ft',
      accuracy: 98.5,
      confidence: 'high',
      method: 'AR + LiDAR',
      verifications: 2,
      lastVerified: new Date('2025-01-04T10:30:00')
    },
    {
      id: 2,
      label: 'Living Room - Total Area',
      value: 156.8,
      unit: 'sq ft',
      accuracy: 96.2,
      confidence: 'medium',
      method: 'AR Calculation',
      verifications: 1,
      lastVerified: new Date('2025-01-04T10:35:00')
    },
    {
      id: 3,
      label: 'Front Door - Width',
      value: 36,
      unit: 'in',
      accuracy: 99.8,
      confidence: 'high',
      method: 'LiDAR Direct',
      verifications: 3,
      lastVerified: new Date('2025-01-03T14:20:00')
    }
  ];

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 98) return 'text-success';
    if (accuracy >= 95) return 'text-warning';
    return 'text-error';
  };

  const getAccuracyBg = (accuracy) => {
    if (accuracy >= 98) return 'bg-success/10 border-success/20';
    if (accuracy >= 95) return 'bg-warning/10 border-warning/20';
    return 'bg-error/10 border-error/20';
  };

  const getConfidenceIcon = (confidence) => {
    switch (confidence) {
      case 'high': return 'CheckCircle';
      case 'medium': return 'AlertCircle';
      case 'low': return 'XCircle';
      default: return 'HelpCircle';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-spatial-sm">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={20} color="var(--color-success)" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground">Accuracy Verification</h3>
              <p className="text-sm text-muted-foreground">
                Overall accuracy: {accuracyData?.overall}%
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={onRecalibrate}
            >
              Recalibrate
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName={showDetails ? "ChevronUp" : "ChevronDown"}
              onClick={() => setShowDetails(!showDetails)}
            />
          </div>
        </div>

        {/* Overall Status */}
        <div className={`p-3 rounded-lg border ${getAccuracyBg(accuracyData?.overall)}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon 
                name={getConfidenceIcon(accuracyData?.confidence)} 
                size={20} 
                color={`var(--color-${accuracyData?.overall >= 98 ? 'success' : accuracyData?.overall >= 95 ? 'warning' : 'error'})`}
              />
              <span className="font-medium text-card-foreground">
                {accuracyData?.confidence?.charAt(0)?.toUpperCase() + accuracyData?.confidence?.slice(1)} Confidence
              </span>
            </div>
            <div className="text-right">
              <div className={`text-lg font-bold ${getAccuracyColor(accuracyData?.overall)}`}>
                {accuracyData?.overall}%
              </div>
              <div className="text-xs text-muted-foreground">
                Last calibrated {formatTimestamp(accuracyData?.lastCalibration)}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Detailed Information */}
      {showDetails && (
        <div className="p-4 border-b border-border bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Device Info */}
            <div>
              <h4 className="font-medium text-card-foreground mb-2">Device Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Camera:</span>
                  <span className="text-card-foreground">{accuracyData?.deviceInfo?.camera}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lighting:</span>
                  <span className="text-card-foreground">{accuracyData?.deviceInfo?.lighting}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stability:</span>
                  <span className="text-card-foreground">{accuracyData?.deviceInfo?.stability}</span>
                </div>
              </div>
            </div>

            {/* Accuracy by Type */}
            <div>
              <h4 className="font-medium text-card-foreground mb-2">Accuracy by Type</h4>
              <div className="space-y-2">
                {Object.entries(accuracyData?.byType)?.map(([type, accuracy]) => (
                  <div key={type} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground capitalize">{type}:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            accuracy >= 98 ? 'bg-success' : accuracy >= 95 ? 'bg-warning' : 'bg-error'
                          }`}
                          style={{ width: `${accuracy}%` }}
                        />
                      </div>
                      <span className={`font-medium ${getAccuracyColor(accuracy)}`}>
                        {accuracy}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sensors */}
          <div className="mb-4">
            <h4 className="font-medium text-card-foreground mb-2">Active Sensors</h4>
            <div className="flex flex-wrap gap-2">
              {accuracyData?.deviceInfo?.sensors?.map((sensor) => (
                <span
                  key={sensor}
                  className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
                >
                  {sensor}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Verification Methods */}
      <div className="p-4 border-b border-border">
        <h4 className="font-medium text-card-foreground mb-3">Verification Methods</h4>
        <div className="grid gap-3">
          {accuracyData?.verificationMethods?.map((method) => (
            <div
              key={method?.id}
              className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/30 spatial-transition"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name={method?.icon} size={16} color="var(--color-accent)" />
                </div>
                <div>
                  <h5 className="font-medium text-card-foreground">{method?.name}</h5>
                  <p className="text-sm text-muted-foreground">{method?.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                    <span>Accuracy: {method?.accuracy}</span>
                    <span>Time: {method?.time}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onVerificationRequest(method)}
                className="confidence-scale"
              >
                Start
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Measurement Verification Status */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-card-foreground">Recent Measurements</h4>
          <Button
            variant="outline"
            size="sm"
            iconName="UserCheck"
            iconPosition="left"
            onClick={onProfessionalService}
          >
            Professional Verification
          </Button>
        </div>

        <div className="space-y-2">
          {mockMeasurements?.map((measurement) => (
            <div
              key={measurement?.id}
              className={`p-3 border rounded-lg spatial-transition cursor-pointer ${
                selectedMeasurement === measurement?.id 
                  ? 'border-accent bg-accent/5' :'border-border hover:bg-muted/30'
              }`}
              onClick={() => setSelectedMeasurement(
                selectedMeasurement === measurement?.id ? null : measurement?.id
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={getConfidenceIcon(measurement?.confidence)} 
                    size={16} 
                    color={`var(--color-${measurement?.accuracy >= 98 ? 'success' : measurement?.accuracy >= 95 ? 'warning' : 'error'})`}
                  />
                  <div>
                    <div className="font-medium text-card-foreground">
                      {measurement?.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {measurement?.value}{measurement?.unit} • {measurement?.method}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`font-semibold ${getAccuracyColor(measurement?.accuracy)}`}>
                    {measurement?.accuracy}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {measurement?.verifications} verifications
                  </div>
                </div>
              </div>

              {selectedMeasurement === measurement?.id && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Last verified:</span>
                      <div className="font-medium">{formatTimestamp(measurement?.lastVerified)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Confidence:</span>
                      <div className="font-medium capitalize">{measurement?.confidence}</div>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="RotateCcw"
                      iconPosition="left"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onVerificationRequest({ measurementId: measurement?.id });
                      }}
                    >
                      Re-verify
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={(e) => {
                        e?.stopPropagation();
                        // Show measurement details
                      }}
                    >
                      Details
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Professional Service CTA */}
      <div className="p-4 border-t border-border bg-gradient-to-r from-accent/5 to-primary/5">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-card-foreground">Need Higher Precision?</h4>
            <p className="text-sm text-muted-foreground">
              Professional measurement service available for critical purchases
            </p>
          </div>
          <Button
            variant="default"
            size="sm"
            iconName="UserCheck"
            iconPosition="left"
            onClick={onProfessionalService}
            className="bg-cta hover:bg-cta/90 text-cta-foreground confidence-scale"
          >
            Book Service
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccuracyVerification;
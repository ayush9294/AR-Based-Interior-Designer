import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';

// Import components
import MeasurementToolbar from './components/MeasurementToolbar';
import RoomPlannerCanvas from './components/RoomPlannerCanvas';
import MeasurementHistory from './components/MeasurementHistory';
import SmartSuggestions from './components/SmartSuggestions';
import AccuracyVerification from './components/AccuracyVerification';

const ARMeasurementPlanningTools = () => {
  const [activeTool, setActiveTool] = useState('ruler');
  const [isARActive, setIsARActive] = useState(false);
  const [measurements, setMeasurements] = useState([]);
  const [selectedMeasurement, setSelectedMeasurement] = useState(null);
  const [showARCamera, setShowARCamera] = useState(false);
  const [currentRoom, setCurrentRoom] = useState('living-room');

  // Mock state for demonstration
  const [measurementCount, setMeasurementCount] = useState(6);

  useEffect(() => {
    // Simulate AR camera initialization
    if (showARCamera) {
      setIsARActive(true);
      // Auto-hide after demo
      setTimeout(() => {
        setShowARCamera(false);
        setIsARActive(false);
      }, 5000);
    }
  }, [showARCamera]);

  const handleToolChange = (toolId) => {
    setActiveTool(toolId);
    if (!isARActive && toolId !== 'ruler') {
      setShowARCamera(true);
    }
  };

  const handleClearMeasurements = () => {
    setMeasurements([]);
    setMeasurementCount(0);
    setSelectedMeasurement(null);
  };

  const handleSaveMeasurements = () => {
    // Mock save functionality
    console.log('Measurements saved');
  };

  const handleMeasurementSelect = (measurementId) => {
    setSelectedMeasurement(measurementId === selectedMeasurement ? null : measurementId);
  };

  const handleMeasurementDelete = (measurementId) => {
    setMeasurements(prev => prev?.filter(m => m?.id !== measurementId));
    setMeasurementCount(prev => Math.max(0, prev - 1));
    if (selectedMeasurement === measurementId) {
      setSelectedMeasurement(null);
    }
  };

  const handleExportMeasurements = () => {
    // Mock export functionality
    console.log('Exporting measurements...');
  };

  const handleSuggestionApply = (suggestion) => {
    setActiveTool(suggestion?.measurements_needed?.[0] || 'ruler');
    setShowARCamera(true);
  };

  const handleSuggestionDismiss = (suggestionId) => {
    console.log('Dismissed suggestion:', suggestionId);
  };

  const handleVerificationRequest = (method) => {
    console.log('Starting verification:', method);
    setShowARCamera(true);
  };

  const handleRecalibrate = () => {
    setShowARCamera(true);
  };

  const handleProfessionalService = () => {
    console.log('Booking professional service...');
  };

  const startARMeasurement = () => {
    setShowARCamera(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* AR Camera Overlay */}
      {showARCamera && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-24 h-24 border-4 border-white rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Icon name="Camera" size={32} color="white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AR Camera Active</h3>
            <p className="text-white/80 mb-4">Point your camera at the surface to measure</p>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm">Scanning environment...</span>
            </div>
            <Button
              variant="outline"
              className="mt-6 border-white text-white hover:bg-white hover:text-black"
              onClick={() => setShowARCamera(false)}
            >
              Close Camera
            </Button>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-spatial-sm">
                <Icon name="Ruler" size={32} color="white" strokeWidth={2.5} />
              </div>
              <div className="w-2 h-2 bg-cta rounded-full animate-pulse"></div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              AR Measurement & Planning Tools
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transform your smartphone into a professional-grade spatial analysis tool with contractor-level accuracy and intelligent planning features.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                variant="default"
                size="lg"
                onClick={startARMeasurement}
                iconName="Camera"
                iconPosition="left"
                className="bg-cta hover:bg-cta/90 text-cta-foreground confidence-scale"
              >
                Start AR Measurement
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="confidence-scale"
              >
                Watch Tutorial
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">±0.5"</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">2M+</div>
              <div className="text-sm text-muted-foreground">Rooms Measured</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">30s</div>
              <div className="text-sm text-muted-foreground">Average Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">99.2%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Tools & History */}
            <div className="space-y-6">
              {/* Measurement Toolbar */}
              <MeasurementToolbar
                activeTool={activeTool}
                onToolChange={handleToolChange}
                onClearMeasurements={handleClearMeasurements}
                onSaveMeasurements={handleSaveMeasurements}
                measurementCount={measurementCount}
                isARActive={isARActive}
              />

              {/* Smart Suggestions */}
              <SmartSuggestions
                roomType={currentRoom}
                measurements={measurements}
                onSuggestionApply={handleSuggestionApply}
                onSuggestionDismiss={handleSuggestionDismiss}
              />
            </div>

            {/* Center Column - Room Planner */}
            <div className="space-y-6">
              <RoomPlannerCanvas
                measurements={measurements}
                onMeasurementSelect={handleMeasurementSelect}
                selectedMeasurement={selectedMeasurement}
              />

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Download"
                  iconPosition="left"
                  onClick={handleExportMeasurements}
                  className="confidence-scale"
                >
                  Export Plan
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Share"
                  iconPosition="left"
                  className="confidence-scale"
                >
                  Share Measurements
                </Button>
              </div>
            </div>

            {/* Right Column - History & Verification */}
            <div className="space-y-6">
              {/* Measurement History */}
              <MeasurementHistory
                measurements={measurements}
                onMeasurementSelect={handleMeasurementSelect}
                onMeasurementDelete={handleMeasurementDelete}
                onExportMeasurements={handleExportMeasurements}
                selectedMeasurement={selectedMeasurement}
              />

              {/* Accuracy Verification */}
              <AccuracyVerification
                measurements={measurements}
                onVerificationRequest={handleVerificationRequest}
                onRecalibrate={handleRecalibrate}
                onProfessionalService={handleProfessionalService}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Professional-Grade Measurement Suite
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced computer vision and AI-powered analysis for accurate spatial documentation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'Ruler',
                title: 'Linear Measurements',
                description: 'Precise distance and length measurements with ±0.5" accuracy using advanced AR technology.',
                features: ['Wall lengths', 'Furniture dimensions', 'Clearance distances']
              },
              {
                icon: 'Square',
                title: 'Area Calculations',
                description: 'Automatic room area calculation with complex shape recognition and obstacle detection.',
                features: ['Room areas', 'Floor space', 'Wall surfaces']
              },
              {
                icon: 'ArrowUpDown',
                title: 'Height Detection',
                description: 'Ceiling height and vertical measurements using LiDAR and computer vision fusion.',
                features: ['Ceiling heights', 'Window heights', 'Vertical clearances']
              },
              {
                icon: 'DoorOpen',
                title: 'Doorway Scanner',
                description: 'Specialized tool for measuring doorways and delivery paths with furniture fit analysis.',
                features: ['Door widths', 'Delivery paths', 'Stair measurements']
              },
              {
                icon: 'Triangle',
                title: 'Angle Measurement',
                description: 'Precise angle detection for corners, walls, and architectural features.',
                features: ['Wall angles', 'Corner measurements', 'Slope detection']
              },
              {
                icon: 'Zap',
                title: 'Outlet Detection',
                description: 'Automatic detection and mapping of electrical outlets, switches, and fixtures.',
                features: ['Outlet locations', 'Switch positions', 'Fixture mapping']
              }
            ]?.map((feature, index) => (
              <div key={index} className="spatial-card p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name={feature?.icon} size={24} color="var(--color-accent)" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  {feature?.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {feature?.description}
                </p>
                <ul className="space-y-2">
                  {feature?.features?.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Check" size={16} color="var(--color-success)" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Integration Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Seamless ARSpace Integration
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your measurements automatically enhance every part of your design journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="spatial-card p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Sofa" size={24} color="var(--color-primary)" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-card-foreground">Smart Furniture Filtering</h3>
                  <p className="text-muted-foreground">Automatic compatibility checking</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Your room measurements automatically filter furniture catalogs to show only pieces that fit your space, including delivery path analysis.
              </p>
              <Link to="/smart-catalog-furniture-universe">
                <Button variant="outline" iconName="ArrowRight" iconPosition="right">
                  Browse Compatible Furniture
                </Button>
              </Link>
            </div>

            <div className="spatial-card p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Palette" size={24} color="var(--color-accent)" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-card-foreground">AI Design Optimization</h3>
                  <p className="text-muted-foreground">Personalized layout suggestions</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                AI design studio uses your measurements to generate optimized layouts with proper traffic flow and spatial relationships.
              </p>
              <Link to="/ai-design-studio-mood-generator">
                <Button variant="outline" iconName="ArrowRight" iconPosition="right">
                  Generate AI Layouts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Measure with Confidence?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join over 2 million users who trust ARSpace for accurate room measurements and smart furniture planning.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            <Button
              variant="default"
              size="lg"
              onClick={startARMeasurement}
              iconName="Camera"
              iconPosition="left"
              className="bg-cta hover:bg-cta/90 text-cta-foreground confidence-scale"
            >
              Start Measuring Now
            </Button>
            
            <Link to="/ar-camera-portal-homepage">
              <Button
                variant="outline"
                size="lg"
                iconName="Home"
                iconPosition="left"
                className="confidence-scale"
              >
                Back to AR Portal
              </Button>
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} color="var(--color-success)" />
              <span>99.2% Accuracy Rate</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} color="var(--color-success)" />
              <span>2M+ Rooms Measured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} color="var(--color-success)" />
              <span>4.9/5 User Rating</span>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Icon name="Cube" size={16} color="white" strokeWidth={2.5} />
              </div>
              <span className="font-semibold text-card-foreground">ARSpace Designer</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} ARSpace Designer. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ARMeasurementPlanningTools;
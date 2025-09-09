import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ARTutorialSection = ({ isVisible, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const tutorialSteps = [
    {
      id: 1,
      title: "Point Your Camera",
      description: "Hold your device steady and point the camera at your room. Make sure you have good lighting.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      icon: "Camera",
      duration: "5 seconds",
      tips: ["Ensure good lighting", "Hold device steady", "Point at floor area"]
    },
    {
      id: 2,
      title: "Scan the Floor",
      description: "Slowly move your camera across the floor to help AR detect the surface where furniture will be placed.",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?w=600&h=400&fit=crop",
      icon: "Move",
      duration: "10 seconds",
      tips: ["Move slowly", "Cover entire floor", "Keep camera angled down"]
    },
    {
      id: 3,
      title: "Place Furniture",
      description: "Tap anywhere on the detected surface to place furniture. Drag to move, pinch to resize, rotate with two fingers.",
      image: "https://images.pixabay.com/photo/2017/03/28/12/11/chairs-2181947_1280.jpg?w=600&h=400&fit=crop",
      icon: "Hand",
      duration: "15 seconds",
      tips: ["Tap to place", "Drag to move", "Pinch to resize", "Two fingers to rotate"]
    }
  ];

  const handleNext = () => {
    if (currentStep < tutorialSteps?.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const startDemo = () => {
    setIsPlaying(true);
    // Simulate demo completion after 3 seconds
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  if (!isVisible) return null;

  const currentTutorial = tutorialSteps?.[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md">
      <div className="bg-card border border-border rounded-2xl max-w-2xl mx-4 shadow-modal overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-accent to-cta p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="Camera" size={20} color="white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">AR Tutorial</h2>
                <p className="text-white/80 text-sm">Learn in 30 seconds</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center spatial-transition"
              aria-label="Close tutorial"
            >
              <Icon name="X" size={16} color="white" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-white/80 mb-2">
              <span>Step {currentStep + 1} of {tutorialSteps?.length}</span>
              <span>{currentTutorial?.duration}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 spatial-transition"
                style={{ width: `${((currentStep + 1) / tutorialSteps?.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image/Demo Area */}
            <div className="relative">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <Image
                  src={currentTutorial?.image}
                  alt={currentTutorial?.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Play Demo Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={startDemo}
                    disabled={isPlaying}
                    className="w-16 h-16 bg-cta hover:bg-cta/90 rounded-full flex items-center justify-center shadow-lg confidence-scale"
                  >
                    <Icon 
                      name={isPlaying ? "Loader2" : "Play"} 
                      size={24} 
                      color="white"
                      className={isPlaying ? "animate-spin" : ""}
                    />
                  </button>
                </div>
              </div>

              {/* Step Indicator */}
              <div className="absolute top-4 left-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg">
                  <Icon name={currentTutorial?.icon} size={20} color="white" />
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-card-foreground">
                  {currentTutorial?.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {currentTutorial?.description}
                </p>
              </div>

              {/* Tips */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-card-foreground">
                  Pro Tips:
                </h4>
                <ul className="space-y-1">
                  {currentTutorial?.tips?.map((tip, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                      <Icon name="Lightbulb" size={14} color="var(--color-warning)" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Demo Status */}
              {isPlaying && (
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-accent">
                    <Icon name="Play" size={16} color="currentColor" />
                    <span className="text-sm font-medium">Demo playing...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-muted/50 p-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {tutorialSteps?.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full spatial-transition ${
                    index === currentStep 
                      ? 'bg-accent w-6' 
                      : index < currentStep 
                        ? 'bg-success' :'bg-border'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
              >
                Skip Tutorial
              </Button>

              {currentStep > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  iconName="ChevronLeft"
                  iconPosition="left"
                >
                  Previous
                </Button>
              )}

              <Button
                variant="default"
                size="sm"
                onClick={handleNext}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                iconName={currentStep === tutorialSteps?.length - 1 ? "Check" : "ChevronRight"}
                iconPosition="right"
              >
                {currentStep === tutorialSteps?.length - 1 ? 'Start AR' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARTutorialSection;
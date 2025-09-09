import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ARHelpBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [showPulse, setShowPulse] = useState(true);

  const helpTips = [
    {
      id: 1,
      title: "Camera Not Working?",
      description: "Make sure you\'ve allowed camera permissions and have good lighting in your room.",
      icon: "Camera",
      solutions: [
        "Check browser camera permissions",
        "Ensure adequate room lighting",
        "Try refreshing the page",
        "Clear browser cache"
      ]
    },
    {
      id: 2,
      title: "AR Not Detecting Floor?",
      description: "Move your device slowly and point the camera at textured surfaces for better tracking.",
      icon: "Move",
      solutions: [
        "Point camera at textured surfaces",
        "Move device slowly in circular motion",
        "Avoid reflective surfaces",
        "Ensure stable hand movement"
      ]
    },
    {
      id: 3,
      title: "Furniture Looks Wrong?",
      description: "Furniture placement depends on proper surface detection. Try rescanning the area.",
      icon: "RotateCcw",
      solutions: [
        "Rescan the floor area",
        "Check room lighting",
        "Move closer to placement area",
        "Restart AR session"
      ]
    },
    {
      id: 4,
      title: "Performance Issues?",
      description: "AR requires significant processing power. Close other apps and ensure stable internet.",
      icon: "Zap",
      solutions: [
        "Close other browser tabs",
        "Ensure stable internet connection",
        "Lower AR quality in settings",
        "Restart your device"
      ]
    }
  ];

  useEffect(() => {
    // Show pulse animation for first 5 seconds
    const timer = setTimeout(() => {
      setShowPulse(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const toggleHelp = () => {
    setIsOpen(!isOpen);
    setShowPulse(false);
  };

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % helpTips?.length);
  };

  const previousTip = () => {
    setCurrentTip((prev) => (prev - 1 + helpTips?.length) % helpTips?.length);
  };

  const currentHelpTip = helpTips?.[currentTip];

  return (
    <>
      {/* Help Bubble Button */}
      <button
        onClick={toggleHelp}
        className={`fixed bottom-24 right-6 z-40 w-14 h-14 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full shadow-lg flex items-center justify-center spatial-transition ${
          showPulse ? 'animate-pulse' : ''
        }`}
        aria-label="AR Help & Troubleshooting"
      >
        <Icon name="HelpCircle" size={24} color="white" />
        
        {/* Notification Dot */}
        {showPulse && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-cta rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        )}
      </button>
      {/* Help Panel */}
      {isOpen && (
        <div className="fixed bottom-40 right-6 z-50 w-80 max-w-[calc(100vw-3rem)] bg-card border border-border rounded-xl shadow-modal overflow-hidden">
          {/* Header */}
          <div className="bg-accent text-accent-foreground p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="HelpCircle" size={20} color="white" />
                <h3 className="font-semibold">AR Troubleshooting</h3>
              </div>
              
              <button
                onClick={toggleHelp}
                className="w-6 h-6 hover:bg-white/20 rounded-full flex items-center justify-center spatial-transition"
                aria-label="Close help"
              >
                <Icon name="X" size={14} color="white" />
              </button>
            </div>
            
            {/* Tip Counter */}
            <div className="mt-2 text-sm text-accent-foreground/80">
              Tip {currentTip + 1} of {helpTips?.length}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Current Tip */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name={currentHelpTip?.icon} size={16} color="var(--color-accent)" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-card-foreground">
                    {currentHelpTip?.title}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {currentHelpTip?.description}
                  </p>
                </div>
              </div>

              {/* Solutions */}
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-card-foreground">
                  Try these solutions:
                </h5>
                <ul className="space-y-1">
                  {currentHelpTip?.solutions?.map((solution, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                      <Icon name="Check" size={14} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                      <span>{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={previousTip}
                iconName="ChevronLeft"
                iconPosition="left"
                disabled={currentTip === 0}
              >
                Previous
              </Button>

              {/* Dots Indicator */}
              <div className="flex space-x-1">
                {helpTips?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTip(index)}
                    className={`w-2 h-2 rounded-full spatial-transition ${
                      index === currentTip ? 'bg-accent' : 'bg-border hover:bg-muted-foreground'
                    }`}
                    aria-label={`Go to tip ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={nextTip}
                iconName="ChevronRight"
                iconPosition="right"
                disabled={currentTip === helpTips?.length - 1}
              >
                Next
              </Button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-muted/50 p-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="MessageCircle"
                iconPosition="left"
                className="confidence-scale"
              >
                Chat with Support
              </Button>
              
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1"
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Reset AR
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1"
                  iconName="Settings"
                  iconPosition="left"
                >
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-background/20 backdrop-blur-sm"
          onClick={toggleHelp}
        />
      )}
    </>
  );
};

export default ARHelpBubble;
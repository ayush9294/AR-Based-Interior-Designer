import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = ({ onStartScan, isScanning }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const heroVideos = [
    {
      id: 1,
      title: "Living Room Transformation",
      thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop",
      description: "Watch Sarah transform her living room with AR"
    },
    {
      id: 2,
      title: "Bedroom Makeover",
      thumbnail: "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?w=1920&h=1080&fit=crop",
      description: "See how Mark redesigned his bedroom space"
    },
    {
      id: 3,
      title: "Kitchen Design",
      thumbnail: "https://images.pixabay.com/photo/2017/03/28/12/11/chairs-2181947_1280.jpg?w=1920&h=1080&fit=crop",
      description: "Emma\'s modern kitchen transformation"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % heroVideos?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Check if user is first-time visitor
    const hasVisited = localStorage.getItem('arspace_visited');
    if (!hasVisited) {
      setShowOnboarding(true);
      localStorage.setItem('arspace_visited', 'true');
    }
  }, []);

  const handleStartScan = () => {
    if (showOnboarding) {
      setShowOnboarding(false);
    }
    onStartScan();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-surface">
      {/* Background Video/Image Carousel */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          {heroVideos?.map((video, index) => (
            <div
              key={video?.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentVideoIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={video?.thumbnail}
                alt={video?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/40"></div>
            </div>
          ))}
        </div>
      </div>
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-tight">
              See it before you
              <span className="block text-transparent bg-gradient-to-r from-accent to-cta bg-clip-text">
                buy it
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Transform your space with confidence using AR technology. 
              Place furniture virtually, see perfect fits, and design without regret.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} color="currentColor" />
              <span className="font-medium">2M+ rooms designed</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} color="currentColor" />
              <span className="font-medium">99.2% satisfaction</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} color="currentColor" />
              <span className="font-medium">30-day guarantee</span>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="space-y-4">
            <Button
              variant="default"
              size="lg"
              onClick={handleStartScan}
              disabled={isScanning}
              loading={isScanning}
              className="bg-cta hover:bg-cta/90 text-cta-foreground px-8 py-4 text-lg font-semibold confidence-scale shadow-lg"
              iconName="Camera"
              iconPosition="left"
              iconSize={24}
            >
              {isScanning ? 'Initializing Camera...' : 'Scan Your Room Now'}
            </Button>
            
            <p className="text-xs text-muted-foreground">
              Free • No app download • Works on any device
            </p>
          </div>

          {/* Secondary Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/ai-design-studio-mood-generator">
              <Button
                variant="outline"
                size="default"
                iconName="Palette"
                iconPosition="left"
                className="confidence-scale"
              >
                Take Style Quiz
              </Button>
            </Link>
            
            <Link to="/smart-catalog-furniture-universe">
              <Button
                variant="ghost"
                size="default"
                iconName="Search"
                iconPosition="left"
                className="confidence-scale"
              >
                Browse Furniture
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Floating AR Camera Button */}
      <button
        onClick={handleStartScan}
        disabled={isScanning}
        className="ar-camera-btn"
        aria-label="Start AR camera scan"
      >
        <Icon 
          name={isScanning ? "Loader2" : "Camera"} 
          size={24} 
          color="white" 
          className={isScanning ? "animate-spin" : ""}
        />
      </button>
      {/* Video Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {heroVideos?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentVideoIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentVideoIndex 
                  ? 'bg-cta w-8' :'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`View slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      {/* Onboarding Modal */}
      {showOnboarding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-xl p-6 max-w-md mx-4 shadow-modal">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-cta rounded-full flex items-center justify-center mx-auto">
                <Icon name="Camera" size={32} color="white" />
              </div>
              
              <h3 className="text-xl font-semibold text-card-foreground">
                Welcome to ARSpace Designer!
              </h3>
              
              <p className="text-text-secondary">
                Ready to transform your space? Let's start with a quick 30-second room scan to see the magic of AR furniture placement.
              </p>
              
              <div className="flex flex-col gap-3 pt-4">
                <Button
                  variant="default"
                  onClick={handleStartScan}
                  className="bg-cta hover:bg-cta/90 text-cta-foreground"
                  iconName="Camera"
                  iconPosition="left"
                >
                  Start AR Tutorial
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={() => setShowOnboarding(false)}
                  size="sm"
                >
                  Skip for now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
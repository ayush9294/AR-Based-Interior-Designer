import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import QuickAccessPaths from './components/QuickAccessPaths';
import ARTutorialSection from './components/ARTutorialSection';
import RecentProjectsSection from './components/RecentProjectsSection';
import ARHelpBubble from './components/ARHelpBubble';

const ARCameraPortalHomepage = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [hasRecentProjects, setHasRecentProjects] = useState(false);
  const [cameraPermission, setCameraPermission] = useState('prompt');

  useEffect(() => {
    // Check for recent projects in localStorage
    const projects = localStorage.getItem('arspace_projects');
    if (projects && JSON.parse(projects)?.length > 0) {
      setHasRecentProjects(true);
    }

    // Check camera permission status
    if (navigator.permissions) {
      navigator.permissions?.query({ name: 'camera' })?.then((result) => {
        setCameraPermission(result?.state);
      });
    }
  }, []);

  const handleStartScan = async () => {
    setIsScanning(true);
    
    try {
      // Request camera permission
      const stream = await navigator.mediaDevices?.getUserMedia({ video: true });
      
      // Stop the stream immediately as we just needed permission
      stream?.getTracks()?.forEach(track => track?.stop());
      
      setCameraPermission('granted');
      
      // Check if user needs tutorial
      const hasSeenTutorial = localStorage.getItem('arspace_tutorial_seen');
      if (!hasSeenTutorial) {
        setShowTutorial(true);
      } else {
        // Simulate AR initialization
        setTimeout(() => {
          setIsScanning(false);
          // Here you would typically redirect to AR interface or show AR overlay
          console.log('AR Camera initialized successfully');
        }, 2000);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      setCameraPermission('denied');
      setIsScanning(false);
      
      // Show error message or fallback
      alert('Camera access is required for AR functionality. Please enable camera permissions and try again.');
    }
  };

  const handleTutorialComplete = () => {
    localStorage.setItem('arspace_tutorial_seen', 'true');
    setShowTutorial(false);
    setIsScanning(false);
    console.log('AR Tutorial completed, starting AR session');
  };

  const handleTutorialClose = () => {
    setShowTutorial(false);
    setIsScanning(false);
  };

  return (
    <>
      <Helmet>
        <title>ARSpace Designer - See It Before You Buy It | AR Furniture Visualization</title>
        <meta 
          name="description" 
          content="Transform your space with confidence using AR technology. Place furniture virtually, see perfect fits, and design without regret. 2M+ rooms designed with 99.2% satisfaction." 
        />
        <meta name="keywords" content="AR furniture, augmented reality, interior design, furniture visualization, home design, room planner" />
        <meta property="og:title" content="ARSpace Designer - Revolutionary AR Interior Design Platform" />
        <meta property="og:description" content="See furniture in your space before you buy. AR-powered interior design made simple." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#3182CE" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ARSpace Designer" />
        
        {/* Preload Critical Resources */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://images.pixabay.com" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="relative">
          {/* Hero Section */}
          <HeroSection 
            onStartScan={handleStartScan}
            isScanning={isScanning}
          />

          {/* Recent Projects Section - Only show for returning users */}
          <RecentProjectsSection isVisible={hasRecentProjects} />

          {/* Quick Access Paths */}
          <QuickAccessPaths />

          {/* AR Tutorial Modal */}
          <ARTutorialSection
            isVisible={showTutorial}
            onClose={handleTutorialClose}
            onComplete={handleTutorialComplete}
          />

          {/* AR Help Bubble */}
          <ARHelpBubble />

          {/* Camera Permission Status */}
          {cameraPermission === 'denied' && (
            <div className="fixed bottom-4 left-4 right-4 z-30 bg-error text-error-foreground p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-error-foreground/20 rounded-full flex items-center justify-center">
                  <span className="text-xs">!</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Camera access required</p>
                  <p className="text-xs opacity-90">Enable camera permissions to use AR features</p>
                </div>
                <button
                  onClick={() => window.location?.reload()}
                  className="text-xs underline hover:no-underline"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Loading Overlay */}
          {isScanning && !showTutorial && (
            <div className="fixed inset-0 z-40 bg-background/90 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-primary">
                    Initializing AR Camera
                  </h3>
                  <p className="text-text-secondary">
                    Please allow camera access when prompted
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-muted/50 border-t border-border py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-success rounded-full"></span>
                  <span>AR Technology Active</span>
                </span>
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  <span>Real-time 3D Rendering</span>
                </span>
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-cta rounded-full"></span>
                  <span>Secure & Private</span>
                </span>
              </div>
              
              <div className="text-xs text-muted-foreground">
                © {new Date()?.getFullYear()} ARSpace Designer. Transforming spaces through technology.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ARCameraPortalHomepage;
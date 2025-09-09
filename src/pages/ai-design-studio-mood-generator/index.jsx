import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';

// Import components
import MoodSelector from './components/MoodSelector';
import DesignGenerator from './components/DesignGenerator';
import DesignChallenge from './components/DesignChallenge';
import MoodBoard from './components/MoodBoard';
import DesignTimeline from './components/DesignTimeline';

const AIDesignStudioMoodGenerator = () => {
  const [activeTab, setActiveTab] = useState('mood-selector');
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedDesigns, setSavedDesigns] = useState([]);
  const [moodBoards, setMoodBoards] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const tabs = [
  {
    id: 'mood-selector',
    name: 'Mood Generator',
    icon: 'Palette',
    description: 'Define your design vision'
  },
  {
    id: 'ai-generator',
    name: 'AI Designer',
    icon: 'Sparkles',
    description: 'Generate personalized layouts'
  },
  {
    id: 'mood-board',
    name: 'Mood Board',
    icon: 'Image',
    description: 'Collect visual inspiration'
  },
  {
    id: 'design-challenge',
    name: 'Design Challenge',
    icon: 'Target',
    description: 'Test your design knowledge'
  },
  {
    id: 'timeline',
    name: 'Design History',
    icon: 'History',
    description: 'Track your design evolution'
  }];


  const handleMoodChange = (moods) => {
    setSelectedMoods(moods);
  };

  const handleGenerateDesign = () => {
    setIsGenerating(true);
    setActiveTab('ai-generator');

    // Simulate AI generation time
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  const handleRegenerateDesign = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const handleSaveDesign = (design) => {
    const savedDesign = {
      ...design,
      id: Date.now(),
      savedAt: new Date(),
      moods: selectedMoods
    };
    setSavedDesigns([...savedDesigns, savedDesign]);

    // Show success notification (could be implemented with a toast system)
    console.log('Design saved successfully!');
  };

  const handleViewInAR = (design) => {
    // Navigate to AR camera with design data
    console.log('Viewing design in AR:', design);
    // This would typically navigate to the AR camera page with the design data
  };

  const handleSaveMoodBoard = (boardData) => {
    const savedBoard = {
      ...boardData,
      id: Date.now()
    };
    setMoodBoards([...moodBoards, savedBoard]);
    console.log('Mood board saved successfully!');
  };

  const handleAnalyzeMoodBoard = (analysis) => {
    console.log('Mood board analysis:', analysis);
    // Could automatically generate designs based on mood board analysis
  };

  const handleChallengeComplete = () => {
    console.log('Design challenge completed!');
    // Could unlock new features or provide rewards
  };

  const handleRestoreVersion = (version) => {
    console.log('Restoring version:', version);
    // Would restore the selected design version
  };

  const handleCompareVersions = (versionIds) => {
    console.log('Comparing versions:', versionIds);
    // Would show comparison view
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'mood-selector':
        return (
          <MoodSelector
            selectedMoods={selectedMoods}
            onMoodChange={handleMoodChange}
            onGenerateDesign={handleGenerateDesign} />);



      case 'ai-generator':
        return (
          <DesignGenerator
            selectedMoods={selectedMoods}
            isGenerating={isGenerating}
            onRegenerateDesign={handleRegenerateDesign}
            onSaveDesign={handleSaveDesign}
            onViewInAR={handleViewInAR} />);



      case 'mood-board':
        return (
          <MoodBoard
            onAnalyzeMoodBoard={handleAnalyzeMoodBoard}
            onSaveMoodBoard={handleSaveMoodBoard} />);



      case 'design-challenge':
        return (
          <DesignChallenge
            onChallengeComplete={handleChallengeComplete} />);



      case 'timeline':
        return (
          <DesignTimeline
            onRestoreVersion={handleRestoreVersion}
            onCompareVersions={handleCompareVersions} />);



      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Icon name="Sparkles" size={16} color="currentColor" />
              <span>AI-Powered Design Intelligence</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
              AI Design Studio &
              <span className="block text-accent">Mood Generator</span>
            </h1>
            
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Transform your design vision into reality with AI-powered mood analysis, personalized layout generation, and professional design insights. Create spaces that perfectly reflect your personality and lifestyle.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="text-center p-4 bg-card rounded-lg border border-border">
              <div className="text-2xl font-bold text-accent mb-1">2.3M+</div>
              <div className="text-sm text-text-secondary">Designs Generated</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border border-border">
              <div className="text-2xl font-bold text-accent mb-1">94%</div>
              <div className="text-sm text-text-secondary">Satisfaction Rate</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border border-border">
              <div className="text-2xl font-bold text-accent mb-1">15K+</div>
              <div className="text-sm text-text-secondary">Style Combinations</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border border-border">
              <div className="text-2xl font-bold text-accent mb-1">3.2s</div>
              <div className="text-sm text-text-secondary">Avg. Generation Time</div>
            </div>
          </div>
        </div>
      </section>
      {/* Navigation Tabs */}
      <section className="bg-card border-b border-border sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-1 overflow-x-auto">
              {tabs?.map((tab) =>
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg spatial-transition whitespace-nowrap ${
                activeTab === tab?.id ?
                'bg-accent text-accent-foreground shadow-sm' :
                'text-text-secondary hover:text-primary hover:bg-muted'}`
                }>

                  <Icon name={tab?.icon} size={16} color="currentColor" />
                  <span className="font-medium text-sm">{tab?.name}</span>
                </button>
              )}
            </div>

            {/* Quick Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="text-sm text-text-secondary">
                {savedDesigns?.length} saved designs
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="Camera"
                iconPosition="left"
                asChild>

                <Link to="/ar-camera-portal-homepage">
                  AR Camera
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Tab Description */}
      <section className="bg-surface/50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center">
            <p className="text-sm text-text-secondary text-center">
              {tabs?.find((tab) => tab?.id === activeTab)?.description}
            </p>
          </div>
        </div>
      </section>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {renderTabContent()}
        </div>
      </main>
      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
        <div className="flex items-center justify-around py-2">
          {tabs?.slice(0, 4)?.map((tab) =>
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg spatial-transition ${
            activeTab === tab?.id ?
            'text-accent' : 'text-text-secondary'}`
            }>

              <Icon name={tab?.icon} size={20} color="currentColor" />
              <span className="text-xs font-medium">{tab?.name?.split(' ')?.[0]}</span>
            </button>
          )}
          <Link
            to="/ar-camera-portal-homepage"
            className="flex flex-col items-center space-y-1 p-2 rounded-lg spatial-transition text-cta">

            <Icon name="Camera" size={20} color="currentColor" />
            <span className="text-xs font-medium">AR</span>
          </Link>
        </div>
      </div>
      {/* Floating AR Button */}
      <Link
        to="/ar-camera-portal-homepage"
        className="ar-camera-btn hidden md:flex"
        title="Open AR Camera">

        <Icon name="Camera" size={24} color="white" />
      </Link>
      {/* Trust Signals Footer */}
      <footer className="bg-card border-t border-border mt-16 mb-16 md:mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Shield" size={24} color="var(--color-success)" />
              </div>
              <h3 className="font-semibold text-primary mb-2">AI-Powered Accuracy</h3>
              <p className="text-sm text-text-secondary">
                Advanced algorithms ensure 94% design satisfaction rates
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Users" size={24} color="var(--color-accent)" />
              </div>
              <h3 className="font-semibold text-primary mb-2">Expert Validated</h3>
              <p className="text-sm text-text-secondary">
                Designs reviewed by professional interior designers
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Zap" size={24} color="var(--color-warning)" />
              </div>
              <h3 className="font-semibold text-primary mb-2">Instant Results</h3>
              <p className="text-sm text-text-secondary">
                Generate professional designs in under 5 seconds
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-8 border-t border-border">
            <p className="\xA9 2025 Aayush">
              © {new Date()?.getFullYear()} ARSpace Designer. Transforming spaces through AI innovation.
            </p>
          </div>
        </div>
      </footer>
    </div>);

};

export default AIDesignStudioMoodGenerator;
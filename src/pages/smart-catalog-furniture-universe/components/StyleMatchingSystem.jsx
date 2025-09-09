import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StyleMatchingSystem = ({ onStyleChange, selectedStyle }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userStyleDNA, setUserStyleDNA] = useState(null);

  const styleProfiles = [
    {
      id: 'modern-minimalist',
      name: 'Modern Minimalist',
      description: 'Clean lines, neutral colors, functional design',
      icon: 'Square',
      color: 'bg-gray-100',
      matchPercentage: 94
    },
    {
      id: 'scandinavian',
      name: 'Scandinavian',
      description: 'Light woods, cozy textures, hygge vibes',
      icon: 'Home',
      color: 'bg-blue-50',
      matchPercentage: 87
    },
    {
      id: 'industrial',
      name: 'Industrial',
      description: 'Raw materials, exposed elements, urban edge',
      icon: 'Wrench',
      color: 'bg-orange-50',
      matchPercentage: 76
    },
    {
      id: 'bohemian',
      name: 'Bohemian',
      description: 'Rich textures, global influences, artistic flair',
      icon: 'Palette',
      color: 'bg-purple-50',
      matchPercentage: 82
    },
    {
      id: 'mid-century',
      name: 'Mid-Century Modern',
      description: 'Retro charm, bold colors, iconic shapes',
      icon: 'Circle',
      color: 'bg-yellow-50',
      matchPercentage: 91
    },
    {
      id: 'contemporary',
      name: 'Contemporary',
      description: 'Current trends, mixed materials, comfort-focused',
      icon: 'Sparkles',
      color: 'bg-green-50',
      matchPercentage: 89
    }
  ];

  useEffect(() => {
    // Simulate AI analysis of user's previous AR sessions
    const analyzeUserStyle = () => {
      setIsAnalyzing(true);
      setTimeout(() => {
        setUserStyleDNA({
          primaryStyle: 'modern-minimalist',
          confidence: 94,
          traits: ['Clean aesthetics', 'Functional design', 'Neutral palette'],
          arSessionsAnalyzed: 12,
          lastUpdated: new Date()
        });
        setIsAnalyzing(false);
      }, 2000);
    };

    analyzeUserStyle();
  }, []);

  const handleStyleSelect = (styleId) => {
    onStyleChange(styleId);
  };

  return (
    <div className="bg-white rounded-xl shadow-spatial-sm border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-primary mb-2">Your Style DNA</h2>
          <p className="text-sm text-muted-foreground">
            AI-powered recommendations based on your AR sessions and preferences
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Brain" size={20} color="var(--color-accent)" />
          <span className="text-sm font-medium text-accent">AI Powered</span>
        </div>
      </div>
      {isAnalyzing ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-muted-foreground">Analyzing your design preferences...</p>
          </div>
        </div>
      ) : userStyleDNA ? (
        <div className="mb-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <Icon name="Target" size={20} color="var(--color-accent)" />
              </div>
              <div>
                <h3 className="font-medium text-primary">
                  {styleProfiles?.find(s => s?.id === userStyleDNA?.primaryStyle)?.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {userStyleDNA?.confidence}% match confidence
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">
                Based on {userStyleDNA?.arSessionsAnalyzed} AR sessions
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {userStyleDNA?.traits?.map((trait, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {styleProfiles?.map((style) => (
          <div
            key={style?.id}
            onClick={() => handleStyleSelect(style?.id)}
            className={`relative p-4 rounded-lg border-2 cursor-pointer spatial-transition confidence-scale ${
              selectedStyle === style?.id
                ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50 bg-white hover:bg-accent/2'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 ${style?.color} rounded-lg flex items-center justify-center`}>
                <Icon name={style?.icon} size={24} color="var(--color-primary)" />
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <Icon name="Zap" size={14} color="var(--color-success)" />
                  <span className="text-sm font-medium text-success">
                    {style?.matchPercentage}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">match</p>
              </div>
            </div>
            
            <h3 className="font-semibold text-primary mb-2">{style?.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{style?.description}</p>
            
            {selectedStyle === style?.id && (
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="Check" size={16} color="white" strokeWidth={3} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          iconName="RefreshCw"
          iconPosition="left"
          onClick={() => setIsAnalyzing(true)}
        >
          Refresh Analysis
        </Button>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} color="currentColor" />
          <span>Updated 2 hours ago</span>
        </div>
      </div>
    </div>
  );
};

export default StyleMatchingSystem;
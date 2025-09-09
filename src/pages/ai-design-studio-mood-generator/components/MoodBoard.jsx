import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MoodBoard = ({ onAnalyzeMoodBoard, onSaveMoodBoard }) => {
  const [moodBoardItems, setMoodBoardItems] = useState([]);
  const [boardTitle, setBoardTitle] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const fileInputRef = useRef(null);

  // Mock inspiration images
  const inspirationImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
      category: "Living Room",
      tags: ["modern", "neutral", "cozy"]
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=300&h=300&fit=crop",
      category: "Workspace",
      tags: ["minimalist", "bright", "productive"]
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
      category: "Bedroom",
      tags: ["serene", "natural", "calm"]
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=300&h=300&fit=crop",
      category: "Kitchen",
      tags: ["industrial", "dark", "sophisticated"]
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
      category: "Dining",
      tags: ["elegant", "warm", "inviting"]
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=300&h=300&fit=crop",
      category: "Bathroom",
      tags: ["spa-like", "clean", "luxurious"]
    }
  ];

  const handleAddImage = (image) => {
    if (moodBoardItems?.length < 12) {
      setMoodBoardItems([...moodBoardItems, {
        ...image,
        id: Date.now() + Math.random(),
        addedAt: new Date()
      }]);
    }
  };

  const handleRemoveImage = (itemId) => {
    setMoodBoardItems(moodBoardItems?.filter(item => item?.id !== itemId));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event?.target?.files);
    files?.forEach((file, index) => {
      if (moodBoardItems?.length + index < 12) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newItem = {
            id: Date.now() + index,
            url: e?.target?.result,
            category: "Uploaded",
            tags: ["custom"],
            addedAt: new Date()
          };
          setMoodBoardItems(prev => [...prev, newItem]);
        };
        reader?.readAsDataURL(file);
      }
    });
  };

  const handleAnalyzeMoodBoard = async () => {
    if (moodBoardItems?.length === 0) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = {
        dominantColors: [
          { name: "Warm White", hex: "#F7F5F3", percentage: 35 },
          { name: "Sage Green", hex: "#9CAF88", percentage: 25 },
          { name: "Natural Wood", hex: "#D4A574", percentage: 20 },
          { name: "Charcoal", hex: "#2D3748", percentage: 15 },
          { name: "Cream", hex: "#FDF6E3", percentage: 5 }
        ],
        styleAnalysis: {
          primary: "Modern Organic",
          secondary: "Scandinavian Minimalism",
          confidence: 87
        },
        moodKeywords: ["serene", "natural", "sophisticated", "cozy", "balanced"],
        recommendations: [
          "Incorporate natural textures like linen and jute",
          "Use warm wood tones for furniture pieces",
          "Add plants for organic elements",
          "Choose furniture with clean, simple lines",
          "Layer lighting for ambiance control"
        ],
        furnitureSuggestions: [
          { name: "Natural Oak Dining Table", match: 94 },
          { name: "Linen Sectional Sofa", match: 89 },
          { name: "Ceramic Table Lamps", match: 85 },
          { name: "Woven Storage Baskets", match: 82 }
        ]
      };
      
      setAnalysisResult(mockAnalysis);
      setIsAnalyzing(false);
      onAnalyzeMoodBoard(mockAnalysis);
    }, 3000);
  };

  const handleSaveBoard = () => {
    const boardData = {
      title: boardTitle || `Mood Board ${new Date()?.toLocaleDateString()}`,
      items: moodBoardItems,
      analysis: analysisResult,
      createdAt: new Date()
    };
    onSaveMoodBoard(boardData);
  };

  return (
    <div className="space-y-6">
      {/* Mood Board Header */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-spatial-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-2">Create Mood Board</h2>
            <p className="text-text-secondary">
              Collect inspiration images and let AI analyze your style preferences
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef?.current?.click()}
              iconName="Upload"
              iconPosition="left"
            >
              Upload Images
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleAnalyzeMoodBoard}
              disabled={moodBoardItems?.length === 0 || isAnalyzing}
              loading={isAnalyzing}
              iconName="Sparkles"
              iconPosition="left"
              className="bg-cta hover:bg-cta/90 text-cta-foreground"
            >
              Analyze Style
            </Button>
          </div>
        </div>

        <Input
          type="text"
          placeholder="Give your mood board a name..."
          value={boardTitle}
          onChange={(e) => setBoardTitle(e?.target?.value)}
          className="mb-4"
        />

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
      {/* Mood Board Canvas */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-spatial-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary">Your Mood Board</h3>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <span>{moodBoardItems?.length}/12 images</span>
            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent rounded-full transition-all duration-300"
                style={{ width: `${(moodBoardItems?.length / 12) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {moodBoardItems?.length === 0 ? (
          <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Image" size={32} color="var(--color-text-secondary)" />
            </div>
            <h4 className="text-lg font-semibold text-primary mb-2">Start Building Your Vision</h4>
            <p className="text-text-secondary mb-4">
              Add inspiration images to create a mood board that reflects your style
            </p>
            <Button
              variant="outline"
              onClick={() => fileInputRef?.current?.click()}
              iconName="Plus"
              iconPosition="left"
            >
              Add First Image
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {moodBoardItems?.map((item) => (
              <div key={item?.id} className="relative group aspect-square rounded-lg overflow-hidden">
                <Image
                  src={item?.url}
                  alt={item?.category}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 spatial-transition" />
                <button
                  onClick={() => handleRemoveImage(item?.id)}
                  className="absolute top-2 right-2 w-6 h-6 bg-error text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 spatial-transition hover:scale-110"
                >
                  <Icon name="X" size={12} color="white" strokeWidth={3} />
                </button>
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="bg-black/60 backdrop-blur-sm rounded px-2 py-1">
                    <p className="text-xs text-white font-medium">{item?.category}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {moodBoardItems?.length < 12 && (
              <button
                onClick={() => fileInputRef?.current?.click()}
                className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-text-secondary hover:text-primary hover:border-accent spatial-transition"
              >
                <Icon name="Plus" size={24} color="currentColor" />
                <span className="text-sm font-medium mt-2">Add Image</span>
              </button>
            )}
          </div>
        )}
      </div>
      {/* Inspiration Gallery */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-spatial-sm">
        <h3 className="text-lg font-semibold text-primary mb-4">Inspiration Gallery</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {inspirationImages?.map((image) => (
            <button
              key={image?.id}
              onClick={() => handleAddImage(image)}
              disabled={moodBoardItems?.length >= 12}
              className="relative group aspect-square rounded-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Image
                src={image?.url}
                alt={image?.category}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 spatial-transition" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 spatial-transition">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="Plus" size={16} color="white" strokeWidth={3} />
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <div className="bg-black/60 backdrop-blur-sm rounded px-2 py-1">
                  <p className="text-xs text-white font-medium">{image?.category}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Analysis Results */}
      {analysisResult && (
        <div className="bg-card rounded-xl border border-border p-6 shadow-spatial-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-primary flex items-center space-x-2">
              <Icon name="BarChart3" size={20} color="var(--color-accent)" />
              <span>Style Analysis Results</span>
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveBoard}
              iconName="Save"
              iconPosition="left"
            >
              Save Mood Board
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Color Palette */}
            <div>
              <h4 className="font-semibold text-primary mb-3">Dominant Color Palette</h4>
              <div className="space-y-2">
                {analysisResult?.dominantColors?.map((color, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div 
                      className="w-6 h-6 rounded-full border border-border"
                      style={{ backgroundColor: color?.hex }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-primary">{color?.name}</span>
                        <span className="text-sm text-text-secondary">{color?.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1 mt-1">
                        <div 
                          className="h-1 rounded-full"
                          style={{ 
                            width: `${color?.percentage}%`,
                            backgroundColor: color?.hex
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Style Analysis */}
            <div>
              <h4 className="font-semibold text-primary mb-3">Style Profile</h4>
              <div className="space-y-3">
                <div className="p-3 bg-surface rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-primary">Primary Style</span>
                    <span className="text-sm text-accent font-semibold">{analysisResult?.styleAnalysis?.confidence}% match</span>
                  </div>
                  <p className="text-lg font-bold text-primary">{analysisResult?.styleAnalysis?.primary}</p>
                  <p className="text-sm text-text-secondary">Secondary: {analysisResult?.styleAnalysis?.secondary}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-primary mb-2">Mood Keywords</p>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult?.moodKeywords?.map((keyword, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="font-semibold text-primary mb-3">AI Recommendations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-sm font-medium text-primary mb-2">Design Suggestions</h5>
                <ul className="space-y-2">
                  {analysisResult?.recommendations?.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                      <Icon name="ArrowRight" size={12} color="var(--color-accent)" className="mt-1 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-primary mb-2">Furniture Matches</h5>
                <div className="space-y-2">
                  {analysisResult?.furnitureSuggestions?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-surface rounded">
                      <span className="text-sm text-primary">{item?.name}</span>
                      <span className="text-sm font-medium text-success">{item?.match}% match</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodBoard;
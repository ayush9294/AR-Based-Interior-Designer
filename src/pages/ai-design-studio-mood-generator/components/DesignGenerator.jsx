import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DesignGenerator = ({ selectedMoods, isGenerating, onRegenerateDesign, onSaveDesign, onViewInAR }) => {
  const [currentDesign, setCurrentDesign] = useState(null);
  const [designVariations, setDesignVariations] = useState([]);
  const [activeVariation, setActiveVariation] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // Mock AI-generated designs based on selected moods
  const generateMockDesigns = () => {
    const designs = [
      {
        id: 1,
        name: "Cozy Modern Sanctuary",
        style: "Contemporary Comfort",
        confidence: 94,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        description: `A harmonious blend of modern aesthetics with cozy comfort elements. This design features warm neutral tones, plush textures, and strategic lighting to create an inviting atmosphere perfect for relaxation and intimate gatherings.`,
        features: [
          "Warm color palette with cream and sage accents",
          "Mixed textures: velvet, linen, and natural wood",
          "Layered lighting for ambiance control",
          "Strategic furniture placement for conversation"
        ],
        furniture: [
          { name: "Curved Sectional Sofa", price: "$2,299", category: "Seating" },
          { name: "Live-Edge Coffee Table", price: "$899", category: "Tables" },
          { name: "Textured Area Rug", price: "$449", category: "Rugs" },
          { name: "Floor Reading Lamp", price: "$329", category: "Lighting" }
        ],
        psychology: "This design promotes relaxation and social connection through warm colors and comfortable seating arrangements.",
        totalPrice: "$3,976"
      },
      {
        id: 2,
        name: "Energizing Workspace Hub",
        style: "Dynamic Productivity",
        confidence: 89,
        image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&h=600&fit=crop",
        description: `An invigorating workspace design that maximizes productivity through strategic color use, ergonomic furniture, and natural light optimization. Perfect for focused work sessions and creative brainstorming.`,
        features: [
          "Energizing color accents in yellow and blue",
          "Ergonomic furniture for health and comfort",
          "Natural light maximization techniques",
          "Organized storage solutions for clarity"
        ],
        furniture: [
          { name: "Adjustable Standing Desk", price: "$1,299", category: "Desks" },
          { name: "Ergonomic Task Chair", price: "$699", category: "Seating" },
          { name: "Modular Storage System", price: "$549", category: "Storage" },
          { name: "Desk Task Lighting", price: "$199", category: "Lighting" }
        ],
        psychology: "Bright accents and organized layouts enhance focus and creativity while reducing mental fatigue.",
        totalPrice: "$2,746"
      },
      {
        id: 3,
        name: "Serene Minimalist Retreat",
        style: "Zen Simplicity",
        confidence: 92,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        description: `A peaceful minimalist design emphasizing clean lines, natural materials, and uncluttered spaces. This approach creates a calming environment that promotes mindfulness and mental clarity.`,
        features: [
          "Neutral color palette with natural accents",
          "Clean lines and geometric shapes",
          "Minimal furniture with maximum impact",
          "Natural materials: wood, stone, linen"
        ],
        furniture: [
          { name: "Platform Bed Frame", price: "$899", category: "Bedroom" },
          { name: "Floating Nightstands", price: "$299", category: "Storage" },
          { name: "Meditation Floor Cushion", price: "$149", category: "Seating" },
          { name: "Bamboo Room Divider", price: "$399", category: "Decor" }
        ],
        psychology: "Minimal design reduces visual stress and promotes mental clarity through intentional space usage.",
        totalPrice: "$1,746"
      }
    ];

    setDesignVariations(designs);
    setCurrentDesign(designs?.[0]);
    setActiveVariation(0);
  };

  useEffect(() => {
    if (selectedMoods?.length > 0 && !isGenerating) {
      generateMockDesigns();
    }
  }, [selectedMoods, isGenerating]);

  const handleVariationChange = (index) => {
    setActiveVariation(index);
    setCurrentDesign(designVariations?.[index]);
  };

  const handleRegenerateWithFeedback = () => {
    onRegenerateDesign();
    setTimeout(() => {
      generateMockDesigns();
    }, 2000);
  };

  if (isGenerating) {
    return (
      <div className="bg-card rounded-xl border border-border p-8 shadow-spatial-sm">
        <div className="text-center">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Sparkles" size={32} color="var(--color-accent)" className="animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-primary mb-2">AI is Crafting Your Design</h3>
          <p className="text-text-secondary mb-6">
            Analyzing your mood preferences and generating personalized layouts...
          </p>
          <div className="w-full bg-muted rounded-full h-2 mb-4">
            <div className="bg-accent h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm text-text-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Palette" size={16} color="currentColor" />
              <span>Color analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Layout" size={16} color="currentColor" />
              <span>Layout optimization</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lightbulb" size={16} color="currentColor" />
              <span>Psychology insights</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentDesign) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Design Variations Selector */}
      <div className="bg-card rounded-xl border border-border p-4 shadow-spatial-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary">AI Generated Designs</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRegenerateWithFeedback}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Regenerate
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {designVariations?.map((design, index) => (
            <button
              key={design?.id}
              onClick={() => handleVariationChange(index)}
              className={`p-3 rounded-lg border-2 spatial-transition text-left ${
                activeVariation === index
                  ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50'
              }`}
            >
              <div className="aspect-video rounded-md overflow-hidden mb-3">
                <Image
                  src={design?.image}
                  alt={design?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold text-primary mb-1">{design?.name}</h4>
              <p className="text-sm text-text-secondary mb-2">{design?.style}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Icon name="TrendingUp" size={14} color="var(--color-success)" />
                  <span className="text-sm font-medium text-success">{design?.confidence}% match</span>
                </div>
                <span className="text-sm font-bold text-primary">{design?.totalPrice}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Current Design Details */}
      <div className="bg-card rounded-xl border border-border shadow-spatial-sm overflow-hidden">
        {/* Design Header */}
        <div className="p-6 border-b border-border">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">{currentDesign?.name}</h2>
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <span className="flex items-center space-x-1">
                  <Icon name="Tag" size={14} color="currentColor" />
                  <span>{currentDesign?.style}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="TrendingUp" size={14} color="var(--color-success)" />
                  <span className="text-success font-medium">{currentDesign?.confidence}% compatibility</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="DollarSign" size={14} color="currentColor" />
                  <span className="font-semibold">{currentDesign?.totalPrice}</span>
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                iconName={showDetails ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
              >
                {showDetails ? 'Hide Details' : 'Show Details'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSaveDesign(currentDesign)}
                iconName="Heart"
                iconPosition="left"
              >
                Save Design
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => onViewInAR(currentDesign)}
                iconName="Camera"
                iconPosition="left"
                className="bg-cta hover:bg-cta/90 text-cta-foreground"
              >
                View in AR
              </Button>
            </div>
          </div>
        </div>

        {/* Design Image */}
        <div className="aspect-video lg:aspect-[21/9] overflow-hidden">
          <Image
            src={currentDesign?.image}
            alt={currentDesign?.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Design Description */}
        <div className="p-6">
          <p className="text-text-secondary leading-relaxed mb-6">
            {currentDesign?.description}
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-primary mb-3 flex items-center space-x-2">
                <Icon name="Star" size={18} color="var(--color-accent)" />
                <span>Key Features</span>
              </h4>
              <ul className="space-y-2">
                {currentDesign?.features?.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                    <Icon name="Check" size={14} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-primary mb-3 flex items-center space-x-2">
                <Icon name="Brain" size={18} color="var(--color-accent)" />
                <span>Design Psychology</span>
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                {currentDesign?.psychology}
              </p>
            </div>
          </div>

          {/* Detailed Breakdown */}
          {showDetails && (
            <div className="border-t border-border pt-6">
              <h4 className="font-semibold text-primary mb-4 flex items-center space-x-2">
                <Icon name="Package" size={18} color="var(--color-accent)" />
                <span>Furniture Breakdown</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentDesign?.furniture?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <h5 className="font-medium text-primary">{item?.name}</h5>
                      <p className="text-sm text-text-secondary">{item?.category}</p>
                    </div>
                    <span className="font-semibold text-primary">{item?.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignGenerator;
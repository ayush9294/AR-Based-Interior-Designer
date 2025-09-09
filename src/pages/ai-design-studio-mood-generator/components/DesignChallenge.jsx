import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DesignChallenge = ({ onChallengeComplete }) => {
  const [activeChallenge, setActiveChallenge] = useState(0);
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const challenges = [
    {
      id: 1,
      title: "Small Living Room Dilemma",
      problem: "A 12x14 ft living room needs to accommodate seating for 6 people, storage for books and electronics, and maintain an open feel for entertaining.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      difficulty: "Intermediate",
      timeEstimate: "5 min",
      solutions: [
        {
          id: 'a',
          name: "L-Shaped Sectional Focus",
          image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&h=300&fit=crop",
          description: "Large sectional with built-in storage ottoman",
          pros: ["Maximizes seating", "Built-in storage", "Defines conversation area"],
          cons: ["May overwhelm small space", "Limited flexibility", "Expensive single purchase"],
          score: 75,
          isCorrect: false
        },
        {
          id: 'b',
          name: "Modular Seating System",
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
          description: "Mix of loveseat, chairs, and ottomans with wall-mounted storage",
          pros: ["Flexible arrangement", "Visual lightness", "Multi-functional pieces"],
          cons: ["Requires coordination", "More pieces to purchase", "Potential clutter"],
          score: 92,
          isCorrect: true
        },
        {
          id: 'c',
          name: "Minimalist Approach",
          image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&h=300&fit=crop",
          description: "Small sofa with floor cushions and floating shelves",
          pros: ["Very open feel", "Budget-friendly", "Easy to rearrange"],
          cons: ["Limited comfortable seating", "Floor seating not for everyone", "May look sparse"],
          score: 68,
          isCorrect: false
        }
      ],
      explanation: `The modular seating system wins because it provides the required seating capacity while maintaining visual lightness through varied heights and negative space. Wall-mounted storage keeps the floor clear, making the room feel larger. The flexibility allows for different arrangements based on the occasion - intimate conversations or larger gatherings.`,
      designPrinciples: [
        "Visual weight distribution prevents overwhelming small spaces",
        "Multi-functional furniture maximizes utility per square foot",
        "Vertical storage solutions preserve floor space",
        "Flexible arrangements adapt to different social needs"
      ]
    },
    {
      id: 2,
      title: "Open Plan Kitchen-Living Challenge",
      problem: "A 20x25 ft open space needs distinct zones for cooking, dining, and relaxing while maintaining flow and natural light throughout.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      difficulty: "Advanced",
      timeEstimate: "8 min",
      solutions: [
        {
          id: 'a',
          name: "Kitchen Island Divider",
          image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&h=300&fit=crop",
          description: "Large island creates natural separation between zones",
          pros: ["Clear zone definition", "Additional prep space", "Casual dining option"],
          cons: ["May block sight lines", "Requires significant space", "Can feel heavy"],
          score: 78,
          isCorrect: false
        },
        {
          id: 'b',
          name: "Furniture Grouping Strategy",
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
          description: "Strategic furniture placement creates implied boundaries",
          pros: ["Maintains open feel", "Preserves light flow", "Flexible boundaries"],
          cons: ["Less defined zones", "Requires careful planning", "May feel scattered"],
          score: 89,
          isCorrect: true
        },
        {
          id: 'c',
          name: "Half-Wall Separation",
          image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&h=300&fit=crop",
          description: "Low walls with built-in storage separate areas",
          pros: ["Clear boundaries", "Additional storage", "Maintains some openness"],
          cons: ["Reduces open feel", "Permanent solution", "May block light"],
          score: 71,
          isCorrect: false
        }
      ],
      explanation: `Furniture grouping creates the most successful open plan because it defines zones through implied boundaries rather than physical barriers. This preserves the open feel and natural light flow while creating distinct functional areas. Area rugs, lighting, and furniture orientation work together to create psychological separation without walls.`,
      designPrinciples: [
        "Implied boundaries maintain openness while defining function",
        "Consistent sight lines preserve the sense of space",
        "Layered lighting reinforces zone definitions",
        "Traffic flow patterns should connect, not divide spaces"
      ]
    },
    {
      id: 3,
      title: "Awkward Bedroom Layout",
      problem: "A 11x13 ft bedroom has windows on two walls, a door that opens into the room, and needs space for a king bed, dresser, and workspace.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      difficulty: "Expert",
      timeEstimate: "10 min",
      solutions: [
        {
          id: 'a',
          name: "Bed Against Long Wall",
          image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&h=300&fit=crop",
          description: "King bed centered on longest wall with flanking nightstands",
          pros: ["Symmetrical layout", "Easy bed access", "Traditional approach"],
          cons: ["Blocks window light", "Limited floor space", "May crowd other furniture"],
          score: 69,
          isCorrect: false
        },
        {
          id: 'b',
          name: "Diagonal Bed Placement",
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
          description: "Bed angled in corner to maximize floor space and light",
          pros: ["Maximizes floor space", "Preserves window access", "Creates interesting focal point"],
          cons: ["Unconventional layout", "May feel unstable", "Harder to make bed"],
          score: 85,
          isCorrect: true
        },
        {
          id: 'c',
          name: "Murphy Bed Solution",
          image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&h=300&fit=crop",
          description: "Wall-mounted bed folds up to create daytime workspace",
          pros: ["Dual functionality", "Maximizes daytime space", "Modern solution"],
          cons: ["High cost", "Daily setup/breakdown", "Limited bedding storage"],
          score: 76,
          isCorrect: false
        }
      ],
      explanation: `The diagonal placement, while unconventional, solves multiple problems simultaneously. It preserves access to both windows for natural light, creates more usable floor space for the workspace, and allows the door to open freely. The angled position actually makes the room feel larger by creating interesting sight lines and avoiding the boxy feel of traditional layouts.`,
      designPrinciples: [
        "Unconventional layouts can solve multiple spatial problems",
        "Natural light access should be preserved when possible",
        "Diagonal placement can make small rooms feel larger",
        "Function should drive form, not traditional expectations"
      ]
    }
  ];

  const currentChallenge = challenges?.[activeChallenge];

  const handleSolutionSelect = (solutionId) => {
    setSelectedSolution(solutionId);
    setShowExplanation(false);
  };

  const handleRevealAnswer = () => {
    setShowExplanation(true);
  };

  const handleNextChallenge = () => {
    if (activeChallenge < challenges?.length - 1) {
      setActiveChallenge(activeChallenge + 1);
      setSelectedSolution(null);
      setShowExplanation(false);
    } else {
      onChallengeComplete();
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-orange-100 text-orange-700';
      case 'Expert': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-spatial-sm overflow-hidden">
      {/* Challenge Header */}
      <div className="p-6 border-b border-border bg-gradient-to-r from-accent/5 to-primary/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Target" size={20} color="var(--color-accent)" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary">Design Challenge</h2>
              <p className="text-sm text-text-secondary">Test your spatial design knowledge</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentChallenge?.difficulty)}`}>
              {currentChallenge?.difficulty}
            </div>
            <div className="flex items-center space-x-1 text-sm text-text-secondary">
              <Icon name="Clock" size={14} color="currentColor" />
              <span>{currentChallenge?.timeEstimate}</span>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center space-x-2 mb-4">
          {challenges?.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full ${
                index === activeChallenge ? 'bg-accent' :
                index < activeChallenge ? 'bg-success' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <h3 className="text-lg font-semibold text-primary mb-2">{currentChallenge?.title}</h3>
        <p className="text-text-secondary leading-relaxed">{currentChallenge?.problem}</p>
      </div>
      {/* Challenge Image */}
      <div className="aspect-video overflow-hidden">
        <Image
          src={currentChallenge?.image}
          alt={currentChallenge?.title}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Solutions */}
      <div className="p-6">
        <h4 className="font-semibold text-primary mb-4 flex items-center space-x-2">
          <Icon name="Lightbulb" size={18} color="var(--color-accent)" />
          <span>Choose the Best Solution</span>
        </h4>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {currentChallenge?.solutions?.map((solution) => (
            <button
              key={solution?.id}
              onClick={() => handleSolutionSelect(solution?.id)}
              disabled={showExplanation}
              className={`p-4 rounded-lg border-2 spatial-transition text-left ${
                selectedSolution === solution?.id
                  ? showExplanation
                    ? solution?.isCorrect
                      ? 'border-success bg-success/5' :'border-error bg-error/5' :'border-accent bg-accent/5' :'border-border hover:border-accent/50'
              } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div className="aspect-video rounded-md overflow-hidden mb-3">
                <Image
                  src={solution?.image}
                  alt={solution?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-semibold text-primary">{solution?.name}</h5>
                {showExplanation && (
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    solution?.isCorrect ? 'bg-success' : 'bg-error'
                  }`}>
                    <Icon 
                      name={solution?.isCorrect ? "Check" : "X"} 
                      size={14} 
                      color="white" 
                      strokeWidth={3}
                    />
                  </div>
                )}
              </div>
              
              <p className="text-sm text-text-secondary mb-3">{solution?.description}</p>
              
              {showExplanation && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-text-secondary">Design Score</span>
                    <span className={`text-sm font-bold ${
                      solution?.score >= 85 ? 'text-success' :
                      solution?.score >= 70 ? 'text-warning' : 'text-error'
                    }`}>
                      {solution?.score}/100
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <p className="text-xs font-medium text-success mb-1">Pros:</p>
                      <ul className="text-xs text-text-secondary space-y-1">
                        {solution?.pros?.slice(0, 2)?.map((pro, index) => (
                          <li key={index} className="flex items-start space-x-1">
                            <Icon name="Plus" size={10} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-xs font-medium text-error mb-1">Cons:</p>
                      <ul className="text-xs text-text-secondary space-y-1">
                        {solution?.cons?.slice(0, 2)?.map((con, index) => (
                          <li key={index} className="flex items-start space-x-1">
                            <Icon name="Minus" size={10} color="var(--color-error)" className="mt-0.5 flex-shrink-0" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Challenge {activeChallenge + 1} of {challenges?.length}
          </div>
          
          <div className="flex items-center space-x-3">
            {selectedSolution && !showExplanation && (
              <Button
                variant="outline"
                onClick={handleRevealAnswer}
                iconName="Eye"
                iconPosition="left"
              >
                Reveal Answer
              </Button>
            )}
            
            {showExplanation && (
              <Button
                variant="default"
                onClick={handleNextChallenge}
                iconName={activeChallenge < challenges?.length - 1 ? "ArrowRight" : "Trophy"}
                iconPosition="right"
                className="bg-cta hover:bg-cta/90 text-cta-foreground"
              >
                {activeChallenge < challenges?.length - 1 ? 'Next Challenge' : 'Complete'}
              </Button>
            )}
          </div>
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="mt-6 p-4 bg-surface rounded-lg border-l-4 border-accent">
            <h5 className="font-semibold text-primary mb-2 flex items-center space-x-2">
              <Icon name="BookOpen" size={16} color="var(--color-accent)" />
              <span>Design Explanation</span>
            </h5>
            <p className="text-sm text-text-secondary mb-4 leading-relaxed">
              {currentChallenge?.explanation}
            </p>
            
            <h6 className="font-medium text-primary mb-2">Key Design Principles:</h6>
            <ul className="space-y-1">
              {currentChallenge?.designPrinciples?.map((principle, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-text-secondary">
                  <Icon name="ArrowRight" size={12} color="var(--color-accent)" className="mt-1 flex-shrink-0" />
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignChallenge;
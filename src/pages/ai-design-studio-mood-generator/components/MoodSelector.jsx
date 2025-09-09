import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MoodSelector = ({ selectedMoods, onMoodChange, onGenerateDesign }) => {
  const [activeCategory, setActiveCategory] = useState('emotional');

  const moodCategories = {
    emotional: {
      title: "Emotional Atmosphere",
      description: "How do you want to feel in this space?",
      moods: [
        { id: 'cozy', name: 'Cozy & Intimate', icon: 'Heart', color: 'bg-orange-100 text-orange-700', description: 'Warm, inviting spaces for relaxation' },
        { id: 'energizing', name: 'Energizing & Dynamic', icon: 'Zap', color: 'bg-yellow-100 text-yellow-700', description: 'Vibrant spaces that boost productivity' },
        { id: 'serene', name: 'Serene & Peaceful', icon: 'Leaf', color: 'bg-green-100 text-green-700', description: 'Calm environments for mindfulness' },
        { id: 'sophisticated', name: 'Sophisticated & Elegant', icon: 'Crown', color: 'bg-purple-100 text-purple-700', description: 'Refined spaces with timeless appeal' },
        { id: 'playful', name: 'Playful & Creative', icon: 'Palette', color: 'bg-pink-100 text-pink-700', description: 'Fun spaces that inspire creativity' },
        { id: 'minimalist', name: 'Minimalist & Clean', icon: 'Square', color: 'bg-gray-100 text-gray-700', description: 'Simple, uncluttered environments' }
      ]
    },
    functional: {
      title: "Functional Purpose",
      description: "What activities will happen here?",
      moods: [
        { id: 'workspace', name: 'Focused Workspace', icon: 'Laptop', color: 'bg-blue-100 text-blue-700', description: 'Optimized for concentration and productivity' },
        { id: 'entertainment', name: 'Entertainment Hub', icon: 'Tv', color: 'bg-red-100 text-red-700', description: 'Perfect for hosting and relaxation' },
        { id: 'reading', name: 'Reading Nook', icon: 'BookOpen', color: 'bg-indigo-100 text-indigo-700', description: 'Quiet corners for literary escape' },
        { id: 'dining', name: 'Dining Experience', icon: 'Utensils', color: 'bg-amber-100 text-amber-700', description: 'Spaces for memorable meals' },
        { id: 'wellness', name: 'Wellness Retreat', icon: 'Flower', color: 'bg-teal-100 text-teal-700', description: 'Areas for self-care and rejuvenation' },
        { id: 'family', name: 'Family Gathering', icon: 'Users', color: 'bg-emerald-100 text-emerald-700', description: 'Spaces that bring people together' }
      ]
    },
    aesthetic: {
      title: "Style Preference",
      description: "Which aesthetic speaks to you?",
      moods: [
        { id: 'modern', name: 'Modern & Contemporary', icon: 'Triangle', color: 'bg-slate-100 text-slate-700', description: 'Clean lines and current trends' },
        { id: 'rustic', name: 'Rustic & Natural', icon: 'TreePine', color: 'bg-amber-100 text-amber-700', description: 'Organic materials and textures' },
        { id: 'industrial', name: 'Industrial & Urban', icon: 'Wrench', color: 'bg-zinc-100 text-zinc-700', description: 'Raw materials and urban edge' },
        { id: 'bohemian', name: 'Bohemian & Eclectic', icon: 'Feather', color: 'bg-rose-100 text-rose-700', description: 'Mixed patterns and global influences' },
        { id: 'scandinavian', name: 'Scandinavian & Light', icon: 'Sun', color: 'bg-sky-100 text-sky-700', description: 'Light woods and hygge comfort' },
        { id: 'vintage', name: 'Vintage & Classic', icon: 'Clock', color: 'bg-violet-100 text-violet-700', description: 'Timeless pieces with history' }
      ]
    }
  };

  const handleMoodToggle = (moodId) => {
    const newMoods = selectedMoods?.includes(moodId)
      ? selectedMoods?.filter(id => id !== moodId)
      : [...selectedMoods, moodId];
    onMoodChange(newMoods);
  };

  const currentMoods = moodCategories?.[activeCategory]?.moods;
  const selectedCount = selectedMoods?.length;

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-spatial-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">Design Your Mood</h2>
        <p className="text-text-secondary">
          Select moods that resonate with your vision. Our AI will create personalized designs based on your choices.
        </p>
      </div>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 p-1 bg-muted rounded-lg">
        {Object.entries(moodCategories)?.map(([key, category]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`flex-1 min-w-0 px-4 py-2 rounded-md text-sm font-medium spatial-transition ${
              activeCategory === key
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-text-secondary hover:text-primary hover:bg-background'
            }`}
          >
            {category?.title}
          </button>
        ))}
      </div>
      {/* Category Description */}
      <div className="mb-6 p-4 bg-surface rounded-lg border-l-4 border-accent">
        <h3 className="font-semibold text-primary mb-1">{moodCategories?.[activeCategory]?.title}</h3>
        <p className="text-sm text-text-secondary">{moodCategories?.[activeCategory]?.description}</p>
      </div>
      {/* Mood Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {currentMoods?.map((mood) => {
          const isSelected = selectedMoods?.includes(mood?.id);
          return (
            <button
              key={mood?.id}
              onClick={() => handleMoodToggle(mood?.id)}
              className={`p-4 rounded-lg border-2 spatial-transition text-left ${
                isSelected
                  ? 'border-accent bg-accent/5 shadow-md'
                  : 'border-border hover:border-accent/50 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${mood?.color} flex-shrink-0`}>
                  <Icon name={mood?.icon} size={20} color="currentColor" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-semibold mb-1 ${isSelected ? 'text-accent' : 'text-primary'}`}>
                    {mood?.name}
                  </h4>
                  <p className="text-sm text-text-secondary line-clamp-2">
                    {mood?.description}
                  </p>
                </div>
              </div>
              {isSelected && (
                <div className="mt-3 flex items-center justify-end">
                  <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} color="white" strokeWidth={3} />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
      {/* Selection Summary & Generate Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-accent">{selectedCount}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-primary">
              {selectedCount} mood{selectedCount !== 1 ? 's' : ''} selected
            </p>
            <p className="text-xs text-text-secondary">
              {selectedCount === 0 ? 'Choose at least one mood to continue' : 
               selectedCount <= 3 ? 'Great selection! Ready to generate designs.': 'Consider focusing on 2-3 key moods for best results.'}
            </p>
          </div>
        </div>

        <Button
          variant="default"
          size="lg"
          disabled={selectedCount === 0}
          onClick={onGenerateDesign}
          iconName="Sparkles"
          iconPosition="left"
          className="bg-cta hover:bg-cta/90 text-cta-foreground confidence-scale"
        >
          Generate AI Design
        </Button>
      </div>
    </div>
  );
};

export default MoodSelector;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DesignTimeline = ({ onRestoreVersion, onCompareVersions }) => {
  const [selectedVersions, setSelectedVersions] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  // Mock design history data
  const designVersions = [
    {
      id: 'v1',
      name: "Initial Cozy Concept",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      description: "First AI-generated design based on \'cozy\' and \'modern\' moods",
      changes: ["Added sectional sofa", "Warm color palette", "Soft lighting"],
      confidence: 87,
      totalPrice: "$3,245",
      status: "saved"
    },
    {
      id: 'v2',
      name: "Refined Layout",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&h=300&fit=crop",
      description: "Adjusted furniture placement for better flow and natural light",
      changes: ["Repositioned coffee table", "Added floor lamp", "Changed rug size"],
      confidence: 91,
      totalPrice: "$3,456",
      status: "modified"
    },
    {
      id: 'v3',
      name: "Color Exploration",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      description: "Experimented with sage green accents and natural textures",
      changes: ["Updated throw pillows", "Changed wall color", "Added plants"],
      confidence: 89,
      totalPrice: "$3,567",
      status: "experimental"
    },
    {
      id: 'v4',
      name: "Minimalist Approach",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&h=300&fit=crop",
      description: "Simplified design with focus on essential pieces and clean lines",
      changes: ["Removed accent chair", "Simplified decor", "Cleaner lines"],
      confidence: 85,
      totalPrice: "$2,890",
      status: "simplified"
    },
    {
      id: 'v5',
      name: "Current Version",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      description: "Latest iteration combining best elements from previous versions",
      changes: ["Balanced color palette", "Optimal furniture placement", "Perfect lighting"],
      confidence: 94,
      totalPrice: "$3,976",
      status: "current"
    }
  ];

  const handleVersionSelect = (versionId) => {
    if (selectedVersions?.includes(versionId)) {
      setSelectedVersions(selectedVersions?.filter(id => id !== versionId));
    } else if (selectedVersions?.length < 2) {
      setSelectedVersions([...selectedVersions, versionId]);
    }
  };

  const handleCompareVersions = () => {
    if (selectedVersions?.length === 2) {
      setShowComparison(true);
      onCompareVersions(selectedVersions);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'current': return 'bg-accent text-accent-foreground';
      case 'saved': return 'bg-success/10 text-success';
      case 'modified': return 'bg-warning/10 text-warning';
      case 'experimental': return 'bg-purple-100 text-purple-700';
      case 'simplified': return 'bg-blue-100 text-blue-700';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'current': return 'Star';
      case 'saved': return 'Save';
      case 'modified': return 'Edit';
      case 'experimental': return 'Flask';
      case 'simplified': return 'Minimize';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-spatial-sm overflow-hidden">
      {/* Timeline Header */}
      <div className="p-6 border-b border-border bg-gradient-to-r from-accent/5 to-primary/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-primary mb-2 flex items-center space-x-2">
              <Icon name="History" size={20} color="var(--color-accent)" />
              <span>Design Evolution Timeline</span>
            </h2>
            <p className="text-text-secondary">
              Track your design journey and compare different versions
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            {selectedVersions?.length === 2 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCompareVersions}
                iconName="GitCompare"
                iconPosition="left"
              >
                Compare Selected
              </Button>
            )}
            <div className="text-sm text-text-secondary">
              {selectedVersions?.length}/2 selected for comparison
            </div>
          </div>
        </div>
      </div>
      {/* Timeline Content */}
      <div className="p-6">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
          
          <div className="space-y-8">
            {designVersions?.map((version, index) => (
              <div key={version?.id} className="relative flex items-start space-x-6">
                {/* Timeline Node */}
                <div className={`relative z-10 w-16 h-16 rounded-full border-4 border-background flex items-center justify-center ${
                  version?.status === 'current' ? 'bg-accent' : 'bg-muted'
                }`}>
                  <Icon 
                    name={getStatusIcon(version?.status)} 
                    size={20} 
                    color={version?.status === 'current' ? 'white' : 'var(--color-text-secondary)'} 
                  />
                </div>

                {/* Version Card */}
                <div className={`flex-1 bg-background border border-border rounded-lg p-4 spatial-transition ${
                  selectedVersions?.includes(version?.id) ? 'ring-2 ring-accent border-accent' : 'hover:border-accent/50'
                }`}>
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Version Image */}
                    <div className="lg:w-48 flex-shrink-0">
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={version?.image}
                          alt={version?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Version Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-1">{version?.name}</h3>
                          <p className="text-sm text-text-secondary mb-2">{version?.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-text-secondary">
                            <span>{version?.timestamp?.toLocaleDateString()}</span>
                            <span>{version?.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(version?.status)}`}>
                            {version?.status}
                          </span>
                          <button
                            onClick={() => handleVersionSelect(version?.id)}
                            disabled={!selectedVersions?.includes(version?.id) && selectedVersions?.length >= 2}
                            className={`w-6 h-6 rounded border-2 flex items-center justify-center spatial-transition ${
                              selectedVersions?.includes(version?.id)
                                ? 'border-accent bg-accent' :'border-border hover:border-accent'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            {selectedVersions?.includes(version?.id) && (
                              <Icon name="Check" size={12} color="white" strokeWidth={3} />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Changes List */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-primary mb-2">Key Changes:</h4>
                        <div className="flex flex-wrap gap-2">
                          {version?.changes?.map((change, changeIndex) => (
                            <span 
                              key={changeIndex}
                              className="px-2 py-1 bg-surface text-text-secondary rounded text-xs"
                            >
                              {change}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Version Stats */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Icon name="TrendingUp" size={14} color="var(--color-success)" />
                            <span className="text-success font-medium">{version?.confidence}% match</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="DollarSign" size={14} color="var(--color-text-secondary)" />
                            <span className="text-primary font-semibold">{version?.totalPrice}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {version?.status !== 'current' && (
                            <Button
                              variant="outline"
                              size="xs"
                              onClick={() => onRestoreVersion(version)}
                              iconName="RotateCcw"
                              iconPosition="left"
                            >
                              Restore
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="xs"
                            iconName="ExternalLink"
                            iconPosition="left"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Stats */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-surface rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">{designVersions?.length}</div>
              <div className="text-sm text-text-secondary">Total Versions</div>
            </div>
            <div className="text-center p-4 bg-surface rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">
                {Math.round(designVersions?.reduce((acc, v) => acc + v?.confidence, 0) / designVersions?.length)}%
              </div>
              <div className="text-sm text-text-secondary">Avg. Confidence</div>
            </div>
            <div className="text-center p-4 bg-surface rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">7</div>
              <div className="text-sm text-text-secondary">Days Active</div>
            </div>
            <div className="text-center p-4 bg-surface rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">
                ${Math.max(...designVersions?.map(v => parseInt(v?.totalPrice?.replace(/[$,]/g, ''))))}
              </div>
              <div className="text-sm text-text-secondary">Peak Budget</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignTimeline;
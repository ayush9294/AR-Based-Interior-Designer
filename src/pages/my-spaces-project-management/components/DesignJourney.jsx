import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const DesignJourney = ({ milestones, isExpanded, onToggle }) => {
  const getMilestoneIcon = (type) => {
    switch (type) {
      case 'scan':
        return 'Camera';
      case 'placement':
        return 'Package';
      case 'purchase':
        return 'ShoppingCart';
      case 'completion':
        return 'CheckCircle';
      case 'share':
        return 'Share2';
      default:
        return 'Circle';
    }
  };

  const getMilestoneColor = (type) => {
    switch (type) {
      case 'scan':
        return 'text-accent bg-accent/10 border-accent/20';
      case 'placement':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'purchase':
        return 'text-cta bg-cta/10 border-cta/20';
      case 'completion':
        return 'text-success bg-success/10 border-success/20';
      case 'share':
        return 'text-secondary bg-secondary/10 border-secondary/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="spatial-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-cta rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Design Journey</h3>
            <p className="text-sm text-text-secondary">Track your progress and celebrate milestones</p>
          </div>
        </div>
        
        <button
          onClick={onToggle}
          className="flex items-center space-x-2 text-sm text-accent hover:text-accent/80 spatial-transition"
        >
          <span>{isExpanded ? 'Show Less' : 'View All'}</span>
          <Icon 
            name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
            size={16} 
            className="spatial-transition"
          />
        </button>
      </div>
      {/* Journey Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
        
        <div className="space-y-6">
          {milestones?.slice(0, isExpanded ? milestones?.length : 3)?.map((milestone, index) => (
            <div key={milestone?.id} className="relative flex items-start space-x-4">
              {/* Milestone Icon */}
              <div className={`relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center ${getMilestoneColor(milestone?.type)}`}>
                <Icon 
                  name={getMilestoneIcon(milestone?.type)} 
                  size={18} 
                  color="currentColor" 
                  strokeWidth={2.5}
                />
              </div>
              
              {/* Milestone Content */}
              <div className="flex-1 min-w-0 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-text-primary">{milestone?.title}</h4>
                  <span className="text-xs text-text-secondary">{formatDate(milestone?.date)}</span>
                </div>
                
                <p className="text-sm text-text-secondary mb-3">{milestone?.description}</p>
                
                {/* Milestone Media */}
                {milestone?.image && (
                  <div className="relative w-full h-32 rounded-lg overflow-hidden bg-muted mb-3">
                    <Image
                      src={milestone?.image}
                      alt={milestone?.title}
                      className="w-full h-full object-cover"
                    />
                    {milestone?.type === 'scan' && (
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-3">
                        <div className="flex items-center space-x-2 text-white">
                          <Icon name="Cube" size={14} />
                          <span className="text-xs font-medium">3D Room Scan</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Achievement Badge */}
                {milestone?.achievement && (
                  <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-3 py-1 rounded-full text-xs font-medium">
                    <Icon name="Award" size={12} />
                    <span>{milestone?.achievement}</span>
                  </div>
                )}
                
                {/* Stats */}
                {milestone?.stats && (
                  <div className="flex items-center space-x-4 mt-3 text-xs text-text-secondary">
                    {milestone?.stats?.map((stat, statIndex) => (
                      <div key={statIndex} className="flex items-center space-x-1">
                        <Icon name={stat?.icon} size={12} />
                        <span>{stat?.label}: {stat?.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Show More Indicator */}
        {!isExpanded && milestones?.length > 3 && (
          <div className="relative flex items-center justify-center pt-4">
            <div className="absolute left-6 w-0.5 h-8 bg-gradient-to-b from-border to-transparent"></div>
            <button
              onClick={onToggle}
              className="bg-background border border-border rounded-full px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:border-accent spatial-transition"
            >
              +{milestones?.length - 3} more milestones
            </button>
          </div>
        )}
      </div>
      {/* Journey Stats Summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{milestones?.filter(m => m?.type === 'scan')?.length}</div>
            <div className="text-xs text-text-secondary">Rooms Scanned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">{milestones?.filter(m => m?.type === 'placement')?.length}</div>
            <div className="text-xs text-text-secondary">Items Placed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cta">{milestones?.filter(m => m?.type === 'purchase')?.length}</div>
            <div className="text-xs text-text-secondary">Purchases Made</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{milestones?.filter(m => m?.type === 'completion')?.length}</div>
            <div className="text-xs text-text-secondary">Rooms Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignJourney;
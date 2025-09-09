import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onShare, onDuplicate, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'in-progress':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'planning':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div 
      className="spatial-card p-6 hover:shadow-lg spatial-transition group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Thumbnail */}
      <div className="relative mb-4 overflow-hidden rounded-lg bg-muted h-48">
        <Image
          src={project?.thumbnail}
          alt={`${project?.name} room design`}
          className="w-full h-full object-cover spatial-transition group-hover:scale-105"
        />
        
        {/* 3D Overlay Indicator */}
        <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-2">
          <Icon name="Cube" size={14} color="var(--color-accent)" />
          <span className="text-xs font-medium text-accent">3D View</span>
        </div>

        {/* Status Badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project?.status)}`}>
          {project?.status?.charAt(0)?.toUpperCase() + project?.status?.slice(1)}
        </div>

        {/* Quick Actions Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center space-x-2 spatial-transition">
            <Button
              variant="outline"
              size="sm"
              iconName="Eye"
              className="bg-background/90"
            >
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Camera"
              className="bg-background/90"
            >
              AR View
            </Button>
          </div>
        )}
      </div>
      {/* Project Info */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg text-text-primary mb-1">
              {project?.name}
            </h3>
            <p className="text-sm text-text-secondary">
              {project?.roomType} • {project?.dimensions}
            </p>
          </div>
          
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              iconName="MoreVertical"
              onClick={() => setShowActions(!showActions)}
              className="opacity-0 group-hover:opacity-100 spatial-transition"
            />
            
            {/* Actions Dropdown */}
            {showActions && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-modal z-10">
                <div className="py-2">
                  <button
                    onClick={() => onShare(project?.id)}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted spatial-transition"
                  >
                    <Icon name="Share2" size={16} />
                    <span>Share Project</span>
                  </button>
                  <button
                    onClick={() => onDuplicate(project?.id)}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted spatial-transition"
                  >
                    <Icon name="Copy" size={16} />
                    <span>Duplicate</span>
                  </button>
                  <button
                    onClick={() => onDelete(project?.id)}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-error hover:bg-error/10 spatial-transition"
                  >
                    <Icon name="Trash2" size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Progress</span>
            <span className="font-medium text-text-primary">{project?.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-accent rounded-full h-2 spatial-transition"
              style={{ width: `${project?.progress}%` }}
            />
          </div>
        </div>

        {/* Project Stats */}
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Package" size={14} />
              <span>{project?.itemCount} items</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="DollarSign" size={14} />
              <span>${project?.totalValue?.toLocaleString()}</span>
            </div>
          </div>
          <span>Updated {formatDate(project?.lastModified)}</span>
        </div>

        {/* Collaboration Indicators */}
        {project?.collaborators && project?.collaborators?.length > 0 && (
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {project?.collaborators?.slice(0, 3)?.map((collaborator, index) => (
                <Image
                  key={index}
                  src={collaborator?.avatar}
                  alt={collaborator?.name}
                  className="w-6 h-6 rounded-full border-2 border-background object-cover"
                />
              ))}
              {project?.collaborators?.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                  <span className="text-xs font-medium text-text-secondary">
                    +{project?.collaborators?.length - 3}
                  </span>
                </div>
              )}
            </div>
            <span className="text-xs text-text-secondary">
              {project?.collaborators?.length} collaborator{project?.collaborators?.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
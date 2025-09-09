import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentProjectsSection = ({ isVisible }) => {
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock recent projects data
  const mockProjects = [
    {
      id: 1,
      name: "Living Room Makeover",
      roomType: "Living Room",
      lastModified: new Date(Date.now() - 86400000), // 1 day ago
      thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      progress: 85,
      itemsPlaced: 12,
      style: "Modern Minimalist",
      budget: 2450,
      status: "In Progress"
    },
    {
      id: 2,
      name: "Bedroom Refresh",
      roomType: "Bedroom",
      lastModified: new Date(Date.now() - 172800000), // 2 days ago
      thumbnail: "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?w=400&h=300&fit=crop",
      progress: 60,
      itemsPlaced: 8,
      style: "Scandinavian",
      budget: 1850,
      status: "Planning"
    },
    {
      id: 3,
      name: "Home Office Setup",
      roomType: "Office",
      lastModified: new Date(Date.now() - 259200000), // 3 days ago
      thumbnail: "https://images.pixabay.com/photo/2017/03/28/12/11/chairs-2181947_1280.jpg?w=400&h=300&fit=crop",
      progress: 100,
      itemsPlaced: 6,
      style: "Industrial",
      budget: 1200,
      status: "Completed"
    }
  ];

  useEffect(() => {
    // Simulate loading recent projects
    const timer = setTimeout(() => {
      setRecentProjects(mockProjects);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date?.toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-success bg-success/10 border-success/20';
      case 'In Progress':
        return 'text-accent bg-accent/10 border-accent/20';
      case 'Planning':
        return 'text-warning bg-warning/10 border-warning/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  if (!isVisible) return null;

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">
              Welcome back! Continue your projects
            </h2>
            <p className="text-text-secondary">
              Pick up where you left off or start a new room design
            </p>
          </div>
          
          <Link to="/my-spaces-project-management">
            <Button
              variant="outline"
              iconName="Plus"
              iconPosition="left"
              className="confidence-scale"
            >
              New Project
            </Button>
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3]?.map((i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 animate-pulse">
                <div className="aspect-video bg-muted rounded-lg mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="h-2 bg-muted rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {!loading && recentProjects?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects?.map((project) => (
              <div
                key={project?.id}
                className="group bg-card border border-border rounded-xl overflow-hidden shadow-spatial-sm hover:shadow-spatial-lg spatial-transition"
              >
                {/* Project Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project?.thumbnail}
                    alt={project?.name}
                    className="w-full h-full object-cover group-hover:scale-105 spatial-transition"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project?.status)}`}>
                      {project?.status}
                    </span>
                  </div>

                  {/* Progress Badge */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-primary">
                      {project?.progress}%
                    </div>
                  </div>

                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 spatial-transition flex items-center justify-center">
                    <div className="flex space-x-2">
                      <Button
                        variant="default"
                        size="sm"
                        iconName="Camera"
                        iconPosition="left"
                        className="bg-cta hover:bg-cta/90 text-cta-foreground"
                      >
                        Continue AR
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Eye"
                      >
                        Preview
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary spatial-transition">
                      {project?.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Icon name="Home" size={14} color="currentColor" />
                        <span>{project?.roomType}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} color="currentColor" />
                        <span>{formatDate(project?.lastModified)}</span>
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-card-foreground">{project?.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-accent rounded-full h-2 spatial-transition"
                        style={{ width: `${project?.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Project Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="space-y-1">
                      <div className="text-lg font-semibold text-card-foreground">
                        {project?.itemsPlaced}
                      </div>
                      <div className="text-xs text-muted-foreground">Items</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-lg font-semibold text-card-foreground">
                        ${project?.budget?.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Budget</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-card-foreground">
                        {project?.style}
                      </div>
                      <div className="text-xs text-muted-foreground">Style</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Link to="/ar-camera-portal-homepage" className="flex-1">
                      <Button
                        variant="default"
                        fullWidth
                        size="sm"
                        iconName="Camera"
                        iconPosition="left"
                        className="confidence-scale"
                      >
                        Continue
                      </Button>
                    </Link>
                    <Link to="/my-spaces-project-management">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Settings"
                        className="confidence-scale"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && recentProjects?.length === 0 && (
          <div className="text-center py-16 space-y-6">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Icon name="Home" size={32} color="var(--color-muted-foreground)" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">
                No projects yet
              </h3>
              <p className="text-text-secondary max-w-md mx-auto">
                Start your first room design project and see it appear here for easy access.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="default"
                iconName="Camera"
                iconPosition="left"
                className="bg-cta hover:bg-cta/90 text-cta-foreground confidence-scale"
              >
                Start First Project
              </Button>
              
              <Link to="/ai-design-studio-mood-generator">
                <Button
                  variant="outline"
                  iconName="Palette"
                  iconPosition="left"
                  className="confidence-scale"
                >
                  Take Style Quiz
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentProjectsSection;
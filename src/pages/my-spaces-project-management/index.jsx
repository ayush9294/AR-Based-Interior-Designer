import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';

import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import ProjectCard from './components/ProjectCard';
import ProjectFilters from './components/ProjectFilters';
import DesignJourney from './components/DesignJourney';
import WishlistManager from './components/WishlistManager';
import CollaborationPanel from './components/CollaborationPanel';
import DeliveryScheduler from './components/DeliveryScheduler';

const MySpacesProjectManagement = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    roomType: 'all',
    status: 'all',
    sort: 'recent'
  });
  const [activeTab, setActiveTab] = useState('projects');
  const [isJourneyExpanded, setIsJourneyExpanded] = useState(false);

  // Mock data for projects
  const [projects] = useState([
    {
      id: 1,
      name: "Modern Living Room Makeover",
      roomType: "Living Room",
      dimensions: "20' × 16'",
      status: "in-progress",
      progress: 75,
      itemCount: 12,
      totalValue: 8500,
      lastModified: "2025-01-04T10:30:00Z",
      thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      collaborators: [
        {
          name: "Sarah Johnson",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
        },
        {
          name: "Mike Chen",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
        }
      ]
    },
    {
      id: 2,
      name: "Cozy Bedroom Retreat",
      roomType: "Bedroom",
      dimensions: "14' × 12'",
      status: "completed",
      progress: 100,
      itemCount: 8,
      totalValue: 4200,
      lastModified: "2025-01-02T15:45:00Z",
      thumbnail: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
      collaborators: []
    },
    {
      id: 3,
      name: "Home Office Setup",
      roomType: "Office",
      dimensions: "12' × 10'",
      status: "planning",
      progress: 25,
      itemCount: 6,
      totalValue: 3800,
      lastModified: "2025-01-03T09:15:00Z",
      thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      collaborators: [
        {
          name: "Alex Rivera",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
        }
      ]
    },
    {
      id: 4,
      name: "Kitchen Renovation",
      roomType: "Kitchen",
      dimensions: "16' × 14'",
      status: "in-progress",
      progress: 60,
      itemCount: 15,
      totalValue: 12000,
      lastModified: "2025-01-05T14:20:00Z",
      thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      collaborators: []
    }
  ]);

  // Mock data for design journey milestones
  const [milestones] = useState([
    {
      id: 1,
      type: "scan",
      title: "First Room Scan Completed",
      description: "Successfully scanned your living room with 98% accuracy",
      date: "2024-12-15T10:30:00Z",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
      achievement: "AR Pioneer",
      stats: [
        { icon: "Ruler", label: "Accuracy", value: "98%" },
        { icon: "Clock", label: "Scan Time", value: "2m 15s" }
      ]
    },
    {
      id: 2,
      type: "placement",
      title: "First Furniture Placement",
      description: "Placed your first sofa using AR visualization",
      date: "2024-12-16T14:45:00Z",
      achievement: "Design Explorer"
    },
    {
      id: 3,
      type: "purchase",
      title: "First Purchase Made",
      description: "Confidently purchased the Modern Sectional Sofa",
      date: "2024-12-20T09:20:00Z",
      stats: [
        { icon: "DollarSign", label: "Amount", value: "$2,499" },
        { icon: "Star", label: "Confidence", value: "95%" }
      ]
    },
    {
      id: 4,
      type: "completion",
      title: "Room Design Completed",
      description: "Finished your bedroom makeover project",
      date: "2025-01-02T16:30:00Z",
      achievement: "Room Master",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&h=200&fit=crop"
    },
    {
      id: 5,
      type: "share",
      title: "Design Shared",
      description: "Shared your completed bedroom with the community",
      date: "2025-01-03T11:15:00Z",
      stats: [
        { icon: "Heart", label: "Likes", value: "47" },
        { icon: "MessageCircle", label: "Comments", value: "12" }
      ]
    }
  ]);

  // Mock data for wishlist
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Scandinavian Dining Table",
      brand: "Nordic Home",
      room: "dining-room",
      price: 1299,
      priceChange: -50,
      priority: "high",
      availability: "in-stock",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop",
      dateAdded: "2024-12-28T10:00:00Z",
      priceAlert: true
    },
    {
      id: 2,
      name: "Velvet Accent Chair",
      brand: "Luxury Living",
      room: "living-room",
      price: 899,
      priceChange: 25,
      priority: "medium",
      availability: "low-stock",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop",
      dateAdded: "2024-12-30T15:30:00Z",
      priceAlert: false
    },
    {
      id: 3,
      name: "Industrial Bookshelf",
      brand: "Urban Loft",
      room: "office",
      price: 549,
      priority: "low",
      availability: "out-of-stock",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop",
      dateAdded: "2025-01-01T12:00:00Z",
      priceAlert: true
    }
  ]);

  // Mock data for collaborators and comments
  const [collaborators] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      permission: "owner"
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@email.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      permission: "editor"
    },
    {
      id: 3,
      name: "Alex Rivera",
      email: "alex.r@email.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      permission: "viewer"
    }
  ]);

  const [comments] = useState([
    {
      id: 1,
      content: "I love the color scheme! Maybe we could add some plants for a natural touch?",
      author: {
        name: "Mike Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
      },
      createdAt: "2025-01-04T10:30:00Z",
      attachedTo: "Modern Sectional Sofa",
      resolved: false
    },
    {
      id: 2,
      content: "The lighting looks perfect in this arrangement. Great choice!",
      author: {
        name: "Alex Rivera",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
      },
      createdAt: "2025-01-03T15:45:00Z",
      resolved: true
    }
  ]);

  // Mock data for deliveries
  const [deliveries] = useState([
    {
      id: 1,
      itemName: "Modern Sectional Sofa",
      itemImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop",
      room: "Living Room",
      scheduledDate: "2025-01-08T14:00:00Z",
      status: "scheduled",
      trackingNumber: "TRK123456789"
    },
    {
      id: 2,
      itemName: "Coffee Table",
      itemImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop",
      room: "Living Room",
      scheduledDate: "2025-01-10T10:00:00Z",
      status: "in-transit",
      trackingNumber: "TRK987654321"
    },
    {
      id: 3,
      itemName: "Dining Chairs (Set of 4)",
      itemImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop",
      room: "Dining Room",
      scheduledDate: "2025-01-12T16:00:00Z",
      status: "scheduled"
    }
  ]);

  // Filter and sort projects
  const filteredProjects = projects?.filter(project => {
      if (filters?.roomType !== 'all' && !project?.roomType?.toLowerCase()?.includes(filters?.roomType?.replace('-', ' '))) {
        return false;
      }
      if (filters?.status !== 'all' && project?.status !== filters?.status) {
        return false;
      }
      return true;
    })?.sort((a, b) => {
      switch (filters?.sort) {
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'progress':
          return b?.progress - a?.progress;
        case 'value':
          return b?.totalValue - a?.totalValue;
        case 'created':
          return new Date(b.lastModified) - new Date(a.lastModified);
        case 'recent':
        default:
          return new Date(b.lastModified) - new Date(a.lastModified);
      }
    });

  // Event handlers
  const handleFilterChange = (key, value) => {
    if (key === 'reset') {
      setFilters({
        roomType: 'all',
        status: 'all',
        sort: 'recent'
      });
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleSortChange = (value) => {
    setFilters(prev => ({ ...prev, sort: value }));
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const handleProjectShare = (projectId) => {
    console.log('Sharing project:', projectId);
  };

  const handleProjectDuplicate = (projectId) => {
    console.log('Duplicating project:', projectId);
  };

  const handleProjectDelete = (projectId) => {
    console.log('Deleting project:', projectId);
  };

  const handleWishlistRemove = (itemId) => {
    setWishlistItems(prev => prev?.filter(item => item?.id !== itemId));
  };

  const handleWishlistMoveToCart = (itemId) => {
    console.log('Moving to cart:', itemId);
  };

  const handleWishlistPriorityChange = (itemId, priority) => {
    setWishlistItems(prev => prev?.map(item => 
      item?.id === itemId ? { ...item, priority } : item
    ));
  };

  const handleInviteCollaborator = (email) => {
    console.log('Inviting collaborator:', email);
  };

  const handleRemoveCollaborator = (collaboratorId) => {
    console.log('Removing collaborator:', collaboratorId);
  };

  const handleAddComment = (content) => {
    console.log('Adding comment:', content);
  };

  const handleResolveComment = (commentId) => {
    console.log('Resolving comment:', commentId);
  };

  const handleScheduleDelivery = () => {
    console.log('Scheduling new delivery');
  };

  const handleRescheduleDelivery = (deliveryId) => {
    console.log('Rescheduling delivery:', deliveryId);
  };

  const tabs = [
    { id: 'projects', label: 'My Projects', icon: 'Home', count: projects?.length },
    { id: 'journey', label: 'Design Journey', icon: 'TrendingUp', count: milestones?.length },
    { id: 'wishlist', label: 'Wishlist', icon: 'Heart', count: wishlistItems?.length },
    { id: 'collaboration', label: 'Collaboration', icon: 'Users', count: comments?.filter(c => !c?.resolved)?.length },
    { id: 'delivery', label: 'Deliveries', icon: 'Truck', count: deliveries?.filter(d => d?.status !== 'delivered')?.length }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>My Spaces & Project Management - ARSpace Designer</title>
        <meta name="description" content="Manage your AR design projects, track progress, collaborate with others, and organize your furniture wishlist in one comprehensive dashboard." />
      </Helmet>
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-cta/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-spatial-md">
                <Icon name="Home" size={32} color="white" strokeWidth={2.5} />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              My Spaces & Projects
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Organize your AR design projects with spatial intelligence. Track progress, collaborate with others, and manage your furniture journey from scan to delivery.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">{projects?.length}</div>
              <div className="text-sm text-text-secondary">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-1">
                {projects?.filter(p => p?.status === 'completed')?.length}
              </div>
              <div className="text-sm text-text-secondary">Completed Rooms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning mb-1">{wishlistItems?.length}</div>
              <div className="text-sm text-text-secondary">Wishlist Items</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cta mb-1">
                ${projects?.reduce((sum, p) => sum + p?.totalValue, 0)?.toLocaleString()}
              </div>
              <div className="text-sm text-text-secondary">Total Value</div>
            </div>
          </div>
        </div>
      </section>
      {/* Navigation Tabs */}
      <section className="bg-background border-b border-border sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-1 overflow-x-auto py-4">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap spatial-transition ${
                  activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground shadow-spatial-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon 
                  name={tab?.icon} 
                  size={18} 
                  color="currentColor" 
                  strokeWidth={activeTab === tab?.id ? 2.5 : 2}
                />
                <span className="font-medium">{tab?.label}</span>
                {tab?.count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    activeTab === tab?.id
                      ? 'bg-primary-foreground/20 text-primary-foreground'
                      : 'bg-accent/10 text-accent'
                  }`}>
                    {tab?.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            <ProjectFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              onViewChange={handleViewChange}
              viewMode={viewMode}
              projectCount={filteredProjects?.length}
            />

            {/* Projects Grid/List */}
            <div className={`${
              viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :'space-y-4'
            }`}>
              {filteredProjects?.map((project) => (
                <ProjectCard
                  key={project?.id}
                  project={project}
                  onShare={handleProjectShare}
                  onDuplicate={handleProjectDuplicate}
                  onDelete={handleProjectDelete}
                />
              ))}
            </div>

            {filteredProjects?.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Home" size={32} color="var(--color-text-secondary)" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">No projects found</h3>
                <p className="text-text-secondary mb-6">
                  Start your first AR design project by scanning a room
                </p>
                <Link to="/ar-camera-portal-homepage">
                  <Button
                    variant="default"
                    iconName="Camera"
                    iconPosition="left"
                    className="bg-cta hover:bg-cta/90 text-cta-foreground"
                  >
                    Scan Your First Room
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Design Journey Tab */}
        {activeTab === 'journey' && (
          <DesignJourney
            milestones={milestones}
            isExpanded={isJourneyExpanded}
            onToggle={() => setIsJourneyExpanded(!isJourneyExpanded)}
          />
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <WishlistManager
            wishlistItems={wishlistItems}
            onRemoveItem={handleWishlistRemove}
            onMoveToCart={handleWishlistMoveToCart}
            onPriorityChange={handleWishlistPriorityChange}
          />
        )}

        {/* Collaboration Tab */}
        {activeTab === 'collaboration' && (
          <CollaborationPanel
            collaborators={collaborators}
            comments={comments}
            onInviteCollaborator={handleInviteCollaborator}
            onRemoveCollaborator={handleRemoveCollaborator}
            onAddComment={handleAddComment}
            onResolveComment={handleResolveComment}
          />
        )}

        {/* Delivery Tab */}
        {activeTab === 'delivery' && (
          <DeliveryScheduler
            deliveries={deliveries}
            onScheduleDelivery={handleScheduleDelivery}
            onRescheduleDelivery={handleRescheduleDelivery}
          />
        )}
      </main>
      {/* Quick Actions FAB */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex flex-col space-y-3">
          <Link to="/ar-camera-portal-homepage">
            <Button
              variant="default"
              size="icon"
              className="w-14 h-14 rounded-full bg-cta hover:bg-cta/90 text-cta-foreground shadow-spatial-floating confidence-scale"
              iconName="Camera"
              iconSize={24}
            />
          </Link>
          
          <Link to="/smart-catalog-furniture-universe">
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full bg-background shadow-spatial-md confidence-scale"
              iconName="Plus"
              iconSize={20}
            />
          </Link>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Icon name="Cube" size={24} color="white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary">ARSpace Designer</h3>
                  <p className="text-sm text-text-secondary">Confidence through visualization</p>
                </div>
              </div>
              <p className="text-text-secondary mb-4">
                Transform your space with confidence using AR technology and AI-powered design intelligence.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/ar-camera-portal-homepage" className="block text-text-secondary hover:text-text-primary spatial-transition">
                  AR Camera
                </Link>
                <Link to="/smart-catalog-furniture-universe" className="block text-text-secondary hover:text-text-primary spatial-transition">
                  Furniture Catalog
                </Link>
                <Link to="/ai-design-studio-mood-generator" className="block text-text-secondary hover:text-text-primary spatial-transition">
                  Design Studio
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Support</h4>
              <div className="space-y-2">
                <Link to="/ar-measurement-planning-tools" className="block text-text-secondary hover:text-text-primary spatial-transition">
                  Measurement Tools
                </Link>
                <a href="#" className="block text-text-secondary hover:text-text-primary spatial-transition">
                  Help Center
                </a>
                <a href="#" className="block text-text-secondary hover:text-text-primary spatial-transition">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-text-secondary">
            <p>&copy; {new Date()?.getFullYear()} ARSpace Designer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MySpacesProjectManagement;
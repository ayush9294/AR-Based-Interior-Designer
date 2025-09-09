import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ProjectFilters = ({ 
  filters, 
  onFilterChange, 
  onSortChange, 
  onViewChange, 
  viewMode,
  projectCount 
}) => {
  const roomTypeOptions = [
    { value: 'all', label: 'All Rooms' },
    { value: 'living-room', label: 'Living Room' },
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'dining-room', label: 'Dining Room' },
    { value: 'office', label: 'Home Office' },
    { value: 'bathroom', label: 'Bathroom' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'planning', label: 'Planning' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Recently Updated' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'progress', label: 'Progress' },
    { value: 'value', label: 'Total Value' },
    { value: 'created', label: 'Date Created' }
  ];

  return (
    <div className="bg-background border-b border-border sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Left Side - Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={18} color="var(--color-text-secondary)" />
              <span className="text-sm font-medium text-text-secondary">Filters:</span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Select
                options={roomTypeOptions}
                value={filters?.roomType}
                onChange={(value) => onFilterChange('roomType', value)}
                placeholder="Room Type"
                className="min-w-32"
              />
              
              <Select
                options={statusOptions}
                value={filters?.status}
                onChange={(value) => onFilterChange('status', value)}
                placeholder="Status"
                className="min-w-32"
              />
              
              <Select
                options={sortOptions}
                value={filters?.sort}
                onChange={onSortChange}
                placeholder="Sort by"
                className="min-w-40"
              />
            </div>
          </div>

          {/* Right Side - View Controls & Stats */}
          <div className="flex items-center justify-between sm:justify-end space-x-4">
            {/* Project Count */}
            <div className="text-sm text-text-secondary">
              {projectCount} project{projectCount !== 1 ? 's' : ''}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                iconName="Grid3X3"
                onClick={() => onViewChange('grid')}
                className="px-3"
              />
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                iconName="List"
                onClick={() => onViewChange('list')}
                className="px-3"
              />
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Search"
                iconPosition="left"
              >
                Search
              </Button>
              
              <Button
                variant="default"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                className="bg-cta hover:bg-cta/90 text-cta-foreground"
              >
                New Project
              </Button>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(filters?.roomType !== 'all' || filters?.status !== 'all') && (
          <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
            <span className="text-xs text-text-secondary">Active filters:</span>
            <div className="flex items-center space-x-2">
              {filters?.roomType !== 'all' && (
                <div className="flex items-center space-x-1 bg-accent/10 text-accent px-2 py-1 rounded-full text-xs">
                  <span>{roomTypeOptions?.find(opt => opt?.value === filters?.roomType)?.label}</span>
                  <button
                    onClick={() => onFilterChange('roomType', 'all')}
                    className="hover:bg-accent/20 rounded-full p-0.5"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              )}
              
              {filters?.status !== 'all' && (
                <div className="flex items-center space-x-1 bg-accent/10 text-accent px-2 py-1 rounded-full text-xs">
                  <span>{statusOptions?.find(opt => opt?.value === filters?.status)?.label}</span>
                  <button
                    onClick={() => onFilterChange('status', 'all')}
                    className="hover:bg-accent/20 rounded-full p-0.5"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              )}
              
              <button
                onClick={() => onFilterChange('reset')}
                className="text-xs text-text-secondary hover:text-text-primary spatial-transition"
              >
                Clear all
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectFilters;
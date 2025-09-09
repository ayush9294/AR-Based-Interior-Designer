import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const primaryNavItems = [
    {
      name: 'AR Camera',
      path: '/ar-camera-portal-homepage',
      icon: 'Camera',
      description: 'Scan your room'
    },
    {
      name: 'Furniture',
      path: '/smart-catalog-furniture-universe',
      icon: 'Sofa',
      description: 'Browse catalog'
    },
    {
      name: 'Design Studio',
      path: '/ai-design-studio-mood-generator',
      icon: 'Palette',
      description: 'AI mood generator'
    },
    {
      name: 'My Spaces',
      path: '/my-spaces-project-management',
      icon: 'Home',
      description: 'Manage projects'
    }
  ];

  const secondaryNavItems = [
    {
      name: 'AR Shopping',
      path: '/ar-shopping-experience-spatial-cart',
      icon: 'ShoppingCart',
      description: 'Spatial cart'
    },
    {
      name: 'Measurements',
      path: '/ar-measurement-planning-tools',
      icon: 'Ruler',
      description: 'Planning tools'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`spatial-nav w-full transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-spatial-sm' : 'bg-background/90'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link 
            to="/ar-camera-portal-homepage" 
            className="flex items-center space-x-3 hover:opacity-80 spatial-transition"
            onClick={closeMobileMenu}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-spatial-sm">
                <Icon name="Cube" size={24} color="white" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-cta rounded-full flex items-center justify-center">
                <Icon name="Sparkles" size={10} color="white" strokeWidth={3} />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-primary tracking-spatial">
                ARSpace Designer
              </h1>
              <p className="text-xs text-text-secondary -mt-1">
                Confidence through visualization
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {primaryNavItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`group relative px-4 py-2 rounded-lg spatial-transition ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-spatial-sm'
                    : 'text-text-secondary hover:text-primary hover:bg-muted'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={item?.icon} 
                    size={18} 
                    color="currentColor" 
                    strokeWidth={isActivePath(item?.path) ? 2.5 : 2}
                  />
                  <span className="font-medium text-sm">{item?.name}</span>
                </div>
                
                {/* Tooltip */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-modal opacity-0 group-hover:opacity-100 spatial-transition pointer-events-none whitespace-nowrap z-50">
                  {item?.description}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-popover"></div>
                </div>
              </Link>
            ))}

            {/* More Menu */}
            <div className="relative group">
              <Button
                variant="ghost"
                size="sm"
                className="text-text-secondary hover:text-primary"
                iconName="MoreHorizontal"
                iconSize={18}
              >
                More
              </Button>
              
              {/* Dropdown */}
              <div className="absolute top-full right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible spatial-transition z-50">
                <div className="py-2">
                  {secondaryNavItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className={`flex items-center space-x-3 px-4 py-2 text-sm spatial-transition ${
                        isActivePath(item?.path)
                          ? 'bg-accent text-accent-foreground'
                          : 'text-popover-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} color="currentColor" />
                      <div>
                        <div className="font-medium">{item?.name}</div>
                        <div className="text-xs text-muted-foreground">{item?.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* AR Camera CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              iconName="Camera"
              iconPosition="left"
              className="confidence-scale"
            >
              Scan Room
            </Button>
            
            <Button
              variant="default"
              size="sm"
              className="bg-cta hover:bg-cta/90 text-cta-foreground confidence-scale"
              iconName="Sparkles"
              iconPosition="left"
            >
              Try AR Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleMobileMenu}
            iconName={isMobileMenuOpen ? "X" : "Menu"}
            iconSize={24}
          />
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-md">
            <div className="px-4 py-4 space-y-2">
              {/* Primary Navigation */}
              <div className="space-y-1">
                {primaryNavItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg spatial-transition touch-optimized ${
                      isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground shadow-spatial-sm'
                        : 'text-text-secondary hover:text-primary hover:bg-muted'
                    }`}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={20} 
                      color="currentColor" 
                      strokeWidth={isActivePath(item?.path) ? 2.5 : 2}
                    />
                    <div>
                      <div className="font-medium">{item?.name}</div>
                      <div className="text-xs opacity-75">{item?.description}</div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-border my-4"></div>

              {/* Secondary Navigation */}
              <div className="space-y-1">
                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  More Tools
                </div>
                {secondaryNavItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg spatial-transition touch-optimized ${
                      isActivePath(item?.path)
                        ? 'bg-accent text-accent-foreground'
                        : 'text-text-secondary hover:text-primary hover:bg-muted'
                    }`}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={20} 
                      color="currentColor" 
                      strokeWidth={isActivePath(item?.path) ? 2.5 : 2}
                    />
                    <div>
                      <div className="font-medium">{item?.name}</div>
                      <div className="text-xs opacity-75">{item?.description}</div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Mobile CTAs */}
              <div className="pt-4 space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Camera"
                  iconPosition="left"
                  className="touch-optimized"
                >
                  Scan Your Room
                </Button>
                
                <Button
                  variant="default"
                  fullWidth
                  className="bg-cta hover:bg-cta/90 text-cta-foreground touch-optimized"
                  iconName="Sparkles"
                  iconPosition="left"
                >
                  Try AR Experience
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Trust Signal Bar */}
      <div className="hidden md:block border-t border-border/50 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-2 space-x-8 text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={14} color="currentColor" />
              <span>2M+ rooms designed</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={14} color="currentColor" />
              <span>99.2% satisfaction</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={14} color="currentColor" />
              <span>30-day guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
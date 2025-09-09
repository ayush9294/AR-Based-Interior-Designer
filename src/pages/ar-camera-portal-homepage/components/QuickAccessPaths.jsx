import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const QuickAccessPaths = () => {
  const accessPaths = [
    {
      id: 1,
      title: "Start with Style Quiz",
      description: "Not sure what you want? Take our 2-minute style assessment to discover your perfect aesthetic.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      icon: "Palette",
      route: "/ai-design-studio-mood-generator",
      cta: "Take Quiz",
      badge: "2 min",
      color: "from-purple-500 to-pink-500",
      userType: "Uncertain users",
      benefits: ["Personalized recommendations", "Style confidence", "Curated collections"]
    },
    {
      id: 2,
      title: "Browse Trending Rooms",
      description: "Get inspired by thousands of beautifully designed spaces created by our community.",
      image: "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?w=400&h=300&fit=crop",
      icon: "TrendingUp",
      route: "/smart-catalog-furniture-universe",
      cta: "Explore Trends",
      badge: "Popular",
      color: "from-blue-500 to-cyan-500",
      userType: "Inspiration seekers",
      benefits: ["Real room designs", "Trending styles", "Community favorites"]
    },
    {
      id: 3,
      title: "Scan & Shop",
      description: "Ready to transform? Jump straight into AR scanning and start placing furniture in your space.",
      image: "https://images.pixabay.com/photo/2017/03/28/12/11/chairs-2181947_1280.jpg?w=400&h=300&fit=crop",
      icon: "Camera",
      route: "/ar-camera-portal-homepage",
      cta: "Start Scanning",
      badge: "AR Ready",
      color: "from-green-500 to-emerald-500",
      userType: "Confident users",
      benefits: ["Instant AR preview", "Precise measurements", "Real-time placement"]
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary">
            Choose Your Design Journey
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Whether you're exploring styles, seeking inspiration, or ready to transform, 
            we have the perfect starting point for you.
          </p>
        </div>

        {/* Access Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accessPaths?.map((path) => (
            <div
              key={path?.id}
              className="group relative bg-card border border-border rounded-xl overflow-hidden shadow-spatial-sm hover:shadow-spatial-lg spatial-transition"
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={path?.image}
                  alt={path?.title}
                  className="w-full h-full object-cover group-hover:scale-105 spatial-transition"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${path?.color} opacity-20 group-hover:opacity-30 spatial-transition`}></div>
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-background/90 text-primary backdrop-blur-sm">
                    {path?.badge}
                  </span>
                </div>

                {/* Icon */}
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Icon name={path?.icon} size={20} color="var(--color-primary)" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary spatial-transition">
                    {path?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    For {path?.userType}
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    {path?.description}
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-card-foreground">
                    What you'll get:
                  </h4>
                  <ul className="space-y-1">
                    {path?.benefits?.map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                        <Icon name="Check" size={14} color="var(--color-success)" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Link to={path?.route} className="block">
                    <Button
                      variant="default"
                      fullWidth
                      className="confidence-scale"
                      iconName={path?.icon}
                      iconPosition="right"
                    >
                      {path?.cta}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/20 rounded-xl spatial-transition pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-primary">
              Still not sure where to start?
            </h3>
            <p className="text-text-secondary">
              Our AR assistant can guide you through the perfect design journey for your space.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/my-spaces-project-management">
              <Button
                variant="outline"
                iconName="MessageCircle"
                iconPosition="left"
                className="confidence-scale"
              >
                Chat with AR Assistant
              </Button>
            </Link>
            
            <Link to="/ar-measurement-planning-tools">
              <Button
                variant="ghost"
                iconName="Ruler"
                iconPosition="left"
                className="confidence-scale"
              >
                Measure My Space First
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickAccessPaths;
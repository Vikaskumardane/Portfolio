import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: './Home', icon: 'Home' },
    { name: 'About', path: '/about', icon: 'User' },
    { name: 'Experience', path: '/experience-timeline', icon: 'Clock' },
    { name: 'Skills', path: '/skills-matrix', icon: 'Code' },
    { name: 'Projects', path: '/projects-showcase', icon: 'FolderOpen' },
    { name: 'Contact', path: '/contact', icon: 'Mail' }
  ];

  const primaryNavItems = navigationItems?.slice(0, 4);
  const secondaryNavItems = navigationItems?.slice(4);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleNavigation = (path) => {
    window.location.href = path;
    closeMenu();
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-cosmic ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-cosmic cosmic-shadow' 
          : 'bg-transparent'
      }`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-6 lg:px-8">
          {/* Logo Section */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavigation('/hero-landing')}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center cosmic-glow group-hover:cosmic-pulse transition-cosmic">
                <Icon 
                  name="Zap" 
                  size={20} 
                  className="text-primary-foreground" 
                />
              </div>
            </div>
            <div className="ml-3">
              <h1 className="font-headline text-xl text-foreground group-hover:text-primary transition-cosmic">
                Vikaskumar Dane
              </h1>
              <p className="text-xs text-muted-foreground font-mono">
                Full Stack Engineer
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {primaryNavItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-body font-semibold transition-cosmic ${
                  isActivePath(item?.path)
                    ? 'bg-primary/10 text-primary cosmic-glow' :'text-foreground hover:text-primary hover:bg-primary/5'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={16} 
                  className="mr-2" 
                />
                {item?.name}
              </button>
            ))}

            {/* More Menu for Secondary Items */}
            <div className="relative group">
              <button className="flex items-center px-4 py-2 rounded-lg text-sm font-body font-semibold text-foreground hover:text-primary hover:bg-primary/5 transition-cosmic">
                <Icon name="MoreHorizontal" size={16} className="mr-2" />
                More
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg cosmic-shadow opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-cosmic">
                <div className="py-2">
                  {secondaryNavItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className={`w-full flex items-center px-4 py-2 text-sm font-body transition-cosmic ${
                        isActivePath(item?.path)
                          ? 'text-primary bg-primary/10' :'text-popover-foreground hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      <Icon 
                        name={item?.icon} 
                        size={16} 
                        className="mr-3" 
                      />
                      {item?.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleMenu}
          >
            <Icon 
              name={isMenuOpen ? "X" : "Menu"} 
              size={24} 
            />
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background/95 backdrop-blur-cosmic border-t border-border">
            <nav className="px-6 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-body font-semibold transition-cosmic ${
                    isActivePath(item?.path)
                      ? 'bg-primary/10 text-primary cosmic-glow' :'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <Icon 
                    name={item?.icon} 
                    size={18} 
                    className="mr-3" 
                  />
                  {item?.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
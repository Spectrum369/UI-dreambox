import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, User, Search, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background-light/80 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Sparkles className="w-8 h-8 text-primary" />
          <span className="text-xl font-display font-semibold">NexusAI</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" label="Home" />
          <NavLink to="/catalog" label="Shop" />
          <NavLink to="/profile" label="My Designs" />
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <Link to="/profile" className="p-2 rounded-full hover:bg-white/5 transition-colors">
            <User className="w-5 h-5" />
          </Link>
          <Link to="/cart" className="p-2 rounded-full hover:bg-white/5 transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            {cartItems.length > 0 && (
              <motion.div 
                className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs font-medium"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {cartItems.length}
              </motion.div>
            )}
          </Link>
        </div>
        
        <button 
          className="md:hidden p-2 rounded-full hover:bg-white/5 transition-colors" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="glass absolute top-full left-0 right-0 mt-2 p-4 mx-2 rounded-lg shadow-lg md:hidden z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <nav className="flex flex-col space-y-4">
            <MobileNavLink to="/" label="Home" />
            <MobileNavLink to="/catalog" label="Shop" />
            <MobileNavLink to="/profile" label="My Designs" />
            <MobileNavLink to="/cart" label="Cart" badge={cartItems.length} />
            <hr className="border-white/10" />
            <MobileNavLink to="/profile" label="My Account" />
          </nav>
        </motion.div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`relative font-medium transition-colors hover:text-primary ${
        isActive ? 'text-primary' : 'text-white'
      }`}
    >
      {label}
      {isActive && (
        <motion.div 
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
          layoutId="navIndicator"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
};

interface MobileNavLinkProps {
  to: string;
  label: string;
  badge?: number;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, label, badge }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
        isActive ? 'bg-primary/20 text-primary' : 'hover:bg-white/5'
      }`}
    >
      <span>{label}</span>
      {badge && badge > 0 && (
        <span className="bg-primary px-2 py-0.5 text-xs rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
};

export default Header;
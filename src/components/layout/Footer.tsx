import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Github, Heart, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-lg font-display font-semibold">NexusAI</span>
            </div>
            <p className="text-neutral-400 mb-4 text-sm">
              Revolutionizing fashion with AI-powered custom apparel designs.
              Create unique, personalized clothing with our cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Instagram className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Twitter className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Facebook className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Github className="w-5 h-5" />} />
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-lg">Shop</h3>
            <ul className="space-y-2">
              <FooterLink href="/catalog" label="All Products" />
              <FooterLink href="/catalog?category=hoodies" label="Hoodies" />
              <FooterLink href="/catalog?category=tshirts" label="T-Shirts" />
              <FooterLink href="/catalog?category=accessories" label="Accessories" />
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-lg">Account</h3>
            <ul className="space-y-2">
              <FooterLink href="/profile" label="My Account" />
              <FooterLink href="/profile/orders" label="My Orders" />
              <FooterLink href="/profile/designs" label="Saved Designs" />
              <FooterLink href="/cart" label="Shopping Cart" />
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-lg">Information</h3>
            <ul className="space-y-2">
              <FooterLink href="/about" label="About Us" />
              <FooterLink href="/contact" label="Contact Us" />
              <FooterLink href="/faq" label="FAQ" />
              <FooterLink href="/privacy" label="Privacy Policy" />
              <FooterLink href="/terms" label="Terms of Service" />
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            &copy; {new Date().getFullYear()} NexusAI Apparel. All rights reserved.
          </p>
          <p className="text-neutral-400 text-sm mt-2 md:mt-0 flex items-center">
            Made with <Heart className="w-4 h-4 text-primary mx-1" /> using React & AI
          </p>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon }) => {
  return (
    <a 
      href={href} 
      className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-all hover:bg-white/10 hover:text-primary"
      target="_blank" 
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
};

interface FooterLinkProps {
  href: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, label }) => {
  return (
    <li>
      <Link 
        to={href} 
        className="text-neutral-400 hover:text-white transition-colors duration-200"
      >
        {label}
      </Link>
    </li>
  );
};

export default Footer;
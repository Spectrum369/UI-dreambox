import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shirt, Palette, LayoutGrid, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 text-center lg:text-left">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Design <span className="text-primary">Custom Apparel</span> with AI
              </motion.h1>
              
              <motion.p 
                className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Create unique clothing designs with our AI-powered platform. 
                Describe your idea, and watch as our AI brings your vision to life.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Button 
                  variant="primary" 
                  size="lg" 
                  icon={<Sparkles className="w-5 h-5" />}
                >
                  <Link to="/catalog">Start Designing</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  icon={<Shirt className="w-5 h-5" />}
                >
                  <Link to="/catalog">Browse Collection</Link>
                </Button>
              </motion.div>
            </div>
            
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="relative">
                <div className="glass rounded-2xl p-1 shadow-lg">
                  <img 
                    src="https://images.pexels.com/photos/1336873/pexels-photo-1336873.jpeg" 
                    alt="AI Generated Hoodie" 
                    className="rounded-xl w-full max-w-md mx-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 glass rounded-xl p-4 shadow-lg max-w-[250px]">
                  <div className="flex items-center mb-2">
                    <Sparkles className="w-5 h-5 text-primary mr-2" />
                    <span className="text-sm font-medium">AI Design Studio</span>
                  </div>
                  <p className="text-xs text-neutral-300">
                    "Abstract neon tiger with cyberpunk elements"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background-light/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">How It Works</h2>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Our AI-powered platform makes it easy to create unique, custom apparel with just a few clicks
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Palette className="w-10 h-10" />}
              title="Describe Your Design"
              description="Tell our AI what you want through text prompts. Be as detailed or abstract as you like."
              step={1}
            />
            <FeatureCard 
              icon={<Sparkles className="w-10 h-10" />}
              title="AI Generates Art"
              description="Our AI creates a unique design based on your description, ready to be applied to apparel."
              step={2}
            />
            <FeatureCard 
              icon={<Shirt className="w-10 h-10" />}
              title="Order Your Creation"
              description="Place your order and receive your one-of-a-kind AI-generated apparel at your doorstep."
              step={3}
            />
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold mb-2">Popular Products</h2>
              <p className="text-neutral-300">Check out what other customers are designing</p>
            </div>
            <Link 
              to="/catalog" 
              className="flex items-center text-primary hover:underline mt-4 md:mt-0"
            >
              View all products
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_PRODUCTS.map((product, index) => (
              <motion.div 
                key={product.id}
                className="card card-hover"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                <div className="relative overflow-hidden">
                  <Link to={`/product/${product.id}`}>
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-[3/4] object-cover"
                    />
                  </Link>
                </div>
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-medium hover:text-primary transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-primary font-semibold mt-1">${product.price.toFixed(2)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass rounded-2xl overflow-hidden">
            <div className="p-10 md:p-16 text-center">
              <motion.h2 
                className="text-3xl md:text-4xl font-display font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Ready to create your own <span className="text-primary">custom design</span>?
              </motion.h2>
              
              <motion.p 
                className="text-neutral-300 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Join thousands of customers who have already created unique apparel with our AI design platform.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button 
                  variant="primary" 
                  size="lg" 
                  icon={<Sparkles className="w-5 h-5" />}
                >
                  <Link to="/catalog">Start Creating Now</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, step }) => {
  return (
    <motion.div 
      className="glass rounded-xl p-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
        {step}
      </div>
      <div className="text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-neutral-300">{description}</p>
    </motion.div>
  );
};

// Sample product data
const FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'Cosmic Explorer Hoodie',
    price: 59.99,
    image: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg',
  },
  {
    id: '2',
    name: 'Neon Tiger T-Shirt',
    price: 34.99,
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
  },
  {
    id: '3',
    name: 'Synthwave Dreams Hoodie',
    price: 64.99,
    image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg',
  },
  {
    id: '4',
    name: 'Cyberpunk City Sweatshirt',
    price: 49.99,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
  },
];

export default HomePage;
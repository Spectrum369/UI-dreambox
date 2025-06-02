import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, ChevronDown, Search } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';

// Mock product data
const MOCK_PRODUCTS = [
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
  {
    id: '5',
    name: 'Digital Forest T-Shirt',
    price: 32.99,
    image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
  },
  {
    id: '6',
    name: 'Abstract Waves Hoodie',
    price: 58.99,
    image: 'https://images.pexels.com/photos/7679725/pexels-photo-7679725.jpeg',
  },
  {
    id: '7',
    name: 'Circuit Board Sweatshirt',
    price: 54.99,
    image: 'https://images.pexels.com/photos/1124589/pexels-photo-1124589.jpeg',
  },
  {
    id: '8',
    name: 'Glitch Art Hoodie',
    price: 62.99,
    image: 'https://images.pexels.com/photos/2466756/pexels-photo-2466756.jpeg',
  },
];

// Categories for filtering
const CATEGORIES = [
  { id: 'all', name: 'All Products' },
  { id: 'hoodies', name: 'Hoodies' },
  { id: 'tshirts', name: 'T-Shirts' },
  { id: 'sweatshirts', name: 'Sweatshirts' },
  { id: 'accessories', name: 'Accessories' },
];

const CatalogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filtered products based on category and search
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.name.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Sorted products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0; // featured - no specific sort
    }
  });
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-24 pb-20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Shop Our Collection</h1>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            Browse our selection of AI-generated designs or create your own custom apparel
          </p>
        </div>
        
        {/* Filters and Search */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="relative w-full md:w-auto">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="input pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-neutral-400" />
            </div>
            
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <div className="relative flex-1 md:flex-initial">
                <select 
                  className="input appearance-none pr-10"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 w-5 h-5 text-neutral-400 pointer-events-none" />
              </div>
              
              <Button
                variant="outline"
                icon={<SlidersHorizontal className="w-5 h-5" />}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex-shrink-0"
              >
                <span className="md:hidden">Filters</span>
                <span className="hidden md:inline">Filter Products</span>
              </Button>
            </div>
          </div>
          
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Filter Panel - Expandable on mobile */}
          {isFilterOpen && (
            <motion.div
              className="glass rounded-lg p-4 mb-6"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-medium mb-3 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Advanced Filters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-2">Price Range</label>
                  <div className="flex items-center space-x-2">
                    <input type="number" placeholder="Min" className="input" />
                    <span>-</span>
                    <input type="number" placeholder="Max" className="input" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm mb-2">Colors</label>
                  <div className="flex flex-wrap gap-1">
                    {['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'].map(color => (
                      <button 
                        key={color}
                        className="w-6 h-6 rounded-full border border-white/20"
                        style={{ backgroundColor: color }}
                        aria-label={`Filter by color ${color}`}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm mb-2">Size</label>
                  <div className="flex flex-wrap gap-1">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                      <button 
                        key={size}
                        className="px-2 py-1 text-xs rounded bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {}}
                >
                  Clear Filters
                </Button>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="glass rounded-xl p-10 text-center">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-neutral-400 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button 
              variant="primary" 
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CatalogPage;
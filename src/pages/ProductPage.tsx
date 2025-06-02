import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Share, ShoppingBag, ChevronDown, Info } from 'lucide-react';
import ProductGallery from '../components/ui/ProductGallery';
import Button from '../components/ui/Button';
import AiImageEditor from '../components/ui/AiImageEditor';
import ProductCard from '../components/ui/ProductCard';
import { useCart } from '../context/CartContext';

// Mock product data
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Cosmic Explorer Hoodie',
    price: 59.99,
    description: 'Stay warm with this premium hoodie featuring a stunning cosmic explorer design. This comfortable hoodie is perfect for everyday wear.',
    images: [
      'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg',
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg',
      'https://images.pexels.com/photos/7679723/pexels-photo-7679723.jpeg',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Gray'],
    material: '80% cotton, 20% polyester',
    category: 'Hoodies',
  },
  {
    id: '2',
    name: 'Neon Tiger T-Shirt',
    price: 34.99,
    description: 'Make a statement with this vibrant Neon Tiger T-shirt. This eye-catching design is printed on a premium quality t-shirt for maximum comfort and durability.',
    images: [
      'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
      'https://images.pexels.com/photos/2466756/pexels-photo-2466756.jpeg',
      'https://images.pexels.com/photos/1833082/pexels-photo-1833082.jpeg',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy'],
    material: '100% organic cotton',
    category: 'T-Shirts',
  },
  {
    id: '3',
    name: 'Synthwave Dreams Hoodie',
    price: 64.99,
    description: 'Embrace the retro-futuristic aesthetic with our Synthwave Dreams Hoodie. This premium hoodie features a stunning sunset grid design inspired by 80s retro aesthetics.',
    images: [
      'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg',
      'https://images.pexels.com/photos/5698858/pexels-photo-5698858.jpeg',
      'https://images.pexels.com/photos/5698849/pexels-photo-5698849.jpeg',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Purple'],
    material: '70% cotton, 30% polyester',
    category: 'Hoodies',
  },
];

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  // Find the product based on the ID from URL params
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customDesign, setCustomDesign] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('details');
  
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        customDesign: customDesign || undefined,
      }, quantity);
    }
  };
  
  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="glass p-8 rounded-xl text-center">
          <h2 className="text-2xl font-medium mb-4">Product Not Found</h2>
          <p className="text-neutral-300 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button variant="primary">
            Go Back to Shop
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="pt-24 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <ProductGallery images={customDesign ? [...product.images.slice(0, 1), customDesign] : product.images} />
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-display font-bold mb-2">{product.name}</h1>
              <p className="text-2xl text-primary font-semibold mb-4">${product.price.toFixed(2)}</p>
              <p className="text-neutral-300 mb-6">{product.description}</p>
              
              {/* Product Options */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Color</label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                          selectedColor === color 
                            ? 'bg-white/20 ring-2 ring-primary'
                            : 'bg-white/5 hover:bg-white/10'
                        }`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Size</label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        className={`w-12 h-12 rounded-md flex items-center justify-center text-sm transition-all ${
                          selectedSize === size 
                            ? 'bg-white/20 ring-2 ring-primary'
                            : 'bg-white/5 hover:bg-white/10'
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <div className="flex items-center">
                    <button 
                      className="w-10 h-10 glass rounded-l-md flex items-center justify-center hover:bg-white/10"
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    >
                      -
                    </button>
                    <div className="w-14 h-10 glass flex items-center justify-center border-x border-white/10">
                      {quantity}
                    </div>
                    <button 
                      className="w-10 h-10 glass rounded-r-md flex items-center justify-center hover:bg-white/10"
                      onClick={() => setQuantity(prev => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button 
                  variant="primary" 
                  size="lg" 
                  icon={<ShoppingBag className="w-5 h-5" />}
                  fullWidth
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !selectedColor}
                >
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  icon={<Heart className="w-5 h-5" />}
                >
                  Wishlist
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  icon={<Share className="w-5 h-5" />}
                >
                  Share
                </Button>
              </div>
              
              {/* Info Tabs */}
              <div className="mt-10">
                <div className="flex border-b border-white/10">
                  <button 
                    className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                      activeTab === 'details' ? 'border-primary text-primary' : 'border-transparent hover:text-primary/80'
                    }`}
                    onClick={() => setActiveTab('details')}
                  >
                    Details
                  </button>
                  <button 
                    className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                      activeTab === 'shipping' ? 'border-primary text-primary' : 'border-transparent hover:text-primary/80'
                    }`}
                    onClick={() => setActiveTab('shipping')}
                  >
                    Shipping
                  </button>
                  <button 
                    className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                      activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent hover:text-primary/80'
                    }`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    Reviews
                  </button>
                </div>
                
                <div className="py-4">
                  {activeTab === 'details' && (
                    <div className="space-y-3 text-neutral-300">
                      <p><span className="font-medium text-white">Material:</span> {product.material}</p>
                      <p><span className="font-medium text-white">Category:</span> {product.category}</p>
                      <p><span className="font-medium text-white">Care:</span> Machine wash cold, tumble dry low</p>
                      <p>Premium quality apparel with vibrant, long-lasting prints that won't fade or crack.</p>
                    </div>
                  )}
                  
                  {activeTab === 'shipping' && (
                    <div className="space-y-3 text-neutral-300">
                      <p>Free shipping on orders over $50.</p>
                      <p>Standard shipping: 5-7 business days.</p>
                      <p>Express shipping: 2-3 business days.</p>
                      <p>International shipping available to select countries.</p>
                    </div>
                  )}
                  
                  {activeTab === 'reviews' && (
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map(star => (
                            <svg key={star} className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 font-medium">4.8 out of 5</span>
                      </div>
                      <p className="text-neutral-300">Based on 124 reviews</p>
                      
                      {/* Sample review */}
                      <div className="glass rounded-lg p-4 mt-4">
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map(star => (
                              <svg key={star} className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-2 font-medium">John D.</span>
                        </div>
                        <p className="text-neutral-300 text-sm">Amazing quality and the design is exactly as shown. Will definitely order again!</p>
                        <p className="text-neutral-500 text-xs mt-2">Posted 2 weeks ago</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Design Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-display font-semibold mb-6">Customize with AI</h2>
          <AiImageEditor 
            onImageGenerated={setCustomDesign}
            productImage={product.images[0]}
          />
        </div>
        
        {/* Product Recommendations */}
        <div className="mt-20">
          <h2 className="text-2xl font-display font-semibold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {MOCK_PRODUCTS.filter(p => p.id !== id).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductPage;
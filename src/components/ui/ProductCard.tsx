import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { Product } from '../../context/CartContext';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="card card-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden group">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full aspect-[3/4] object-cover transition-transform duration-700 ease-out"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
        </Link>
        
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link 
            to={`/product/${product.id}`}
            className="btn-primary py-1.5 px-3 flex items-center gap-1 text-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Make Your Own
          </Link>
          <button className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <Heart className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium">{product.name}</h3>
        <div className="flex justify-between items-center mt-1">
          <span className="text-primary font-semibold">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
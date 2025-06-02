import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, ShoppingBag, CreditCard, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  
  const shipping = cartItems.length ? 5.99 : 0;
  const total = getCartTotal() + shipping;

  // Demo only: coupon application
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  
  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'discount20') {
      setDiscount(getCartTotal() * 0.2);
      setCouponApplied(true);
    } else {
      setCouponApplied(false);
      setDiscount(0);
    }
  };

  return (
    <motion.div 
      className="pt-24 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-display font-bold mb-8">Your Shopping Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="glass rounded-xl p-6">
                <h2 className="text-xl font-medium mb-4 flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Items ({cartItems.length})
                </h2>
                
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.div 
                      key={`${item.id}-${item.customDesign || 'default'}`}
                      className="flex flex-col sm:flex-row items-start sm:items-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      layout
                    >
                      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.customDesign || item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow sm:ml-4 mt-3 sm:mt-0">
                        <Link 
                          to={`/product/${item.id}`} 
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                        {item.customDesign && (
                          <span className="block text-xs text-primary mt-1">
                            Custom Design
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-3 sm:mt-0">
                        <div className="flex items-center">
                          <button 
                            className="w-8 h-8 rounded-l-md bg-white/5 hover:bg-white/10 flex items-center justify-center"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <div className="w-10 h-8 bg-white/5 flex items-center justify-center border-x border-white/10">
                            {item.quantity}
                          </div>
                          <button 
                            className="w-8 h-8 rounded-r-md bg-white/5 hover:bg-white/10 flex items-center justify-center"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          <button 
                            className="text-neutral-400 hover:text-error text-xs flex items-center mt-1"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-3 h-3 mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="glass rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-neutral-300">Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-300">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-primary">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-white/10 pt-3 flex justify-between font-medium">
                    <span>Total</span>
                    <span className="text-xl">${(total - discount).toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Coupon Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Promo Code</label>
                  <div className="flex">
                    <input 
                      type="text" 
                      className="input rounded-r-none"
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button 
                      className="bg-white/5 hover:bg-white/10 px-4 rounded-r-md border border-white/10 border-l-0"
                      onClick={handleApplyCoupon}
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="text-primary text-sm mt-2">Coupon applied: 20% off</p>
                  )}
                  {couponCode && !couponApplied && (
                    <p className="text-error text-sm mt-2">Invalid coupon code</p>
                  )}
                  <p className="text-neutral-400 text-xs mt-2">Try "DISCOUNT20" for 20% off</p>
                </div>
                
                <Button 
                  variant="primary" 
                  size="lg" 
                  fullWidth
                  icon={<CreditCard className="w-5 h-5" />}
                >
                  Checkout
                </Button>
                
                <p className="text-center text-neutral-400 text-sm mt-4">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass rounded-xl p-12 text-center max-w-2xl mx-auto">
            <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-neutral-300" />
            </div>
            
            <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-neutral-300 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            
            <Button 
              variant="primary" 
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              <Link to="/catalog">
                Continue Shopping
              </Link>
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CartPage;
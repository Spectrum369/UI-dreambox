import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Package, Heart, LogOut, Image, Settings, Shield, CreditCard, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('designs');
  
  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    joined: 'March 2025',
    avatar: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=600',
  };
  
  // Mock saved designs
  const savedDesigns = [
    {
      id: 'd1',
      name: 'Cyberpunk Wolf',
      image: 'https://images.pexels.com/photos/1336873/pexels-photo-1336873.jpeg',
      date: '2 weeks ago',
    },
    {
      id: 'd2',
      name: 'Neon Dreams',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
      date: '1 month ago',
    },
    {
      id: 'd3',
      name: 'Space Traveller',
      image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg',
      date: '2 months ago',
    },
  ];
  
  // Mock orders
  const orders = [
    {
      id: 'ORD-1234',
      date: 'May 15, 2025',
      status: 'Delivered',
      total: 94.98,
      items: [
        {
          name: 'Cosmic Explorer Hoodie',
          image: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg',
        },
        {
          name: 'Neon Tiger T-Shirt',
          image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
        },
      ],
    },
    {
      id: 'ORD-1122',
      date: 'April 30, 2025',
      status: 'Shipped',
      total: 64.99,
      items: [
        {
          name: 'Synthwave Dreams Hoodie',
          image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg',
        },
      ],
    },
  ];
  
  // Mock wishlist
  const wishlist = [
    {
      id: 'p1',
      name: 'Digital Forest T-Shirt',
      price: 32.99,
      image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
    },
    {
      id: 'p2',
      name: 'Abstract Waves Hoodie',
      price: 58.99,
      image: 'https://images.pexels.com/photos/7679725/pexels-photo-7679725.jpeg',
    },
  ];
  
  return (
    <motion.div 
      className="pt-24 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* User Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass rounded-xl p-6 sticky top-24">
              <div className="flex flex-col items-center mb-6">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-20 h-20 rounded-full object-cover ring-2 ring-primary mb-3" 
                />
                <h2 className="text-xl font-medium">{user.name}</h2>
                <p className="text-neutral-400 text-sm">Member since {user.joined}</p>
              </div>
              
              <nav className="space-y-1">
                <SidebarLink 
                  icon={<Sparkles className="w-5 h-5" />}
                  label="My Designs"
                  isActive={activeTab === 'designs'}
                  onClick={() => setActiveTab('designs')}
                />
                <SidebarLink 
                  icon={<Package className="w-5 h-5" />}
                  label="My Orders"
                  isActive={activeTab === 'orders'}
                  onClick={() => setActiveTab('orders')}
                />
                <SidebarLink 
                  icon={<Heart className="w-5 h-5" />}
                  label="Wishlist"
                  isActive={activeTab === 'wishlist'}
                  onClick={() => setActiveTab('wishlist')}
                />
                <SidebarLink 
                  icon={<User className="w-5 h-5" />}
                  label="Account Details"
                  isActive={activeTab === 'account'}
                  onClick={() => setActiveTab('account')}
                />
                <SidebarLink 
                  icon={<LogOut className="w-5 h-5" />}
                  label="Sign Out"
                  onClick={() => {}}
                />
              </nav>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="glass rounded-xl p-6">
              {/* My Designs */}
              {activeTab === 'designs' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-display font-semibold">My Designs</h2>
                    <Button 
                      variant="primary" 
                      icon={<Image className="w-4 h-4" />}
                    >
                      Create New Design
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {savedDesigns.map(design => (
                      <div key={design.id} className="card card-hover">
                        <div className="relative overflow-hidden aspect-[3/3]">
                          <img 
                            src={design.image} 
                            alt={design.name} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium">{design.name}</h3>
                          <p className="text-neutral-400 text-xs">{design.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* My Orders */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-display font-semibold mb-6">My Orders</h2>
                  
                  <div className="space-y-6">
                    {orders.map(order => (
                      <div key={order.id} className="glass rounded-lg p-4 hover:bg-white/10 transition-colors">
                        <div className="flex flex-col sm:flex-row justify-between mb-4">
                          <div>
                            <h3 className="font-medium">Order {order.id}</h3>
                            <p className="text-neutral-400 text-sm">{order.date}</p>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              order.status === 'Delivered' ? 'bg-success/20 text-success' : 
                              order.status === 'Shipped' ? 'bg-primary/20 text-primary' : 
                              'bg-warning/20 text-warning'
                            }`}>
                              {order.status}
                            </span>
                            <p className="font-medium mt-1">${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="w-12 h-12 rounded-md overflow-hidden">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                          <button className="text-sm text-primary hover:underline">View Details</button>
                          <button className="text-sm text-neutral-300 hover:text-white">Track Order</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Wishlist */}
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-display font-semibold mb-6">My Wishlist</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlist.map(item => (
                      <div key={item.id} className="glass rounded-lg p-3 hover:bg-white/10 transition-colors flex">
                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-3 flex-grow">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-primary">${item.price.toFixed(2)}</p>
                          <div className="flex gap-2 mt-2">
                            <button className="text-xs bg-primary px-2 py-1 rounded">
                              Add to Cart
                            </button>
                            <button className="text-xs bg-white/10 px-2 py-1 rounded">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Account Details */}
              {activeTab === 'account' && (
                <div>
                  <h2 className="text-2xl font-display font-semibold mb-6">Account Details</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        Personal Information
                      </h3>
                      <div className="glass rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Full Name</label>
                            <input 
                              type="text" 
                              className="input" 
                              value={user.name}
                              onChange={() => {}}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Email Address</label>
                            <input 
                              type="email" 
                              className="input" 
                              value={user.email}
                              onChange={() => {}}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Phone Number</label>
                            <input 
                              type="tel" 
                              className="input" 
                              placeholder="(123) 456-7890"
                            />
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button variant="primary" size="sm">
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Security
                      </h3>
                      <div className="glass rounded-lg p-4">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Current Password</label>
                            <input 
                              type="password" 
                              className="input" 
                              placeholder="••••••••"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">New Password</label>
                            <input 
                              type="password" 
                              className="input" 
                              placeholder="••••••••"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Confirm Password</label>
                            <input 
                              type="password" 
                              className="input" 
                              placeholder="••••••••"
                            />
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button variant="primary" size="sm">
                            Update Password
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <CreditCard className="w-5 h-5 mr-2" />
                        Payment Methods
                      </h3>
                      <div className="glass rounded-lg p-4">
                        <p className="text-neutral-300 mb-4">Add a payment method to speed up checkout.</p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          icon={<CreditCard className="w-4 h-4" />}
                        >
                          Add Payment Method
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <Settings className="w-5 h-5 mr-2" />
                        Preferences
                      </h3>
                      <div className="glass rounded-lg p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span>Email Notifications</span>
                            <div className="relative inline-block w-10 align-middle select-none">
                              <input 
                                type="checkbox" 
                                name="emailNotifications" 
                                id="emailNotifications"
                                className="sr-only"
                                defaultChecked
                              />
                              <label 
                                htmlFor="emailNotifications"
                                className="block h-6 overflow-hidden rounded-full bg-white/10 cursor-pointer"
                              >
                                <span className="dot absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-primary transition-transform duration-300 transform translate-x-0 checked:translate-x-4"></span>
                              </label>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>New Product Notifications</span>
                            <div className="relative inline-block w-10 align-middle select-none">
                              <input 
                                type="checkbox" 
                                name="productNotifications" 
                                id="productNotifications"
                                className="sr-only"
                                defaultChecked
                              />
                              <label 
                                htmlFor="productNotifications"
                                className="block h-6 overflow-hidden rounded-full bg-white/10 cursor-pointer"
                              >
                                <span className="dot absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-primary transition-transform duration-300 transform translate-x-0 checked:translate-x-4"></span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon, label, isActive, onClick }) => {
  return (
    <button 
      className={`w-full text-left flex items-center p-3 rounded-lg transition-colors ${
        isActive ? 'bg-white/10 text-primary' : 'hover:bg-white/5'
      }`}
      onClick={onClick}
    >
      <span className={`${isActive ? 'text-primary' : 'text-neutral-300'} mr-3`}>
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
};

export default ProfilePage;
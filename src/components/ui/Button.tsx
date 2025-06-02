import React from 'react';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'rounded-md font-medium transition-all duration-300 flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-primary/50',
    secondary: 'bg-secondary text-white hover:bg-secondary-hover focus:ring-secondary/50',
    outline: 'bg-transparent border border-white/20 hover:bg-white/10 text-white',
    ghost: 'bg-transparent hover:bg-white/5 text-white',
  };
  
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-3 gap-2',
  };
  
  const classes = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  return (
    <motion.button
      className={classes}
      disabled={disabled || isLoading}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      whileHover={{ 
        scale: disabled || isLoading ? 1 : 1.02,
        boxShadow: variant === 'primary' ? '0 0 10px rgba(50, 205, 50, 0.3)' : 
                   variant === 'secondary' ? '0 0 10px rgba(138, 43, 226, 0.3)' : 'none'
      }}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
          <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!isLoading && icon && iconPosition === 'left' && (
        <span>{icon}</span>
      )}
      
      <span>{children}</span>
      
      {!isLoading && icon && iconPosition === 'right' && (
        <span>{icon}</span>
      )}
    </motion.button>
  );
};

export default Button;
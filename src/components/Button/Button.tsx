import React from 'react';

interface ButtonProps {
  variant?: 'default' | 'ghost';
  size?: 'small' | 'medium' | 'large' | 'icon';
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  type?:string;
}

const Button: React.FC<ButtonProps> = ({ variant = 'default', size = 'medium', onClick, className, children }) => {
  return (
    <button
      className={`btn ${variant} ${size} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

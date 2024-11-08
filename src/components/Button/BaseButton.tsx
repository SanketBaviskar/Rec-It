import React from 'react';

interface BaseButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const BaseButton: React.FC<BaseButtonProps> = ({
  type = 'button',
  children,
  onClick,
  className
}) => (
  <button type={type} onClick={onClick} className={className}>
    {children}
  </button>
);
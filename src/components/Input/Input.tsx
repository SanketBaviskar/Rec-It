// components/Input.tsx
import React from 'react';

interface InputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ type, value, onChange, placeholder, className, required = false }) => (
  <input type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} className={className} />
);

export default Input;

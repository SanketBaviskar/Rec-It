// components/Checkbox.tsx
import React from 'react';

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: React.ReactNode;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, checked, onChange, label, className }) => (
  <div className={`flex items-center ${className}`}>
    <input type="checkbox" id={id} checked={checked} onChange={onChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
    <label htmlFor={id} className="ml-2 text-sm text-gray-600">{label}</label>
  </div>
);

export default Checkbox;

// src/components/ui/label.tsx
import React from 'react';

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="font-medium text-gray-700">
      {children}
    </label>
  );
};

export default Label;

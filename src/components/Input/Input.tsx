// src/components/ui/input.tsx
import React from 'react';
import Label from '../Label/Label';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  type:string;
  placeholder:string;
  value:string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
}

const Input: React.FC<InputProps> = ({ id, label, onChange, ...props }) => {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <input 
          id={id} 
          className="border rounded-md p-2 w-full" 
          onChange={onChange} 
          {...props} 
        />
      </div>
    );
  };

export default Input;

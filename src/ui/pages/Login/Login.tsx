import React, { useState } from 'react';
import { DumbbellIcon } from 'lucide-react';
import Button from '../../../components/Button/Button';
import Checkbox from '../../../components/CheckBox/CheckBox';
import Input from '../../../components/Input/Input';
import Label from '../../../components/Label/Label';
import Separator from '../../../components/Separator/Separator';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempted', { email, password, rememberMe });
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-500 to-purple-600">
      {/* Rec-It Logo */}
      <div className="absolute top-4 left-4 text-white text-3xl font-semibold cursor-pointer">
        Rec-It
      </div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
          {/* Dumbbell Icon */}
          <div className="flex justify-center mb-4">
            <DumbbellIcon className="h-16 w-16 text-blue-500" />
          </div>
          <h1 className="text-xl font-semibold text-center mb-6 text-black">Welcome to Rec-It</h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</Label>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="you@example.com" 
                required 
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</Label>
              <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••" 
                required 
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" 
              />
            </div>

            <div className="flex items-center justify-between">
              <Checkbox 
                id="remember" 
                checked={rememberMe} 
                onChange={(e) => setRememberMe(e.target.checked)} 
                label="Remember me" 
              />
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">Forgot password?</a>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Sign in
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </a>
          </p>

          <Separator />
          
          <p className="mt-6 mb-4 text-sm text-center text-gray-600">Or continue with</p>

          <div className="grid grid-cols-3 gap-3">
            {/* Google Button */}
            <Button className="w-full flex justify-center py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              <span className="sr-only">Sign in with Google</span>
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M12.048 12.116v3.647h5.12c-.208 1.32-1.56 3.867-5.12 3.867-3.084 0-5.6-2.556-5.6-5.702 0-3.147 2.516-5.703 5.6-5.703 1.752 0 2.928.75 3.6 1.397l2.452-2.363c-1.576-1.476-3.624-2.368-6.052-2.368C7.256 4.89 3.5 8.646 3.5 13.24c0 4.593 3.756 8.349 8.548 8.349 4.932 0 8.202-3.467 8.202-8.349 0-.562-.06-0.99-.132-1.419H12.048z"
                  fill="#000"
                />
              </svg>
            </Button>

            {/* LinkedIn Button */}
            <Button className="w-full flex justify-center py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              <span className="sr-only">Sign in with LinkedIn</span>
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                  fill="#000"
                />
              </svg>
            </Button>

            {/* GitHub Button */}
            <Button className="w-full flex justify-center py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              <span className="sr-only">Sign in with GitHub</span>
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.24.73-.53v-1.85c-3.03.66-3.67-1.46-3.67-1.46-.5-1.27-1.21-1.6-1.21-1.6-.99-.67.07-.66.07-.66 1.09.08 1.67 1.12 1.67 1.12.97 1.66 2.55 1.18 3.17.9.1-.7.38-1.18.69-1.45-2.42-.27-4.96-1.21-4.96-5.4 0-1.2.42-2.17 1.12-2.93-.11-.28-.49-1.4.11-2.91 0 0 .92-.3 3 1.12a10.38 10.38 0 015.5 0c2.08-1.42 3-1.12 3-1.12.6 1.51.22 2.63.11 2.91.7.76 1.12 1.73 1.12 2.93 0 4.2-2.55 5.13-4.98 5.4.39.34.74 1.01.74 2.03v3.01c0 .29.19.63.74.53A11 11 0 0012 1.27"
                  fill="#000"
                />
              </svg>
            </Button>
          </div>

          <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
            © 2024 Rec-It. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
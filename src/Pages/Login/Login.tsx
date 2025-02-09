import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { login } from '@/Services/Api/login';
import { Label } from '@/components/ui/label';
import { DumbbellIcon, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LoginFormValues } from '@/Interface/loginData';
import { Toaster } from '@/components/ui/toaster';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();


  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await login(data.email, data.password);
      navigate('/dashboard');
      loginToast(response)
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleExternalLogin = (provider: string) => {
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <header className="flex justify-between items-center p-4">
        <div className="text-white text-2xl font-bold">Rec-It</div>
      </header>
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-xl rounded-lg p-8">
            <div className="flex justify-center mb-8">
              <DumbbellIcon className="h-12 w-12 text-blue-500" />
            </div>
            <h1 className="text-2xl font-bold text-center mb-8">Welcome to Rec-It</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register('password', { required: 'Password is required' })}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {/* <input
                    type="checkbox"
                    id="remember"
                    {...register('rememberMe')}
                    className="form-checkbox"
                  />
                  <Label htmlFor="remember">Remember me</Label> */}
                </div>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className={`w-full px-4 py-2 text-white bg-blue-500 rounded-lg ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Sign up
                </a>
              </p>
            </div>
            <div className="my-8 text-center">
              <p className="text-sm text-gray-600">Or continue with</p>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => handleExternalLogin('Google')}
                  className="flex justify-center items-center border border-gray-300 p-2 rounded-lg hover:bg-gray-100"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Continue with Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleExternalLogin('Facebook')}
                  className="flex justify-center items-center border border-gray-300 p-2 rounded-lg hover:bg-gray-100"
                >
                  <span className="sr-only">Continue with Facebook</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleExternalLogin('Apple')}
                  className="flex justify-center items-center border border-gray-300 p-2 rounded-lg hover:bg-gray-100"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-6h2v2h-2v-2zm0-8h2v6h-2V6z" />
                  </svg>
                  <span className="sr-only">Continue with Apple</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-white text-sm">
        © {new Date().getFullYear()} Rec-It. All rights reserved.
      </footer>
    </div>
  );
}


function loginToast({ messege}) {
  return (
    <html lang="en">
      <head />
      <body>
        <main>{messege}</main>
        <Toaster />
      </body>
    </html>
  )
}

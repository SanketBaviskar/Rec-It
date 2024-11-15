import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { DumbbellIcon, X as CloseIcon, Mail } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement login logic
    console.log('Login attempted', { email, password, rememberMe })
  }

  const handleExternalLogin = (provider: string) => {
    // TODO: Implement external login logic
    console.log(`${provider} login attempted`)
  }

  const handleClose = () => {
    // Use Electron's IPC to send a message to the main process to close the window
    //window.electron.send('close-window')
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <header className="flex justify-between items-center p-4">
        <div className="text-white text-2xl font-bold">Rec-It</div>
        <Button variant="ghost" size="icon" onClick={handleClose} className="text-white">
          <CloseIcon className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </Button>
      </header>
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-xl rounded-lg p-8">
            <div className="flex justify-center mb-8">
              <DumbbellIcon className="h-12 w-12 text-blue-500" />
            </div>
            <h1 className="text-2xl font-bold text-center mb-8">Welcome to Rec-It</h1>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember">Remember me</Label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Sign up
                </a>
              </p>
            </div>
            <Separator className="my-8" />
            <div className="space-y-4">
              <p className="text-sm text-center text-gray-600">Or continue with</p>
              <div className="grid grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleExternalLogin('Google')}
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Continue with Google</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleExternalLogin('Facebook')}
                >
                  {/* <Facebook className="h-5 w-5" /> */}
                  <span className="sr-only">Continue with Facebook</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleExternalLogin('Apple')}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-6h2v2h-2v-2zm0-8h2v6h-2V6z"/>
                  </svg>
                  <span className="sr-only">Continue with Apple</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-white text-sm">
        © {new Date().getFullYear()} Rec-It. All rights reserved.
      </footer>
    </div>
  )
}
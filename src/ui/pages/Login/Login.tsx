import { useState } from 'react'
import  Button  from '../../components/Button/Button'
import  Input  from '../../components/Input/Input'
import  Label  from '../../components/Label/Label'
import  Checkbox  from '../../components/CheckBox/CheckBox'
import { DumbbellIcon, X as CloseIcon } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement login logic
    console.log('Login attempted', { email, password, rememberMe })
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
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-white text-sm">
        © {new Date().getFullYear()} Rec-It. All rights reserved.
      </footer>
    </div>
  )
}
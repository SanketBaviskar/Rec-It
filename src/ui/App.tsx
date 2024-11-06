import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="app">
      {/* Left Section */}
      <div className="left-section">
        <div className="overlay">
          <img 
            src="https://www.smithgroup.com/sites/default/files/styles/slideshow_wide_1x/public/2019-10/20859.jpg?h=f2fcf546&itok=n0yk5o_a"
            alt="Desert landscape"
            className="background-image"
          />
        </div>
        <div className="left-content">
        <div className="logo">
          <img 
            src="https://www.ucdenver.edu/images/default-source/global-theme-images/cu_logo.png" 
            alt="CU Logo" 
            className="logo-img" 
          />
        </div>
          <div className="tagline">
            <h1>
              Capturing Moments,<br />
              Creating Memories
            </h1>
            <div className="dots">
              <span></span>
              <span></span>
              <span className="active"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="form-container">
          <div className="header">
            <h2>Create an account</h2>
            {/* <a href="#" className="back-link">Back to website</a> */}
          </div>

          <div className="login-link">
            Already have an account?{' '}
            <a href="#">Log in</a>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="name-fields">
              <div className="input-group">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="terms-group">
              <input
                type="checkbox"
                id="terms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <label htmlFor="terms">
                I agree to the{' '}
                <a href="#">Terms & Conditions</a>
              </label>
            </div>

            <button type="submit" className="submit-button">
              Create account
            </button>

            <div className="divider">
              <span>Or register with</span>
            </div>

            <div className="social-buttons">
              <button type="button" className="social-button">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button type="button" className="social-button">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M22.001 12c0-5.523-4.477-10-10-10s-10 4.477-10 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.891h2.54V9.846c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22.001 16.992 22.001 12"></path>
                </svg>
                Apple
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
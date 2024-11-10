import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  Link,
  TextField,
  Typography,
  Paper
} from '@mui/material';
import { DumbbellIcon } from 'lucide-react';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login attempted', { email, password, rememberMe });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        height: '100vh',
        width: '100vw',
        overflow: 'auto',
        background: 'linear-gradient(to bottom right, #3b82f6, #9333ea)',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* Logo */}
      <Typography
        variant="h4"
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          color: 'white',
          fontWeight: 600,
          cursor: 'pointer',
          zIndex: 1
        }}
      >
        Rec-It
      </Typography>

      <Container 
        maxWidth="sm" 
        sx={{ 
          my: 'auto',
          px: 2,
          display: 'flex',
          alignItems: 'center',
          minHeight: '100vh'
        }}
      >
        <Paper 
          elevation={4} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '0.4em'
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent'
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '4px'
            }
          }}
        >
          {/* Dumbbell Icon */}
          <Box display="flex" justifyContent="center" mb={2}>
            <DumbbellIcon style={{ width: 64, height: 64, color: '#3b82f6' }} />
          </Box>

          <Typography variant="h5" component="h1" align="center" gutterBottom fontWeight="bold">
            Welcome to Rec-It
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              placeholder="you@example.com"
              variant="outlined"
              sx={{ backgroundColor: 'white' }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              placeholder="••••••"
              variant="outlined"
              sx={{ backgroundColor: 'white' }}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 1,
                flexWrap: 'wrap'
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
                label="Remember me"
              />
              <Link href="#" underline="hover">
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: 'black',
                '&:hover': {
                  bgcolor: 'rgb(45, 45, 45)'
                },
                py: 1.5
              }}
            >
              Sign in
            </Button>
          </form>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Link href="#" underline="hover">
              Sign up
            </Link>
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" align="center" gutterBottom>
            Or continue with
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2,
              mt: 2
            }}
          >
            <IconButton
              sx={{
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                p: 1,
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <GoogleIcon />
            </IconButton>
            <IconButton
              sx={{
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                p: 1,
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              sx={{
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                p: 1,
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <GitHubIcon />
            </IconButton>
          </Box>
        </Paper>
      </Container>

      <Typography
        variant="body2"
        sx={{
          position: 'absolute',
          bottom: 16,
          left: 0,
          right: 0,
          textAlign: 'center',
          color: 'white'
        }}
      >
        © 2024 Rec-It. All rights reserved.
      </Typography>
    </Box>
  );
}
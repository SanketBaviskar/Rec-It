import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Tooltip,
  Divider
} from '@mui/material';
import { 
  LayoutDashboard, 
  Search, 
  Calendar as CalendarIcon, 
  DollarSign, 
  Wrench,
  Dumbbell,
  Bell,
  MessagesSquare,
  UserCircle,
  Settings,
  LogOut,
  Menu as MenuIcon
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const tabs = [
    { 
      name: 'dashboard', 
      icon: LayoutDashboard,
      tooltip: 'View Dashboard'
    },
    { 
      name: 'calendar', 
      icon: CalendarIcon,
      tooltip: 'View Calendar'
    },
    { 
      name: 'sale', 
      icon: DollarSign,
      tooltip: 'View Sales'
    },
    { 
      name: 'equipment', 
      icon: Wrench,
      tooltip: 'Manage Equipment'
    },
    { 
      name: 'search', 
      icon: Search,
      tooltip: 'Search'
    }
  ];

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event:React.MouseEvent<HTMLButtonElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  return (
    <AppBar 
      position="fixed" 
      color="default" 
      elevation={0}
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Toolbar 
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        {/* Logo Section */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Dumbbell 
            size={28} 
            style={{ 
              marginRight: '12px',
              color: '#3b82f6'
            }}
          />
          <Typography 
            variant="h6" 
            component="h2" 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #3b82f6, #1e40af)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Rec-It
          </Typography>
        </Box>

        {/* Navigation Tabs - Desktop */}
        {!isMobile && (
          <Box 
            sx={{ 
              display: 'flex',
              gap: 1,
              mx: 4,
              flex: 1,
              justifyContent: 'center'
            }}
          >
            {tabs.map(({ name, icon: Icon, tooltip }) => (
              <Tooltip key={name} title={tooltip} arrow>
                <Button
                  variant={activeTab === name ? 'contained' : 'text'}
                  onClick={() => setActiveTab(name)}
                  sx={{
                    px: 3,
                    py: 1,
                    backgroundColor: activeTab === name ? 'black' : 'transparent',
                    color: activeTab === name ? 'white' : 'text.secondary',
                    '&:hover': {
                      backgroundColor: activeTab === name 
                        ? 'rgba(0, 0, 0, 0.8)'
                        : 'rgba(0, 0, 0, 0.04)',
                      transform: 'translateY(-2px)',
                    },
                    textTransform: 'capitalize',
                    transition: 'all 0.2s ease-in-out',
                    borderRadius: '12px',
                    fontWeight: 500
                  }}
                  startIcon={<Icon size={18} />}
                >
                  {name}
                </Button>
              </Tooltip>
            ))}
          </Box>
        )}

        {/* Actions Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton onClick={handleMobileMenuOpen} color="inherit">
              <MenuIcon />
            </IconButton>
          )}

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={3} color="error">
                <Bell size={20} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Messages */}
          <Tooltip title="Messages">
            <IconButton>
              <Badge badgeContent={1} color="primary">
                <MessagesSquare size={20} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Profile */}
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{
                p: 0,
                ml: 1,
                border: '2px solid',
                borderColor: 'primary.main'
              }}
            >
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  bgcolor: 'primary.main'
                }}
              >
                <UserCircle size={20} />
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ mt: 1.5 }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleMenuClose}>
            <UserCircle size={16} style={{ marginRight: 8 }} />
            Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Settings size={16} style={{ marginRight: 8 }} />
            Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose}>
            <LogOut size={16} style={{ marginRight: 8 }} />
            Logout
          </MenuItem>
        </Menu>

        {/* Mobile Menu */}
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMenuClose}
          sx={{ mt: 1.5 }}
        >
          {tabs.map(({ name, icon: Icon }) => (
            <MenuItem 
              key={name}
              onClick={() => {
                setActiveTab(name);
                handleMenuClose();
              }}
              sx={{
                color: activeTab === name ? 'primary.main' : 'inherit',
                py: 1.5
              }}
            >
              <Icon size={18} style={{ marginRight: 12 }} />
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
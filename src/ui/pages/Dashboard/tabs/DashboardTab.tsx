'use client'

import { useState } from 'react'
import {
  AppBar,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Switch,
  Tab,
  Tabs,
  Typography,
  Avatar,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  CalendarMonth,
  ShoppingCart,
  Build,
  Search,
  CheckCircle,
  Cancel,
  NoteAdd,
  StickyNote2,
} from '@mui/icons-material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts'

const activityData = [
  { name: 'Mon', users: 120, avgTime: 45 },
  { name: 'Tue', users: 150, avgTime: 52 },
  { name: 'Wed', users: 200, avgTime: 48 },
  { name: 'Thu', users: 180, avgTime: 50 },
  { name: 'Fri', users: 220, avgTime: 55 },
  { name: 'Sat', users: 250, avgTime: 60 },
  { name: 'Sun', users: 190, avgTime: 47 },
]

const initialActiveUsers = [
  { id: 1, name: 'John Doe', status: 'active', membershipType: 'Premium', lastActive: '2 min ago', note: 'VIP customer' },
  { id: 2, name: 'Jane Smith', status: 'active', membershipType: 'Basic', lastActive: '5 min ago', note: '' },
  { id: 3, name: 'Alice Brown', status: 'suspended', membershipType: 'Premium', lastActive: '15 min ago', note: 'Account under review' },
  { id: 4, name: 'Bob Wilson', status: 'active', membershipType: 'Premium', lastActive: '20 min ago', note: '' },
  { id: 5, name: 'Eva Green', status: 'inactive', membershipType: 'Basic', lastActive: '1 hour ago', note: '' },
]

export default function Component() {
  const [currentTab, setCurrentTab] = useState(0)
  const [gates, setGates] = useState([
    { isOpen: false, isLocked: false },
    { isOpen: false, isLocked: false },
    { isOpen: false, isLocked: false },
  ])
  const [activeUsers, setActiveUsers] = useState(initialActiveUsers)
  const [noteDialogOpen, setNoteDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<(typeof activeUsers)[0] | null>(null)
  const [newNote, setNewNote] = useState('')

  const handleGateClick = (index: number) => {
    if (gates[index].isLocked) return

    setGates(prev => {
      const newGates = [...prev]
      newGates[index] = { ...newGates[index], isOpen: true }
      setTimeout(() => {
        setGates(current => {
          const updated = [...current]
          updated[index] = { ...updated[index], isOpen: false }
          return updated
        })
      }, 5000)
      return newGates
    })
  }

  const handleSwitchChange = (index: number) => {
    setGates(prev => {
      const newGates = [...prev]
      newGates[index] = {
        ...newGates[index],
        isLocked: !newGates[index].isLocked,
        isOpen: false,
      }
      return newGates
    })
  }

  const handleNoteClick = (user: (typeof activeUsers)[0]) => {
    setCurrentUser(user)
    setNewNote(user.note)
    setNoteDialogOpen(true)
  }

  const handleNoteSave = () => {
    if (currentUser) {
      setActiveUsers(prev =>
        prev.map(user =>
          user.id === currentUser.id ? { ...user, note: newNote } : user
        )
      )
    }
    setNoteDialogOpen(false)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Tabs
          value={currentTab}
          onChange={(_, newValue) => setCurrentTab(newValue)}
          variant="fullWidth"
        >
          <Tab icon={<DashboardIcon />} label="Dashboard" />
          <Tab icon={<CalendarMonth />} label="Calendar" />
          <Tab icon={<ShoppingCart />} label="Sale" />
          <Tab icon={<Build />} label="Equipment" />
        </Tabs>
      </AppBar>

      <Box sx={{ flex: 1, p: 3, bgcolor: '#f5f5f5', overflow: 'auto' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Active Users
              </Typography>
              <List>
                {activeUsers.map((user) => (
                  <ListItem key={user.id} divider>
                    <ListItemAvatar>
                      <Avatar src={`/placeholder.svg?height=40&width=40`} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.name}
                      secondary={`${user.membershipType} - ${user.lastActive}`}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {user.status === 'active' ? (
                        <CheckCircle color="success" />
                      ) : user.status === 'suspended' ? (
                        <Cancel color="error" />
                      ) : (
                        <Cancel color="disabled" />
                      )}
                      <Tooltip title={user.note || 'Add note'}>
                        <IconButton onClick={() => handleNoteClick(user)}>
                          {user.note ? <StickyNote2 color="primary" /> : <NoteAdd />}
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    User Activity
                  </Typography>
                  <Box sx={{ height: 200 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={activityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip />
                        <Line type="monotone" dataKey="users" stroke="#8884d8" />
                        <Line type="monotone" dataKey="avgTime" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </Paper>
              </Grid>

              <Grid item sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Paper sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" gutterBottom>
                    Gate Controls
                  </Typography>
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    {gates.map((gate, index) => (
                      <Card key={index} sx={{ mb: 2 }}>
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2">Gate {index + 1}</Typography>
                            <Switch
                              size="small"
                              checked={gate.isLocked}
                              onChange={() => handleSwitchChange(index)}
                            />
                          </Box>
                          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" color="text.secondary">
                              {gate.isOpen ? 'Open' : 'Closed'}
                            </Typography>
                            <Button
                              size="small"
                              onClick={() => handleGateClick(index)}
                              disabled={gate.isLocked}
                              variant={gate.isOpen ? 'contained' : 'outlined'}
                            >
                              {gate.isLocked ? 'Locked' : (gate.isOpen ? 'Opening...' : 'Open')}
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={noteDialogOpen} onClose={() => setNoteDialogOpen(false)}>
        <DialogTitle>Add/Edit Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Note"
            type="text"
            fullWidth
            variant="outlined"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNoteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleNoteSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
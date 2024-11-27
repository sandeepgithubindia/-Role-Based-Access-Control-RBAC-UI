import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
  Divider,
} from '@mui/material';
import {
  People as PeopleIcon,
  VpnKey as VpnKeyIcon,
  Security as SecurityIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Users', icon: <PeopleIcon />, path: '/users' },
  { text: 'Roles', icon: <VpnKeyIcon />, path: '/roles' },
  { text: 'Permissions', icon: <SecurityIcon />, path: '/permissions' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1a237e',
          color: 'white',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            RBAC Admin
          </Typography>
        </Box>
        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

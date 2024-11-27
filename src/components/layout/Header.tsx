import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'white',
        color: 'text.primary',
        boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          Role-Based Access Control
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title="Notifications">
            <IconButton size="large" color="inherit">
              <NotificationsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton size="large" color="inherit">
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Account">
            <IconButton
              onClick={handleOpenMenu}
              size="small"
              sx={{ padding: 0.5 }}
            >
              <Avatar
                alt="Admin User"
                src="/avatar-placeholder.png"
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            onClick={handleCloseMenu}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>My Account</MenuItem>
            <MenuItem>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

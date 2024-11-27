import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@mui/material';
import {
  People as PeopleIcon,
  VpnKey as VpnKeyIcon,
  Security as SecurityIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { roleService } from '../services/roleService';
import { User } from '../types/user.types';
import { Role } from '../types/role.types';

const Dashboard = () => {
  // Fetch data
  const { data: users = [] } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  });

  const { data: roles = [] } = useQuery<Role[]>({
    queryKey: ['roles'],
    queryFn: roleService.getRoles,
  });

  const { data: permissions = [] } = useQuery({
    queryKey: ['permissions'],
    queryFn: roleService.getPermissions,
  });

  // Calculate statistics
  const activeUsers = users.filter(user => user.isActive).length;
  const totalPermissions = permissions.length;
  const totalRoles = roles.length;

  // Get recent users
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Get roles with most permissions
  const topRoles = [...roles]
    .sort((a, b) => b.permissions.length - a.permissions.length)
    .slice(0, 5);

  return (
    <Box>
      <Typography variant="h5" component="h1" gutterBottom>
        Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <PeopleIcon />
                </Avatar>
                <Typography variant="h6">Total Users</Typography>
              </Box>
              <Typography variant="h4">{users.length}</Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {activeUsers} active users
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                  <VpnKeyIcon />
                </Avatar>
                <Typography variant="h6">Roles</Typography>
              </Box>
              <Typography variant="h4">{totalRoles}</Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Defined roles
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                  <SecurityIcon />
                </Avatar>
                <Typography variant="h6">Permissions</Typography>
              </Box>
              <Typography variant="h4">{totalPermissions}</Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Total permissions
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                  <PersonIcon />
                </Avatar>
                <Typography variant="h6">Active Rate</Typography>
              </Box>
              <Typography variant="h4">
                {users.length ? Math.round((activeUsers / users.length) * 100) : 0}%
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                User activation rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Users and Top Roles */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Users
            </Typography>
            <List>
              {recentUsers.map((user, index) => (
                <React.Fragment key={user.id}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>{user.firstName[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${user.firstName} ${user.lastName}`}
                      secondary={`${user.email} • ${new Date(
                        user.createdAt
                      ).toLocaleDateString()}`}
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Top Roles by Permissions
            </Typography>
            <List>
              {topRoles.map((role, index) => (
                <React.Fragment key={role.id}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <VpnKeyIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={role.name}
                      secondary={`${role.permissions.length} permissions • ${role.description}`}
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

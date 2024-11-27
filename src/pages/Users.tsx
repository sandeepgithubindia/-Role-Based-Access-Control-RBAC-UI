import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { roleService } from '../services/roleService';
import { User } from '../types/user.types';
import { Role } from '../types/role.types';

const Users = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    roles: [] as string[],
  });

  const queryClient = useQueryClient();

  // Fetch users
  const { data: users = [] } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  });

  // Fetch roles
  const { data: roles = [] } = useQuery<Role[]>({
    queryKey: ['roles'],
    queryFn: roleService.getRoles,
  });

  // Create user mutation
  const createUser = useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      handleCloseDialog();
    },
  });

  // Update user mutation
  const updateUser = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      userService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      handleCloseDialog();
    },
  });

  // Delete user mutation
  const deleteUser = useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setSelectedUser(user);
      setFormData({
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: '',
        roles: user.roles,
      });
    } else {
      setSelectedUser(null);
      setFormData({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        roles: [],
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setFormData({
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      roles: [],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      updateUser.mutate({
        id: selectedUser.id,
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          roles: formData.roles,
        },
      });
    } else {
      createUser.mutate(formData);
    }
  };

  const handleRoleChange = (event: SelectChangeEvent<string[]>) => {
    setFormData({
      ...formData,
      roles: event.target.value as string[],
    });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h1">
          Users Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.roles.map((roleId) => {
                    const role = roles.find((r) => r.id === roleId);
                    return (
                      <Chip
                        key={roleId}
                        label={role?.name || 'Unknown'}
                        size="small"
                        sx={{ mr: 0.5 }}
                      />
                    );
                  })}
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.isActive ? 'Active' : 'Inactive'}
                    color={user.isActive ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(user)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => deleteUser.mutate(user.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {selectedUser ? 'Edit User' : 'Add New User'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'grid', gap: 2, pt: 2 }}>
              <TextField
                label="Username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                disabled={!!selectedUser}
                required
              />
              <TextField
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <TextField
                label="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
              <TextField
                label="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
              {!selectedUser && (
                <TextField
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              )}
              <FormControl>
                <InputLabel>Roles</InputLabel>
                <Select
                  multiple
                  value={formData.roles}
                  onChange={handleRoleChange}
                  label="Roles"
                  required
                >
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained">
              {selectedUser ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Users;

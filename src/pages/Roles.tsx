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
  Grid,
  Card,
  CardContent,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { roleService } from '../services/roleService';
import { Role, Permission } from '../types/role.types';

const Roles = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
  });

  const queryClient = useQueryClient();

  // Fetch roles
  const { data: roles = [] } = useQuery<Role[]>({
    queryKey: ['roles'],
    queryFn: roleService.getRoles,
  });

  // Fetch permissions
  const { data: permissions = [] } = useQuery<Permission[]>({
    queryKey: ['permissions'],
    queryFn: roleService.getPermissions,
  });

  // Create role mutation
  const createRole = useMutation({
    mutationFn: roleService.createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      handleCloseDialog();
    },
  });

  // Update role mutation
  const updateRole = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      roleService.updateRole(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      handleCloseDialog();
    },
  });

  // Delete role mutation
  const deleteRole = useMutation({
    mutationFn: roleService.deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });

  const handleOpenDialog = (role?: Role) => {
    if (role) {
      setSelectedRole(role);
      setFormData({
        name: role.name,
        description: role.description,
        permissions: role.permissions.map(p => p.id),
      });
    } else {
      setSelectedRole(null);
      setFormData({
        name: '',
        description: '',
        permissions: [],
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRole(null);
    setFormData({
      name: '',
      description: '',
      permissions: [],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      updateRole.mutate({
        id: selectedRole.id,
        data: formData,
      });
    } else {
      createRole.mutate(formData);
    }
  };

  const handlePermissionChange = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(id => id !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };

  // Group permissions by module
  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h1">
          Roles Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Role
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>
                  {role.permissions.map((permission) => (
                    <Chip
                      key={permission.id}
                      label={permission.name}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(role)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => deleteRole.mutate(role.id)}
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

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {selectedRole ? 'Edit Role' : 'Add New Role'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'grid', gap: 2, pt: 2 }}>
              <TextField
                label="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <TextField
                label="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                multiline
                rows={2}
                required
              />
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Permissions
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(groupedPermissions).map(([module, modulePermissions]) => (
                  <Grid item xs={12} md={6} key={module}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {module}
                        </Typography>
                        <FormGroup>
                          {modulePermissions.map((permission) => (
                            <FormControlLabel
                              key={permission.id}
                              control={
                                <Checkbox
                                  checked={formData.permissions.includes(permission.id)}
                                  onChange={() => handlePermissionChange(permission.id)}
                                />
                              }
                              label={permission.description}
                            />
                          ))}
                        </FormGroup>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained">
              {selectedRole ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Roles;

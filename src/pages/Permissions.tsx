import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { roleService } from '../services/roleService';
import { Permission, PermissionAction } from '../types/role.types';

const Permissions = () => {
  // Fetch all permissions
  const { data: permissions = [] } = useQuery<Permission[]>({
    queryKey: ['permissions'],
    queryFn: roleService.getPermissions,
  });

  // Group permissions by module
  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  // Get action color based on permission action
  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case PermissionAction.CREATE:
        return 'success';
      case PermissionAction.READ:
        return 'info';
      case PermissionAction.UPDATE:
        return 'warning';
      case PermissionAction.DELETE:
        return 'error';
      case PermissionAction.MANAGE:
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h5" component="h1" gutterBottom>
        Permissions Overview
      </Typography>

      {/* Permissions Summary */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Permissions
              </Typography>
              <Typography variant="h3">{permissions.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Modules
              </Typography>
              <Typography variant="h3">
                {Object.keys(groupedPermissions).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Permissions by Module */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Permissions by Module
      </Typography>
      <Grid container spacing={3}>
        {Object.entries(groupedPermissions).map(([module, modulePermissions]) => (
          <Grid item xs={12} key={module}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  {module.toUpperCase()}
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Permission</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {modulePermissions.map((permission) => {
                        const action = permission.name.split(':')[1];
                        return (
                          <TableRow key={permission.id}>
                            <TableCell>{permission.name}</TableCell>
                            <TableCell>{permission.description}</TableCell>
                            <TableCell>
                              <Chip
                                label={action}
                                size="small"
                                color={getActionColor(action) as any}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Permissions Matrix */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Permissions Matrix
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Module</TableCell>
              {Object.values(PermissionAction).map((action) => (
                <TableCell key={action} align="center">
                  {action.toUpperCase()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(groupedPermissions).map(([module, modulePermissions]) => (
              <TableRow key={module}>
                <TableCell component="th" scope="row">
                  {module.toUpperCase()}
                </TableCell>
                {Object.values(PermissionAction).map((action) => (
                  <TableCell key={action} align="center">
                    {modulePermissions.some((p) => p.name.includes(action)) ? (
                      <Chip
                        label="✓"
                        size="small"
                        color={getActionColor(action) as any}
                      />
                    ) : (
                      '—'
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Permissions;

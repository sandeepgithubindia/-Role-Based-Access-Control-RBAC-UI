import { User } from '../types/user.types';
import { Role, Permission, PermissionModule, PermissionAction } from '../types/role.types';

// Generate initial permissions
export const mockPermissions: Permission[] = [
  // User permissions
  {
    id: '1',
    name: `${PermissionModule.USERS}:${PermissionAction.CREATE}`,
    description: 'Create users',
    module: PermissionModule.USERS,
  },
  {
    id: '2',
    name: `${PermissionModule.USERS}:${PermissionAction.READ}`,
    description: 'View users',
    module: PermissionModule.USERS,
  },
  {
    id: '3',
    name: `${PermissionModule.USERS}:${PermissionAction.UPDATE}`,
    description: 'Update users',
    module: PermissionModule.USERS,
  },
  {
    id: '4',
    name: `${PermissionModule.USERS}:${PermissionAction.DELETE}`,
    description: 'Delete users',
    module: PermissionModule.USERS,
  },
  // Role permissions
  {
    id: '5',
    name: `${PermissionModule.ROLES}:${PermissionAction.CREATE}`,
    description: 'Create roles',
    module: PermissionModule.ROLES,
  },
  {
    id: '6',
    name: `${PermissionModule.ROLES}:${PermissionAction.READ}`,
    description: 'View roles',
    module: PermissionModule.ROLES,
  },
  {
    id: '7',
    name: `${PermissionModule.ROLES}:${PermissionAction.UPDATE}`,
    description: 'Update roles',
    module: PermissionModule.ROLES,
  },
  {
    id: '8',
    name: `${PermissionModule.ROLES}:${PermissionAction.DELETE}`,
    description: 'Delete roles',
    module: PermissionModule.ROLES,
  },
];

// Generate initial roles
export const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access',
    permissions: mockPermissions,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'User Manager',
    description: 'Can manage users',
    permissions: mockPermissions.filter(p => p.module === PermissionModule.USERS),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Viewer',
    description: 'Read-only access',
    permissions: mockPermissions.filter(p => p.name.includes(PermissionAction.READ)),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Generate initial users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    isActive: true,
    roles: ['1'], // Admin role
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    username: 'manager',
    email: 'manager@example.com',
    firstName: 'User',
    lastName: 'Manager',
    isActive: true,
    roles: ['2'], // User Manager role
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    username: 'viewer',
    email: 'viewer@example.com',
    firstName: 'View',
    lastName: 'Only',
    isActive: true,
    roles: ['3'], // Viewer role
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Helper function to generate unique IDs
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Helper function to simulate API delay
export const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

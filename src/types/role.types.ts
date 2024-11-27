export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoleDto {
  name: string;
  description: string;
  permissions: string[]; // Array of permission IDs
}

export interface UpdateRoleDto {
  name?: string;
  description?: string;
  permissions?: string[]; // Array of permission IDs
}

// Predefined permission modules
export enum PermissionModule {
  USERS = 'users',
  ROLES = 'roles',
  SETTINGS = 'settings',
  REPORTS = 'reports'
}

// Predefined permission actions
export enum PermissionAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  MANAGE = 'manage'
}

import { Role, Permission, CreateRoleDto, UpdateRoleDto } from '../types/role.types';
import { mockRoles, mockPermissions, generateId, delay } from './mockData';

// In-memory storage
let roles = [...mockRoles];
let permissions = [...mockPermissions];

export const roleService = {
  // Get all roles
  async getRoles(): Promise<Role[]> {
    await delay();
    return [...roles];
  },

  // Get role by ID
  async getRoleById(id: string): Promise<Role | undefined> {
    await delay();
    return roles.find(role => role.id === id);
  },

  // Create new role
  async createRole(roleData: CreateRoleDto): Promise<Role> {
    await delay();
    
    // Check if role name already exists
    if (roles.some(r => r.name === roleData.name)) {
      throw new Error('Role name already exists');
    }

    // Get permissions by IDs
    const rolePermissions = permissions.filter(p => 
      roleData.permissions.includes(p.id)
    );

    const newRole: Role = {
      id: generateId(),
      name: roleData.name,
      description: roleData.description,
      permissions: rolePermissions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    roles.push(newRole);
    return newRole;
  },

  // Update role
  async updateRole(id: string, roleData: UpdateRoleDto): Promise<Role> {
    await delay();
    
    const roleIndex = roles.findIndex(role => role.id === id);
    if (roleIndex === -1) {
      throw new Error('Role not found');
    }

    // If updating permissions, get the new permission objects
    let rolePermissions = roles[roleIndex].permissions;
    if (roleData.permissions) {
      rolePermissions = permissions.filter(p => 
        roleData.permissions!.includes(p.id)
      );
    }

    // Update role data
    const updatedRole = {
      ...roles[roleIndex],
      ...roleData,
      permissions: rolePermissions,
      updatedAt: new Date().toISOString(),
    };

    roles[roleIndex] = updatedRole;
    return updatedRole;
  },

  // Delete role
  async deleteRole(id: string): Promise<void> {
    await delay();
    
    const roleIndex = roles.findIndex(role => role.id === id);
    if (roleIndex === -1) {
      throw new Error('Role not found');
    }

    roles = roles.filter(role => role.id !== id);
  },

  // Get all permissions
  async getPermissions(): Promise<Permission[]> {
    await delay();
    return [...permissions];
  },

  // Get permissions by module
  async getPermissionsByModule(module: string): Promise<Permission[]> {
    await delay();
    return permissions.filter(permission => permission.module === module);
  },

  // Get permissions by role
  async getPermissionsByRole(roleId: string): Promise<Permission[]> {
    await delay();
    const role = roles.find(r => r.id === roleId);
    if (!role) {
      throw new Error('Role not found');
    }
    return [...role.permissions];
  },

  // Assign permissions to role
  async assignPermissions(roleId: string, permissionIds: string[]): Promise<Role> {
    await delay();
    
    const roleIndex = roles.findIndex(role => role.id === roleId);
    if (roleIndex === -1) {
      throw new Error('Role not found');
    }

    // Get permission objects
    const rolePermissions = permissions.filter(p => 
      permissionIds.includes(p.id)
    );

    const updatedRole = {
      ...roles[roleIndex],
      permissions: rolePermissions,
      updatedAt: new Date().toISOString(),
    };

    roles[roleIndex] = updatedRole;
    return updatedRole;
  }
};

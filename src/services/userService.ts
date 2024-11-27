import { User, CreateUserDto, UpdateUserDto } from '../types/user.types';
import { mockUsers, generateId, delay } from './mockData';

// In-memory storage
let users = [...mockUsers];

export const userService = {
  // Get all users
  async getUsers(): Promise<User[]> {
    await delay();
    return [...users];
  },

  // Get user by ID
  async getUserById(id: string): Promise<User | undefined> {
    await delay();
    return users.find(user => user.id === id);
  },

  // Create new user
  async createUser(userData: CreateUserDto): Promise<User> {
    await delay();
    
    // Check if username or email already exists
    if (users.some(u => u.username === userData.username)) {
      throw new Error('Username already exists');
    }
    if (users.some(u => u.email === userData.email)) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      id: generateId(),
      ...userData,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);
    return newUser;
  },

  // Update user
  async updateUser(id: string, userData: UpdateUserDto): Promise<User> {
    await delay();
    
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    // Update user data
    const updatedUser = {
      ...users[userIndex],
      ...userData,
      updatedAt: new Date().toISOString(),
    };

    users[userIndex] = updatedUser;
    return updatedUser;
  },

  // Delete user
  async deleteUser(id: string): Promise<void> {
    await delay();
    
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    users = users.filter(user => user.id !== id);
  },

  // Get users by role
  async getUsersByRole(roleId: string): Promise<User[]> {
    await delay();
    return users.filter(user => user.roles.includes(roleId));
  },

  // Update user status
  async updateUserStatus(id: string, isActive: boolean): Promise<User> {
    await delay();
    
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...users[userIndex],
      isActive,
      updatedAt: new Date().toISOString(),
    };

    users[userIndex] = updatedUser;
    return updatedUser;
  },

  // Assign roles to user
  async assignRoles(id: string, roleIds: string[]): Promise<User> {
    await delay();
    
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...users[userIndex],
      roles: roleIds,
      updatedAt: new Date().toISOString(),
    };

    users[userIndex] = updatedUser;
    return updatedUser;
  }
};

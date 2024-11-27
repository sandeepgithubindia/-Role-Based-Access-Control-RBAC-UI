export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  roles: string[];
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  roles?: string[];
  isActive?: boolean;
}

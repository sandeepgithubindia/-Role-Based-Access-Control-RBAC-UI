# Role-Based Access Control (RBAC) UI

A modern and comprehensive Role-Based Access Control UI built with React, TypeScript, and Material-UI. This application provides a complete interface for managing users, roles, and permissions in a secure system.

## Features

### Dashboard
- Overview statistics for users, roles, and permissions
- User activation rate tracking
- Recent users list
- Top roles by permission count

### User Management
- View and manage users with their roles and status
- Add, edit, and delete users
- Assign roles to users
- Track user status (Active/Inactive)

### Role Management
- View and manage roles with their associated permissions
- Create, edit, and delete roles
- Assign permissions to roles
- Hierarchical permission structure

### Permission Management
- View permissions organized by module
- Permission matrix showing role-permission relationships
- Clear visualization of permission assignments

## Technology Stack

- **React**: Frontend library for building user interfaces
- **TypeScript**: Static typing for better development experience
- **Material-UI**: Modern UI component library
- **React Query**: Data fetching and state management
- **React Router**: Navigation and routing
- **Axios**: HTTP client for API requests

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd rbac-ui
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── components/         # Reusable UI components
│   └── layout/        # Layout components
├── pages/             # Page components
├── services/          # API and mock services
├── types/             # TypeScript type definitions
└── App.tsx            # Main application component
```

## Mock Data

The application currently uses mock data for demonstration purposes. The mock services can be found in `src/services/` and include:

- `mockData.ts`: Initial data for users, roles, and permissions
- `userService.ts`: User management operations
- `roleService.ts`: Role and permission management operations

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## Usage

### Managing Users
1. Navigate to the Users page
2. Click "Add User" to create a new user
3. Fill in user details and assign roles
4. Use edit/delete actions to manage existing users

### Managing Roles
1. Navigate to the Roles page
2. Click "Add Role" to create a new role
3. Define role details and assign permissions
4. Use edit/delete actions to manage existing roles

### Viewing Permissions
1. Navigate to the Permissions page
2. View permissions organized by module
3. Use the permissions matrix to understand role-permission relationships

## Security Considerations

- The UI implements role-based access control at the interface level
- Backend implementation should validate all requests
- Proper authentication should be implemented in production
- Session management should be added for security

## Future Enhancements

- User authentication and authorization
- Audit logging for user actions
- Role hierarchy support
- Permission group management
- Advanced user search and filtering
- Bulk user/role operations
- Export/import functionality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

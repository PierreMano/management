# Employee Record Management System

A full-stack web application for managing employee records with complete CRUD functionality and user authentication.

## Overview

This Employee Record Management System allows organizations to create, read, update, and delete employee records. The application features a secure authentication system, ensuring that only authorized users can access and manage employee data.

## Technologies Used

- **Frontend**: Next.js 14, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js with JWT
- **Styling**: Tailwind CSS

## Features

### Authentication

- User registration with name, email, and password
- Secure login with JWT-based authentication
- Protected routes and API endpoints
- Session management

### Employee Management

- Create new employee records with validation
- View all employees in a responsive table
- Update existing employee information
- Delete employee records with confirmation

### User Experience

- Responsive design for all device sizes
- Form validation and error handling
- Loading states and toast notifications
- Confirmation dialogs for destructive actions

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or Atlas)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_random_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/PierreMano/management.git
   cd management
   ```

2. Install dependencies

   ```sh
   npm install
   # or
   ```

yarn install

# or

pnpm install

````

3. Run the development server
```sh
npm run dev
# or
yarn dev
# or
pnpm dev
````

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                  # Next.js App Router
│   ├── api/              # API Routes
│   │   ├── auth/         # NextAuth.js API routes
│   │   ├── employees/    # Employee CRUD API routes
│   │   └── register/     # User registration API route
│   ├── employees/        # Employee pages
│   │   ├── create/       # Create employee page
│   │   └── edit/[id]/    # Edit employee page
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── auth-provider.tsx # NextAuth provider
│   ├── employee-form.tsx # Employee form component
│   ├── employee-list.tsx # Employee list component
│   └── header.tsx        # Header component
├── lib/                  # Utility functions and models
│   ├── models/           # Mongoose models
│   │   ├── employee.ts   # Employee model
│   │   └── user.ts       # User model
│   ├── db.ts             # Database connection
│   ├── employee-service.ts # Employee service functions
│   └── types.ts          # TypeScript types
├── middleware.ts         # NextAuth middleware
└── types/                # Global type definitions
```

## API Endpoints

### Authentication

- `POST /api/auth/[...nextauth]` - NextAuth.js authentication
- `POST /api/register` - User registration

### Employees

- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create a new employee
- `GET /api/employees/:id` - Get employee by ID
- `PUT /api/employees/:id` - Update employee by ID
- `DELETE /api/employees/:id` - Delete employee by ID

## Authentication Approach

The application uses NextAuth.js for authentication with a JWT-based strategy:

1. **User Registration**: New users can register with name, email, and password
2. **Password Security**: Passwords are hashed using bcrypt before storage
3. **JWT Authentication**: JSON Web Tokens are used for maintaining sessions
4. **Protected Routes**: Both client-side routes and API endpoints are protected
5. **Middleware**: Next.js middleware ensures authenticated access to protected routes

## Data Models

### User

- Name
- Email (unique)
- Password (hashed)

### Employee

- First Name
- Last Name
- Email (unique)
- Phone
- Role (Admin/Staff)

## Development Approach

This project follows these development principles:

1. **Server Components**: Leverages Next.js App Router and React Server Components
2. **API Routes**: Uses Next.js API routes for backend functionality
3. **MongoDB Integration**: Connects to MongoDB using Mongoose for data modeling
4. **Authentication**: Implements secure authentication with NextAuth.js
5. **Component-Based Architecture**: Organizes code into reusable components
6. **TypeScript**: Uses TypeScript for type safety and better developer experience
7. **Responsive Design**: Implements responsive UI with Tailwind CSS

## Future Improvements

- Add pagination for the employee list
- Implement search and filtering functionality
- Add role-based access control (Admin vs Staff permissions)
- Add profile management for users
- Implement data export/import functionality
- Add activity logging for audit purposes
click on this link to scheck the app: https://management-rho-six.vercel.app/

## License

[MIT](LICENSE)


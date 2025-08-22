# User Management System

A full-stack application built with Laravel and React + TypeScript for managing users and roles, following PSR and SOLID principles.

## Code Standards & Architecture

### PSR (PHP Standards Recommendations)

The Laravel backend follows these PSR standards:

- **PSR-1**: Basic Coding Standard
  - Files use only `<?php` and `<?=` tags
  - Files use only UTF-8 without BOM for PHP code
  - Class names declared in `StudlyCaps`
  - Class constants declared in all upper case
  - Method names declared in `camelCase`

- **PSR-12**: Extended Coding Style
  - 4 spaces used for indentation
  - Lines limited to 80-120 characters
  - One blank line after namespace declarations
  - Opening braces for classes on new line
  - Opening braces for methods on new line
  - Visibility declared on all properties and methods
  - All files end with a new line character

- **PSR-4**: Autoloading Standard
  - Classes autoloaded following the `App\` namespace
  - Directory structure matches namespace structure
  - Composer used for autoloading configuration

### SOLID Principles

The application follows SOLID principles:

1. **Single Responsibility Principle (SRP)**
   - Each class has one specific purpose
   - Controllers handle HTTP requests only
   - Business logic moved to dedicated services
   - Repository pattern used for data access

2. **Open-Closed Principle (OCP)**
   - Classes are open for extension but closed for modification
   - Base classes and interfaces used for common functionality
   - Behavior extended through inheritance and composition

3. **Liskov Substitution Principle (LSP)**
   - All derived classes can substitute their base classes
   - Interfaces properly abstracted and implemented
   - Type-hinting used for dependencies

4. **Interface Segregation Principle (ISP)**
   - Small, focused interfaces instead of large, monolithic ones
   - Clients only depend on methods they use
   - Role-specific interfaces for different behaviors

5. **Dependency Inversion Principle (DIP)**
   - High-level modules don't depend on low-level modules
   - Dependencies injected via constructor injection
   - Interfaces used for decoupling

### Project Architecture

```
example-app/
├── app/
│   ├── Contracts/           # Interfaces
│   ├── Services/           # Business logic services
│   ├── Repositories/       # Data access layer
│   ├── Http/
│   │   ├── Controllers/    # Thin controllers
│   │   ├── Requests/      # Form requests for validation
│   │   ├── Resources/     # API resources
│   │   └── Middleware/    # HTTP middleware
│   ├── Models/            # Eloquent models
│   ├── Exceptions/        # Custom exceptions
│   └── Providers/         # Service providers
└── tests/
    ├── Unit/              # Unit tests
    └── Feature/           # Feature tests
```

## Prerequisites

- PHP >= 8.2
- Node.js >= 16
- MySQL >= 8.0
- Composer
- npm or yarn

## Project Structure

```
/
├── example-app/      # Laravel backend
└── src/             # React frontend
```

## Backend Setup (Laravel)

1. Navigate to the backend directory:
```bash
cd example-app
```

2. Install PHP dependencies:
```bash
composer install
```

3. Create a copy of the environment file:
```bash
cp .env.example .env
```

4. Configure your `.env` file with the following variables:
```env
APP_NAME=Laravel
APP_ENV=local
APP_KEY=<your-app-key>
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=

FRONTEND_URL=http://localhost:5173
```

5. Generate application key:
```bash
php artisan key:generate
```

6. Run database migrations and seed initial data:
```bash
php artisan migrate:fresh --seed
```

7. Start the Laravel development server:
```bash
php artisan serve
```

The backend API will be available at `http://localhost:8000`.

## Frontend Setup (React + TypeScript)

1. Navigate to the frontend directory (root directory):
```bash
cd ..
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Configure your frontend `.env` with:
```env
VITE_API_URL=http://localhost:8000
```

5. Start the Vite development server:
```bash
npm run dev
```

The frontend application will be available at `http://localhost:5173`.

## API Endpoints

The following API endpoints are available:

- `GET /api/roles` - List all roles
- `GET /api/users` - List all users
- `POST /api/users` - Create a new user
- `PUT /api/users/{id}` - Update a user
- `DELETE /api/users/{id}` - Delete a user

## Available Roles

The following roles are seeded by default:

1. Administrator - Full system access
2. Editor - Can edit and manage content
3. Author - Can create and manage own content
4. Subscriber - Can view and interact with content

## Development Notes

### CORS Configuration

The backend is configured to accept requests from the frontend running on `http://localhost:5173`. If you need to change this, update:

1. `example-app/config/cors.php`:
```php
'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:5173')]
```

2. Update the `FRONTEND_URL` in your backend `.env` file.

### API Authentication

The application uses Laravel Sanctum for API authentication. CSRF protection is disabled for API routes.

### Database

The application uses MySQL by default. To use a different database:

1. Update the `DB_CONNECTION` in your backend `.env` file
2. Install the appropriate PHP database driver
3. Update the database configuration in `config/database.php` if needed

## Troubleshooting

### Common Issues

1. CORS errors
   - Ensure both frontend and backend servers are running
   - Check FRONTEND_URL in backend .env matches your frontend URL
   - Verify VITE_API_URL in frontend .env matches your backend URL

2. Database connection errors
   - Verify MySQL is running
   - Check database credentials in .env
   - Ensure database exists

3. API 500 errors
   - Check Laravel logs in `example-app/storage/logs/laravel.log`
   - Verify database migrations have run
   - Ensure all required environment variables are set

### Getting Help

If you encounter any issues:

1. Check the Laravel logs: `example-app/storage/logs/laravel.log`
2. Check the Network tab in browser DevTools
3. Verify all environment variables are set correctly
4. Ensure all prerequisites are installed and up to date

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

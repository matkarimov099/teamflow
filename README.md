# Team Flow - Smart Workspace

A modern React dashboard application for team collaboration and AI agent management, built with enterprise-level architecture.

## 🚀 Features

### Core Functionality
- 🏠 **Dashboard** - Comprehensive overview with analytics and metrics
- 👥 **User Management** - Complete CRUD operations with real-time username validation
- 🤖 **AI Agents** - Create and manage intelligent agents with custom prompts and descriptions
- 📁 **Project Management** - Repository integration with GitHub-like functionality
- 🔐 **Authentication** - JWT-based auth with automatic token refresh (401/403 handling)

### Advanced Features
- ✅ **Real-time Validation** - Username availability checking with debounced API calls
- 🔍 **Repository Checking** - Verify and display repository information before project creation
- 📊 **Advanced Data Tables** - Sorting, filtering, column resizing, bulk operations, and data export
- 💬 **Smart Tooltips** - Scrollable content tooltips for large text fields
- 📱 **Responsive Design** - Mobile-first approach with dark/light theme support
- 🔄 **Token Management** - Automatic refresh handling for seamless user experience

## 🛠 Tech Stack

### Frontend
- **React 19** with TypeScript for type-safe development
- **Vite** for fast development and optimized builds
- **React Router v7** with nested routing
- **Tailwind CSS v4** for utility-first styling
- **Shadcn/ui** + **Radix UI** for accessible components

### State & Data Management
- **TanStack Query v5** for server state management and caching
- **React Hook Form** + **Zod** for form validation and schema definitions
- **TanStack Table** for advanced data grid functionality
- **React Context** for global state management

### Development Tools
- **Biome** for code formatting (tabs, single quotes) and linting
- **TypeScript** strict mode with path aliases (@/*)
- **Axios** with JWT interceptors and automatic token refresh
- **Lucide React** for consistent iconography

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd team-flow-fe

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
# Edit .env with your API configuration

# Start development server
bun dev
```

## 🚦 Development Commands

```bash
# Start development server (Vite on port 3000)
bun dev

# Build for production (TypeScript compilation + Vite build)
bun run build

# Preview production build
bun run preview

# Format code using Biome (tab indentation, single quotes)
bun run format

# Lint code using Biome (recommended rules enabled)
bun run lint
```

## 🏗 Project Structure

```
src/
├── components/
│   ├── common/          # Shared components (sidebar, nav, auth-guard)
│   ├── custom/          # Custom UI components (3d-card, animations)
│   ├── data-table/      # Advanced table system with export/resize/search
│   └── ui/              # Shadcn/ui base components
├── features/            # Feature-based organization
│   ├── auth/           # Authentication (JWT, forms, guards)
│   ├── users/          # User management (CRUD, table, actions)
│   ├── ai-agents/      # AI agent management with prompts
│   └── projects/       # Project and repository management
├── hooks/              # Custom React hooks
├── layout/             # Layout components (AuthLayout, DefaultLayout)
├── lib/                # Utilities (i18n, auth, sidebar config)
├── pages/              # Page components organized by routes
├── plugins/            # Third-party configurations (axios setup)
├── provider/           # Context providers (theme, i18n, auth)
├── router/             # Route definitions and loaders
└── services/           # API services and HTTP clients
```

## ⚙️ Configuration

### Environment Variables
```env
VITE_API_URL=your_api_base_url
```

### Path Aliases
The project uses TypeScript path aliases for clean imports:
- `@/*` maps to `src/*`

### Code Style
- **Indentation**: Tabs (configured in biome.json)
- **Quotes**: Single quotes for strings
- **Semicolons**: Required
- **Formatting**: Biome with recommended rules

## 🎨 UI/UX Features

### Theme System
- **Dark/Light Mode**: System preference detection
- **Consistent Styling**: Tailwind CSS with custom theme variables
- **Responsive Design**: Mobile-first responsive layouts

### Component Library
- **Shadcn/ui Components**: Modern, accessible UI components
- **Custom Components**: 3D cards, animations, loading states
- **Form Components**: Enhanced inputs, textareas, selects with validation

## 🔐 Authentication Flow

1. **Login**: User provides credentials
2. **Token Storage**: Access and refresh tokens stored in localStorage
3. **API Requests**: Axios interceptor adds Bearer token
4. **Auto Refresh**: 401/403 responses trigger token refresh
5. **Logout**: Failed refresh redirects to the login page

### Token Refresh Implementation
```typescript
// Handles both 401 and 403 status codes
if ((err.response.status === 401 || err.response.status === 403) && !config?.sent) {
  const result = await refreshToken();
  if (result?.accessToken) {
    localStorage.setItem('accessToken', result.accessToken);
    return api.request(originalRequest);
  }
}
```

## 📊 Data Table Features

The advanced data table system includes:
- **Column Operations**: Sort, filter, resize, hide/show
- **Row Selection**: Single and bulk selection with actions
- **Data Export**: Excel and CSV export functionality
- **URL State**: Table state persisted in URL parameters
- **Keyboard Navigation**: Full keyboard accessibility
- **Custom Styling**: Conditional row and cell styling

## 🤖 AI Agents Management

### Features
- **Create Agents**: Custom name, description, and system prompts
- **Real-time Validation**: Form validation with Zod schemas
- **Scrollable Content**: Large prompts and descriptions with tooltips
- **Character Limits**: Enforced limits for optimal performance
  - Names: 2-100 characters
  - Descriptions: Up to 1000 characters
  - Prompts: Up to 10000 characters

### Form Validation
```typescript
// Transform empty strings to undefined to prevent server errors
description: z
  .string()
  .max(1000, 'Description must be 1000 characters or less')
  .optional()
  .transform(val => (val === '' ? undefined : val))
```

## 👥 User Management

### Features
- **Real-time Username Checking**: Debounced validation (500ms)
- **Visual Feedback**: Green/red indicators for availability
- **Role Management**: Admin, Manager, Developer roles
- **Position Assignment**: Optional position selection
- **Bulk Operations**: Multi-user actions via data table

### Username Validation
```typescript
// Real-time checking with useCheckUser hook
const { data: checkResult, isLoading } = useCheckUser(
  watch('username'),
  { enabled: !!watch('username') }
);
```

## 🏢 Project Management

### Repository Integration
- **Repository Verification**: Check repository existence before creation
- **GitHub Integration**: Support for GitHub repositories
- **Repository Details**: Display owner, description, language, stars
- **Permissions Check**: Verify repository access permissions

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- **Touch Navigation**: Optimized for touch interactions
- **Responsive Tables**: Horizontal scrolling for large datasets
- **Mobile Menu**: Collapsible sidebar navigation

## 🔧 Development Guidelines

### Code Organization
- **Feature-based**: Code organized by business domains
- **TypeScript Strict**: All components and functions typed
- **Error Boundaries**: Comprehensive error handling
- **Loading States**: User feedback during async operations

### Best Practices
- Use React Hook Form + Zod for all forms
- Implement proper error handling with try/catch
- Follow established i18n patterns
- Use existing axios configuration
- Prefer editing existing files over creating new ones

## 🚀 Deployment

### Build Process
```bash
# Production build
bun run build

# Preview build locally
bun run preview
```

### Build Optimization
- **Code Splitting**: Manual chunking for better performance
- **Asset Optimization**: Vite optimizations for production
- **Bundle Analysis**: Built-in analysis for optimization

## 🤝 Contributing

1. Follow the existing code style (Biome configuration)
2. Use TypeScript strict mode
3. Write meaningful commit messages
4. Test all forms and validation logic
5. Ensure internationalization support
6. Maintain responsive design principles

## 📄 License

[Your License Here]



## 🆘 Support

For issues and questions:
- Create an issue in the repository
- Check existing documentation
- Review the CLAUDE.md file for development guidance

---

**Team Flow** - Building the future of smart workspace collaboration.

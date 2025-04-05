
# E-Commerce Dashboard & Store

A comprehensive e-commerce platform with both a customer-facing storefront and an admin dashboard for complete store management.

## Project Overview

This project is a full-featured e-commerce platform built with modern web technologies. It provides:

- A responsive customer-facing storefront for browsing and purchasing products
- A powerful admin dashboard for managing products, orders, customers, and analytics
- Global search functionality across all entities
- Responsive design that works on all devices

## Features

### Customer-Facing Store
- Product browsing with categories and filters
- Product search with suggestions
- Product detail pages with galleries, reviews, and related products
- Shopping cart functionality
- User authentication and profiles
- Responsive design for mobile and desktop

### Admin Dashboard
- Comprehensive overview with key metrics and charts
- Products management (add, edit, delete)
- Orders tracking and management
- Customer database and insights
- User roles and permissions
- Analytics and reporting
- Global search functionality across all data

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui component library
- **State Management**: React Hooks & Context API
- **Data Fetching**: React Query
- **Routing**: React Router DOM
- **Charts & Visualization**: Recharts
- **Form Management**: React Hook Form with Zod validation
- **Icons**: Lucide React

## Getting Started

To run this project locally:

```sh
# Clone the repository
git clone <your-git-url>

# Navigate to the project directory
cd <project-name>

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Project Structure

- `src/`
  - `components/` - Reusable UI components
    - `dashboard/` - Dashboard-specific components
    - `layout/` - Layout components (navbar, footer, etc.)
    - `ui/` - Base UI components
  - `pages/` - Page components and routes
    - `dashboard/` - Admin dashboard pages
  - `hooks/` - Custom React hooks
    - `search/` - Search-related hooks and utilities
  - `data/` - Mock data and API interfaces
  - `lib/` - Utility functions and helpers

## Global Search Implementation

One of the standout features is the global search functionality in the dashboard that allows users to quickly find:

- Products
- Orders
- Customers
- Users
- Settings
- Reports

The search is implemented using a modular approach with dedicated hooks:
- `useDashboardSearch` - Main search hook that combines all search functionality
- `useSearchData` - Manages the data sources for search
- `useSearchLogic` - Handles the search algorithm and filtering
- `useSearchNavigation` - Manages navigation to search results

## Deployment

The application can be deployed to any static hosting service:

1. Build the production version:
   ```sh
   npm run build
   ```
2. Deploy the contents of the `dist` directory

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Project URL

Visit the live project at: https://lovable.dev/projects/30badf08-d630-41e6-8447-e7fd1577bca0

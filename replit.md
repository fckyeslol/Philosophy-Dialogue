# Philosophy & Diplomacy Club - System Architecture

## Overview

This is a full-stack web application for a university Philosophy & Diplomacy Club, built with modern web technologies. The application serves as a comprehensive platform for managing club activities, resources, member information, and student engagement across three main focus areas: Philosophy, Debate, and Model UN.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Theme System**: Next-themes for dark/light mode support

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **API Design**: RESTful API endpoints
- **Development**: Hot module replacement with Vite integration

### Build System
- **Frontend Bundler**: Vite with React plugin
- **Backend Bundler**: ESBuild for production builds
- **TypeScript**: Full type safety across the stack
- **Development Server**: Express with Vite middleware integration

## Key Components

### Database Schema
The application uses a relational database with the following main entities:
- **Events**: Club events with categorization (philosophy, debate, model-un)
- **Members**: Club leadership and active members with role assignments
- **Students**: Student repository for membership tracking
- **Blog Posts**: Content management for club publications
- **Gallery Images**: Photo gallery for club memories
- **Contact Messages**: Communication management
- **Resource Links**: Curated educational resources
- **Users**: Authentication and user management

### API Structure
RESTful endpoints organized by resource:
- `/api/events` - Event management
- `/api/members` - Member information
- `/api/blog-posts` - Blog content
- `/api/gallery-images` - Photo gallery
- `/api/students` - Student repository
- `/api/contact-messages` - Contact form submissions
- `/api/resource-links` - Educational resources

### Frontend Pages
- **Home**: Landing page with all sections
- **Resources**: Categorized educational materials
- **Students**: Student directory and registration
- **Gallery**: Photo gallery with filtering
- **404**: Custom not found page

## Data Flow

1. **Client Requests**: React components initiate API calls using TanStack Query
2. **API Layer**: Express routes handle requests and validate data with Zod schemas
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Handling**: Data flows back through the API to React components
5. **UI Updates**: Components re-render with fresh data automatically

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **wouter**: Lightweight React router
- **zod**: Runtime type validation

### Development Dependencies
- **vite**: Fast build tool and dev server
- **typescript**: Type checking and compilation
- **tailwindcss**: Utility-first CSS framework
- **@replit/vite-plugin-***: Replit integration plugins

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20 runtime
- **Database**: PostgreSQL 16 module
- **Development Server**: Runs on port 5000 with hot reload
- **Environment Variables**: DATABASE_URL for database connection

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Deployment**: Autoscale deployment target on port 80
- **Database Migrations**: Drizzle Kit for schema management

### Database Management
- **Schema Location**: `shared/schema.ts` for type sharing
- **Migrations**: Generated in `migrations/` directory
- **Connection**: Serverless PostgreSQL with connection pooling

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 25, 2025. Initial setup
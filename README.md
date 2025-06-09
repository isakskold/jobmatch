# Opi

## Table of Contents

- [Local Development Setup](#local-development-setup)
- [Authentication System](#authentication-system)
  - [Architecture Overview](#architecture-overview)
    - [RedirectAuthenticated Component](#1-redirectauthenticated-component-srccomponentsredirectauthenticatedtsx)
    - [AuthenticatedLayout Component](#2-authenticatedlayout-component-srcappprotectedcomponentsauthenticatedlayouttsx)
    - [RoleBasedAccess Component](#3-rolebasedaccess-component-srcappprotectedcomponentsrolebasedaccesstsx)
    - [Central Auth Routing](#4-central-auth-routing-srcappprotectedauthpagetsx)
- [Routing System and Auth Inheritance](#routing-system-and-auth-inheritance)
  - [Route Structure](#route-structure)
  - [Development Guidelines](#development-guidelines)
  - [Benefits](#benefits)
  - [Example: Adding New Features](#example-adding-new-features)
- [Amplify Backend Structure](#amplify-backend-structure)
  - [Directory Overview](#directory-overview)
  - [Authentication Configuration](#authentication-configuration)
  - [Data Models](#data-models)
  - [Lambda Functions](#lambda-functions)
  - [Development Workflow](#development-workflow)

## Local development setup

- Run `npx ampx sandbox` to deploy backend resources used for local development. This command enables a "watch mode" that auto deploys changes made to the `/amplify` folder.

- Run `npm run dev` to start the local dev server

- Pushing `amplify-development` branch to GitHub enables the pipeline that deploys the production app to Amplify in AWS.

## Authentication System

This application uses a multi-layered authentication and authorization system built with AWS Amplify and Amazon Cognito.

### Architecture Overview

The authentication system consists of four main components that work together to provide secure, role-based access control:

#### 1. **RedirectAuthenticated Component** (`/src/components/RedirectAuthenticated.tsx`)

- **Purpose**: Protects landing pages from authenticated users
- **Technique**: Uses Amplify's `getCurrentUser()` and Hub events for real-time auth state monitoring
- **Why**: Prevents confusion by redirecting authenticated users away from public landing pages to their appropriate dashboards

#### 2. **AuthenticatedLayout Component** (`/src/app/(protected)/components/AuthenticatedLayout.tsx`)

- **Purpose**: Wraps all protected routes with general authentication enforcement
- **Technique**: Uses Amplify's `Authenticator` component with custom signup form fields
- **Why**: Provides seamless UX by showing auth UI inline when users access protected routes while unauthenticated
- **Features**:
  - Custom user type selection during signup (`RECRUITER` or `SEEKER`)
  - Automatic token management and session handling

#### 3. **RoleBasedAccess Component** (`/src/app/(protected)/components/RoleBasedAccess.tsx`)

- **Purpose**: Enforces role-specific access control within protected areas
- **Technique**: Reads Cognito user groups from JWT access tokens
- **Why**: Ensures users can only access routes appropriate for their role
- **Implementation**: Used in layout files for `/recruiter` and `/jobseeker` routes

#### 4. **Central Auth Routing** (`/src/app/(protected)/auth/page.tsx`)

- **Purpose**: Single entry point for post-authentication routing decisions
- **Technique**: Reads user groups from Cognito tokens and redirects accordingly
- **Why**: Centralizes routing logic and provides unified authentication flow

## Routing System and Auth Inheritance

The application uses Next.js App Router with a carefully designed route structure that automatically inherits authentication and role-based protection.

### Route Structure

```
src/app/
├── (protected)/                  # Group for authenticated routes
│   ├── recruiter/               # All recruiter-specific routes
│   │   ├── layout.tsx          # Applies RECRUITER role check
│   │   └── ...                 # Recruiter features
│   └── jobseeker/              # All jobseeker-specific routes
│       ├── layout.tsx          # Applies SEEKER role check
│       └── ...                 # Jobseeker features
└── (landing)/                   # Group for public routes
    └── ...                     # Public pages
```

### Development Guidelines

#### Protected Routes

1. **Recruiter Features**

   - Place ALL recruiter-specific pages under `/app/(protected)/recruiter/`
   - These automatically inherit RECRUITER role protection
   - Example: `/recruiter/jobs/create`, `/recruiter/candidates`

2. **Jobseeker Features**

   - Place ALL jobseeker-specific pages under `/app/(protected)/jobseeker/`
   - These automatically inherit SEEKER role protection
   - Example: `/jobseeker/applications`, `/jobseeker/profile`

3. **Nested Routes**
   - Create folders within role-specific directories for feature organization
   - All nested routes inherit parent's role protection
   - Example: `/recruiter/jobs/[jobId]/candidates/[candidateId]`

#### Public Routes

1. **Landing Pages**
   - Place under `/app/(landing)/`
   - Wrap with `<RedirectAuthenticated>` to prevent authenticated access
   - Example: Homepage, marketing pages, signup landing pages

### Benefits

- **Zero Auth Boilerplate**: New pages automatically get correct protection
- **Clean Code**: Focus on features, not auth logic
- **Maintainable**: Auth changes only needed at layout level
- **Scalable**: Add new features without touching auth system

### Example: Adding New Features

```typescript
// ✅ Correct: New recruiter feature
src / app / protected / recruiter / analytics / page.tsx;
// Automatically protected for RECRUITER role

// ✅ Correct: New jobseeker feature
src / app / protected / jobseeker / saved - jobs / page.tsx;
// Automatically protected for SEEKER role

// ❌ Incorrect: Don't place role-specific features outside their folders
src / app / protected / analytics / page.tsx;
// No automatic role protection!
```

Remember: The route's location in the file system determines its protection level. Always place new features in their appropriate role-specific folders to maintain security.

## Amplify Backend Structure

The `/amplify` directory contains all AWS infrastructure as code, using AWS Amplify Gen2. This section explains the structure and development patterns.

### Directory Overview

```
amplify/
├── auth/                     # Authentication configuration
│   ├── resource.ts          # Main auth config (Cognito)
│   └── post-confirmation/   # Post-signup Lambda trigger
│       ├── resource.ts      # Lambda function config
│       └── handler.ts       # Function implementation
├── data/                    # Data models and access patterns
│   ├── resource.ts         # Schema definitions
│   └── schema/             # Additional schema files
├── backend.ts              # Main backend configuration
└── tsconfig.json          # TypeScript config for backend
```

### Authentication Configuration

The auth configuration in `auth/resource.ts` defines:

- User pool settings
- Custom attributes
- User groups (SEEKER, RECRUITER)
- Authentication triggers

```typescript
// amplify/auth/resource.ts
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  groups: ["SEEKER", "RECRUITER"],
  userAttributes: {
    "custom:userType": {
      dataType: "String",
      mutable: true,
    },
  },
});
```

### Data Models

Data models in `data/resource.ts` define:

- Database schema
- Access patterns
- Authorization rules
- Relationships

```typescript
// amplify/data/resource.ts
const schema = a.schema({
  SeekerProfile: a
    .model({
      // Define fields
      id: a.id(),
      email: a.string(),
      // Define access
    })
    .authorization([
      // Define auth rules
      allow.owner().to(["create", "update"]),
      allow.groups(["RECRUITER"]).to(["read"]),
    ]),
});
```

### Lambda Functions

Lambda functions are organized by feature:

- Each function has its own directory
- Include both config (`resource.ts`) and implementation (`handler.ts`)
- Use TypeScript for type safety

```typescript
// Example: Post-confirmation trigger
// amplify/auth/post-confirmation/handler.ts
export const handler: PostConfirmationTriggerHandler = async (event) => {
  // Implementation
};
```

### Development Workflow

1. **Local Development**

   ```bash
   # Start local dev environment
   npx ampx sandbox

   # Auto-deploys changes to /amplify folder
   ```

2. **Adding Features**

   - Create new models in `data/resource.ts`
   - Add functions in feature-specific directories
   - Update auth config in `auth/resource.ts`

3. **Best Practices**

   - Keep functions small and focused
   - Use TypeScript for all backend code
   - Follow existing patterns for consistency
   - Document schema changes

4. **Deployment**
   ```bash
   # Changes to amplify-development branch
   # trigger automatic deployment
   ```

### Common Patterns

1. **Adding a New Model**

   ```typescript
   // amplify/data/resource.ts
   const schema = a.schema({
     NewFeature: a
       .model({
         id: a.id(),
         // ... fields
       })
       .authorization([
         // ... auth rules
       ]),
   });
   ```

2. **Adding a New Function**

   ```
   amplify/
   └── functions/
       └── new-feature/
           ├── resource.ts    # Config
           └── handler.ts     # Implementation
   ```

3. **Updating Auth Config**
   ```typescript
   // amplify/auth/resource.ts
   export const auth = defineAuth({
     // ... existing config
     triggers: {
       // Add new triggers
     },
   });
   ```

Remember: The Amplify backend follows a "configuration as code" approach. All infrastructure changes should be made through the `/amplify` directory, not the AWS Console.

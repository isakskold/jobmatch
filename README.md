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

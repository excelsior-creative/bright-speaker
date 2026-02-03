import { createAuthServer, neonAuth } from '@neondatabase/auth/next/server';

// Server-side auth client for Next.js
// Use in Server Components, Server Actions, and Route Handlers
export const authServer = createAuthServer();

// Utility to get session in server components
export const getSession = neonAuth;

import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types/user';

/**
 * Drop this in as the `Component` for any route branch that needs a session.
 * Pass `allowedRole` to also enforce trainee-vs-trainer separation
 * (e.g. keep a trainee from hitting /trainer/* directly via the URL bar).
 *
 * Usage in routes.tsx:
 *
 *   {
 *     path: '/',
 *     Component: ProtectedRoute,          // guard
 *     children: [
 *       { Component: Layout, children: [ ... ] },   // your existing tree, unchanged
 *     ],
 *   }
 */
export function ProtectedRoute({ allowedRole }: { allowedRole?: UserRole }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return null; // swap in a spinner that matches your theme if you want one

  if (!user) return <Navigate to="/login" replace />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to="/login" replace />;

  return <Outlet />;
}

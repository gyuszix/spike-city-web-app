// frontend/src/AdminRoutes/AdminRoutes.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ADMINS } from '../../config/admins'; 

/**
 * Protects admin routes by checking if the user is logged in and is an admin.
 * Redirects to "/home" if not allowed.
 * 
 * @param {Object} user
 * @returns {JSX.Element} The child routes or a redirect.
 */
export default function AdminRoutes({ user }) {
  if (!user) {
    return <Navigate to="/home" replace />;
  }

  if (!ADMINS.includes(user.sub)) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}
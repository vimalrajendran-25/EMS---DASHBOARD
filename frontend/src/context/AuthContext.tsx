import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthResponse, UserRole } from '../types';

interface AuthContextType {
  user: AuthResponse | null;
  login: (authData: AuthResponse) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthResponse | null>(() => {
    const saved = localStorage.getItem('ems_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    // Default logged in user for immediate preview
    return {
      token: 'mock-jwt-token-admin',
      id: 1,
      email: 'admin@ems.com',
      fullName: 'Alexander Wright',
      role: 'SUPER_ADMIN',
      employeeId: 'EMP-1001',
      department: 'Executive Management',
      designation: 'Chief Technology Officer',
    };
  });

  const login = (authData: AuthResponse) => {
    setUser(authData);
    localStorage.setItem('ems_token', authData.token);
    localStorage.setItem('ems_user', JSON.stringify(authData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ems_token');
    localStorage.removeItem('ems_user');
  };

  const switchRole = (role: UserRole) => {
    if (!user) return;
    const roleTitles: Record<UserRole, { name: string; email: string; dept: string; desig: string }> = {
      SUPER_ADMIN: { name: 'Alexander Wright', email: 'admin@ems.com', dept: 'Executive', desig: 'Chief Technology Officer' },
      HR_ADMIN: { name: 'Sophia Martinez', email: 'hr.admin@ems.com', dept: 'Human Resources', desig: 'Head of HR' },
      HR_EXECUTIVE: { name: 'Emma Watson', email: 'hr.exec@ems.com', dept: 'Human Resources', desig: 'HR Specialist' },
      FINANCE: { name: 'David Chen', email: 'finance@ems.com', dept: 'Finance & Payroll', desig: 'Finance Controller' },
      TEAM_LEAD: { name: 'Marcus Vance', email: 'teamlead@ems.com', dept: 'Engineering', desig: 'Engineering Lead' },
      EMPLOYEE: { name: 'Priya Sharma', email: 'employee@ems.com', dept: 'Engineering', desig: 'Senior Software Engineer' },
      IT_ADMIN: { name: 'Robert Fox', email: 'itadmin@ems.com', dept: 'IT Operations', desig: 'Systems Admin Lead' },
    };

    const info = roleTitles[role];
    const updated: AuthResponse = {
      ...user,
      role,
      fullName: info.name,
      email: info.email,
      department: info.dept,
      designation: info.desig,
    };
    setUser(updated);
    localStorage.setItem('ems_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

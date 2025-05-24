import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'bank' | 'company' | 'vendor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationName: string;
  username?: string;  // Added username property
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate authentication - in real app, this would connect to backend
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication logic
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'John Smith',
        email: 'bank@hdfc.com',
        role: 'bank',
        organizationName: 'HDFC Bank',
        username: 'bankadmin'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'finance@techcorp.com',
        role: 'company',
        organizationName: 'TechCorp Industries',
        username: 'techcorp'
      },
      {
        id: '3',
        name: 'Mike Chen',
        email: 'vendor@supplies.com',
        role: 'vendor',
        organizationName: 'Global Supplies Ltd',
        username: 'suppliesvendor'
      }
    ];

    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

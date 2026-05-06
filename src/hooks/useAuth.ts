import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// 模拟用户数据库
const mockUsers: Record<string, { id: string; email: string; name: string; password: string }> = {};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const user = mockUsers[email.toLowerCase()];
        if (user && user.password === password) {
          set({
            user: { id: user.id, email: user.email, name: user.name },
            isAuthenticated: true,
          });
          return true;
        }
        return false;
      },

      register: async (name: string, email: string, password: string) => {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const normalizedEmail = email.toLowerCase();
        if (mockUsers[normalizedEmail]) {
          return false;
        }
        
        const newUser = {
          id: Date.now().toString(),
          email: normalizedEmail,
          name,
          password,
        };
        
        mockUsers[normalizedEmail] = newUser;
        
        set({
          user: { id: newUser.id, email: newUser.email, name: newUser.name },
          isAuthenticated: true,
        });
        
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

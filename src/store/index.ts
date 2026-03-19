import { create } from 'zustand';
import type { User, UserRole } from '@/types';

interface SearchFilters {
  budget: { min: number; max: number };
  size: { min: number; max: number };
  businessType: string;
  location: string;
  specialNeeds: string[];
}

interface AppState {
  // Language
  language: 'th' | 'en';
  setLanguage: (lang: 'th' | 'en') => void;

  // User role
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;

  // Current user
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;

  // Saved properties
  savedProperties: string[];
  toggleSavedProperty: (propertyId: string) => void;

  // Search filters
  searchFilters: SearchFilters;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;

  // Notifications
  notifications: number;
  setNotifications: (count: number) => void;

  // Active tab
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Language
  language: 'th',
  setLanguage: (language) => set({ language }),

  // User role
  userRole: 'tenant',
  setUserRole: (userRole) => set({ userRole }),

  // Current user
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),

  // Saved properties
  savedProperties: [],
  toggleSavedProperty: (propertyId) =>
    set((state) => ({
      savedProperties: state.savedProperties.includes(propertyId)
        ? state.savedProperties.filter((id) => id !== propertyId)
        : [...state.savedProperties, propertyId],
    })),

  // Search filters
  searchFilters: {
    budget: { min: 0, max: 200000 },
    size: { min: 0, max: 500 },
    businessType: '',
    location: '',
    specialNeeds: [],
  },
  setSearchFilters: (filters) =>
    set((state) => ({
      searchFilters: { ...state.searchFilters, ...filters },
    })),

  // Notifications
  notifications: 0,
  setNotifications: (notifications) => set({ notifications }),

  // Active tab
  activeTab: 'discover',
  setActiveTab: (activeTab) => set({ activeTab }),
}));

import { MD3DarkTheme } from 'react-native-paper';

export const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#00d9ff',
    secondary: '#a855f7',
    tertiary: '#10b981',
    background: '#0a0e27',
    surface: '#1a1a2e',
    surfaceVariant: '#2a2a3e',
    error: '#ef4444',
    onPrimary: '#ffffff',
    onSecondary: '#ffffff',
    onBackground: '#ffffff',
    onSurface: '#ffffff',
    outline: '#3a3a4e',
  },
};

export const colors = {
  primary: '#00d9ff',
  secondary: '#a855f7',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  background: '#0a0e27',
  surface: '#1a1a2e',
  surfaceLight: '#2a2a3e',
  text: '#ffffff',
  textSecondary: '#9ca3af',
  border: '#3a3a4e',
  gradient: {
    start: '#0a0e27',
    end: '#1a1a2e',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

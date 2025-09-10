/**
 * Theme Constants
 * Centralized theme values for consistent color management across the application
 */

// Theme color values for meta tags and system integration
export const THEME_COLORS = {
  light: '#ffffff',
  dark: '#0a0a0a',
};

// CSS custom property names for dynamic theming
export const CSS_VARIABLES = {
  themePrimary: '--theme-primary',
  themeBackground: '--theme-background',
  themeText: '--theme-text',
  themeBorder: '--theme-border',
};

// CSS custom property values by theme mode
export const CSS_VARIABLE_VALUES = {
  light: {
    [CSS_VARIABLES.themePrimary]: '#1e3a8a',
    [CSS_VARIABLES.themeBackground]: '#ffffff',
    [CSS_VARIABLES.themeText]: '#1e293b',
    [CSS_VARIABLES.themeBorder]: 'rgba(30, 41, 59, 0.08)',
  },
  dark: {
    [CSS_VARIABLES.themePrimary]: '#3b82f6',
    [CSS_VARIABLES.themeBackground]: '#0a0a0a',
    [CSS_VARIABLES.themeText]: '#f8fafc',
    [CSS_VARIABLES.themeBorder]: 'rgba(148, 163, 184, 0.12)',
  },
};

// LocalStorage keys for theme persistence
export const STORAGE_KEYS = {
  themeMode: 'themeMode',
  hasManualOverride: 'hasManualThemeOverride',
};

// Animation durations for theme transitions (optimized for speed)
export const TRANSITION_DURATIONS = {
  theme: 50, // ms - ultra-fast theme context updates
  component: 30, // ms - instant component feedback
  button: 20, // ms - immediate button response
  hover: 100, // ms - smooth hover effects
};

// CSS class names for theme states
export const THEME_CLASSES = {
  transitioning: 'theme-transitioning',
  dark: 'theme-dark',
  light: 'theme-light',
};

// Media query for system theme detection
export const MEDIA_QUERIES = {
  darkMode: '(prefers-color-scheme: dark)',
  lightMode: '(prefers-color-scheme: light)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
};

// Meta tag selectors for theme color updates
export const META_SELECTORS = {
  themeColorLight:
    'meta[name="theme-color"][media="(prefers-color-scheme: light)"]',
  themeColorDark:
    'meta[name="theme-color"][media="(prefers-color-scheme: dark)"]',
  themeColorGeneric: 'meta[name="theme-color"]:not([media])',
};

// Utility functions for theme constants
export const getThemeColor = mode => THEME_COLORS[mode] || THEME_COLORS.light;

export const getCSSVariables = mode =>
  CSS_VARIABLE_VALUES[mode] || CSS_VARIABLE_VALUES.light;

export const getThemeClassName = mode => `theme-${mode}`;

export const isValidThemeMode = mode => mode === 'light' || mode === 'dark';

export const getOppositeTheme = mode => (mode === 'dark' ? 'light' : 'dark');

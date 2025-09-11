import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { trackThemeChange } from '../utils/analytics';
import {
  THEME_COLORS,
  STORAGE_KEYS,
  TRANSITION_DURATIONS,
  THEME_CLASSES,
  MEDIA_QUERIES,
  META_SELECTORS,
  getThemeColor,
  getCSSVariables,
  isValidThemeMode,
  getOppositeTheme,
} from './constants';

/**
 * Error boundary for theme-related operations
 * Provides fallback functionality when theme operations fail
 */
const ThemeErrorBoundary = ({ children, fallbackTheme = 'light' }) => {
  const [hasError, setHasError] = useState(false);
  const [fallbackMode, setFallbackMode] = useState(fallbackTheme);

  useEffect(() => {
    const handleError = error => {
      if (process.env.NODE_ENV === 'development') {
        console.error('Theme operation failed, using fallback:', error);
      }
      setHasError(true);
    };

    // Add global error listener for theme-related failures
    window.addEventListener('themeError', handleError);
    return () => window.removeEventListener('themeError', handleError);
  }, []);

  if (hasError) {
    return (
      <ThemeProvider fallbackMode={fallbackMode}>{children}</ThemeProvider>
    );
  }

  return children;
};

const ThemeContext = createContext();

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    // Get initial theme from localStorage or system preference with comprehensive error handling
    try {
      const savedMode = localStorage.getItem(STORAGE_KEYS.themeMode);
      if (savedMode && isValidThemeMode(savedMode)) return savedMode;
    } catch (error) {
      // localStorage might be disabled, fall back to system preference
      if (process.env.NODE_ENV === 'development') {
        console.warn('localStorage unavailable for theme persistence:', error);
      }

      // Dispatch custom error event for monitoring
      window.dispatchEvent(
        new CustomEvent('themeError', {
          detail: { type: 'localStorage', error: error.message },
        })
      );
    }

    // Check system preference with fallback
    try {
      const mediaQuery = window.matchMedia(MEDIA_QUERIES.darkMode);
      return mediaQuery.matches ? 'dark' : 'light';
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Media query unavailable, using light theme:', error);
      }

      // Fallback to light theme if media queries aren't supported
      return 'light';
    }
  });

  const [hasManualOverride, setHasManualOverride] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.hasManualOverride) === 'true';
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to read manual override preference:', error);
      }
      return false;
    }
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  // Cache DOM references for performance
  const metaTagRefs = useRef({
    light: null,
    dark: null,
    generic: null,
  });

  // Memoize theme color for performance
  const themeColor = useMemo(() => getThemeColor(mode), [mode]);

  // Memoize CSS variables for performance
  const cssVariables = useMemo(() => getCSSVariables(mode), [mode]);

  // Initialize DOM references with error handling
  useEffect(() => {
    try {
      metaTagRefs.current.light = document.querySelector(
        META_SELECTORS.themeColorLight
      );
      metaTagRefs.current.dark = document.querySelector(
        META_SELECTORS.themeColorDark
      );
      metaTagRefs.current.generic = document.querySelector(
        META_SELECTORS.themeColorGeneric
      );

      // Warn if meta tags are missing
      if (process.env.NODE_ENV === 'development') {
        const missing = [];
        if (!metaTagRefs.current.light) missing.push('light theme meta tag');
        if (!metaTagRefs.current.dark) missing.push('dark theme meta tag');
        if (missing.length > 0) {
          console.warn('Missing meta tags:', missing.join(', '));
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to initialize meta tag references:', error);
      }

      // Dispatch error event
      window.dispatchEvent(
        new CustomEvent('themeError', {
          detail: { type: 'dom_initialization', error: error.message },
        })
      );
    }
  }, []);

  // Optimized theme color and CSS variables update with error handling
  const updateThemeColor = useCallback(newMode => {
    try {
      const color = getThemeColor(newMode);
      const variables = getCSSVariables(newMode);

      // Use RAF for smooth updates
      requestAnimationFrame(() => {
        try {
          // Update meta tags - target both light and dark theme meta tags
          const { light, dark, generic } = metaTagRefs.current;

          if (light) light.setAttribute('content', THEME_COLORS.light);
          if (dark) dark.setAttribute('content', THEME_COLORS.dark);
          if (generic) generic.setAttribute('content', color);

          // Batch CSS custom property updates
          const docElement = document.documentElement;
          Object.entries(variables).forEach(([property, value]) => {
            try {
              docElement.style.setProperty(property, value);
            } catch (cssError) {
              if (process.env.NODE_ENV === 'development') {
                console.warn(
                  `Failed to set CSS property ${property}:`,
                  cssError
                );
              }
            }
          });
        } catch (rafError) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Failed to update theme in RAF:', rafError);
          }
        }
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to update theme color:', error);
      }

      // Dispatch error event
      window.dispatchEvent(
        new CustomEvent('themeError', {
          detail: { type: 'theme_update', error: error.message },
        })
      );
    }
  }, []);

  const toggleMode = useCallback(() => {
    setIsTransitioning(true);
    setHasManualOverride(true);

    const newMode = getOppositeTheme(mode);
    const previousMode = mode;
    setMode(newMode);

    // Persist preferences
    try {
      localStorage.setItem(STORAGE_KEYS.themeMode, newMode);
      localStorage.setItem(STORAGE_KEYS.hasManualOverride, 'true');
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to persist theme preference:', error);
      }
    }

    updateThemeColor(newMode);

    // Track theme change analytics with metadata
    trackThemeChange(newMode, {
      source: 'manual',
      previousTheme: previousMode,
      isSystemPreference: false,
      method: 'toggle',
    });

    // Add smooth transition class to body
    document.body.classList.add(THEME_CLASSES.transitioning);

    // Use transitionend event instead of setTimeout for better performance
    const handleTransitionEnd = () => {
      setIsTransitioning(false);
      document.body.classList.remove(THEME_CLASSES.transitioning);
      document.body.removeEventListener('transitionend', handleTransitionEnd);
    };

    document.body.addEventListener('transitionend', handleTransitionEnd);

    // Fallback timeout in case transitionend doesn't fire (ultra-fast)
    setTimeout(() => {
      if (document.body.classList.contains(THEME_CLASSES.transitioning)) {
        handleTransitionEnd();
      }
    }, TRANSITION_DURATIONS.theme + 20);
  }, [mode, updateThemeColor]);

  // Update theme color on mode change
  useEffect(() => {
    updateThemeColor(mode);
  }, [mode, updateThemeColor]);

  // Listen for system theme changes with comprehensive error handling
  useEffect(() => {
    let mediaQuery;
    let cleanup;

    try {
      mediaQuery = window.matchMedia(MEDIA_QUERIES.darkMode);

      const handleChange = e => {
        try {
          // Only update if user hasn't manually overridden the theme
          if (!hasManualOverride) {
            const systemMode = e.matches ? 'dark' : 'light';
            setMode(systemMode);
            updateThemeColor(systemMode);

            // Update localStorage to reflect system preference
            try {
              localStorage.setItem(STORAGE_KEYS.themeMode, systemMode);
            } catch (storageError) {
              if (process.env.NODE_ENV === 'development') {
                console.warn(
                  'Failed to persist system theme preference:',
                  storageError
                );
              }
            }

            // Track system theme change
            try {
              trackThemeChange(systemMode, {
                source: 'system',
                previousTheme: mode,
                isSystemPreference: true,
                method: 'system_change',
              });
            } catch (analyticsError) {
              if (process.env.NODE_ENV === 'development') {
                console.warn(
                  'Failed to track system theme change:',
                  analyticsError
                );
              }
            }
          }
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Error handling system theme change:', error);
          }
        }
      };

      // Use modern addEventListener with fallback
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        cleanup = () => mediaQuery.removeEventListener('change', handleChange);
      } else if (mediaQuery.addListener) {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange);
        cleanup = () => mediaQuery.removeListener(handleChange);
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Media query listeners not supported');
        }
        cleanup = () => {};
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to setup system theme listener:', error);
      }

      cleanup = () => {};
    }

    return cleanup;
  }, [hasManualOverride, updateThemeColor, mode]);

  // Initialize theme on mount
  useEffect(() => {
    // Add theme transition styles to document (only once)
    const existingStyle = document.getElementById('theme-transition-styles');
    if (!existingStyle) {
      const style = document.createElement('style');
      style.id = 'theme-transition-styles';
      style.textContent = `
        .${THEME_CLASSES.transitioning} {
          transition: background-color ${TRANSITION_DURATIONS.theme}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
                     color ${TRANSITION_DURATIONS.theme}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        }

        .${THEME_CLASSES.transitioning} * {
          transition: background-color ${TRANSITION_DURATIONS.component}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
                     color ${TRANSITION_DURATIONS.component}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
                     border-color ${TRANSITION_DURATIONS.component}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        }

        @media ${MEDIA_QUERIES.reducedMotion} {
          .${THEME_CLASSES.transitioning},
          .${THEME_CLASSES.transitioning} * {
            transition: none !important;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Set initial theme color
    updateThemeColor(mode);
  }, [mode, updateThemeColor]);

  // Add function to reset manual override and follow system
  const followSystemTheme = useCallback(() => {
    setHasManualOverride(false);

    // Get current system preference
    const prefersDark = window.matchMedia(MEDIA_QUERIES.darkMode).matches;
    const systemMode = prefersDark ? 'dark' : 'light';

    setMode(systemMode);
    updateThemeColor(systemMode);

    // Update localStorage
    try {
      localStorage.setItem(STORAGE_KEYS.themeMode, systemMode);
      localStorage.removeItem(STORAGE_KEYS.hasManualOverride);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to reset theme override:', error);
      }
    }

    // Track analytics
    trackThemeChange(systemMode, {
      source: 'system-reset',
      previousTheme: mode,
      isSystemPreference: true,
      method: 'manual_reset',
    });
  }, [updateThemeColor]);

  // Performance optimization: prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      mode,
      toggleMode,
      followSystemTheme,
      hasManualOverride,
      isDark: mode === 'dark',
      isLight: mode === 'light',
      isTransitioning,
      // Utility function to get theme-aware colors
      getThemeColor: (lightColor, darkColor) =>
        mode === 'dark' ? darkColor : lightColor,
    }),
    [mode, toggleMode, followSystemTheme, hasManualOverride, isTransitioning]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Export the error boundary wrapper
export { ThemeErrorBoundary };

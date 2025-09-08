import { CssBaseline, Box, Fade } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import SEOHead from './components/SEO/SEOHead';
import { ErrorBoundary, OfflineIndicator } from './components/ui/LoadingStates';
import ScrollProgress from './components/ui/ScrollProgress';
import { useSkeletonTransition } from './hooks/useSkeletonTransition';
import { getTheme } from './theme/theme';
import { ThemeProvider, useThemeMode, ThemeToggle } from './theme/ThemeContext';
import { initializeAnalytics, trackPageView } from './utils/analytics';
import { cleanup } from './utils/performance';

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home'));

// Skip to main content component for accessibility
const SkipToContent = () => (
  <Box
    component="a"
    href="#main-content"
    sx={{
      position: 'absolute',
      left: '-9999px',
      zIndex: 9999,
      padding: '8px 16px',
      backgroundColor: 'primary.main',
      color: 'primary.contrastText',
      textDecoration: 'none',
      borderRadius: 1,
      fontSize: '14px',
      fontWeight: 500,
      transition: 'all 0.2s ease',
      '&:focus': {
        left: '16px',
        top: '16px',
        outline: '2px solid',
        outlineColor: 'primary.light',
        outlineOffset: '2px',
      },
    }}
  >
    Skip to main content
  </Box>
);

// Main app content with all enhancements
const AppContent = () => {
  const { mode, isTransitioning } = useThemeMode();
  const theme = getTheme(mode);

  // Use skeleton transition hook
  const { showContent, isTransitioning: skeletonTransitioning } =
    useSkeletonTransition({
      delay: 50,
      fadeOutDuration: 600,
      contentDelay: 200,
    });

  // Initialize Google Analytics
  useEffect(() => {
    // Initialize analytics with user consent (you can add consent logic here)
    initializeAnalytics(true);

    // Track initial page view
    trackPageView('Precious E. Okoyen - AI Software Engineer Portfolio', '/');
  }, []);

  // Initialize performance monitoring cleanup
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  // Update document meta tags based on theme
  useEffect(() => {
    const updateMetaTags = () => {
      // Update theme-color meta tag
      const themeColorMeta = document.querySelector('meta[name="theme-color"]');
      if (themeColorMeta) {
        themeColorMeta.setAttribute(
          'content',
          mode === 'dark' ? '#0a0a0a' : '#ffffff'
        );
      }

      // Update document class for CSS targeting
      document.documentElement.className = `theme-${mode}`;

      // Add smooth scroll behavior
      document.documentElement.style.scrollBehavior = 'smooth';
    };

    updateMetaTags();
  }, [mode]);

  // Performance monitoring
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (
            entry.entryType === 'paint' &&
            entry.name === 'first-contentful-paint'
          ) {
            if (process.env.NODE_ENV === 'development') {
              console.log('FCP:', entry.startTime);
            }
          }
        }
      });

      try {
        if (PerformanceObserver.supportedEntryTypes?.includes('paint')) {
          observer.observe({ entryTypes: ['paint'] });
        }
      } catch (e) {
        // Performance Observer not supported
      }

      return () => {
        try {
          observer.disconnect();
        } catch (e) {
          // Already disconnected
        }
      };
    }
  }, []);

  // Don't show anything until skeleton transition begins
  if (!showContent) {
    return null;
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ErrorBoundary
          fullPage={false}
          fallbackMessage="We're experiencing technical difficulties. Please refresh the page or try again later."
          onGoHome={() => (window.location.href = '/')}
        >
          {/* Accessibility skip link */}
          <SkipToContent />

          {/* SEO Head Management */}
          <SEOHead />

          {/* Scroll progress indicator */}
          <ScrollProgress />

          {/* Offline indicator */}
          <OfflineIndicator />

          {/* Main app container with smooth fade-in */}
          <Fade
            in={showContent}
            timeout={skeletonTransitioning ? 600 : 300}
            style={{ transitionDelay: skeletonTransitioning ? '200ms' : '0ms' }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: 'background.default',
                color: 'text.primary',
                transition: isTransitioning
                  ? 'background-color 0.3s ease, color 0.3s ease'
                  : 'none',
                position: 'relative',
                scrollBehavior: 'smooth',
                overflowX: 'hidden',
                // Custom selection styles
                '& ::selection': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  opacity: 0.2,
                },
                // Enhanced focus styles for accessibility
                '& *:focus-visible': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: '2px',
                  borderRadius: '4px',
                },
              }}
            >
              {/* Header with error boundary */}
              <ErrorBoundary fallbackMessage="Navigation temporarily unavailable">
                <Header />
              </ErrorBoundary>

              {/* Main content area with proper semantic structure */}
              <Box
                component="main"
                id="main-content"
                sx={{
                  flex: 1,
                  position: 'relative',
                  minHeight: 'calc(100vh - 160px)', // Approximate header + footer height
                  '&:focus': {
                    outline: 'none',
                  },
                }}
                tabIndex={-1}
              >
                {/* Suspense wrapper for lazy-loaded components */}
                <Suspense fallback={null}>
                  <ErrorBoundary fallbackMessage="This page is temporarily unavailable">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route
                        path="*"
                        element={
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minHeight: '60vh',
                              textAlign: 'center',
                              p: 4,
                            }}
                          >
                            <Box sx={{ fontSize: '4rem', mb: 2 }}>🔍</Box>
                            <Box
                              component="h1"
                              sx={{ typography: 'h4', mb: 2 }}
                            >
                              Page Not Found
                            </Box>
                            <Box
                              sx={{
                                typography: 'body1',
                                color: 'text.secondary',
                                mb: 3,
                              }}
                            >
                              The page you're looking for doesn't exist.
                            </Box>
                            <Box
                              component="a"
                              href="/"
                              sx={{
                                display: 'inline-block',
                                px: 3,
                                py: 1.5,
                                backgroundColor: 'primary.main',
                                color: 'primary.contrastText',
                                textDecoration: 'none',
                                borderRadius: 1,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  backgroundColor: 'primary.dark',
                                  transform: 'translateY(-1px)',
                                },
                              }}
                            >
                              Return Home
                            </Box>
                          </Box>
                        }
                      />
                    </Routes>
                  </ErrorBoundary>
                </Suspense>
              </Box>

              {/* Footer with error boundary */}
              <ErrorBoundary fallbackMessage="Footer temporarily unavailable">
                <Footer />
              </ErrorBoundary>

              {/* Enhanced theme toggle */}
              <ThemeToggle />
            </Box>
          </Fade>
        </ErrorBoundary>
      </Router>
    </MuiThemeProvider>
  );
};

// Root App component with theme provider
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

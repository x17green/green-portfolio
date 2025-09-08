import { createTheme } from '@mui/material/styles';

export const getTheme = (mode = 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#64ffda' : '#00695c', // Teal accent
        light: mode === 'dark' ? '#9efff3' : '#439889',
        dark: mode === 'dark' ? '#14cca8' : '#003d35',
        contrastText: mode === 'dark' ? '#000000' : '#ffffff',
      },
      secondary: {
        main: mode === 'dark' ? '#818cf8' : '#3f51b5', // Soft indigo
        light: mode === 'dark' ? '#c7d2fe' : '#7986cb',
        dark: mode === 'dark' ? '#4c1d95' : '#303f9f',
        contrastText: '#ffffff',
      },
      background: {
        default: mode === 'dark' ? '#0f0f23' : '#f8fafc', // Deep navy / Soft white
        paper: mode === 'dark' ? '#1a1a2e' : '#ffffff',
      },
      surface: {
        main: mode === 'dark' ? '#16213e' : '#f1f5f9',
        elevated: mode === 'dark' ? '#1e293b' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#f8fafc' : '#1e293b',
        secondary: mode === 'dark' ? '#94a3b8' : '#64748b',
        muted: mode === 'dark' ? '#64748b' : '#94a3b8',
      },
      accent: {
        cyan: mode === 'dark' ? '#22d3ee' : '#0891b2',
        purple: mode === 'dark' ? '#a78bfa' : '#7c3aed',
        amber: mode === 'dark' ? '#fbbf24' : '#d97706',
        emerald: mode === 'dark' ? '#10b981' : '#059669',
      },
      error: {
        main: mode === 'dark' ? '#ef4444' : '#dc2626',
      },
      warning: {
        main: mode === 'dark' ? '#f59e0b' : '#d97706',
      },
      info: {
        main: mode === 'dark' ? '#3b82f6' : '#2563eb',
      },
      success: {
        main: mode === 'dark' ? '#10b981' : '#059669',
      },
      divider:
        mode === 'dark'
          ? 'rgba(148, 163, 184, 0.12)'
          : 'rgba(30, 41, 59, 0.08)',
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '3.5rem',
        fontWeight: 700,
        lineHeight: 1.1,
        letterSpacing: '-0.025em',
      },
      h2: {
        fontSize: '2.75rem',
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
      },
      h3: {
        fontSize: '2.125rem',
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.015em',
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: '-0.01em',
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.6,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.7,
        fontWeight: 400,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
        fontWeight: 400,
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
        letterSpacing: '0.025em',
      },
      caption: {
        fontSize: '0.75rem',
        lineHeight: 1.5,
        fontWeight: 400,
      },
    },
    shape: {
      borderRadius: 8,
    },
    shadows:
      mode === 'dark'
        ? [
            'none',
            '0px 1px 2px rgba(0, 0, 0, 0.2)',
            '0px 2px 4px rgba(0, 0, 0, 0.15)',
            '0px 4px 8px rgba(0, 0, 0, 0.15)',
            '0px 6px 12px rgba(0, 0, 0, 0.15)',
            '0px 8px 16px rgba(0, 0, 0, 0.15)',
            '0px 12px 24px rgba(0, 0, 0, 0.15)',
            '0px 16px 32px rgba(0, 0, 0, 0.15)',
            '0px 20px 40px rgba(0, 0, 0, 0.15)',
            '0px 24px 48px rgba(0, 0, 0, 0.15)',
            '0px 32px 64px rgba(0, 0, 0, 0.15)',
            '0px 40px 80px rgba(0, 0, 0, 0.15)',
            '0px 48px 96px rgba(0, 0, 0, 0.15)',
            '0px 56px 112px rgba(0, 0, 0, 0.15)',
            '0px 64px 128px rgba(0, 0, 0, 0.15)',
            '0px 72px 144px rgba(0, 0, 0, 0.15)',
            '0px 80px 160px rgba(0, 0, 0, 0.15)',
            '0px 88px 176px rgba(0, 0, 0, 0.15)',
            '0px 96px 192px rgba(0, 0, 0, 0.15)',
            '0px 104px 208px rgba(0, 0, 0, 0.15)',
            '0px 112px 224px rgba(0, 0, 0, 0.15)',
            '0px 120px 240px rgba(0, 0, 0, 0.15)',
            '0px 128px 256px rgba(0, 0, 0, 0.15)',
            '0px 136px 272px rgba(0, 0, 0, 0.15)',
            '0px 144px 288px rgba(0, 0, 0, 0.15)',
          ]
        : [
            'none',
            '0px 1px 2px rgba(0, 0, 0, 0.05)',
            '0px 2px 4px rgba(0, 0, 0, 0.06)',
            '0px 4px 8px rgba(0, 0, 0, 0.07)',
            '0px 6px 12px rgba(0, 0, 0, 0.08)',
            '0px 8px 16px rgba(0, 0, 0, 0.09)',
            '0px 12px 24px rgba(0, 0, 0, 0.1)',
            '0px 16px 32px rgba(0, 0, 0, 0.11)',
            '0px 20px 40px rgba(0, 0, 0, 0.12)',
            '0px 24px 48px rgba(0, 0, 0, 0.13)',
            '0px 32px 64px rgba(0, 0, 0, 0.14)',
            '0px 40px 80px rgba(0, 0, 0, 0.15)',
            '0px 48px 96px rgba(0, 0, 0, 0.16)',
            '0px 56px 112px rgba(0, 0, 0, 0.17)',
            '0px 64px 128px rgba(0, 0, 0, 0.18)',
            '0px 72px 144px rgba(0, 0, 0, 0.19)',
            '0px 80px 160px rgba(0, 0, 0, 0.2)',
            '0px 88px 176px rgba(0, 0, 0, 0.21)',
            '0px 96px 192px rgba(0, 0, 0, 0.22)',
            '0px 104px 208px rgba(0, 0, 0, 0.23)',
            '0px 112px 224px rgba(0, 0, 0, 0.24)',
            '0px 120px 240px rgba(0, 0, 0, 0.25)',
            '0px 128px 256px rgba(0, 0, 0, 0.26)',
            '0px 136px 272px rgba(0, 0, 0, 0.27)',
            '0px 144px 288px rgba(0, 0, 0, 0.28)',
          ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            textTransform: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
            padding: '8px 20px',
            boxShadow: 'none',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow:
                mode === 'dark'
                  ? '0px 4px 12px rgba(100, 255, 218, 0.15)'
                  : '0px 4px 12px rgba(0, 105, 92, 0.15)',
            },
          },
          contained: {
            backgroundColor: mode === 'dark' ? '#64ffda' : '#00695c',
            color: mode === 'dark' ? '#000000' : '#ffffff',
            '&:hover': {
              backgroundColor: mode === 'dark' ? '#4fd1c7' : '#004d40',
            },
          },
          outlined: {
            borderColor: mode === 'dark' ? '#64ffda' : '#00695c',
            color: mode === 'dark' ? '#64ffda' : '#00695c',
            borderWidth: '1.5px',
            '&:hover': {
              backgroundColor:
                mode === 'dark'
                  ? 'rgba(100, 255, 218, 0.08)'
                  : 'rgba(0, 105, 92, 0.08)',
              borderWidth: '1.5px',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor:
              mode === 'dark'
                ? 'rgba(30, 41, 59, 0.5)'
                : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)',
            border:
              mode === 'dark'
                ? '1px solid rgba(100, 255, 218, 0.1)'
                : '1px solid rgba(0, 105, 92, 0.1)',
            borderRadius: 12,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              backgroundColor:
                mode === 'dark'
                  ? 'rgba(30, 41, 59, 0.7)'
                  : 'rgba(255, 255, 255, 0.9)',
              borderColor:
                mode === 'dark'
                  ? 'rgba(100, 255, 218, 0.2)'
                  : 'rgba(0, 105, 92, 0.2)',
              boxShadow:
                mode === 'dark'
                  ? '0px 8px 25px rgba(0, 0, 0, 0.2)'
                  : '0px 8px 25px rgba(0, 0, 0, 0.08)',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor:
              mode === 'dark'
                ? 'rgba(100, 255, 218, 0.1)'
                : 'rgba(0, 105, 92, 0.1)',
            color: mode === 'dark' ? '#64ffda' : '#00695c',
            border: `1px solid ${
              mode === 'dark'
                ? 'rgba(100, 255, 218, 0.2)'
                : 'rgba(0, 105, 92, 0.2)'
            }`,
            fontWeight: 500,
            '&:hover': {
              backgroundColor:
                mode === 'dark'
                  ? 'rgba(100, 255, 218, 0.15)'
                  : 'rgba(0, 105, 92, 0.15)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor:
              mode === 'dark'
                ? 'rgba(15, 15, 35, 0.8)'
                : 'rgba(248, 250, 252, 0.8)',
            backdropFilter: 'blur(12px)',
            borderBottom:
              mode === 'dark'
                ? '1px solid rgba(100, 255, 218, 0.1)'
                : '1px solid rgba(0, 105, 92, 0.1)',
            boxShadow:
              mode === 'dark'
                ? '0px 1px 3px rgba(0, 0, 0, 0.2)'
                : '0px 1px 3px rgba(0, 0, 0, 0.05)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              backgroundColor:
                mode === 'dark'
                  ? 'rgba(30, 41, 59, 0.3)'
                  : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(8px)',
              borderRadius: 8,
              '& fieldset': {
                borderColor:
                  mode === 'dark'
                    ? 'rgba(148, 163, 184, 0.2)'
                    : 'rgba(100, 116, 139, 0.2)',
              },
              '&:hover fieldset': {
                borderColor: mode === 'dark' ? '#64ffda' : '#00695c',
              },
              '&.Mui-focused fieldset': {
                borderColor: mode === 'dark' ? '#64ffda' : '#00695c',
                borderWidth: '2px',
              },
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor:
              mode === 'dark'
                ? 'rgba(30, 41, 59, 0.5)'
                : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.875rem',
            color: mode === 'dark' ? '#94a3b8' : '#64748b',
            '&.Mui-selected': {
              color: mode === 'dark' ? '#64ffda' : '#00695c',
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: mode === 'dark' ? '#64ffda' : '#00695c',
            height: 2,
            borderRadius: 1,
          },
        },
      },
    },
  });

export default getTheme;

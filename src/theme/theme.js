import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e676', // Bright green for AI/tech feel
      light: '#66ffa6',
      dark: '#00b248',
      contrastText: '#000000',
    },
    secondary: {
      main: '#1976d2', // Blue for contrast
      light: '#63a4ff',
      dark: '#004ba0',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 230, 118, 0.12), 0px 1px 2px rgba(0, 230, 118, 0.24)',
    '0px 3px 6px rgba(0, 230, 118, 0.16), 0px 3px 6px rgba(0, 230, 118, 0.23)',
    '0px 10px 20px rgba(0, 230, 118, 0.19), 0px 6px 6px rgba(0, 230, 118, 0.23)',
    '0px 14px 28px rgba(0, 230, 118, 0.25), 0px 10px 10px rgba(0, 230, 118, 0.22)',
    '0px 19px 38px rgba(0, 230, 118, 0.30), 0px 15px 12px rgba(0, 230, 118, 0.22)',
    '0px 24px 48px rgba(0, 230, 118, 0.35), 0px 19px 15px rgba(0, 230, 118, 0.22)',
    '0px 30px 60px rgba(0, 230, 118, 0.40), 0px 24px 18px rgba(0, 230, 118, 0.22)',
    '0px 36px 72px rgba(0, 230, 118, 0.45), 0px 30px 22px rgba(0, 230, 118, 0.22)',
    '0px 42px 84px rgba(0, 230, 118, 0.50), 0px 36px 26px rgba(0, 230, 118, 0.22)',
    '0px 48px 96px rgba(0, 230, 118, 0.55), 0px 42px 30px rgba(0, 230, 118, 0.22)',
    '0px 54px 108px rgba(0, 230, 118, 0.60), 0px 48px 34px rgba(0, 230, 118, 0.22)',
    '0px 60px 120px rgba(0, 230, 118, 0.65), 0px 54px 38px rgba(0, 230, 118, 0.22)',
    '0px 66px 132px rgba(0, 230, 118, 0.70), 0px 60px 42px rgba(0, 230, 118, 0.22)',
    '0px 72px 144px rgba(0, 230, 118, 0.75), 0px 66px 46px rgba(0, 230, 118, 0.22)',
    '0px 78px 156px rgba(0, 230, 118, 0.80), 0px 72px 50px rgba(0, 230, 118, 0.22)',
    '0px 84px 168px rgba(0, 230, 118, 0.85), 0px 78px 54px rgba(0, 230, 118, 0.22)',
    '0px 90px 180px rgba(0, 230, 118, 0.90), 0px 84px 58px rgba(0, 230, 118, 0.22)',
    '0px 96px 192px rgba(0, 230, 118, 0.95), 0px 90px 62px rgba(0, 230, 118, 0.22)',
    '0px 102px 204px rgba(0, 230, 118, 1.00), 0px 96px 66px rgba(0, 230, 118, 0.22)',
    '0px 108px 216px rgba(0, 230, 118, 1.00), 0px 102px 70px rgba(0, 230, 118, 0.22)',
    '0px 114px 228px rgba(0, 230, 118, 1.00), 0px 108px 74px rgba(0, 230, 118, 0.22)',
    '0px 120px 240px rgba(0, 230, 118, 1.00), 0px 114px 78px rgba(0, 230, 118, 0.22)',
    '0px 126px 252px rgba(0, 230, 118, 1.00), 0px 120px 82px rgba(0, 230, 118, 0.22)',
    '0px 132px 264px rgba(0, 230, 118, 1.00), 0px 126px 86px rgba(0, 230, 118, 0.22)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontSize: '0.95rem',
          fontWeight: 500,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0, 230, 118, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #00e676 30%, #00b248 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #00b248 30%, #00e676 90%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 16,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 8px 24px rgba(0, 230, 118, 0.2)',
            border: '1px solid rgba(0, 230, 118, 0.3)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 230, 118, 0.1)',
          color: '#00e676',
          border: '1px solid rgba(0, 230, 118, 0.3)',
          '&:hover': {
            backgroundColor: 'rgba(0, 230, 118, 0.2)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
  },
});

export default theme;

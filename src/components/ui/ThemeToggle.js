import { LightMode, DarkMode } from '@mui/icons-material';
import { IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useMemo } from 'react';
import { TRANSITION_DURATIONS } from '../../theme/constants';
import { useThemeMode } from '../../theme/ThemeContext';

const ThemeToggle = ({ size = 'medium', position = 'fixed' }) => {
  const { mode, toggleMode, isTransitioning, hasManualOverride } =
    useThemeMode();
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Memoize styles for better performance
  const buttonStyles = useMemo(() => {
    const sizeMap = {
      small: { width: 40, height: 40, fontSize: 16 },
      medium: { width: 50, height: 50, fontSize: 20 },
      large: { width: 60, height: 60, fontSize: 24 },
    };

    const currentSize = sizeMap[size];
    const isDark = mode === 'dark';

    return {
      position,
      bottom: position === 'fixed' ? (isMobile ? '80px' : '2rem') : 'auto',
      right: position === 'fixed' ? (isMobile ? '16px' : '2rem') : 'auto',
      zIndex: 1000,
      width: currentSize.width,
      height: currentSize.height,
      borderRadius: '50%',
      cursor: 'pointer',
      background: isDark
        ? 'linear-gradient(135deg, #64ffda, #4fd1c7)'
        : 'linear-gradient(135deg, #f59e0b, #d97706)',
      color: isDark ? '#000000' : '#ffffff',
      boxShadow: isDark
        ? '0 4px 20px rgba(100, 255, 218, 0.3)'
        : '0 4px 20px rgba(245, 158, 11, 0.3)',
      transition: `all ${TRANSITION_DURATIONS.button}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
      transform: isTransitioning ? 'scale(0.95)' : 'scale(1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: currentSize.fontSize,
      outline: 'none',
      backdropFilter: 'blur(8px)',
      border: `2px solid ${
        isDark ? 'rgba(100, 255, 218, 0.2)' : 'rgba(245, 158, 11, 0.2)'
      }`,
    };
  }, [size, position, mode, isTransitioning, isMobile]);

  // Memoize hover styles with ultra-fast response
  const hoverStyles = useMemo(
    () => ({
      transform: 'scale(1.05) translateY(-1px)',
      boxShadow:
        mode === 'dark'
          ? '0 4px 20px rgba(100, 255, 218, 0.5)'
          : '0 4px 20px rgba(245, 158, 11, 0.5)',
      transition: `all ${TRANSITION_DURATIONS.hover}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
    }),
    [mode]
  );

  // Handle click with ultra-fast immediate visual feedback
  const handleClick = () => {
    // Add immediate scale effect with faster recovery
    const button = document.querySelector('[data-theme-toggle]');
    if (button) {
      button.style.transform = 'scale(0.92)';
      button.style.transition = `transform ${TRANSITION_DURATIONS.button}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;

      // Ultra-fast recovery
      setTimeout(() => {
        if (button) {
          button.style.transform = isTransitioning ? 'scale(0.96)' : 'scale(1)';
        }
      }, TRANSITION_DURATIONS.button);
    }

    toggleMode();
  };

  return (
    <Tooltip
      title={
        hasManualOverride
          ? `Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`
          : `Following system theme (${mode}). Click to override.`
      }
      placement="left"
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            fontSize: '0.75rem',
            maxWidth: 200,
          },
        },
      }}
    >
      <IconButton
        onClick={handleClick}
        data-theme-toggle
        sx={{
          ...buttonStyles,
          '&:hover': hoverStyles,
          '&:focus': {
            outline: '2px solid',
            outlineColor: mode === 'dark' ? '#64ffda' : '#f59e0b',
            outlineOffset: '2px',
          },
          '&:active': {
            transform: 'scale(0.92)',
            transition: `transform ${TRANSITION_DURATIONS.button}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
          },
          // Ultra-fast Material-UI transitions
          '&.MuiIconButton-root': {
            transition: `all ${TRANSITION_DURATIONS.component}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
          },
        }}
        aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
      >
        {/* Ultra-fast icon switching with minimal transition */}
        {mode === 'dark' ? (
          <LightMode
            sx={{
              fontSize: 'inherit',
              transition: `opacity ${TRANSITION_DURATIONS.button}ms ease-out`,
              opacity: 1,
            }}
          />
        ) : (
          <DarkMode
            sx={{
              fontSize: 'inherit',
              transition: `opacity ${TRANSITION_DURATIONS.button}ms ease-out`,
              opacity: 1,
            }}
          />
        )}

        {/* System preference indicator */}
        {!hasManualOverride && (
          <div
            style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: mode === 'dark' ? '#4ade80' : '#3b82f6',
              border: '1px solid white',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }}
            aria-hidden="true"
          />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;

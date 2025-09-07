import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const ThemeContext = createContext();

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    // Get initial theme from localStorage or system preference
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) return savedMode;

    // Check system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return prefersDark ? "dark" : "light";
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  // Update document theme color meta tags
  const updateThemeColor = useCallback((newMode) => {
    const themeColor = newMode === "dark" ? "#0a0a0a" : "#ffffff";
    const existingMeta = document.querySelector('meta[name="theme-color"]');

    if (existingMeta) {
      existingMeta.setAttribute("content", themeColor);
    }

    // Update CSS custom properties for scroll progress bar
    document.documentElement.style.setProperty(
      "--theme-primary",
      newMode === "dark" ? "#3b82f6" : "#1e3a8a",
    );
    document.documentElement.style.setProperty(
      "--theme-background",
      newMode === "dark" ? "#0a0a0a" : "#ffffff",
    );
  }, []);

  const toggleMode = useCallback(() => {
    setIsTransitioning(true);

    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
    updateThemeColor(newMode);

    // Add smooth transition class to body
    document.body.classList.add("theme-transitioning");

    // Remove transition class after animation
    setTimeout(() => {
      setIsTransitioning(false);
      document.body.classList.remove("theme-transitioning");
    }, 300);
  }, [mode, updateThemeColor]);

  // Update theme color on mode change
  useEffect(() => {
    updateThemeColor(mode);
  }, [mode, updateThemeColor]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      // Only update if user hasn't set a manual preference
      const hasManualPreference = localStorage.getItem("themeMode");
      if (!hasManualPreference) {
        const systemMode = e.matches ? "dark" : "light";
        setMode(systemMode);
        updateThemeColor(systemMode);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [updateThemeColor]);

  // Initialize theme on mount
  useEffect(() => {
    // Add theme transition styles to document
    const style = document.createElement("style");
    style.textContent = `
      .theme-transitioning {
        transition: background-color 0.3s ease, color 0.3s ease !important;
      }

      .theme-transitioning * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
      }
    `;
    document.head.appendChild(style);

    // Set initial theme color
    updateThemeColor(mode);

    // Cleanup
    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, [mode, updateThemeColor]);

  // Performance optimization: prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      mode,
      toggleMode,
      isDark: mode === "dark",
      isLight: mode === "light",
      isTransitioning,
      // Utility function to get theme-aware colors
      getThemeColor: (lightColor, darkColor) =>
        mode === "dark" ? darkColor : lightColor,
    }),
    [mode, toggleMode, isTransitioning],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Enhanced theme toggle component with better accessibility
export const ThemeToggle = ({ size = "medium", position = "fixed" }) => {
  const { mode, toggleMode, isTransitioning } = useThemeMode();

  const buttonStyles = {
    position: position,
    bottom: position === "fixed" ? "2rem" : "auto",
    right: position === "fixed" ? "2rem" : "auto",
    zIndex: 1000,
    width: size === "large" ? "60px" : size === "small" ? "40px" : "50px",
    height: size === "large" ? "60px" : size === "small" ? "40px" : "50px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    background:
      mode === "dark"
        ? "linear-gradient(135deg, #1e3a8a, #3730a3)"
        : "linear-gradient(135deg, #f59e0b, #d97706)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: size === "large" ? "24px" : size === "small" ? "16px" : "20px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
    transition: "all 0.3s ease",
    transform: isTransitioning ? "scale(0.95)" : "scale(1)",
    outline: "none",
    "&:hover": {
      transform: "scale(1.1)",
      boxShadow: "0 6px 25px rgba(0, 0, 0, 0.2)",
    },
    "&:focus": {
      outline: "2px solid #3b82f6",
      outlineOffset: "2px",
    },
    "&:active": {
      transform: "scale(0.95)",
    },
  };

  return (
    <button
      onClick={toggleMode}
      style={buttonStyles}
      aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
    >
      {mode === "dark" ? "☀️" : "🌙"}
    </button>
  );
};

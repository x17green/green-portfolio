import React, { Component } from "react";
import { Box, Typography, Button, CircularProgress, Fade } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

// Global Loading Indicator
export const GlobalLoading = ({
  isVisible = false,
  message = "Loading...",
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              p: 4,
              backgroundColor: "background.paper",
              borderRadius: 2,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <CircularProgress size={60} thickness={3} />
            </motion.div>
            <Typography variant="h6" color="text.primary">
              {message}
            </Typography>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Page Loading Indicator
export const PageLoading = ({
  height = "400px",
  message = "Loading content...",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height,
        gap: 3,
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CircularProgress size={50} thickness={3} />
      </motion.div>
      <Fade in timeout={800}>
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      </Fade>
    </Box>
  );
};

// Skeleton Loading Component
export const SkeletonLoader = ({
  variant = "rectangular",
  width = "100%",
  height = 40,
  count = 1,
  spacing = 2,
}) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <Box
      key={index}
      sx={{
        width,
        height,
        backgroundColor: "action.hover",
        borderRadius: variant === "circular" ? "50%" : 1,
        mb: spacing,
        animation: "pulse 1.5s ease-in-out infinite",
        "@keyframes pulse": {
          "0%": {
            opacity: 0.6,
          },
          "50%": {
            opacity: 0.3,
          },
          "100%": {
            opacity: 0.6,
          },
        },
      }}
    />
  ));

  return <Box>{skeletons}</Box>;
};

// Card Loading Skeleton
export const CardSkeleton = ({ showImage = true, lines = 3 }) => {
  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      {showImage && (
        <SkeletonLoader
          variant="rectangular"
          height={200}
          count={1}
          spacing={2}
        />
      )}
      <SkeletonLoader
        variant="text"
        height={24}
        width="70%"
        count={1}
        spacing={1}
      />
      <SkeletonLoader variant="text" height={16} count={lines} spacing={1} />
      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <SkeletonLoader
          variant="rectangular"
          width={80}
          height={32}
          count={1}
          spacing={0}
        />
        <SkeletonLoader
          variant="rectangular"
          width={80}
          height={32}
          count={1}
          spacing={0}
        />
      </Box>
    </Box>
  );
};

// Error Boundary Class Component
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error Boundary caught an error:", error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState((prevState) => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1,
    }));
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: this.props.fullPage ? "100vh" : "400px",
            p: 4,
            textAlign: "center",
            backgroundColor: "background.default",
            color: "text.primary",
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" color="error" gutterBottom>
              🚫 Oops! Something went wrong
            </Typography>
          </motion.div>

          <Typography variant="body1" color="text.secondary" paragraph>
            {this.props.fallbackMessage ||
              "We're sorry, but something unexpected happened. Please try again."}
          </Typography>

          {process.env.NODE_ENV === "development" && this.state.error && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                backgroundColor: "grey.100",
                borderRadius: 1,
                maxWidth: "600px",
                overflow: "auto",
              }}
            >
              <Typography
                variant="caption"
                component="pre"
                sx={{ whiteSpace: "pre-wrap" }}
              >
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </Typography>
            </Box>
          )}

          <Box sx={{ mt: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              onClick={this.handleRetry}
              disabled={this.state.retryCount >= 3}
            >
              {this.state.retryCount >= 3 ? "Max Retries Reached" : "Try Again"}
            </Button>

            <Button variant="outlined" onClick={this.handleReload}>
              Reload Page
            </Button>

            {this.props.onGoHome && (
              <Button variant="text" onClick={this.props.onGoHome}>
                Go to Home
              </Button>
            )}
          </Box>

          {this.state.retryCount > 0 && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
              Retry attempts: {this.state.retryCount}/3
            </Typography>
          )}
        </Box>
      );
    }

    return this.props.children;
  }
}

// HOC for adding error boundary to components
export const withErrorBoundary = (
  WrappedComponent,
  errorBoundaryProps = {},
) => {
  return function WithErrorBoundaryComponent(props) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
};

// Hook for handling async loading states
export const useAsyncOperation = (asyncFunction) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState(null);

  const execute = React.useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);
        const result = await asyncFunction(...args);
        setData(result);
        return result;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction],
  );

  const reset = React.useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return { loading, error, data, execute, reset };
};

// Network Status Hook
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
};

// Offline Indicator Component
export const OfflineIndicator = () => {
  const isOnline = useNetworkStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "#f59e0b",
            color: "white",
            padding: "8px 16px",
            textAlign: "center",
            zIndex: 9998,
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          📡 You're currently offline. Some features may not work properly.
        </motion.div>
      )}
    </AnimatePresence>
  );
};

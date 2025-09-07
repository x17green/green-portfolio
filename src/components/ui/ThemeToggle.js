import React from "react";
import { Fab, Tooltip, useTheme, useMediaQuery } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeMode } from "../../theme/ThemeContext";

const ThemeToggle = () => {
  const { toggleMode, isDark } = useThemeMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const fabVariants = {
    initial: { scale: 0, rotate: 180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  const iconVariants = {
    initial: { opacity: 0, rotate: -90 },
    animate: {
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      rotate: 90,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <Tooltip
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      placement="left"
      arrow
    >
      <motion.div
        style={{
          position: "fixed",
          bottom: isMobile ? 80 : 32,
          right: isMobile ? 16 : 32,
          zIndex: 1000,
        }}
        variants={fabVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
      >
        <Fab
          onClick={toggleMode}
          sx={{
            width: isMobile ? 48 : 56,
            height: isMobile ? 48 : 56,
            background: isDark
              ? "linear-gradient(45deg, #1976d2 30%, #00e676 90%)"
              : "linear-gradient(45deg, #00e676 30%, #1976d2 90%)",
            color: "white",
            boxShadow: isDark
              ? "0px 8px 24px rgba(25, 118, 210, 0.3)"
              : "0px 8px 24px rgba(0, 230, 118, 0.3)",
            border: isDark
              ? "2px solid rgba(25, 118, 210, 0.2)"
              : "2px solid rgba(0, 230, 118, 0.2)",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              background: isDark
                ? "linear-gradient(45deg, #00e676 30%, #1976d2 90%)"
                : "linear-gradient(45deg, #1976d2 30%, #00e676 90%)",
              boxShadow: isDark
                ? "0px 12px 32px rgba(0, 230, 118, 0.4)"
                : "0px 12px 32px rgba(25, 118, 210, 0.4)",
              transform: "translateY(-2px)",
            },
            "&:active": {
              transform: "translateY(0px)",
            },
          }}
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="light-icon"
                variants={iconVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <LightMode sx={{ fontSize: isMobile ? 20 : 24 }} />
              </motion.div>
            ) : (
              <motion.div
                key="dark-icon"
                variants={iconVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <DarkMode sx={{ fontSize: isMobile ? 20 : 24 }} />
              </motion.div>
            )}
          </AnimatePresence>
        </Fab>
      </motion.div>
    </Tooltip>
  );
};

export default ThemeToggle;

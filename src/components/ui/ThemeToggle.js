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
            backgroundColor: isDark ? "#64ffda" : "#00695c",
            color: isDark ? "#000000" : "#ffffff",
            boxShadow: isDark
              ? "0px 6px 20px rgba(0, 0, 0, 0.15)"
              : "0px 6px 20px rgba(0, 0, 0, 0.1)",
            border: `2px solid ${
              isDark ? "rgba(100, 255, 218, 0.2)" : "rgba(0, 105, 92, 0.2)"
            }`,
            backdropFilter: "blur(12px)",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              backgroundColor: isDark ? "#4fd1c7" : "#004d40",
              boxShadow: isDark
                ? "0px 8px 25px rgba(0, 0, 0, 0.2)"
                : "0px 8px 25px rgba(0, 0, 0, 0.15)",
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

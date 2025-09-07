import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;

      if (scrollHeight > 0) {
        const progress = (scrolled / scrollHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      } else {
        setScrollProgress(0);
      }
    };

    const handleScroll = () => {
      updateScrollProgress();
    };

    // Initial calculation
    updateScrollProgress();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "3px",
        width: `${scrollProgress}%`,
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "linear-gradient(90deg, #64ffda, #4fd1c7, #26a69a)"
            : "linear-gradient(90deg, #1e3a8a, #0d47a1, #1565c0)",
        zIndex: 9999,
        transition: "width 0.1s ease-out",
        opacity: scrollProgress > 0 ? 1 : 0,
      }}
    />
  );
};

export default ScrollProgress;

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Code as CodeIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigationItems = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const drawer = (
    <Box
      sx={{ width: 250, height: "100%", backgroundColor: "background.paper" }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <IconButton onClick={handleDrawerToggle} color="inherit">
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navigationItems.map((item) => (
          <ListItem
            button
            key={item.label}
            onClick={() => handleNavClick(item.href)}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(0, 230, 118, 0.1)",
              },
            }}
          >
            <ListItemText
              primary={item.label}
              sx={{
                "& .MuiTypography-root": {
                  fontWeight: 500,
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: scrolled
            ? "rgba(10, 10, 10, 0.95)"
            : "rgba(10, 10, 10, 0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(0, 230, 118, 0.2)"
            : "1px solid rgba(255, 255, 255, 0.05)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CodeIcon sx={{ color: "primary.main", fontSize: 28 }} />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    background: "linear-gradient(45deg, #00e676, #1976d2)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "1.25rem",
                  }}
                >
                  AI Engineer Portfolio
                </Typography>
              </Box>
            </motion.div>

            {!isMobile ? (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <Button
                        onClick={() => handleNavClick(item.href)}
                        sx={{
                          color: "text.primary",
                          textTransform: "none",
                          fontWeight: 500,
                          borderRadius: 2,
                          px: 2,
                          py: 1,
                          position: "relative",
                          overflow: "hidden",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "0%",
                            height: "2px",
                            background:
                              "linear-gradient(45deg, #00e676, #1976d2)",
                            transition: "width 0.3s ease-in-out",
                          },
                          "&:hover": {
                            backgroundColor: "rgba(0, 230, 118, 0.1)",
                            "&::before": {
                              width: "100%",
                            },
                          },
                        }}
                      >
                        {item.label}
                      </Button>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            ) : (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  color: "primary.main",
                  border: "1px solid rgba(0, 230, 118, 0.3)",
                  borderRadius: 2,
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "background.paper",
            backgroundImage: "none",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;

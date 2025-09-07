import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Link,
  Divider,
} from "@mui/material";
import {
  GitHub,
  LinkedIn,
  Twitter,
  Email,
  Phone,
  LocationOn,
  Favorite,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    {
      icon: <GitHub />,
      href: "https://github.com/yourusername",
      label: "GitHub",
    },
    {
      icon: <LinkedIn />,
      href: "https://linkedin.com/in/yourusername",
      label: "LinkedIn",
    },
    {
      icon: <Twitter />,
      href: "https://twitter.com/yourusername",
      label: "Twitter",
    },
    {
      icon: <Email />,
      href: "mailto:your.email@example.com",
      label: "Email",
    },
  ];

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.paper",
        backgroundImage:
          "linear-gradient(135deg, rgba(0, 230, 118, 0.05) 0%, rgba(25, 118, 210, 0.05) 100%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        pt: 6,
        pb: 3,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid size={{ xs:12, md:4 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  background: "linear-gradient(45deg, #00e676, #1976d2)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                }}
              >
                AI Engineer Portfolio
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3, lineHeight: 1.6 }}
              >
                Passionate AI Engineer specializing in prompt engineering,
                machine learning, and cutting-edge artificial intelligence
                solutions. Building the future, one algorithm at a time.
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOn sx={{ color: "primary.main", fontSize: 18 }} />
                  <Typography variant="body2" color="text.secondary">
                    San Francisco, CA
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Phone sx={{ color: "primary.main", fontSize: 18 }} />
                  <Typography variant="body2" color="text.secondary">
                    +1 (555) 123-4567
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Email sx={{ color: "primary.main", fontSize: 18 }} />
                  <Typography variant="body2" color="text.secondary">
                    hello@aiportfolio.dev
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs:12, md:4 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "primary.main",
                  mb: 2,
                }}
              >
                Quick Links
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {quickLinks.map((link, index) => (
                  <Link
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    sx={{
                      color: "text.secondary",
                      textDecoration: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease-in-out",
                      display: "inline-block",
                      "&:hover": {
                        color: "primary.main",
                        transform: "translateX(5px)",
                      },
                    }}
                  >
                    <Typography variant="body2">{link.label}</Typography>
                  </Link>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Social Links & Newsletter */}
          <Grid size={{ xs:12, md:4 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "primary.main",
                  mb: 2,
                }}
              >
                Connect With Me
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3, lineHeight: 1.6 }}
              >
                Let's collaborate on AI projects and share insights about the
                future of artificial intelligence.
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      onClick={() => handleNavClick(social.href)}
                      sx={{
                        color: "text.secondary",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: 2,
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          color: "primary.main",
                          borderColor: "primary.main",
                          backgroundColor: "rgba(0, 230, 118, 0.1)",
                          transform: "translateY(-2px)",
                        },
                      }}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: 4,
            borderColor: "rgba(255, 255, 255, 0.1)",
          }}
        />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              © {new Date().getFullYear()} AI Engineer Portfolio. Made with
              <Favorite sx={{ color: "primary.main", fontSize: 16 }} />
              and cutting-edge AI technology.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Designed for the future of AI
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;

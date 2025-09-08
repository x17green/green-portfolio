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
import { Favorite } from "@mui/icons-material";
import { motion } from "framer-motion";
import personalData from "../../data/personal";
import {
  trackSocialClick,
  trackContactForm,
  trackNavigation,
} from "../../utils/analytics";
import LineIcon from "../ui/LineIcon";

const Footer = () => {
  const socialLinks = [
    {
      icon: <LineIcon name="github" />,
      href: personalData.socialLinks.github,
      label: "GitHub",
    },
    {
      icon: <LineIcon name="linkedin" />,
      href: personalData.socialLinks.linkedin,
      label: "LinkedIn",
    },
    {
      icon: <LineIcon name="twitter" />,
      href: personalData.socialLinks.twitter,
      label: "Twitter",
    },
    {
      icon: <LineIcon name="medium" />,
      href: personalData.socialLinks.medium,
      label: "Medium",
    },
    {
      icon: <LineIcon name="calendar" />,
      href: personalData.socialLinks.calendly,
      label: "Calendly",
    },
    {
      icon: <LineIcon name="email" />,
      href: `mailto:${personalData.email}`,
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

  const handleNavClick = (href, label = "") => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      // Track navigation analytics
      const sectionName = href.replace("#", "");
      trackNavigation(sectionName, "footer_click");
    } else if (href.startsWith("mailto:")) {
      // Track email click
      trackContactForm("email_click", {
        contactMethod: "footer_email",
        email: href.replace("mailto:", ""),
      });
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      // Track social media click
      const platform = label.toLowerCase();
      trackSocialClick(platform, href);
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
          <Grid size={{ xs: 12, md: 4 }}>
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
                {personalData.displayName}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3, lineHeight: 1.6 }}
              >
                {personalData.bio.medium}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LineIcon
                    name="location"
                    sx={{ color: "primary.main", fontSize: 18 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {personalData.location}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LineIcon
                    name="phone"
                    sx={{ color: "primary.main", fontSize: 18 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {personalData.phone}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LineIcon
                    name="email"
                    sx={{ color: "primary.main", fontSize: 18 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {personalData.email}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, md: 4 }}>
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
                    onClick={() => handleNavClick(link.href, link.label)}
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
          <Grid size={{ xs: 12, md: 4 }}>
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
                Let's collaborate on AI projects, schedule a consultation, and
                share insights about the future of artificial intelligence and
                software engineering.
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      onClick={() => handleNavClick(social.href, social.label)}
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
              © {new Date().getFullYear()} {personalData.displayName}. Made
              with
              <Favorite sx={{ color: "primary.main", fontSize: 16 }} />
              and cutting-edge AI technology.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {personalData.title}
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;

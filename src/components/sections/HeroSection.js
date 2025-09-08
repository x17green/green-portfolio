import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Avatar,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Download,
  Email,
  PlayArrow,
  Psychology,
  AutoAwesome,
  Rocket,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import personalData from "../../data/personal";
import { trackResumeDownload } from "../../utils/analytics";

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const skills = personalData.expertise;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <Box
      id="hero"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background:
          theme.palette.mode === "dark"
            ? `
            radial-gradient(circle at 20% 50%, rgba(100, 255, 218, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(129, 140, 248, 0.03) 0%, transparent 50%)
          `
            : `
            radial-gradient(circle at 20% 50%, rgba(0, 105, 92, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(63, 81, 181, 0.02) 0%, transparent 50%)
          `,
        position: "relative",
        overflow: "hidden",
        pt: { xs: 8, md: 0 },
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "10%",
          width: 100,
          height: 100,
          borderRadius: "50%",
          background:
            theme.palette.mode === "dark"
              ? "radial-gradient(circle, rgba(100, 255, 218, 0.04) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(0, 105, 92, 0.03) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        component={motion.div}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: "20%",
          left: "5%",
          width: 80,
          height: 80,
          borderRadius: "50%",
          background:
            theme.palette.mode === "dark"
              ? "radial-gradient(circle, rgba(129, 140, 248, 0.04) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(63, 81, 181, 0.03) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        component={motion.div}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 8 }}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <Psychology sx={{ color: "primary.main", fontSize: 28 }} />
                  <Typography
                    variant="body1"
                    sx={{
                      color: "primary.main",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: 1.2,
                      fontSize: "0.9rem",
                    }}
                  >
                    {personalData.title}
                  </Typography>
                </Box>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant={isMobile ? "h3" : "h1"}
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: "text.primary",
                    lineHeight: 1.1,
                    "& .highlight": {
                      color: "primary.main",
                      fontWeight: 800,
                    },
                  }}
                >
                  Building the Future with{" "}
                  <Box component="span" className="highlight">
                    Artificial Intelligence
                  </Box>
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 400,
                    mb: 4,
                    lineHeight: 1.7,
                    maxWidth: "600px",
                    fontSize: "1.125rem",
                  }}
                >
                  {personalData.bio.medium}
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    >
                      <Chip
                        label={skill}
                        sx={{
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? "rgba(100, 255, 218, 0.1)"
                              : "rgba(0, 105, 92, 0.1)",
                          color: "primary.main",
                          border: `1px solid ${
                            theme.palette.mode === "dark"
                              ? "rgba(100, 255, 218, 0.2)"
                              : "rgba(0, 105, 92, 0.2)"
                          }`,
                          fontWeight: 500,
                          fontSize: "0.875rem",
                          "&:hover": {
                            backgroundColor:
                              theme.palette.mode === "dark"
                                ? "rgba(100, 255, 218, 0.15)"
                                : "rgba(0, 105, 92, 0.15)",
                            transform: "translateY(-1px)",
                          },
                          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      />
                    </motion.div>
                  ))}
                </Box>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                    alignItems: { xs: "stretch", sm: "center" },
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    href="#contact"
                    startIcon={<Email />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 600,
                      borderRadius: 2,
                    }}
                  >
                    Get In Touch
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    href={personalData.resume.downloadUrl}
                    download={personalData.resume.filename}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<Download />}
                    onClick={() =>
                      trackResumeDownload(
                        personalData.resume.filename,
                        "hero_button_click",
                      )
                    }
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 600,
                      borderRadius: 2,
                    }}
                  >
                    Download Resume
                  </Button>
                </Box>
              </motion.div>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Animated Avatar Container */}
                <motion.div animate={floatingAnimation}>
                  <Box
                    sx={{
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: -20,
                        left: -20,
                        right: -20,
                        bottom: -20,
                        borderRadius: "50%",
                        background:
                          theme.palette.mode === "dark"
                            ? "radial-gradient(circle, rgba(100, 255, 218, 0.08) 0%, transparent 70%)"
                            : "radial-gradient(circle, rgba(0, 105, 92, 0.06) 0%, transparent 70%)",
                        filter: "blur(25px)",
                        zIndex: -1,
                      },
                    }}
                  >
                    <Avatar
                      src={personalData.heroImage}
                      alt="AI Engineer"
                      sx={{
                        width: { xs: 250, md: 300 },
                        height: { xs: 250, md: 300 },
                        border: `3px solid ${
                          theme.palette.mode === "dark"
                            ? "rgba(100, 255, 218, 0.2)"
                            : "rgba(0, 105, 92, 0.2)"
                        }`,
                        boxShadow:
                          theme.palette.mode === "dark"
                            ? "0px 20px 40px rgba(0, 0, 0, 0.3)"
                            : "0px 20px 40px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </Box>
                </motion.div>

                {/* Floating Icons */}
                <motion.div
                  style={{
                    position: "absolute",
                    top: "5%",
                    right: "5%",
                  }}
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(100, 255, 218, 0.1)"
                          : "rgba(0, 105, 92, 0.1)",
                      border: `2px solid ${
                        theme.palette.mode === "dark"
                          ? "rgba(100, 255, 218, 0.2)"
                          : "rgba(0, 105, 92, 0.2)"
                      }`,
                      borderRadius: "50%",
                      p: 2,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <AutoAwesome sx={{ color: "primary.main", fontSize: 32 }} />
                  </Box>
                </motion.div>

                <motion.div
                  style={{
                    position: "absolute",
                    bottom: "10%",
                    left: "5%",
                  }}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(129, 140, 248, 0.1)"
                          : "rgba(63, 81, 181, 0.1)",
                      border: `2px solid ${
                        theme.palette.mode === "dark"
                          ? "rgba(129, 140, 248, 0.2)"
                          : "rgba(63, 81, 181, 0.2)"
                      }`,
                      borderRadius: "50%",
                      p: 2,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Rocket sx={{ color: "secondary.main", fontSize: 28 }} />
                  </Box>
                </motion.div>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          style={{
            position: "absolute",
            bottom: 30,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
              }}
              onClick={() => {
                document
                  .querySelector("#about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Scroll to explore
              </Typography>
              <PlayArrow
                sx={{
                  color: "primary.main",
                  fontSize: 24,
                  transform: "rotate(90deg)",
                }}
              />
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HeroSection;

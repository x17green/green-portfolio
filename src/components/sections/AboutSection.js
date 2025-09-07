import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Psychology,
  Code,
  AutoAwesome,
  Timeline,
  School,
  WorkspacePremium,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import personalData from "../../data/personal";

const AboutSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const stats = [
    {
      label: "Years of Experience",
      value: `${personalData.stats.yearsExperience}+`,
      icon: <Timeline />,
    },
    {
      label: "Projects Completed",
      value: `${personalData.stats.projectsCompleted}+`,
      icon: <AutoAwesome />,
    },
    {
      label: "AI Models Deployed",
      value: `${personalData.stats.modelsDeployed}`,
      icon: <Psychology />,
    },
    // { label: "Lines of Code", value: "100K+", icon: <Code /> },
  ];

  const certifications = personalData.about.certifications;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <Box
      id="about"
      sx={{
        py: { xs: 8, md: 12 },
        background:
          "linear-gradient(135deg, rgba(0, 230, 118, 0.02) 0%, rgba(25, 118, 210, 0.02) 100%)",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: "center", mb: 8 }}>
              <Typography
                variant="h6"
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  mb: 2,
                }}
              >
              {personalData.about.heading}
              </Typography>
              <Typography
                variant={isMobile ? "h4" : "h3"}
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  background: "linear-gradient(45deg, #ffffff, #00e676)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {personalData.about.subheading}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  maxWidth: "800px",
                  mx: "auto",
                  lineHeight: 1.6,
                }}
              >
                {personalData.about.tagline}
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={4}>
            {/* Main About Content */}
            <Grid size={{ xs: 12, md: 8 }}>
              <motion.div variants={itemVariants}>
                <Card
                  sx={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: 3,
                    p: 3,
                    height: "100%",
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 3,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 60,
                          height: 60,
                          background:
                            "linear-gradient(45deg, #00e676, #1976d2)",
                        }}
                      >
                        <Psychology sx={{ fontSize: 32 }} />
                      </Avatar>
                      <Box>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          {personalData.fullName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {personalData.title}
                        </Typography>
                      </Box>
                    </Box>

                    {personalData.about.content.map((paragraph, index) => (
                      <Typography
                        key={index}
                        variant="body1"
                        sx={{
                          color: "text.secondary",
                          lineHeight: 1.8,
                          mb: 3,
                        }}
                      >
                        {paragraph}
                      </Typography>
                    ))}

                    {/* Certifications */}
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <WorkspacePremium sx={{ color: "primary.main" }} />
                        Certifications
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {certifications.map((cert, index) => (
                          <motion.div
                            key={cert}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <Chip
                              label={cert}
                              size="small"
                              sx={{
                                backgroundColor: "rgba(25, 118, 210, 0.1)",
                                color: "secondary.main",
                                border: "1px solid rgba(25, 118, 210, 0.3)",
                                fontWeight: 500,
                                "&:hover": {
                                  backgroundColor: "rgba(25, 118, 210, 0.2)",
                                },
                              }}
                            />
                          </motion.div>
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Stats Cards */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      sx={{
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: 3,
                        p: 2,
                        textAlign: "center",
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0px 8px 24px rgba(0, 230, 118, 0.2)",
                          border: "1px solid rgba(0, 230, 118, 0.3)",
                        },
                      }}
                    >
                      <CardContent sx={{ p: 0 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            mb: 2,
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 48,
                              height: 48,
                              background: `linear-gradient(45deg, ${
                                index % 2 === 0 ? "#00e676" : "#1976d2"
                              }, ${index % 2 === 0 ? "#1976d2" : "#00e676"})`,
                            }}
                          >
                            {stat.icon}
                          </Avatar>
                        </Box>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            mb: 1,
                            background:
                              "linear-gradient(45deg, #00e676, #1976d2)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {stat.value}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontWeight: 500 }}
                        >
                          {stat.label}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Box>
            </Grid>
          </Grid>

          {/* Core Values */}
          <motion.div variants={itemVariants}>
            <Box sx={{ mt: 8 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 4,
                  textAlign: "center",
                  background: "linear-gradient(45deg, #ffffff, #00e676)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Professional Values
              </Typography>
              <Grid container spacing={3}>
                {[
                  {
                    title: "Innovation & Continuous Learning",
                    description:
                      "Always exploring cutting-edge technologies and methodologies to solve complex problems.",
                    icon: <AutoAwesome />,
                  },
                  {
                    title: "Ethical AI Development",
                    description:
                      "Committed to developing responsible AI systems that benefit humanity and respect privacy.",
                    icon: <Psychology />,
                  },
                  {
                    title: "Collaborative Problem Solving",
                    description:
                      "Working together with diverse teams to create innovative solutions that make a real impact.",
                    icon: <School />,
                  },
                ].map((value, index) => (
                  <Grid size={{ xs: 12, md: 4 }} key={value.title}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <Card
                        sx={{
                          background: "rgba(255, 255, 255, 0.03)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          borderRadius: 3,
                          p: 3,
                          textAlign: "center",
                          height: "100%",
                          transition: "all 0.3s ease-in-out",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            border: "1px solid rgba(0, 230, 118, 0.2)",
                          },
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 56,
                            height: 56,
                            mx: "auto",
                            mb: 2,
                            background:
                              "linear-gradient(45deg, #00e676, #1976d2)",
                          }}
                        >
                          {value.icon}
                        </Avatar>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, mb: 2 }}
                        >
                          {value.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ lineHeight: 1.6 }}
                        >
                          {value.description}
                        </Typography>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AboutSection;

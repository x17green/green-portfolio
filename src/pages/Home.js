import React from "react";
import { Box } from "@mui/material";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import ContactSection from "../components/sections/ContactSection";
import { usePageSEO } from "../hooks/useSEO";

const Home = () => {
  // Initialize SEO for home page
  usePageSEO("home");

  return (
    <Box>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </Box>
  );
};

export default Home;

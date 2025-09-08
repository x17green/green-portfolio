import { Box } from '@mui/material';
import AboutSection from '../components/sections/AboutSection';
import ContactSection from '../components/sections/ContactSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import HeroSection from '../components/sections/HeroSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import SkillsSection from '../components/sections/SkillsSection';
import { usePageSEO } from '../hooks/useSEO';

const Home = () => {
  // Initialize SEO for home page
  usePageSEO('home');

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

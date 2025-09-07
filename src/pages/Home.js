import React from 'react';
import { Box } from '@mui/material';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';

const Home = () => {
  return (
    <Box>
      <HeroSection />
      <AboutSection />
    </Box>
  );
};

export default Home;

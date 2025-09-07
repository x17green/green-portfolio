import React from 'react';
import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';

// Individual skeleton components
const SkeletonBar = ({ width = '100%', height = 20, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0.6 }}
    animate={{ opacity: [0.6, 0.3, 0.6] }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    }}
    style={{
      width,
      height,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '4px',
      marginBottom: '8px',
    }}
  />
);

const SkeletonCircle = ({ size = 40, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0.6 }}
    animate={{ opacity: [0.6, 0.3, 0.6] }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    }}
    style={{
      width: size,
      height: size,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '50%',
    }}
  />
);

// Header Skeleton
const HeaderSkeleton = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '80px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      px: 3,
    }}
  >
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Logo skeleton */}
        <SkeletonBar width="120px" height="32px" />

        {/* Navigation skeleton */}
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <SkeletonBar width="60px" height="20px" delay={0.1} />
          <SkeletonBar width="70px" height="20px" delay={0.2} />
          <SkeletonBar width="80px" height="20px" delay={0.3} />
          <SkeletonBar width="90px" height="20px" delay={0.4} />
          <SkeletonBar width="70px" height="20px" delay={0.5} />
        </Box>
      </Box>
    </Container>
  </Box>
);

// Hero Section Skeleton
const HeroSkeleton = () => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      pt: '80px',
      background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)',
    }}
  >
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 6,
          alignItems: 'center',
        }}
      >
        {/* Left side - Text content */}
        <Box>
          <SkeletonBar width="80px" height="16px" />
          <Box sx={{ mt: 2, mb: 3 }}>
            <SkeletonBar width="100%" height="48px" delay={0.1} />
            <SkeletonBar width="90%" height="48px" delay={0.2} />
          </Box>
          <SkeletonBar width="100%" height="16px" delay={0.3} />
          <SkeletonBar width="85%" height="16px" delay={0.4} />
          <SkeletonBar width="70%" height="16px" delay={0.5} />

          {/* Skill chips skeleton */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 4, mb: 4 }}>
            {[60, 80, 70, 90, 65, 75].map((width, index) => (
              <SkeletonBar
                key={index}
                width={`${width}px`}
                height="32px"
                delay={0.6 + index * 0.1}
              />
            ))}
          </Box>

          {/* CTA buttons skeleton */}
          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <SkeletonBar width="140px" height="44px" delay={0.8} />
            <SkeletonBar width="120px" height="44px" delay={0.9} />
          </Box>
        </Box>

        {/* Right side - Profile image */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0.6 }}
            animate={{ opacity: [0.6, 0.3, 0.6] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            style={{
              width: '300px',
              height: '300px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              border: '4px solid rgba(255, 255, 255, 0.2)',
            }}
          />
        </Box>
      </Box>
    </Container>
  </Box>
);

// Section Header Skeleton
const SectionHeaderSkeleton = ({ delay = 0 }) => (
  <Box sx={{ textAlign: 'center', mb: 8 }}>
    <SkeletonBar width="200px" height="40px" delay={delay} />
    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <SkeletonBar width="500px" height="16px" delay={delay + 0.1} />
      <SkeletonBar width="400px" height="16px" delay={delay + 0.2} />
    </Box>
  </Box>
);

// Skills Section Skeleton
const SkillsSkeleton = () => (
  <Box sx={{ py: 8, backgroundColor: 'rgba(0, 0, 0, 0.02)' }}>
    <Container maxWidth="lg">
      <SectionHeaderSkeleton delay={1.2} />

      {/* Filter buttons skeleton */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 6 }}>
        {['All', 'Frontend', 'Backend', 'AI/ML', 'Tools'].map((_, index) => (
          <SkeletonBar
            key={index}
            width="80px"
            height="36px"
            delay={1.3 + index * 0.1}
          />
        ))}
      </Box>

      {/* Skills grid skeleton */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr' },
          gap: 3,
        }}
      >
        {Array.from({ length: 12 }, (_, index) => (
          <Box
            key={index}
            sx={{
              p: 3,
              borderRadius: 2,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SkeletonCircle size={40} delay={1.8 + index * 0.05} />
              <Box sx={{ ml: 2, flex: 1 }}>
                <SkeletonBar width="70%" height="16px" delay={1.8 + index * 0.05} />
                <SkeletonBar width="50%" height="12px" delay={1.9 + index * 0.05} />
              </Box>
            </Box>
            <SkeletonBar width="100%" height="8px" delay={2 + index * 0.05} />
          </Box>
        ))}
      </Box>
    </Container>
  </Box>
);

// Projects Section Skeleton
const ProjectsSkeleton = () => (
  <Box sx={{ py: 8 }}>
    <Container maxWidth="lg">
      <SectionHeaderSkeleton delay={2.5} />

      {/* Filter buttons skeleton */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 6 }}>
        {['All', 'AI/ML', 'Web Apps', 'Mobile', 'APIs'].map((_, index) => (
          <SkeletonBar
            key={index}
            width="70px"
            height="36px"
            delay={2.6 + index * 0.1}
          />
        ))}
      </Box>

      {/* Projects grid skeleton */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' },
          gap: 4,
        }}
      >
        {Array.from({ length: 6 }, (_, index) => (
          <Box
            key={index}
            sx={{
              borderRadius: 2,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              overflow: 'hidden',
            }}
          >
            {/* Project image skeleton */}
            <motion.div
              initial={{ opacity: 0.6 }}
              animate={{ opacity: [0.6, 0.3, 0.6] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 3 + index * 0.1,
              }}
              style={{
                width: '100%',
                height: '200px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />

            {/* Project content skeleton */}
            <Box sx={{ p: 3 }}>
              <SkeletonBar width="80%" height="20px" delay={3.1 + index * 0.1} />
              <Box sx={{ mt: 2 }}>
                <SkeletonBar width="100%" height="14px" delay={3.2 + index * 0.1} />
                <SkeletonBar width="90%" height="14px" delay={3.3 + index * 0.1} />
                <SkeletonBar width="60%" height="14px" delay={3.4 + index * 0.1} />
              </Box>

              {/* Tech stack skeleton */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
                {[40, 50, 45, 60].map((width, techIndex) => (
                  <SkeletonBar
                    key={techIndex}
                    width={`${width}px`}
                    height="24px"
                    delay={3.5 + index * 0.1 + techIndex * 0.05}
                  />
                ))}
              </Box>

              {/* Action buttons skeleton */}
              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <SkeletonBar width="80px" height="36px" delay={3.6 + index * 0.1} />
                <SkeletonBar width="80px" height="36px" delay={3.7 + index * 0.1} />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  </Box>
);

// Experience Section Skeleton
const ExperienceSkeleton = () => (
  <Box sx={{ py: 8, backgroundColor: 'rgba(0, 0, 0, 0.02)' }}>
    <Container maxWidth="lg">
      <SectionHeaderSkeleton delay={4} />

      {/* Timeline skeleton */}
      <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
        {Array.from({ length: 4 }, (_, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              mb: 6,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                left: '20px',
                top: '40px',
                bottom: index === 3 ? 'auto' : '-24px',
                width: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            {/* Timeline dot */}
            <Box sx={{ mr: 4, mt: 1 }}>
              <SkeletonCircle size={40} delay={4.2 + index * 0.2} />
            </Box>

            {/* Experience content */}
            <Box sx={{ flex: 1 }}>
              <SkeletonBar width="60%" height="20px" delay={4.3 + index * 0.2} />
              <SkeletonBar width="40%" height="16px" delay={4.4 + index * 0.2} />
              <SkeletonBar width="30%" height="14px" delay={4.5 + index * 0.2} />

              <Box sx={{ mt: 2 }}>
                <SkeletonBar width="100%" height="14px" delay={4.6 + index * 0.2} />
                <SkeletonBar width="90%" height="14px" delay={4.7 + index * 0.2} />
                <SkeletonBar width="70%" height="14px" delay={4.8 + index * 0.2} />
              </Box>

              {/* Skills tags skeleton */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {[50, 60, 45, 70, 55].map((width, skillIndex) => (
                  <SkeletonBar
                    key={skillIndex}
                    width={`${width}px`}
                    height="24px"
                    delay={4.9 + index * 0.2 + skillIndex * 0.05}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  </Box>
);

// Contact Section Skeleton
const ContactSkeleton = () => (
  <Box sx={{ py: 8 }}>
    <Container maxWidth="lg">
      <SectionHeaderSkeleton delay={5} />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 6,
        }}
      >
        {/* Contact info skeleton */}
        <Box>
          <SkeletonBar width="200px" height="24px" delay={5.2} />
          <Box sx={{ mt: 3, space: 2 }}>
            {Array.from({ length: 3 }, (_, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <SkeletonCircle size={24} delay={5.3 + index * 0.1} />
                <Box sx={{ ml: 2 }}>
                  <SkeletonBar width="150px" height="16px" delay={5.4 + index * 0.1} />
                </Box>
              </Box>
            ))}
          </Box>

          {/* Social links skeleton */}
          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            {Array.from({ length: 4 }, (_, index) => (
              <SkeletonCircle key={index} size={48} delay={5.7 + index * 0.1} />
            ))}
          </Box>
        </Box>

        {/* Contact form skeleton */}
        <Box>
          <SkeletonBar width="150px" height="20px" delay={5.8} />
          <Box sx={{ mt: 3, space: 3 }}>
            <SkeletonBar width="100%" height="56px" delay={5.9} />
            <SkeletonBar width="100%" height="56px" delay={6} />
            <SkeletonBar width="100%" height="120px" delay={6.1} />
            <SkeletonBar width="120px" height="44px" delay={6.2} />
          </Box>
        </Box>
      </Box>
    </Container>
  </Box>
);

// Footer Skeleton
const FooterSkeleton = () => (
  <Box
    sx={{
      py: 6,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    }}
  >
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
          gap: 4,
          mb: 4,
        }}
      >
        {/* Footer sections skeleton */}
        {Array.from({ length: 3 }, (_, index) => (
          <Box key={index}>
            <SkeletonBar width="120px" height="18px" delay={6.5 + index * 0.1} />
            <Box sx={{ mt: 2 }}>
              {Array.from({ length: 4 }, (_, linkIndex) => (
                <SkeletonBar
                  key={linkIndex}
                  width="80px"
                  height="14px"
                  delay={6.6 + index * 0.1 + linkIndex * 0.05}
                />
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Copyright skeleton */}
      <Box sx={{ textAlign: 'center', pt: 4, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <SkeletonBar width="300px" height="14px" delay={7} />
      </Box>
    </Container>
  </Box>
);

// Main Page Skeleton Component
const PageSkeleton = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        color: 'white',
        overflow: 'hidden',
      }}
    >
      <HeaderSkeleton />
      <HeroSkeleton />
      <SkillsSkeleton />
      <ProjectsSkeleton />
      <ExperienceSkeleton />
      <ContactSkeleton />
      <FooterSkeleton />
    </Box>
  );
};

export default PageSkeleton;

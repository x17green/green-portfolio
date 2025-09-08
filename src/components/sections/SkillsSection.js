import {
  FilterList,
  Psychology,
  Code,
  Build,
  EmojiObjects,
} from '@mui/icons-material';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  ButtonGroup,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { skillsData, skillCategories } from '../../data/skills';
import SkillCard from '../ui/SkillCard';

const SkillsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categoryIcons = {
    'AI & Machine Learning': <Psychology />,
    'Technical Skills': <Code />,
    'Tools & Platforms': <Build />,
    'Soft Skills': <EmojiObjects />,
  };

  const filteredSkills =
    selectedCategory === 'All'
      ? skillsData
      : skillsData.filter(skill => {
          const category = skillCategories.find(cat =>
            cat.skills.some(s => s.skill === skill.skill)
          );
          return category?.name === selectedCategory;
        });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const filterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  return (
    <Box
      id="skills"
      sx={{
        py: { xs: 8, md: 12 },
        background:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(25, 118, 210, 0.02) 0%, rgba(0, 230, 118, 0.02) 100%)'
            : 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(0, 230, 118, 0.05) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '5%',
          width: 120,
          height: 120,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(0, 230, 118, 0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        component={motion.div}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(25, 118, 210, 0.1) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
        component={motion.div}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h6"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 2,
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                <FilterList />
                Skills & Expertise
              </Typography>
              <Typography
                variant={isMobile ? 'h4' : 'h3'}
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  background:
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(45deg, #ffffff, #00e676)'
                      : 'linear-gradient(45deg, #333333, #00e676)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Technical Proficiency
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                A comprehensive overview of my technical skills, AI expertise,
                and professional capabilities developed through years of
                hands-on experience and continuous learning.
              </Typography>
            </Box>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 6,
                overflow: 'auto',
                pb: 1,
              }}
            >
              <ButtonGroup
                variant="outlined"
                sx={{
                  flexWrap: isMobile ? 'wrap' : 'nowrap',
                  gap: isMobile ? 1 : 0,
                  '& .MuiButton-root': {
                    borderColor: 'rgba(0, 230, 118, 0.3)',
                    color: 'text.secondary',
                    textTransform: 'none',
                    fontWeight: 500,
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'rgba(0, 230, 118, 0.1)',
                    },
                  },
                }}
              >
                {['All', ...skillCategories.map(cat => cat.name)].map(
                  category => (
                    <Button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      sx={{
                        backgroundColor:
                          selectedCategory === category
                            ? 'rgba(0, 230, 118, 0.2)'
                            : 'transparent',
                        color:
                          selectedCategory === category
                            ? 'primary.main'
                            : 'text.secondary',
                        borderColor:
                          selectedCategory === category
                            ? 'primary.main'
                            : 'rgba(0, 230, 118, 0.3)',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 230, 118, 0.1)',
                          borderColor: 'primary.main',
                        },
                      }}
                      startIcon={
                        category !== 'All' ? categoryIcons[category] : null
                      }
                    >
                      {category}
                    </Button>
                  )
                )}
              </ButtonGroup>
            </Box>
          </motion.div>

          {/* Skills Grid */}
          <motion.div variants={itemVariants}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                variants={filterVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Grid container spacing={3}>
                  {filteredSkills.map((skill, index) => (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={skill.skill}>
                      <SkillCard
                        skill={skill.skill}
                        level={skill.level}
                        icon={skill.icon}
                        description={skill.description}
                        category={skill.category}
                        delay={index * 0.1}
                      />
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Skills Summary */}
          <motion.div variants={itemVariants}>
            <Box sx={{ mt: 8, textAlign: 'center' }}>
              <Grid container spacing={4}>
                {skillCategories.map((category, index) => (
                  <Grid size={{ xs: 6, md: 3 }} key={category.name}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Box
                        sx={{
                          p: 3,
                          borderRadius: 3,
                          background:
                            theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.03)'
                              : 'rgba(255, 255, 255, 0.7)',
                          backdropFilter: 'blur(10px)',
                          border:
                            theme.palette.mode === 'dark'
                              ? '1px solid rgba(255, 255, 255, 0.08)'
                              : '1px solid rgba(0, 0, 0, 0.08)',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            border: '1px solid rgba(0, 230, 118, 0.3)',
                          },
                        }}
                      >
                        <Box sx={{ mb: 2 }}>
                          {categoryIcons[category.name] &&
                            React.cloneElement(categoryIcons[category.name], {
                              sx: { fontSize: 32, color: category.color },
                            })}
                        </Box>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            mb: 1,
                            color: category.color,
                          }}
                        >
                          {category.skills.length}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontWeight: 500 }}
                        >
                          {category.name.replace(' & ', '\n& ')}
                        </Typography>
                      </Box>
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

export default SkillsSection;

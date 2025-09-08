import {
  Work,
  School,
  EmojiEvents,
  LocationOn,
  CalendarToday,
  TrendingUp,
  ExpandMore,
  Business,
  CheckCircle,
} from '@mui/icons-material';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  Tab,
  Tabs,
  useTheme,
  useMediaQuery,
  IconButton,
  Collapse,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  experienceData,
  educationData,
  certificationsData,
  experienceStats,
} from '../../data/experience';
import { trackEvent } from '../../utils/analytics';

const ExperienceSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedTab, setSelectedTab] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);

    // Track tab change analytics
    const tabNames = ['experience', 'education', 'certifications'];
    trackEvent('experience_tab_change', {
      category: 'section_navigation',
      label: tabNames[newValue],
      tab_index: newValue,
      tab_name: tabNames[newValue],
    });
  };

  const toggleCardExpansion = cardId => {
    const isExpanding = expandedCard !== cardId;
    setExpandedCard(expandedCard === cardId ? null : cardId);

    // Track card expansion analytics
    trackEvent('experience_card_expansion', {
      category: 'experience_engagement',
      label: `card_${cardId}`,
      action: isExpanding ? 'expand' : 'collapse',
      card_id: cardId,
    });
  };

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
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const ExperienceCard = ({ experience, index }) => (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
    >
      <Card
        sx={{
          background:
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          border:
            theme.palette.mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
          transition: 'all 0.3s ease-in-out',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-4px)',
            border: '1px solid rgba(0, 230, 118, 0.3)',
            boxShadow:
              theme.palette.mode === 'dark'
                ? '0px 16px 40px rgba(0, 230, 118, 0.2)'
                : '0px 16px 40px rgba(0, 230, 118, 0.15)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: experience.current
              ? 'linear-gradient(90deg, #00e676, #1976d2)'
              : 'linear-gradient(90deg, #1976d2, #00e676)',
          },
        }}
        onClick={() => {
          // Track experience card click
          trackEvent('experience_card_click', {
            category: 'experience_engagement',
            label: experience.company,
            company: experience.company,
            position: experience.title,
            card_index: index,
          });
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
              mb: 3,
            }}
          >
            <Avatar
              sx={{
                width: 60,
                height: 60,
                background: 'linear-gradient(45deg, #00e676, #1976d2)',
                mt: 0.5,
              }}
            >
              {experience.icon}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: 0.5,
                }}
              >
                {experience.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'primary.main',
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                {experience.company}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {experience.location}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CalendarToday
                    sx={{ fontSize: 16, color: 'text.secondary' }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {experience.duration}
                  </Typography>
                </Box>
                <Chip
                  label={experience.type}
                  size="small"
                  sx={{
                    backgroundColor: experience.current
                      ? 'rgba(0, 230, 118, 0.2)'
                      : 'rgba(25, 118, 210, 0.2)',
                    color: experience.current
                      ? 'primary.main'
                      : 'secondary.main',
                    fontWeight: 500,
                  }}
                />
              </Box>
            </Box>
            {experience.current && (
              <Chip
                label="Current"
                size="small"
                sx={{
                  backgroundColor: 'rgba(0, 230, 118, 0.2)',
                  color: 'primary.main',
                  fontWeight: 600,
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.7 },
                    '100%': { opacity: 1 },
                  },
                }}
              />
            )}
          </Box>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.7,
              mb: 3,
            }}
          >
            {experience.description}
          </Typography>

          {/* Highlights */}
          {experience.highlights && (
            <Box sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                {experience.highlights.map((highlight, index) => (
                  <Grid size={{ xs: 12, sm: 4 }} key={index}>
                    <Box
                      sx={{
                        textAlign: 'center',
                        p: 2,
                        borderRadius: 2,
                        background:
                          theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(0, 0, 0, 0.05)',
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: 'primary.main',
                          mb: 0.5,
                        }}
                      >
                        {highlight.metric}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.8rem',
                        }}
                      >
                        {highlight.description}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Technologies */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}
            >
              Technologies Used:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {experience.technologies.slice(0, 6).map(tech => (
                <Chip
                  key={tech}
                  label={tech}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(0, 230, 118, 0.1)',
                    color: 'primary.main',
                    border: '1px solid rgba(0, 230, 118, 0.2)',
                    fontSize: '0.75rem',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 230, 118, 0.2)',
                    },
                  }}
                />
              ))}
              {experience.technologies.length > 6 && (
                <Chip
                  label={`+${experience.technologies.length - 6}`}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    color: 'secondary.main',
                    border: '1px solid rgba(25, 118, 210, 0.2)',
                    fontSize: '0.75rem',
                  }}
                />
              )}
            </Box>
          </Box>

          {/* Expand/Collapse for details */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {expandedCard === experience.id ? 'Less details' : 'More details'}
            </Typography>
            <IconButton
              onClick={() => {
                toggleCardExpansion(experience.id);
                // Additional tracking for expand button click
                trackEvent('experience_expand_button', {
                  category: 'ui_interaction',
                  label: experience.company,
                  action:
                    expandedCard === experience.id ? 'collapse' : 'expand',
                  company: experience.company,
                });
              }}
              sx={{
                color: 'primary.main',
                transition: 'transform 0.3s ease-in-out',
                transform:
                  expandedCard === experience.id
                    ? 'rotate(180deg)'
                    : 'rotate(0deg)',
              }}
            >
              <ExpandMore />
            </IconButton>
          </Box>

          {/* Expandable Content */}
          <Collapse in={expandedCard === experience.id}>
            <Box
              sx={{
                mt: 3,
                pt: 3,
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Responsibilities */}
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}
              >
                Key Responsibilities:
              </Typography>
              <Box sx={{ mb: 3 }}>
                {experience.responsibilities.map((responsibility, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <CheckCircle
                      sx={{
                        fontSize: 16,
                        color: 'primary.main',
                        mt: 0.2,
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                    >
                      {responsibility}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Achievements */}
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}
              >
                Key Achievements:
              </Typography>
              <Box>
                {experience.achievements.map((achievement, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <TrendingUp
                      sx={{
                        fontSize: 16,
                        color: 'secondary.main',
                        mt: 0.2,
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                    >
                      {achievement}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Collapse>
        </CardContent>
      </Card>
    </motion.div>
  );

  const EducationCard = ({ education, index }) => (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
    >
      <Card
        sx={{
          background:
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          border:
            theme.palette.mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
          transition: 'all 0.3s ease-in-out',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-4px)',
            border: '1px solid rgba(25, 118, 210, 0.3)',
            boxShadow:
              theme.palette.mode === 'dark'
                ? '0px 16px 40px rgba(25, 118, 210, 0.2)'
                : '0px 16px 40px rgba(25, 118, 210, 0.15)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #1976d2, #00e676)',
          },
        }}
        onClick={() => {
          // Track education card click
          trackEvent('education_card_click', {
            category: 'education_engagement',
            label: education.institution,
            institution: education.institution,
            degree: education.degree,
            card_index: index,
            gpa: education.gpa,
          });
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}
          >
            <Avatar
              sx={{
                width: 60,
                height: 60,
                background: 'linear-gradient(45deg, #1976d2, #00e676)',
              }}
            >
              {education.icon}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: 0.5,
                }}
              >
                {education.degree}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'secondary.main',
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                {education.institution}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {education.location}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CalendarToday
                    sx={{ fontSize: 16, color: 'text.secondary' }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {education.duration}
                  </Typography>
                </Box>
                <Chip
                  label={`GPA: ${education.gpa}`}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(25, 118, 210, 0.2)',
                    color: 'secondary.main',
                    fontWeight: 500,
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.7,
              mb: 3,
            }}
          >
            {education.description}
          </Typography>

          {/* Achievements */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}
            >
              Achievements:
            </Typography>
            <Box>
              {education.achievements.map((achievement, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1,
                    mb: 1,
                  }}
                  onClick={() => {
                    // Track education achievement click
                    trackEvent('education_achievement_click', {
                      category: 'education_engagement',
                      label: education.institution,
                      institution: education.institution,
                      degree: education.degree,
                      achievement,
                      card_index: index,
                    });
                  }}
                >
                  <EmojiEvents
                    sx={{
                      fontSize: 16,
                      color: 'secondary.main',
                      mt: 0.2,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                  >
                    {achievement}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Coursework */}
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}
            >
              Relevant Coursework:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {education.coursework.map(course => (
                <Chip
                  key={course}
                  label={course}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    color: 'secondary.main',
                    border: '1px solid rgba(25, 118, 210, 0.2)',
                    fontSize: '0.75rem',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.2)',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  const CertificationCard = ({ certification, index }) => (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card
        sx={{
          background:
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          border:
            theme.palette.mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: 3,
          p: 3,
          textAlign: 'center',
          transition: 'all 0.3s ease-in-out',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-4px)',
            border: '1px solid rgba(255, 152, 0, 0.3)',
            boxShadow:
              theme.palette.mode === 'dark'
                ? '0px 16px 40px rgba(255, 152, 0, 0.2)'
                : '0px 16px 40px rgba(255, 152, 0, 0.15)',
          },
        }}
        onClick={() => {
          // Track certification card click
          trackEvent('certification_card_click', {
            category: 'certification_engagement',
            label: certification.name,
            certification_name: certification.name,
            issuer: certification.issuer,
            card_index: index,
            skills: certification.skills.join(', '),
          });
        }}
      >
        <Avatar
          sx={{
            width: 56,
            height: 56,
            mx: 'auto',
            mb: 2,
            background: 'linear-gradient(45deg, #ff9800, #f57c00)',
          }}
        >
          {certification.icon}
        </Avatar>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            mb: 1,
            fontSize: '1rem',
          }}
        >
          {certification.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'warning.main',
            fontWeight: 500,
            mb: 2,
          }}
        >
          {certification.issuer}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            display: 'block',
            mb: 2,
          }}
        >
          Issued: {certification.issueDate} • Expires:{' '}
          {certification.expiryDate}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.5,
            justifyContent: 'center',
          }}
        >
          {certification.skills.slice(0, 3).map(skill => (
            <Chip
              key={skill}
              label={skill}
              size="small"
              sx={{
                backgroundColor: 'rgba(255, 152, 0, 0.1)',
                color: 'warning.main',
                fontSize: '0.7rem',
                height: 20,
              }}
            />
          ))}
        </Box>
      </Card>
    </motion.div>
  );

  return (
    <Box
      id="experience"
      sx={{
        py: { xs: 8, md: 12 },
        background:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(0, 230, 118, 0.02) 0%, rgba(25, 118, 210, 0.02) 100%)'
            : 'linear-gradient(135deg, rgba(0, 230, 118, 0.05) 0%, rgba(25, 118, 210, 0.05) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: 100,
          height: 100,
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
                <Work />
                Professional Journey
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
                Experience & Education
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
                A comprehensive overview of my professional journey, educational
                background, and continuous learning in the field of artificial
                intelligence.
              </Typography>
            </Box>
          </motion.div>

          {/* Experience Stats */}
          <motion.div variants={itemVariants}>
            <Box sx={{ mb: 8 }}>
              <Grid container spacing={3}>
                {[
                  {
                    label: 'Years Experience',
                    value: `${experienceStats.totalYears}+`,
                    icon: <Work />,
                  },
                  {
                    label: 'Companies',
                    value: experienceStats.companiesWorked,
                    icon: <Business />,
                  },
                  {
                    label: 'Projects',
                    value: `${experienceStats.projectsCompleted}+`,
                    icon: <TrendingUp />,
                  },
                  {
                    label: 'Papers Published',
                    value: experienceStats.papersPublished,
                    icon: <School />,
                  },
                ].map((stat, index) => (
                  <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Box
                        sx={{
                          textAlign: 'center',
                          p: 3,
                          borderRadius: 3,
                          background:
                            theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.05)'
                              : 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          border:
                            theme.palette.mode === 'dark'
                              ? '1px solid rgba(255, 255, 255, 0.1)'
                              : '1px solid rgba(0, 0, 0, 0.1)',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            border: '1px solid rgba(0, 230, 118, 0.3)',
                          },
                        }}
                        onClick={() => {
                          // Track stat card click
                          trackEvent('experience_stat_click', {
                            category: 'stats_engagement',
                            label: stat.label,
                            stat_name: stat.label,
                            stat_value: stat.value,
                            stat_index: index,
                          });
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 48,
                            height: 48,
                            mx: 'auto',
                            mb: 2,
                            background:
                              'linear-gradient(45deg, #00e676, #1976d2)',
                          }}
                        >
                          {stat.icon}
                        </Avatar>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            color: 'primary.main',
                            mb: 1,
                          }}
                        >
                          {stat.value}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            fontWeight: 500,
                          }}
                        >
                          {stat.label}
                        </Typography>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={itemVariants}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                centered
                sx={{
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    minWidth: 120,
                    color: 'text.secondary',
                    '&.Mui-selected': {
                      color: 'primary.main',
                    },
                  },
                  '& .MuiTabs-indicator': {
                    background: 'linear-gradient(45deg, #00e676, #1976d2)',
                    height: 3,
                    borderRadius: 1.5,
                  },
                }}
              >
                <Tab label="Experience" icon={<Work />} iconPosition="start" />
                <Tab label="Education" icon={<School />} iconPosition="start" />
                <Tab
                  label="Certifications"
                  icon={<EmojiEvents />}
                  iconPosition="start"
                />
              </Tabs>
            </Box>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {selectedTab === 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {experienceData.map((experience, index) => (
                    <ExperienceCard
                      key={experience.id}
                      experience={experience}
                      index={index}
                    />
                  ))}
                </Box>
              )}

              {selectedTab === 1 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {educationData.map((education, index) => (
                    <EducationCard
                      key={education.id}
                      education={education}
                      index={index}
                    />
                  ))}
                </Box>
              )}

              {selectedTab === 2 && (
                <Grid container spacing={3}>
                  {certificationsData.map((certification, index) => (
                    <Grid
                      size={{ xs: 12, sm: 6, md: 3 }}
                      key={certification.id}
                    >
                      <CertificationCard
                        certification={certification}
                        index={index}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ExperienceSection;

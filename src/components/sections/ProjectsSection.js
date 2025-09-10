import {
  Launch,
  GitHub,
  Visibility,
  Code,
  Star,
  FilterList,
  Psychology,
  Web,
  Storage,
  SmartToy,
} from '@mui/icons-material';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  IconButton,
  ButtonGroup,
  useTheme,
  useMediaQuery,
  Link,
  Tooltip,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { projectsData, categories } from '../../data/projects';
import {
  trackProjectInteraction,
  trackNavigation,
} from '../../utils/analytics';

const ProjectsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);

  const categoryIcons = {
    all: <FilterList />,
    'AI/ML': <Psychology />,
    Web: <Web />,
    Mobile: <SmartToy />,
    Data: <Storage />,
  };

  const filteredProjects =
    selectedCategory === 'all'
      ? projectsData
      : projectsData.filter(project => project.category === selectedCategory);

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const ProjectCard = ({ project, index }) => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setHoveredProject(project.id)}
      onHoverEnd={() => setHoveredProject(null)}
      transition={{ delay: index * 0.1 }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
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
          '&:hover': {
            border: '1px solid rgba(0, 230, 118, 0.4)',
            boxShadow:
              theme.palette.mode === 'dark'
                ? '0px 16px 40px rgba(0, 230, 118, 0.2)'
                : '0px 16px 40px rgba(0, 230, 118, 0.15)',
          },
        }}
      >
        {/* Project Image */}
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="200"
            image={project.image}
            alt={project.title}
            sx={{
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />

          {/* Status Badge */}
          <Chip
            label={project.status}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor:
                project.status === 'Production'
                  ? 'success.main'
                  : project.status === 'Beta'
                    ? 'warning.main'
                    : 'info.main',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.75rem',
            }}
          />

          {/* Featured Badge */}
          {project.featured && (
            <Star
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                color: 'primary.main',
                fontSize: 28,
                filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.3))',
              }}
            />
          )}

          {/* Overlay on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                'linear-gradient(135deg, rgba(0, 230, 118, 0.8), rgba(25, 118, 210, 0.8))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            {project.demoUrl && (
              <Tooltip title="View Demo">
                <IconButton
                  component={Link}
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Demo"
                  title="View Demo"
                  role="link"
                  onClick={() =>
                    trackProjectInteraction(
                      project.title,
                      'view_demo',
                      project.demoUrl
                    )
                  }
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <Visibility />
                </IconButton>
              </Tooltip>
            )}

            {project.githubUrl && (
              <Tooltip title="View Source">
                <IconButton
                  component={Link}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Source"
                  title="View Source"
                  role="link"
                  onClick={() =>
                    trackProjectInteraction(
                      project.title,
                      'view_code',
                      project.githubUrl
                    )
                  }
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <GitHub />
                </IconButton>
              </Tooltip>
            )}

            {project.liveUrl && (
              <Tooltip title="Visit Live Site">
                <IconButton
                  component={Link}
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Live Site"
                  title="Visit Live Site"
                  role="link"
                  onClick={() =>
                    trackProjectInteraction(
                      project.title,
                      'view_live',
                      project.liveUrl
                    )
                  }
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <Launch />
                </IconButton>
              </Tooltip>
            )}
          </motion.div>
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          {/* Project Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            {project.icon}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
              }}
            >
              {project.title}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: 'primary.main',
              fontWeight: 500,
              mb: 2,
            }}
          >
            {project.subtitle}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.6,
              mb: 3,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {project.description}
          </Typography>

          {/* Technologies */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 3 }}>
            {project.technologies.slice(0, 4).map(tech => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  backgroundColor: 'rgba(0, 230, 118, 0.1)',
                  color: 'primary.main',
                  border: '1px solid rgba(0, 230, 118, 0.2)',
                  fontSize: '0.7rem',
                  height: 24,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 230, 118, 0.2)',
                  },
                }}
              />
            ))}
            {project.technologies.length > 4 && (
              <Chip
                label={`+${project.technologies.length - 4}`}
                size="small"
                sx={{
                  backgroundColor: 'rgba(25, 118, 210, 0.1)',
                  color: 'secondary.main',
                  border: '1px solid rgba(25, 118, 210, 0.2)',
                  fontSize: '0.7rem',
                  height: 24,
                }}
              />
            )}
          </Box>

          {/* Metrics */}
          {project.metrics && (
            <Box sx={{ mt: 'auto' }}>
              <Grid container spacing={1}>
                {Object.entries(project.metrics)
                  .slice(0, 2)
                  .map(([key, value]) => (
                    <Grid size={{ xs: 6 }} key={key}>
                      <Box
                        sx={{
                          textAlign: 'center',
                          p: 1,
                          borderRadius: 2,
                          background:
                            theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.05)'
                              : 'rgba(0, 0, 0, 0.05)',
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            color: 'primary.main',
                          }}
                        >
                          {value}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'text.secondary',
                            textTransform: 'capitalize',
                            fontSize: '0.7rem',
                          }}
                        >
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Box
      id="projects"
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
          top: '10%',
          right: '5%',
          width: 150,
          height: 150,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(25, 118, 210, 0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        component={motion.div}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
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
                <Code />
                Featured Projects
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
                AI-Powered Solutions
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
                Explore my portfolio of innovative AI projects, from advanced
                prompt engineering platforms to intelligent automation systems
                that solve real-world challenges.
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
                {categories.map(category => (
                  <Button
                    key={category.value}
                    onClick={() => {
                      setSelectedCategory(category.value);
                      trackNavigation(`projects_${category.value}`, 'filter');
                    }}
                    sx={{
                      backgroundColor:
                        selectedCategory === category.value
                          ? 'rgba(0, 230, 118, 0.2)'
                          : 'transparent',
                      color:
                        selectedCategory === category.value
                          ? 'primary.main'
                          : 'text.secondary',
                      borderColor:
                        selectedCategory === category.value
                          ? 'primary.main'
                          : 'rgba(0, 230, 118, 0.3)',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 230, 118, 0.1)',
                        borderColor: 'primary.main',
                      },
                    }}
                    startIcon={categoryIcons[category.value]}
                  >
                    {category.name}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>
          </motion.div>

          {/* Projects Grid */}
          <motion.div variants={itemVariants}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Grid container spacing={4}>
                  {filteredProjects.map((project, index) => (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={project.id}>
                      <ProjectCard project={project} index={index} />
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: 'center', mt: 8 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: 'text.primary',
                }}
              >
                Interested in Collaboration?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                  maxWidth: '600px',
                  mx: 'auto',
                }}
              >
                I'm always open to discussing new opportunities, innovative
                projects, and ways to leverage AI for solving complex
                challenges.
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<Launch />}
                sx={{
                  background:
                    'linear-gradient(45deg, #00e676 30%, #1976d2 90%)',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  boxShadow: '0px 8px 24px rgba(0, 230, 118, 0.3)',
                  '&:hover': {
                    background:
                      'linear-gradient(45deg, #1976d2 30%, #00e676 90%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0px 12px 32px rgba(0, 230, 118, 0.4)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
                onClick={() => {
                  document
                    .querySelector('#contact')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Let's Connect
              </Button>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ProjectsSection;

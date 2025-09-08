import { ExpandMore, ExpandLess } from '@mui/icons-material';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Button,
  Collapse,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { trackSkillInteraction } from '../../utils/analytics';

const SkillCard = ({
  skill,
  level,
  icon,
  description,
  category = 'Technical',
  delay = 0,
}) => {
  const theme = useTheme();
  const [showDescription, setShowDescription] = useState(false);

  const categoryColors = {
    Technical: { primary: '#00e676', secondary: '#00b248' },
    AI: { primary: '#1976d2', secondary: '#1565c0' },
    Tools: { primary: '#ff9800', secondary: '#f57c00' },
    Soft: { primary: '#9c27b0', secondary: '#7b1fa2' },
  };

  const colors = categoryColors[category] || categoryColors.Technical;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
    >
      <Card
        sx={{
          background:
            theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border:
            theme.palette.mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: 3,
          overflow: 'hidden',
          height: '100%',
          transition: 'all 0.3s ease-in-out',
          position: 'relative',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow:
              theme.palette.mode === 'dark'
                ? `0px 16px 32px rgba(${colors.primary === '#00e676' ? '0, 230, 118' : '25, 118, 210'}, 0.3)`
                : `0px 16px 32px rgba(${colors.primary === '#00e676' ? '0, 230, 118' : '25, 118, 210'}, 0.2)`,
            border: `1px solid ${colors.primary}40`,
            '& .skill-progress': {
              transform: 'scaleX(1)',
            },
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
                mr: 2,
              }}
            >
              {icon}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 0.5,
                  color: 'text.primary',
                }}
              >
                {skill}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: colors.primary,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                {category}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 1 }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography variant="body2" color="text.secondary">
                Proficiency
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: colors.primary,
                  fontWeight: 600,
                }}
              >
                {level}%
              </Typography>
            </Box>
            <Box
              sx={{
                position: 'relative',
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.1)',
                borderRadius: 2,
                overflow: 'hidden',
                height: 8,
              }}
            >
              <motion.div
                className="skill-progress"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: level / 100 }}
                transition={{
                  duration: 1.5,
                  delay: delay + 0.5,
                  ease: 'easeOut',
                }}
                viewport={{ once: true }}
                style={{
                  height: '100%',
                  background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                  transformOrigin: 'left',
                  borderRadius: '8px',
                }}
              />

              {/* Animated glow effect */}
              <motion.div
                animate={{
                  x: ['-100%', '100%'],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: 'easeInOut',
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '30%',
                  height: '100%',
                  background:
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)'
                      : 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.2), transparent)',
                  borderRadius: '8px',
                }}
              />
            </Box>

            {description && (
              <Box sx={{ mb: 0, mt: 2 }}>
                {/* <Box sx={{ mb: 2 }}>*/}
                <Button
                  onClick={() => {
                    const newShowState = !showDescription;
                    setShowDescription(newShowState);

                    // Track skill interaction
                    trackSkillInteraction(
                      skill,
                      newShowState ? 'expand_details' : 'collapse_details',
                      category
                    );
                  }}
                  endIcon={showDescription ? <ExpandLess /> : <ExpandMore />}
                  sx={{
                    textTransform: 'none',
                    color: colors.primary,
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    p: 0,
                    minHeight: 'auto',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: colors.secondary,
                    },
                  }}
                >
                  More details
                </Button>
                <Collapse in={showDescription}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.6,
                      mt: 1,
                    }}
                  >
                    {description}
                  </Typography>
                </Collapse>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SkillCard;

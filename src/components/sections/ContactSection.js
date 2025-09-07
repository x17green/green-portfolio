import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Alert,
  Snackbar,
  Link,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Send,
  GitHub,
  LinkedIn,
  Twitter,
  Schedule,
  CheckCircle,
  Error,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState({ open: false, type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: <Email />,
      label: 'Email',
      value: 'hello@aiportfolio.dev',
      link: 'mailto:hello@aiportfolio.dev',
      color: '#00e676',
    },
    {
      icon: <Phone />,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      color: '#1976d2',
    },
    {
      icon: <LocationOn />,
      label: 'Location',
      value: 'San Francisco, CA',
      link: 'https://maps.google.com/?q=San Francisco, CA',
      color: '#ff9800',
    },
    {
      icon: <Schedule />,
      label: 'Availability',
      value: 'Open for opportunities',
      color: '#4caf50',
    },
  ];

  const socialLinks = [
    {
      icon: <GitHub />,
      label: 'GitHub',
      url: 'https://github.com/yourusername',
      color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333',
    },
    {
      icon: <LinkedIn />,
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
      color: '#0077b5',
    },
    {
      icon: <Twitter />,
      label: 'Twitter',
      url: 'https://twitter.com/yourusername',
      color: '#1da1f2',
    },
    {
      icon: <Email />,
      label: 'Email',
      url: 'mailto:hello@aiportfolio.dev',
      color: '#ea4335',
    },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      setFormStatus({
        open: true,
        type: 'success',
        message: 'Thank you for your message! I\'ll get back to you within 24 hours.',
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setFormStatus({
        open: true,
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setFormStatus({ ...formStatus, open: false });
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

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        background: theme.palette.mode === 'dark'
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
          top: '15%',
          left: '10%',
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 230, 118, 0.1) 0%, transparent 70%)',
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
                <Send />
                Get In Touch
              </Typography>
              <Typography
                variant={isMobile ? 'h4' : 'h3'}
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(45deg, #ffffff, #00e676)'
                    : 'linear-gradient(45deg, #333333, #00e676)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Let's Build Something Amazing
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
                Ready to discuss your next AI project or collaboration? I'd love to hear from you.
                Drop me a message and let's explore the possibilities together.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={4}>
            {/* Contact Form */}
            <Grid size={{ xs:12, lg:7 }}>
              <motion.div variants={itemVariants}>
                <Card
                  sx={{
                    background: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    border: theme.palette.mode === 'dark'
                      ? '1px solid rgba(255, 255, 255, 0.1)'
                      : '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: 3,
                    overflow: 'hidden',
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        mb: 3,
                        color: 'text.primary',
                      }}
                    >
                      Send me a message
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit}>
                      <Grid container spacing={3}>
                        <Grid size={{ xs:12, sm:6 }}>
                          <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                  borderColor: 'primary.main',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: 'primary.main',
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs:12, sm:6 }}>
                          <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                  borderColor: 'primary.main',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: 'primary.main',
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs:12 }}>
                          <TextField
                            fullWidth
                            label="Subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                  borderColor: 'primary.main',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: 'primary.main',
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs:12 }}>
                          <TextField
                            fullWidth
                            label="Message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            multiline
                            rows={4}
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                  borderColor: 'primary.main',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: 'primary.main',
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid size={{ xs:12 }}>
                          <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={isSubmitting}
                            startIcon={isSubmitting ? <Schedule /> : <Send />}
                            sx={{
                              background: 'linear-gradient(45deg, #00e676 30%, #1976d2 90%)',
                              px: 4,
                              py: 1.5,
                              fontSize: '1rem',
                              fontWeight: 600,
                              boxShadow: '0px 8px 24px rgba(0, 230, 118, 0.3)',
                              '&:hover': {
                                background: 'linear-gradient(45deg, #1976d2 30%, #00e676 90%)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0px 12px 32px rgba(0, 230, 118, 0.4)',
                              },
                              '&:disabled': {
                                background: 'rgba(0, 230, 118, 0.3)',
                                transform: 'none',
                              },
                              transition: 'all 0.3s ease-in-out',
                            }}
                          >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Contact Information */}
            <Grid size={{ xs:12, lg:7 }}>
              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {/* Contact Info Cards */}
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card
                        sx={{
                          background: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(20px)',
                          border: theme.palette.mode === 'dark'
                            ? '1px solid rgba(255, 255, 255, 0.1)'
                            : '1px solid rgba(0, 0, 0, 0.1)',
                          borderRadius: 2,
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateX(8px)',
                            border: `1px solid ${info.color}40`,
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                              sx={{
                                backgroundColor: `${info.color}20`,
                                color: info.color,
                                width: 48,
                                height: 48,
                              }}
                            >
                              {info.icon}
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
                                {info.label}
                              </Typography>
                              {info.link ? (
                                <Link
                                  href={info.link}
                                  target={info.link.startsWith('http') ? '_blank' : undefined}
                                  sx={{
                                    color: 'text.secondary',
                                    textDecoration: 'none',
                                    '&:hover': {
                                      color: info.color,
                                    },
                                  }}
                                >
                                  {info.value}
                                </Link>
                              ) : (
                                <Typography
                                  variant="body1"
                                  sx={{ color: 'text.secondary' }}
                                >
                                  {info.value}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}

                  <Divider sx={{ my: 2 }} />

                  {/* Social Links */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 3,
                        color: 'text.primary',
                        textAlign: 'center',
                      }}
                    >
                      Connect with me
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                        flexWrap: 'wrap',
                      }}
                    >
                      {socialLinks.map((social, index) => (
                        <motion.div
                          key={social.label}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <IconButton
                            component={Link}
                            href={social.url}
                            target="_blank"
                            sx={{
                              backgroundColor: theme.palette.mode === 'dark'
                                ? 'rgba(255, 255, 255, 0.05)'
                                : 'rgba(255, 255, 255, 0.8)',
                              border: `2px solid ${social.color}40`,
                              color: social.color,
                              width: 56,
                              height: 56,
                              transition: 'all 0.3s ease-in-out',
                              '&:hover': {
                                backgroundColor: `${social.color}20`,
                                borderColor: social.color,
                                transform: 'translateY(-4px)',
                                boxShadow: `0px 8px 24px ${social.color}40`,
                              },
                            }}
                            aria-label={social.label}
                          >
                            {social.icon}
                          </IconButton>
                        </motion.div>
                      ))}
                    </Box>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={formStatus.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={formStatus.type}
          icon={formStatus.type === 'success' ? <CheckCircle /> : <Error />}
          sx={{
            width: '100%',
            borderRadius: 2,
            '& .MuiAlert-icon': {
              fontSize: 24,
            },
          }}
        >
          {formStatus.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactSection;

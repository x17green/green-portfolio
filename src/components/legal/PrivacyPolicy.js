import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Link,
  useTheme,
} from '@mui/material';
import { Privacy, Analytics, Security } from '@mui/icons-material';

const PrivacyPolicy = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          background: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: theme.palette.mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: 3,
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Privacy sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            Privacy Policy
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Last updated: January 15, 2024
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Introduction */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Introduction
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            This Privacy Policy describes how Precious E. Okoyen ("I", "me", or "my")
            collects, uses, and protects your information when you visit my portfolio
            website at{' '}
            <Link href="https://x17green.vercel.app" target="_blank" rel="noopener noreferrer">
              x17green.vercel.app
            </Link>{' '}
            (the "Service").
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            By using my Service, you agree to the collection and use of information
            in accordance with this policy.
          </Typography>
        </Box>

        {/* Information Collection */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Analytics sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Information Collection and Use
            </Typography>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 3 }}>
            Google Analytics
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            This website uses Google Analytics, a web analytics service provided by
            Google LLC ("Google"). Google Analytics uses cookies and similar technologies
            to analyze how users interact with the website.
          </Typography>

          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            Information collected by Google Analytics includes:
          </Typography>
          <List sx={{ pl: 2 }}>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemText
                primary="• Pages visited and time spent on each page"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemText
                primary="• Browser type and version"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemText
                primary="• Operating system and device information"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemText
                primary="• Referring website or source"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemText
                primary="• Geographic location (country/city level)"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemText
                primary="• User interactions (clicks, scrolling, form submissions)"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          </List>

          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 3 }}>
            Contact Form Information
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            When you use the contact form on this website, I collect the information
            you voluntarily provide, such as your name, email address, and message content.
            This information is used solely to respond to your inquiry.
          </Typography>
        </Box>

        {/* How We Use Information */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            How I Use Your Information
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            The information collected is used for the following purposes:
          </Typography>
          <List sx={{ pl: 2 }}>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemText
                primary="• To understand how visitors use the website and improve user experience"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemText
                primary="• To analyze website performance and identify technical issues"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemText
                primary="• To respond to contact form submissions and inquiries"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemText
                primary="• To track portfolio engagement and professional interest"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          </List>
        </Box>

        {/* Data Protection */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Security sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Data Protection and Security
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            I am committed to protecting your privacy and personal information. The security
            of your data is important to me, and I implement appropriate technical and
            organizational measures to protect your information.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            However, please note that no method of transmission over the internet or
            electronic storage is 100% secure, and I cannot guarantee absolute security.
          </Typography>
        </Box>

        {/* Third-Party Services */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Third-Party Services
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            This website uses the following third-party services:
          </Typography>
          <List sx={{ pl: 2 }}>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemText
                primary={
                  <Box>
                    <strong>Google Analytics:</strong> For website analytics and performance monitoring.
                    View Google's Privacy Policy at{' '}
                    <Link
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      policies.google.com/privacy
                    </Link>
                  </Box>
                }
                primaryTypographyProps={{ variant: 'body2', component: 'div' }}
              />
            </ListItem>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemText
                primary={
                  <Box>
                    <strong>Vercel:</strong> For website hosting and deployment.
                    View Vercel's Privacy Policy at{' '}
                    <Link
                      href="https://vercel.com/legal/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      vercel.com/legal/privacy-policy
                    </Link>
                  </Box>
                }
                primaryTypographyProps={{ variant: 'body2', component: 'div' }}
              />
            </ListItem>
          </List>
        </Box>

        {/* Your Rights */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Your Rights and Choices
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            You have the following rights regarding your personal information:
          </Typography>
          <List sx={{ pl: 2 }}>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemText
                primary="• Opt-out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemText
                primary="• Disable cookies in your browser settings"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemText
                primary="• Request information about what personal data I have about you"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemText
                primary="• Request deletion of your personal data"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          </List>
        </Box>

        {/* Cookies */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Cookies
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            This website uses cookies to enhance your browsing experience and gather
            analytics data. Cookies are small text files stored on your device that
            help improve website functionality.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            You can control cookies through your browser settings. However, disabling
            cookies may affect your experience on this website.
          </Typography>
        </Box>

        {/* Children's Privacy */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Children's Privacy
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            This website is not intended for children under 13 years of age. I do not
            knowingly collect personal information from children under 13. If you are
            a parent or guardian and believe your child has provided personal information,
            please contact me so I can delete such information.
          </Typography>
        </Box>

        {/* Changes to Policy */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Changes to This Privacy Policy
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            I may update this Privacy Policy from time to time. Any changes will be
            posted on this page with an updated "Last updated" date. I encourage you
            to review this Privacy Policy periodically for any changes.
          </Typography>
        </Box>

        {/* Contact Information */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Contact Information
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            If you have any questions about this Privacy Policy or how your information
            is handled, please contact me:
          </Typography>
          <List sx={{ pl: 2 }}>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemText
                primary="Email: pokosine@protonmail.com"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemText
                primary="LinkedIn: linkedin.com/in/x17-green"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemText
                primary="Website: x17green.vercel.app"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Footer */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            This Privacy Policy is effective as of January 15, 2024
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;

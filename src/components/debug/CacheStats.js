import {
  ExpandMore,
  Refresh,
  Delete,
  Memory,
  Speed,
  Storage,
  TrendingUp,
  Warning,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Alert,
  Tooltip,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { appService } from '../../services/appService';
import { experienceService } from '../../services/experienceService';
import { projectService } from '../../services/projectService';

// Cache Statistics Component for Development and Monitoring

const CacheStats = ({ onClose }) => {
  const [stats, setStats] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [healthStatus, setHealthStatus] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Refresh cache statistics
  const refreshStats = async () => {
    setRefreshing(true);
    try {
      const cacheStats = appService.getCacheStatistics();
      const appStats = appService.getAppStatistics();
      const health = appService.getHealthStatus();
      const recs = appService.getOptimizationRecommendations();

      setStats({ cache: cacheStats, app: appStats });
      setHealthStatus(health);
      setRecommendations(recs);
    } catch (error) {
      // eslint-disable-next-line no-console

      // eslint-disable-next-line no-console
      console.error('Failed to refresh cache stats:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Clear all caches
  const clearAllCaches = () => {
    appService.clearAllCaches();
    refreshStats();
  };

  // Clear specific cache
  const clearSpecificCache = service => {
    switch (service) {
      case 'projects':
        projectService.clearCache();
        break;
      case 'experience':
        experienceService.clearCache();
        break;
      default:
        break;
    }
    refreshStats();
  };

  // Load stats on mount
  useEffect(() => {
    refreshStats();
  }, []);

  // Format cache hit rate color
  const getHitRateColor = hitRate => {
    const rate = parseFloat(hitRate?.replace('%', '') || 0);
    if (rate >= 80) return 'success';
    if (rate >= 60) return 'warning';
    return 'error';
  };

  // Format memory size
  const formatMemory = bytes => {
    if (!bytes) return 'N/A';
    const kb = bytes / 1024;
    const mb = kb / 1024;
    if (mb >= 1) return `${mb.toFixed(2)} MB`;
    return `${kb.toFixed(2)} KB`;
  };

  if (!stats) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <Typography>Loading cache statistics...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxHeight: '90vh', overflow: 'auto' }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" component="h1">
          Cache Performance Dashboard
        </Typography>
        <Box>
          <Tooltip title="Refresh Statistics">
            <IconButton onClick={refreshStats} disabled={refreshing}>
              <Refresh />
            </IconButton>
          </Tooltip>
          <Button
            variant="outlined"
            color="error"
            onClick={clearAllCaches}
            startIcon={<Delete />}
            sx={{ ml: 1 }}
          >
            Clear All Caches
          </Button>
        </Box>
      </Box>

      {/* Health Status */}
      {healthStatus && (
        <Alert
          severity={healthStatus.status === 'healthy' ? 'success' : 'warning'}
          sx={{ mb: 3 }}
          icon={
            healthStatus.status === 'healthy' ? <TrendingUp /> : <Warning />
          }
        >
          <Typography variant="h6">
            System Status: {healthStatus.status.toUpperCase()}
          </Typography>
          <Typography variant="body2">
            Cache Size: {healthStatus.cacheSize} items | Initialized:{' '}
            {healthStatus.initialized ? 'Yes' : 'No'}
          </Typography>
        </Alert>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Performance Recommendations
            </Typography>
            {recommendations.map((rec, index) => (
              <Alert key={index} severity="info" sx={{ mb: 1 }}>
                <Typography variant="subtitle2">{rec.message}</Typography>
                <Typography variant="body2">{rec.suggestion}</Typography>
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {Object.entries(stats.cache).map(([service, data]) => (
          <Grid item xs={12} sm={6} md={4} key={service}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h6" component="h2">
                      {service.charAt(0).toUpperCase() + service.slice(1)}
                    </Typography>
                    <Chip
                      label={data.hitRate || 'N/A'}
                      color={getHitRateColor(data.hitRate)}
                      size="small"
                    />
                  </Box>

                  <Box mt={2}>
                    <Typography variant="body2" color="text.secondary">
                      Cache Size: {data.size || 0} items
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Hits: {data.hits || 0} | Misses: {data.misses || 0}
                    </Typography>

                    {data.hitRate && (
                      <Box mt={1}>
                        <LinearProgress
                          variant="determinate"
                          value={parseFloat(data.hitRate.replace('%', '') || 0)}
                          color={getHitRateColor(data.hitRate)}
                        />
                      </Box>
                    )}
                  </Box>

                  <Box mt={2}>
                    <Button
                      size="small"
                      onClick={() => clearSpecificCache(service)}
                      startIcon={<Delete />}
                    >
                      Clear {service}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Detailed Cache Information */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Detailed Cache Statistics</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Service</TableCell>
                  <TableCell align="right">Items</TableCell>
                  <TableCell align="right">Hits</TableCell>
                  <TableCell align="right">Misses</TableCell>
                  <TableCell align="right">Hit Rate</TableCell>
                  <TableCell align="right">Strategy</TableCell>
                  <TableCell align="right">Max Age</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(stats.cache).map(([service, data]) => (
                  <TableRow key={service}>
                    <TableCell component="th" scope="row">
                      {service}
                    </TableCell>
                    <TableCell align="right">{data.size || 0}</TableCell>
                    <TableCell align="right">{data.hits || 0}</TableCell>
                    <TableCell align="right">{data.misses || 0}</TableCell>
                    <TableCell align="right">
                      <Chip
                        label={data.hitRate || 'N/A'}
                        color={getHitRateColor(data.hitRate)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      {data.strategy || 'N/A'}
                    </TableCell>
                    <TableCell align="right">
                      {data.maxAge
                        ? `${Math.round(data.maxAge / 1000)}s`
                        : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      {/* Application Statistics */}
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Application Statistics</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Memory sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Projects
                  </Typography>
                  <Typography>
                    Total: {stats.app.projects?.total || 0}
                  </Typography>
                  <Typography>
                    Featured: {stats.app.projects?.featured || 0}
                  </Typography>
                  <Typography>
                    Categories:{' '}
                    {Object.keys(stats.app.projects?.categories || {}).length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Speed sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Experience
                  </Typography>
                  <Typography>
                    Total Experience:{' '}
                    {stats.app.experience?.totalExperience || 0}
                  </Typography>
                  <Typography>
                    Years: {stats.app.experience?.yearsOfExperience || 0}
                  </Typography>
                  <Typography>
                    Companies: {stats.app.experience?.companiesWorked || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Storage sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Skills
                  </Typography>
                  <Typography>
                    Categories: {stats.app.skills?.categories || 0}
                  </Typography>
                  <Typography>
                    Total Skills: {stats.app.skills?.totalSkills || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Performance Metrics
                  </Typography>
                  <Typography>
                    Memory Usage:{' '}
                    {formatMemory(healthStatus?.memoryUsage?.used)}
                  </Typography>
                  <Typography>
                    Last Updated:{' '}
                    {new Date(stats.app.lastUpdated).toLocaleTimeString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Cache Management Actions */}
      <Box mt={3} p={2} bgcolor="background.paper" borderRadius={1}>
        <Typography variant="h6" gutterBottom>
          Cache Management
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <Button
            variant="outlined"
            onClick={() => projectService.preloadCache()}
            startIcon={<Memory />}
          >
            Preload Projects
          </Button>
          <Button
            variant="outlined"
            onClick={() => experienceService.preloadCache()}
            startIcon={<Speed />}
          >
            Preload Experience
          </Button>
          <Button
            variant="outlined"
            onClick={refreshStats}
            startIcon={<Refresh />}
            disabled={refreshing}
          >
            {refreshing ? 'Refreshing...' : 'Refresh Stats'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

CacheStats.propTypes = {
  appService: PropTypes.object,
  console: PropTypes.object,
  projectService: PropTypes.object,
  experienceService: PropTypes.object,
  mb: PropTypes.object,
  kb: PropTypes.object,
  healthStatus: PropTypes.object,
  recommendations: PropTypes.object,
  rec: PropTypes.object,
  Object: PropTypes.object,
  stats: PropTypes.object,
  motion: PropTypes.object,
  service: PropTypes.object,
  data: PropTypes.object,
  text: PropTypes.object,
  Math: PropTypes.object,
  background: PropTypes.object,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.number,
  index: PropTypes.number,
  disabled: PropTypes.bool,
};

export default CacheStats;

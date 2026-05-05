'use client';
import {
  Box, Container, Typography, Grid, Card, CardContent,
  Avatar, Chip, Stack, Divider, Alert, List, ListItem, ListItemIcon, ListItemText, Paper
} from '@mui/material';
import {
  Inventory, FlightTakeoff, DirectionsBus, ShoppingCart,
  DirectionsCar, LocalShipping, Phone, Email, Schedule, LocationOn,
  Warning, CheckCircle, Cancel, Business
} from '@mui/icons-material';
import { useTranslations, useLocale } from 'next-intl';

const serviceIcons = [Inventory, FlightTakeoff, DirectionsBus, ShoppingCart, DirectionsCar, LocalShipping];
const serviceColors = ['#1565C0','#FF6F00','#2E7D32','#7B1FA2','#C62828','#00838F'];

export function ServicesSection() {
  const t = useTranslations('services');
  const keys = ['wholesale','express','normal','online','vehicle','oversized'] as const;

  return (
    <Box id="services" sx={{ py: 10, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box mb={6}>
          <Chip label="Services" sx={{ mb: 2, fontWeight: 700 }} />
          <Typography variant="h3" fontWeight={800} gutterBottom>{t('title')}</Typography>
        </Box>
        <Grid container spacing={3}>
          {keys.map((key, i) => {
            const Icon = serviceIcons[i];
            return (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <Card sx={{
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
                  border: '1px solid',
                  borderColor: 'divider',
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Avatar sx={{ bgcolor: serviceColors[i] + '18', mb: 2, width: 52, height: 52 }}>
                      <Icon sx={{ color: serviceColors[i] }} />
                    </Avatar>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {t(`items.${key}.title`)}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {t(`items.${key}.desc`)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export function AboutSection() {
  const t = useTranslations('about');
  return (
    <Box id="about" sx={{
      py: 10,
      background: 'linear-gradient(135deg, #1565C0 0%, #1976D2 100%)',
      color: '#fff'
    }}>
      <Container maxWidth="md">
        <Box>
          <Typography variant="h3" fontWeight={800} gutterBottom>{t('title')}</Typography>
          <Typography variant="h6" sx={{ opacity: 0.88, lineHeight: 1.8, fontWeight: 400 }}>
            {t('desc')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

const REPS = [
  { role: 'central_driver', phone: '010-7517-4549', color: '#1565C0' },
  { role: 'central_office', phone: '010-5963-2528', color: '#7B1FA2' },
  { region: '군산, 익산, 김제, 전주, 임실, 남원', phone: '010-5631-4041', color: '#2E7D32' },
  { region: '서울, 경기도', phone: '010-3167-6907', color: '#C62828' },
  { region: '안산, 시흥, 안양', phone: '010-7673-5156', color: '#FF6F00' },
  { region: '화성, 수원', phone: '010-8467-1420', color: '#00838F' },
  { region: '논산, 대전', phone: '010-5807-8553', color: '#558B2F' },
  { region: '천안, 논산, 아산, 평택, 안성, 순탄', phone: '010-5837-7997', color: '#4527A0' },
];

export function RepsSection() {
  const t = useTranslations('reps');
  return (
    <Box id="reps" sx={{ py: 10, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box mb={6}>
          <Chip label="Representatives" sx={{ mb: 2, fontWeight: 700 }} />
          <Typography variant="h3" fontWeight={800}>{t('title')}</Typography>
        </Box>
        <Grid container spacing={2}>
          {REPS.map((rep, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={{
                height: '100%',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: 4 },
                transition: '0.2s',
              }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{
                    width: 8, height: 8, borderRadius: '50%',
                    bgcolor: rep.color, mb: 1.5,
                  }} />
                  <Typography variant="body2" fontWeight={700} gutterBottom>
                    {rep.role ? t(rep.role) : rep.region}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Phone sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography variant="body2" color="primary.main" fontWeight={600}>
                      {rep.phone}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export function ContactSection() {
  const t = useTranslations('contact');
  const s = useTranslations('schedule');

  return (
    <Box id="contact" sx={{ py: 10, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box mb={6}>
          <Chip label="Contact" sx={{ mb: 2, fontWeight: 700 }} />
          <Typography variant="h3" fontWeight={800}>{t('title')}</Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight={700} gutterBottom>{t('title')}</Typography>
                <Stack spacing={2.5}>
                  {[
                    { icon: <Phone />, label: t('phone'), value: '7500-5747 / 8000-0341' },
                    { icon: <Email />, label: t('email'), value: 'montotrade@gmail.com' },
                    { icon: <LocationOn />, label: s('title'), value: s('address') },
                    { icon: <Schedule />, label: '', value: s('hours') },
                  ].map((item, i) => (
                    <Stack key={i} direction="row" spacing={2} alignItems="flex-start">
                      <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
                        {item.icon}
                      </Avatar>
                      <Box>
                        {item.label && <Typography variant="caption" color="text.secondary">{item.label}</Typography>}
                        <Typography fontWeight={600} sx={{ whiteSpace: 'pre-line' }}>{item.value}</Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight={700} gutterBottom>{t('delivery')}</Typography>
                <Alert severity="info" sx={{ mb: 2 }}>{t('deliveryDesc')}</Alert>
                <Stack spacing={1.5}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="body2"><b>📦</b> {t('deliveryFee1')}</Typography>
                  </Paper>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="body2"><b>📦</b> {t('deliveryFee2')}</Typography>
                  </Paper>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export function RulesSection() {
  const t = useTranslations('rules');
  const items = [0, 1, 2, 3, 4, 5].map(i => t(`items.${i}`));
  const icons = [Cancel, Cancel, Warning, Warning, Schedule, Warning];

  return (
    <Box id="rules" sx={{ py: 10, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Box mb={6}>
          <Chip label="Rules" color="warning" sx={{ mb: 2, fontWeight: 700 }} />
          <Typography variant="h3" fontWeight={800}>{t('title')}</Typography>
        </Box>
        <Card sx={{ border: '2px solid', borderColor: 'warning.main' }}>
          <CardContent sx={{ p: 0 }}>
            <List disablePadding>
              {items.map((item, i) => {
                const Icon = icons[i];
                return (
                  <Box key={i}>
                    <ListItem sx={{ py: 2, px: 3 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Icon sx={{ color: i < 2 ? 'error.main' : 'warning.main', fontSize: 20 }} />
                      </ListItemIcon>
                      <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }} />
                    </ListItem>
                    {i < items.length - 1 && <Divider />}
                  </Box>
                );
              })}
            </List>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

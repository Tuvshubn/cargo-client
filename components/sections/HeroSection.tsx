'use client';
import { Box, Container, Typography, Button, Chip, Stack } from '@mui/material';
import { LocalShipping, TrackChanges, ArrowForward } from '@mui/icons-material';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 40%, #1976D2 70%, #42A5F5 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorations */}
      <Box sx={{
        position: 'absolute', inset: 0, opacity: 0.05,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      }} />
      <Box sx={{
        position: 'absolute', top: -100, right: -100,
        width: 600, height: 600, borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
      }} />
      <Box sx={{
        position: 'absolute', bottom: -200, left: -100,
        width: 500, height: 500, borderRadius: '50%',
        background: 'rgba(255,255,255,0.03)',
      }} />

      <Container maxWidth="lg" sx={{ pt: 12, pb: 8, position: 'relative' }}>
        <Stack spacing={3} alignItems={{ xs: 'center', md: 'flex-start' }} sx={{ maxWidth: 700 }}>
          <Chip
            label={t('badge')}
            icon={<LocalShipping />}
            sx={{
              bgcolor: 'rgba(255,255,255,0.15)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.85rem',
              py: 2,
              '& .MuiChip-icon': { color: '#FFD700' },
            }}
          />

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.8rem', md: '4.2rem' },
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.1,
              whiteSpace: 'pre-line',
              textAlign: { xs: 'center', md: 'left' },
              textShadow: '0 2px 20px rgba(0,0,0,0.2)',
            }}
          >
            {t('title')}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255,255,255,0.85)',
              fontWeight: 400,
              lineHeight: 1.6,
              textAlign: { xs: 'center', md: 'left' },
              maxWidth: 520,
            }}
          >
            {t('subtitle')}
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              href={`/${locale}/track`}
              startIcon={<TrackChanges />}
              sx={{
                bgcolor: '#fff',
                color: 'primary.dark',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
              }}
            >
              {t('trackBtn')}
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="#contact"
              endIcon={<ArrowForward />}
              sx={{
                borderColor: 'rgba(255,255,255,0.6)',
                color: '#fff',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              {t('contactBtn')}
            </Button>
          </Stack>

          {/* Stats */}
          <Stack direction="row" spacing={4} sx={{ pt: 2 }}>
            {[
              { value: '7-10', label: locale === 'mn' ? 'Хоног (экспресс)' : '일 (특급)' },
              { value: '100%', label: locale === 'mn' ? 'Найдвартай' : '안전' },
              { value: '24/7', label: locale === 'mn' ? 'Хяналт' : '추적' },
            ].map(stat => (
              <Box key={stat.label} sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight={900} color="#FFD700">
                  {stat.value}
                </Typography>
                <Typography variant="caption" color="rgba(255,255,255,0.7)">
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

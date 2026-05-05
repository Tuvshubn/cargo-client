'use client';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Container, Drawer, List, ListItem, ListItemText, Tooltip } from '@mui/material';
import { Menu as MenuIcon, Brightness4, Brightness7, LocalShipping, Close } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useColorMode } from '@/context/ThemeProvider';
import Link from 'next/link';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { toggleColorMode, mode } = useColorMode();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const switchLocale = () => {
    const next = locale === 'mn' ? 'ko' : 'mn';
    const newPath = pathname.replace(`/${locale}`, `/${next}`);
    router.push(newPath);
  };

  const navItems = [
    { key: 'about', href: '#about' },
    { key: 'services', href: '#services' },
    { key: 'reps', href: '#reps' },
    { key: 'contact', href: '#contact' },
    { key: 'rules', href: '#rules' },
  ];

  return (
    <>
      <AppBar position="fixed" elevation={scrolled ? 4 : 0}
        sx={{ backdropFilter: 'blur(20px)', background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : 'none', transition: 'all 0.3s ease' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 0.5 }}>
            <LocalShipping sx={{ color: 'primary.main', mr: 1, fontSize: 28 }} />
            <Typography variant="h6" fontWeight={800} color="primary.main" sx={{ flexGrow: 0, mr: 4 }}>МонтоТрейд</Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, flexGrow: 1 }}>
              {navItems.map(item => (
                <Button key={item.key} href={item.href} size="small" sx={{ color: 'text.primary', fontWeight: 500 }}>{t(item.key)}</Button>
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Tooltip title={locale === 'mn' ? '한국어' : 'Монгол'}>
                <Button size="small" variant="outlined" onClick={switchLocale} sx={{ minWidth: 48, fontWeight: 700, borderRadius: 2 }}>
                  {locale === 'mn' ? '한' : 'МН'}
                </Button>
              </Tooltip>
              <IconButton onClick={toggleColorMode} size="small">
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
              <Button variant="contained" component={Link} href={`/${locale}/track`} size="small" startIcon={<LocalShipping />} sx={{ display: { xs: 'none', md: 'flex' } }}>
                {t('track')}
              </Button>
              <IconButton sx={{ display: { md: 'none' } }} onClick={() => setDrawerOpen(true)}><MenuIcon /></IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 270, pt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, mb: 1 }}>
            <IconButton onClick={() => setDrawerOpen(false)}><Close /></IconButton>
          </Box>
          <List>
            {navItems.map(item => (
              <ListItem key={item.key} component="a" href={item.href} onClick={() => setDrawerOpen(false)}>
                <ListItemText primary={t(item.key)} />
              </ListItem>
            ))}
            <ListItem component={Link} href={`/${locale}/track`} onClick={() => setDrawerOpen(false)}>
              <ListItemText primary={t('track')} primaryTypographyProps={{ color: 'primary', fontWeight: 700 }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

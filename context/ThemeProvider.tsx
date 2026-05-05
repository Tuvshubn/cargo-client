'use client';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { createContext, useContext, useState, useMemo, useEffect, ReactNode } from 'react';

const ColorModeContext = createContext({ toggleColorMode: () => {}, mode: 'light' as 'light' | 'dark' });

export const useColorMode = () => useContext(ColorModeContext);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (saved) setMode(saved);
  }, []);

  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode(prev => {
        const next = prev === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', next);
        return next;
      });
    },
    mode,
  }), [mode]);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: '#1565C0', light: '#1976D2', dark: '#0D47A1' },
      secondary: { main: '#FF6F00', light: '#FFA000', dark: '#E65100' },
      background: {
        default: mode === 'light' ? '#F8FAFC' : '#0F172A',
        paper: mode === 'light' ? '#FFFFFF' : '#1E293B',
      },
    },
    typography: {
      fontFamily: '"Noto Sans", "Noto Sans KR", sans-serif',
      h1: { fontWeight: 800 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 700 },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 10, textTransform: 'none', fontWeight: 600, fontSize: '0.95rem' },
          containedPrimary: { boxShadow: '0 4px 14px rgba(21,101,192,0.3)' },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: mode === 'light'
              ? '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)'
              : '0 1px 3px rgba(0,0,0,0.3)',
          },
        },
      },
      MuiChip: {
        styleOverrides: { root: { fontWeight: 600 } },
      },
    },
  }), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

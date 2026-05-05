import Navbar from '@/components/ui/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import { ServicesSection, AboutSection, RepsSection, ContactSection, RulesSection } from '@/components/sections/Sections';
import { Box, Container, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <Box>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <RepsSection />
      <ContactSection />
      <RulesSection />
      <Box sx={{ bgcolor: 'primary.main', py: 3, textAlign: 'center' }}>
        <Typography color="white" variant="body2">
          © 2024 МонтоТрейд. Бүх эрх хуулиар хамгаалагдсан.
        </Typography>
      </Box>
    </Box>
  );
}

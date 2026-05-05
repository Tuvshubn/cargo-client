const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./i18n.ts');
module.exports = withNextIntl({
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  experimental: { optimizePackageImports: ['@mui/material', '@mui/icons-material'] },
});

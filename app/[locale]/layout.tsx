import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { AppThemeProvider } from '@/context/ThemeProvider';

export const metadata: Metadata = {
  title: 'МонтоТрейд | Солонгос-Монгол Карго',
  description: 'Солонгосоос Монгол руу найдвартай, хурдан тээвэр',
};

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;800&family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0 }}>
        <NextIntlClientProvider messages={messages}>
          <AppThemeProvider>{children}</AppThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

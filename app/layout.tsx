import '@/styles/globals.css';
import { Metadata } from 'next';
import clsx from 'clsx';

import { Providers } from './providers';

import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    // icon: '/images/logo/trivago-favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx('min-h-screen bg-background antialiased')}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          <main className="container mx-auto max-w-7xl flex-grow px-6 py-2">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

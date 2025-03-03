import '@/styles/globals.css';
import { Metadata } from 'next';
import clsx from 'clsx';

import { Providers } from './providers';
import SuspenseWrapper from './components/SuspenseWrapper';

import { siteConfig } from '@/config/site';
import { fontSouthwestSans, fontFairWater } from '@/config/fonts';
import { FlightProvider } from '@/context/FlightContext';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon/southWestFavicon.png',
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
      <body
        className={clsx([
          'min-h-screen',
          // 'bg-white',
          'font-fairWater',
          'antialiased',
          // fontArial.variable,
          fontSouthwestSans.variable,
          fontFairWater.variable,
        ])}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
          <SuspenseWrapper>
            {/* Change the context provider name according to the project */}
            <FlightProvider>
              <main>{children}</main>
            </FlightProvider>
          </SuspenseWrapper>
        </Providers>
      </body>
    </html>
  );
}

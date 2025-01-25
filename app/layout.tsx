import '@/styles/globals.css';
import { Metadata } from 'next';
import clsx from 'clsx';

import { PropertyProvider } from './context/PropertiesContext';
import { Providers } from './providers';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FiltersBar from './components/FiltersBar/FiltersBar';
import Footer from './components/Footer/Footer';

import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/images/logo/trivago-favicon.ico',
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
          <PropertyProvider>
            <div className="bg-white text-[#171717]">
              <Header />
              <SearchBar />
              <FiltersBar />
              <div className="bg-[#f2f2f1] py-2">
                <main className="container mx-auto max-w-5xl flex-grow px-6 py-2">
                  {children}
                </main>
              </div>
              <Footer />
            </div>
          </PropertyProvider>
        </Providers>
      </body>
    </html>
  );
}

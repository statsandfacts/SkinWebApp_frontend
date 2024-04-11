import '@/styles/globals.css';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { fontInter } from '@/config/fonts';
import { Providers } from './providers';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import Header from '@/components/Header/Header';
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning={true} className={inter.className}>
      <head />
      <body suppressHydrationWarning={true}>
        <Providers>
          <div className='light relative flex flex-col min-h-screen text-foreground bg-background'>
            <Header />
            <main className='w-full '>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

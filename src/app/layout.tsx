import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '@/lib/store/Provider';
import { Header, Footer, Notification } from '@/components/organisms';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'YCompany - Luxury Fashion',
  description: 'Premium luxury fashion for men, women, and children. Quality craftsmanship since 1985.',
  keywords: 'fashion, luxury, clothing, sweaters, shoes, accessories',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Notification />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
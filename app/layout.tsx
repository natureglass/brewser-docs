import { Provider } from '@/components/provider';
import type { Metadata } from 'next';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://docs.brewser.io'),
  title: {
    template: '%s | Brewser Docs',
    default: 'Brewser Docs',
  },
  description:
    'Documentation for Brewser, the web runtime for Nintendo Switch homebrew.',
};

// To use a Google font instead of the system stack, restore:
//   import { Inter } from 'next/font/google';
//   const inter = Inter({ subsets: ['latin'] });
// and add `className={inter.className}` to <html>.

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

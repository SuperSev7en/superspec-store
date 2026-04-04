import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SUPER Spec | Art Prints',
  description: 'Premium art prints for the extraordinary soul',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
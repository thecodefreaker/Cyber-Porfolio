import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hardik Srivastava - Portfolio',
  description: 'Certified Ethical Hacker & Cybersecurity Enthusiast',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="scroll-smooth">{children}</body>
    </html>
  );
}
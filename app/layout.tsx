"use client";
import { ReactNode } from 'react';
import NavMenu from './components/NavMenu';
import ParallaxWrapper from './components/ParallaxWrapper';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white min-h-screen flex flex-col">
        <NavMenu />
        <main className="flex-1 pt-16 md:pt-20 mx-auto px-4"> {/* 🔴 CHANGE HERE: Added responsive padding and container */}
         <ParallaxWrapper> {children}</ParallaxWrapper>
        </main>
      </body>
    </html>
  );
}
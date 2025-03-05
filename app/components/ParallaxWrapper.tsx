"use client"; // Mark as a Client Component

import { ParallaxProvider } from 'react-scroll-parallax';
import { ReactNode } from 'react';

interface ParallaxWrapperProps {
  children: ReactNode;
}

const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({ children }) => {
  return <ParallaxProvider>{children}</ParallaxProvider>;
};

export default ParallaxWrapper;
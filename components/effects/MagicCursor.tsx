// components/effects/MagicCursor.tsx
'use client';

import { useEffect, useRef } from 'react';

export default function MagicCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create the dot element if it doesn't exist
    if (!dotRef.current) {
      const dot = document.createElement('div');
      dot.classList.add('magic-cursor-dot');
      document.body.appendChild(dot);
      dotRef.current = dot;
    }

    // Add class to body to hide default cursor
    document.body.classList.add('magic-cursor-active');

    const handleMouseMove = (event: MouseEvent) => {
      if (dotRef.current) {
        // Make the dot visible on first move
        if (!dotRef.current.classList.contains('visible')) {
          dotRef.current.classList.add('visible');
        }
        // Update position using transform for smoother animation
        dotRef.current.style.transform = `translate(${event.clientX - 5}px, ${event.clientY - 5}px)`; // Offset by half width/height
      }
    };

    const handleMouseLeave = () => {
      if (dotRef.current) {
        dotRef.current.classList.remove('visible');
      }
    };

    const handleMouseEnter = () => {
       if (dotRef.current && !dotRef.current.classList.contains('visible')) {
        dotRef.current.classList.add('visible');
      }
    }

    window.addEventListener('mousemove', handleMouseMove);
    // Hide dot when mouse leaves the window
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    // Show dot when mouse re-enters the window
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);

      // Remove the dot element and body class on component unmount
      if (dotRef.current) {
        dotRef.current.remove();
        dotRef.current = null;
      }
      document.body.classList.remove('magic-cursor-active');
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return null; // This component doesn't render any visible JSX itself
}
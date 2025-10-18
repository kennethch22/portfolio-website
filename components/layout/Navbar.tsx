'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import UserMenu from '@/components/auth/UserMenu';

export default function Navbar() {
  const { data: session } = useSession();
  
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Skills', href: '/skills' },
    { label: 'Experience', href: '/experiences' },
    { label: 'Organisations', href: '/organisations' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="max-w-7xl mx-auto px-2 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-heading neon-text -ml-16">
            KCH
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-8">
            <ul className="flex gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cyber-text-muted hover:text-cyber-neon-teal transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* User Menu or Sign In Button */}
            {session ? (
              <UserMenu />
            ) : (
              <Link
                href="/auth/signin"
                className="px-4 py-2 bg-cyber-neon-teal text-cyber-bg rounded-lg font-medium hover:bg-cyber-neon-teal/90 transition-colors"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}